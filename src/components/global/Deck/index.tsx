/* eslint-disable max-len */
import React, {useEffect, useRef, useState} from 'react';
import {useSprings, animated, to as interpolate} from '@react-spring/web';
import {useDrag} from 'react-use-gesture';
import CardContents from 'components/global/CardContents';
// import {AnswerKeyType, Card, CardTree, CardType, Direction} from 'types/deck';
import {AnswerKeyType, Card, CardTree, Direction} from 'types/deck';
import {
  getDirection,
  getXYFromDirection,
  keyPressDirection,
  keyPressCardPosition,
} from 'components/shared/helpers';
import ResultsCard from 'components/global/ResultsCard';
import styles from './styles.module.scss';

const directions: Direction[] = ['up', 'down', 'left', 'right'];
// const TAP_THRESHOLD = 200;
const SWIPE_THRESHOLD = 150; // Set a threshold for swipe movement

// const handleCardtap = (key: string, type: CardType) => {
//   if (type === 'results') {
//     console.log(`Tapped results! ${key}`);
//   }
// };

// const fullScreen = () => ({
//   x: 0,
//   y: 0,
//   scale: 1,
//   rot: 0,
//   delay: 0,
//   opacity: 1,
//   height: '100%',
//   width: '100%',
// });
// These two are helpers, they curate spring data, values that are
// later being interpolated into css
const stacked = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  perspective: 2500,
  delay: i * 100,
  opacity: 1,
  // zIndex: -i,
});

const from = (_i: number) => ({x: 0, rot: 0, scale: 1.5, y: -1000, opacity: 1});
// This is being used in the view, it interpolates rotation and
// scale into a css transform
// const trans = (r: number, s: number) =>
//   `perspective(2500px) rotateX(30deg) rotateY(${r / 10}deg) ` +
//   `rotateZ(${r}deg) scale(${s})`;
// const trans = (r: number, s: number) =>
//   `perspective(0px) rotateX(30deg) rotateY(${r / 10}deg) ` +
//   `rotateZ(${r}deg) scale(${s})`;

const trans = (r: number, s: number, p: number | string) => {
  if (!p) {
    return `perspective(2500px) rotateX(30deg) rotateY(${r / 10}deg) ` +
  `rotateZ(${r}deg) scale(${s})`;
  }
  if (p === 'none') {
    return `perspective(2500px) rotateX(30deg) rotateY(${r / 10}deg) ` +
  `rotateZ(${r}deg) scale(${s})`;
  }
  return `perspective(${p ? p + 'px' : 'none'}) rotateX(30deg) rotateY(${r / 10}deg) ` +
  `rotateZ(${r}deg) scale(${s})`;
};
const DisplayCard = ({
  card,
  cardTree,
  i,
  isDown,
  numCards,
  position,
  resultsMode,
  topCardIndex,
  resultCardRef,
  gone,
}:{
  card: Card,
  cardTree: CardTree,
  i: number,
  isDown: number,
  numCards: number,
  position?: {x: number, y: number},
  resultsMode: boolean,
  topCardIndex: number,
  resultCardRef: React.RefObject<HTMLDivElement>,
  gone: AnswerKeyType,
}) => {
  if (!card) {
    return null;
  }
  const key = card.key;

  if (cardTree.cards[key].type === 'results') {
    const outcome = cardTree.cards[key].result || 'INFJ';
    return <ResultsCard outcome={outcome} resultCardRef={resultCardRef} />;
  } else {
    return <CardContents
      card={card}
      index={i}
      isDown={isDown === i}
      isTop={topCardIndex === i}
      numCards={numCards}
      position={position}
      resultsMode={resultsMode}
      swiped={Object.keys(gone).includes(key)}
    />;
  }
};

function Deck({
  cardTree,
  stack,
  reStack,
  resultsMode,
  topCardIndex,
  gone,
  clearGone,
  updateGone,
  prevCards,
  setPrevCards,
  resetPositions,
  updateCardPosition,
  updateCardVisibility,
}:{
  // treeKey: string,
  cardTree: CardTree,
  stack: Card[],
  reStack: boolean,
  resultsMode: boolean,
  topCardIndex: number,
  gone: AnswerKeyType,
  clearGone: () => void,
  updateGone: (key: string, direction: Direction, method: number) => void,
  prevCards: Set<string>,
  setPrevCards: React.Dispatch<React.SetStateAction<Set<string>>>;
  resetPositions: () => void,
  updateCardPosition: (index: number, x: number, y: number) => void
  updateCardVisibility: (key: string, visible: boolean) => void
}) {
  const numCards = stack.length;
  const stackRef = useRef<Card[]>(stack);
  const topCardIndexRef = useRef<number>(topCardIndex);
  const resultsModeRef = useRef<boolean>(resultsMode);
  const goneRef = useRef<AnswerKeyType>(gone);
  const updateGoneRef = useRef<(
      key: string,
      direction: Direction,
      method: number
  ) => void>(updateGone);
  const resultCardRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(-1);
  const [props, api] = useSprings(numCards, () => ({}));
  const stackCards = () => {
    setTimeout(() => {
      clearGone();
      api.start((i: number) => {
        updateCardVisibility(stack[i].key, true);
        return {
          from: {opacity: 1},
          ...stacked(i),
          opacity: 1,
          config: {friction: 50, tension: 150},
        };
      });
    }, 1000);
    resetPositions();
  };

  const triggerSwipe = (index: number, direction: Direction) => {
    // Update the animation/spring to move the card off-screen
    const currentCards = stackRef.current;
    api.start((i: number) => {
      if (topCardIndexRef.current !== i) return;
      // if (topCardIndex !== i) return;
      const keys = Object.keys(currentCards[index].options);
      const [x, y] = keyPressCardPosition(keys, direction);

      if (!keys.includes(direction)) {
        return {
          x,
          y,
          rot: Math.random() * 5,
          delay: undefined,
          config: {friction: 10, tension: 1500},
        };
      }
      const key = currentCards[index].key;

      const horizontal = Math.abs(x) > Math.abs(y);
      const currentUpdateGone = updateGoneRef.current;
      const currentGone = goneRef.current;

      // Non stateful preUpdate before state update
      currentGone[key] = direction;
      currentUpdateGone(key, direction, 1);

      // if (!resultsMode) {
      if (horizontal) {
        // updateCardPosition(index, x, 0);
      } else {
        // updateCardPosition(index, 0, y);
      }
      // }

      return {
        x,
        y,
        rot: Math.random() * 100,
        delay: undefined,
        config: {friction: 50, tension: 100},
      };
    });
  };

  // Add event listeners for clicking arrowkeys, and also for page exit/refresh
  useEffect(() => {
    // keyPress handler for four arrow keys
    const handleKeyPress = (event: KeyboardEvent) => {
      const keyPressed: string = event.key;
      if (!Object.keys(keyPressDirection).includes(keyPressed)) {
        return;
      }
      const direction: Direction = keyPressDirection[keyPressed];
      triggerSwipe(topCardIndexRef.current, direction);
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // Update refs that need to be accessed by document eventListeners
  useEffect(() => {
    stackRef.current = stack;
    topCardIndexRef.current = topCardIndex;
    resultsModeRef.current = resultsMode;
    goneRef.current = gone;
    updateGoneRef.current = updateGone;
  }, [stack, topCardIndex, resultsMode, gone, updateGone]);

  useEffect(() => {
    // Re stacks cards when the state above decides it is complete
    if (reStack) {
      stackCards();
    }
  }, [reStack]);


  useEffect(() => {
    // For updating card animation on initialization and card number changes
    api.start((i: number) => {
      const card = stack[i];
      const key = card.key;
      const isPrevCard = prevCards.has(card.key);
      if (!isPrevCard) {
        // If the card is new, animate it and add its key to prevCards
        setPrevCards((prevCards: Set<string>) => {
          return new Set(prevCards).add(card.key);
        });
        updateCardVisibility(stack[i].key, true);
        const to = {...stacked(i)};
        if (gone[key]) {
          const answer = gone[key];
          return {
            // Keep in same place, bugs out if from: is not specified
            from: {...getXYFromDirection(answer)},
            ...getXYFromDirection(answer),
            opacity: 0,
          };
        }
        return {
          // Fall into the deck from the sky
          from: from(i),
          ...to,
          config: {friction: 30, tension: 200},
        };
      } else if (Object.keys(gone).includes(card.key)) {
        // An existing card that had already been swiped awway
        return {
          // Keep in same place, bugs out if from: is not specified
          from: {...getXYFromDirection(gone[card.key])},
          ...getXYFromDirection(gone[card.key]),
          opacity: 0,
        };
      } else {
        // An existing card in the deck
        return {
          ...stacked(i),
        };
      }
    });
  }, [stack.length]);

  const bind = useDrag(({
    args: [index], down: pressed, movement: [mx, my], direction: [xDir, yDir], velocity, event,
  }) => {
    // If the card being clicked is not the top card, ignore
    if (index != topCardIndex) {
      return;
    }

    // const tappity = false;

    const availableDirections = stack[index].options;
    const notAvailableDirections = directions.filter((dir) => {
      return availableDirections[dir] === undefined;
    });
    notAvailableDirections.forEach((dir) => {
      // If the direction is not available, prevent going in that direction
      if (dir === 'up' && my < 0) {
        my = 0;
      }
      if (dir === 'down' && my > 0) {
        my = 0;
      }
      if (dir === 'left' && mx < 0) {
        mx = 0;
      }
      if (dir === 'right' && mx > 0) {
        mx = 0;
      }
    });

    const horizontal = Math.abs(mx) > Math.abs(my);

    if (horizontal) {
      updateCardPosition(index, mx, 0);
    } else {
      updateCardPosition(index, 0, my);
    }

    xDir = xDir < 0 ? -1 : 1; // Direction should either be left or right
    yDir = yDir < 0 ? -1 : 1; // Up or Down

    const target = event.currentTarget as HTMLElement;
    // Dropping on the side you want to select also triggers the card to fly out
    // and have a velocity threshold for accidental micromovements on release
    let dropped = false;
    // Flicking triggers the card to fly out ONLY if you finish on the same side
    // you swiped towards
    let swiped = false;
    if (horizontal) {
      swiped = velocity >= 0.2 && Math.sign(mx) == Math.sign(xDir);
      dropped = velocity < 0.2 && Math.abs(mx) > SWIPE_THRESHOLD;
    } else {
      swiped = velocity >= 0.2 && Math.sign(my) == Math.sign(yDir);
      dropped = velocity < 0.2 && Math.abs(my) > SWIPE_THRESHOLD;
    }
    if (pressed) {
      // console.log('pressed');
      setIsDown(index);
      // When the drag starts, record the start time
      if (event) {
        target.dataset.dragStartTime = Date.now().toString();
      }
    } else {
      setIsDown(-1);
      // When the drag ends, calculate the duration
      // const dragStartTime = target.dataset.dragStartTime ?
      //   Number(target.dataset.dragStartTime) : Date.now();
      // const duration = Date.now() - dragStartTime;

      if (dropped || swiped) {
        const direction = getDirection(mx, my);
        gone[stack[topCardIndex].key] = direction;
        updateGone(stack[topCardIndex].key, direction, 0);
      // } else if (stack[index].type === 'results' && duration < TAP_THRESHOLD) {
      //   tappity = true;
        // handleCardtap(stack[index].key, stack[index].type);
        // api.start((i: number) => {
        //   if (index !== i) return;
        //   console.log('running api on tap: ', stack[i].key);
        //   return {
        //     x: 1000,
        //     y: 0,
        //     rot: 0,
        //     scale: 1,
        //     delay: undefined,
        //     config: {friction: 50, tension: 500},
        //   };
        //   return {
        //     ...from(i),
        //     x: 1000,
        //   };
        // });
      // } else if (!resultsMode) {
      } else {
        // setMxPositions state back to 0 so opacity returns to 0
        updateCardPosition(index, 0, 0);
      }
    }
    api.start((i: number) => {
      // We're only interested in changing spring-data for the current spring
      if (index !== i) return;
      const isGone = Object.keys(gone).includes(stack[index].key);
      // When a card is gone it flys out left or right, otherwise goes back to 0
      // Go offscreen on same side card is on, not swipe direction
      const xDirection = Math.sign(mx);
      const yDirection = Math.sign(my);
      const x = isGone ? ((200 + window.innerWidth) * xDirection) : (pressed ? mx : 0);
      const y = isGone ? ((200 + window.innerHeight) * yDirection) : (pressed ? my : 0);
      // How much the card tilts, flicking it harder makes it rotate faster
      const rot = Math.max(mx, my) / 100 + (isGone ? xDir * 10 * velocity : 0);
      // const scale = pressed ? 1.1 : 1; // Active cards lift up a bit
      // eslint-disable-next-line prefer-const
      let scale = pressed ? 1.1 : 1; // Active cards lift up a bit

      // console.log('wuh:', stack[i].type);
      // if (stack[i].type === 'results') {
      //   console.log('multiplying scale for results:', scale);
      //   scale = pressed ? 1.5 : 1;
      //   console.log('after:', scale);
      // }
      // const perspective = pressed ? 'none' : 2500; // Active cards lift up a bit
      // console.log('pressed:', pressed, stack[i].key, 'scale:', scale);
      // if results card:
      // if (tappity) {
      //   console.log('tappity');
      //   return {
      //     from: {height: '100%', width: '400px', maxHeight: '600px'},
      //     x: 0,
      //     y: 0,
      //     rot: 0,
      //     // scale: 1.5,
      //     scale: 1,
      //     delay: 0,
      //     // height: '100%',
      //     // width: '800px',
      //     // maxHeight: '100%',
      //     // maxWidth: 'revert',
      //     // position: 'absolute',
      //     config: {friction: 50, tension: 500},
      //   };

      return {
        x: horizontal ? x : 0,
        y: horizontal ? 0 : y,
        rot,
        scale,
        // perspective: 'none',
        delay: undefined,
        config: {friction: 50, tension: pressed ? (800) : (isGone ? 200 : 500)},
      };
    });
  });

  return (
    <>
      {props.map(({
        x,
        y,
        rot,
        scale,
        opacity,
        // perspective,
        // position: temp,
        // width,
        // height,
        // maxHeight,
        // ...styles
      }, i) => {
        const {
          position,
          key,
        } = stack[i];

        const card = cardTree.cards[key];
        const visible = card ? card.visible : true;

        // console.log('currentScale:', scale.get());

        // console.log('styles:', styles);

        // const perspective = i === isDown? undefined : 2500;


        // console.log('cardTree:', cardTree);
        // console.log('key:', key);
        // console.log('stack[i]:', stack[i]);
        // console.log('cardTree.cards[key]:', cardTree.cards[key]);

        return (
          <animated.div className={styles.deck} key={key} style={{x, y, zIndex: i}}>
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                // transform: interpolate([rot, scale, isDown? undefined : 1000], trans),
                opacity: visible ? opacity : 0,
                // position: 'absolute',
                // height: height,
                // width: width,
                // maxHeight: maxHeight,
                // position: temp,
                // border: cardTree.cards[cards[i].key].visible ? '5px solid blue' : '5px solid red',
              }}
              className={styles.card}
            >
              {/* <div style={{background: 'black', zIndex: 1000}}>
                {key}: down {isDown.toString()}, perspective: {perspective}
              </div> */}
              {/* <div style={{background: 'black', zIndex: 1000, position: 'absolute', top: -50}}>
                trans: {JSON.stringify(interpolate([rot, scale], trans))}
              </div> */}
              <DisplayCard
                card={card}
                cardTree={cardTree}
                i={i}
                isDown={isDown}
                numCards={numCards}
                position={position}
                resultsMode={resultsMode}
                topCardIndex={topCardIndex}
                resultCardRef={resultCardRef}
                gone={gone}
              />
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
}

export default Deck;
