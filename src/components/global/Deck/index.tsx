/* eslint-disable max-len */
import React, {useEffect, useRef, useState} from 'react';
import {useSprings, animated, to as interpolate} from '@react-spring/web';
import {useDrag} from 'react-use-gesture';
import CardContents from 'components/global/CardContents';
import {AnswerKeyType, CardType, Direction, CardIndex} from 'types/deck';
import {
  getDirection,
  getXYFromDirection,
  keyPressDirection,
  keyPressCardPosition,
} from 'components/shared/helpers';
import plausible from 'components/global/plausible';
import {isTouchDevice} from 'components/shared/helpers';
import styles from './styles.module.scss';

// const TAP_THRESHOLD = 150;
const SWIPE_THRESHOLD = 150; // Set a threshold for swipe movement

// const handleCardtap = (index: number) => {
//   console.log(`Tapped ${cards[index].title}`);
// };

const trackSwipe = ({treeKey, cardKey, direction, answer, method}:{
    treeKey: string,
    cardKey: string,
    direction: Direction,
    answer: string,
    method?: 'touch' | 'mouse' | 'keyPress',
  },
) => {
  // Track a custom event
  plausible.trackEvent('ArrowkeyPress', {
    props: {
      treeKey,
      cardKey,
      direction,
      answer,
      method: method ? method : (isTouchDevice() ? 'touch' : 'mouse'),
    },
  });
};

// These two are helpers, they curate spring data, values that are
// later being interpolated into css
const stacked = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
  opacity: 1,
});
const from = (_i: number) => ({x: 0, rot: 0, scale: 1.5, y: -1000, opacity: 0.5});
// This is being used in the view, it interpolates rotation and
// scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(2500px) rotateX(30deg) rotateY(${r / 10}deg) ` +
  `rotateZ(${r}deg) scale(${s})`;

// Deck manages the state of all the cards and running the animations
function Deck({
  treeKey,
  cards,
  completed,
  topCardIndex,
  gone,
  cardIndex,
  clearGone,
  setGone,
  prevCards,
  setPrevCards,
  resetPositions,
  setCardPosition,
  updateCardVisibility,
}:{
  treeKey: string,
  cards: CardType[],
  completed: boolean,
  topCardIndex: number,
  gone: AnswerKeyType,
  cardIndex: CardIndex,
  clearGone: () => void,
  setGone: (key: string, direction: Direction) => void,
  prevCards: Set<string>,
  setPrevCards: React.Dispatch<React.SetStateAction<Set<string>>>;
  resetPositions: () => void,
  setCardPosition: (index: number, x: number, y: number) => void
  updateCardVisibility: (index: number, visible: boolean) => void
}) {
  const numCards = cards.length;
  const cardsRef = useRef<CardType[]>(cards);
  const [delayId, setDelayId] = useState<number[]>([]);
  const [isDown, setIsDown] = useState(-1);
  const [props, api] = useSprings(numCards, () => ({}));
  const stackCards = () => {
    setTimeout(() => {
      clearGone();
      api.start((i: number) => {
        updateCardVisibility(i, true);
        return {
          from: {opacity: 1},
          ...stacked(i),
          opacity: 1,
          config: {friction: 50, tension: 150},
        };
      });
    }, 600);
    resetPositions();
  };

  const triggerSwipe = (index: number, direction: Direction) => {
    // Update the animation/spring to move the card off-screen
    const currentCards = cardsRef.current;
    api.start((i: number) => {
      if (topCardIndex !== i) return;
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
      console.log(`Chose ${direction} for card ${currentCards[index].key} for tree ${treeKey} via keyPress`);
      trackSwipe({
        treeKey,
        cardKey: currentCards[index].key,
        direction,
        answer: currentCards[index].options[direction] as string,
        method: 'keyPress',
      });

      const horizontal = Math.abs(x) > Math.abs(y);
      setGone(currentCards[topCardIndex].key, direction);

      if (horizontal) {
        setCardPosition(index, x, 0);
      } else {
        setCardPosition(index, 0, y);
      }

      return {
        x,
        y,
        rot: Math.random() * 100,
        delay: undefined,
        config: {friction: 50, tension: 100},
      };
    });
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const key = event.key;
    const direction = keyPressDirection[key as keyof typeof keyPressDirection];
    if (!Object.keys(keyPressDirection).includes(key)) {
      return;
    }
    triggerSwipe(topCardIndex, direction);
  };

  useEffect(() => {
    // Update cardsRef with the current cards or triggerSwipe can't access
    // current card value
    cardsRef.current = cards;
  }, [cards]);

  useEffect(() => {
    if (Object.keys(gone).length === 0) {
      // If all cards are in deck, clear out any pending transparency
      delayId.forEach((id) => window.clearTimeout(id));
      cards.forEach((_card, index) => {
        updateCardVisibility(index, true);
      });
    } else {
      // When a card has been swiped away and its key is not in hidden
      Object.keys(gone).forEach((key) => {
        // Get the index of the card to update visibility
        const indexObj = cardIndex[key];
        if (!indexObj) return;
        const i = indexObj.index;
        if (!cards[i].visible) return;
        const id = window.setTimeout(() => {
          updateCardVisibility(cardIndex[key].index, false);
        }, 750);
        setDelayId((prevDelayId) => [...prevDelayId, id]);
      });
    }
  // }, [gone]);
  }, [cardIndex]);

  useEffect(() => {
    // Re stacks cards when the state above decides it is complete
    if (completed) {
      stackCards();
    }
  }, [completed]);


  useEffect(() => {
    // For updating card animation on initialization and card number changes
    api.start((i: number) => {
      const card = cards[i];
      const isPrevCard = prevCards.has(card.key);
      if (!isPrevCard) {
        // If the card is new, animate it and add its key to prevCards
        setPrevCards((prevCards: Set<string>) => {
          return new Set(prevCards).add(card.key);
        });
        return {
          // Fall into the deck from the sky
          from: from(i),
          ...stacked(i),
          config: {friction: 30, tension: 200},
        };
      } else if (Object.keys(gone).includes(card.key)) {
        // An existing card that had already been swiped awway
        return {
          // Keep in same place, bugs out if from: is not specified
          from: {...getXYFromDirection(gone[card.key].answer)},
          ...getXYFromDirection(gone[card.key].answer),
          opacity: 0,
        };
      } else {
        // An existing card in the deck
        return {
          ...stacked(i),
        };
      }
    });
  }, [cards.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [topCardIndex, gone]);

  const bind = useDrag(({
    args: [index], down, movement: [mx, my], direction: [xDir, yDir], velocity, event,
  }) => {
    if (Object.keys(cards[index].options).length == 2) {
      my = 0;
    }
    // If the card being clicked is not the top card, ignore
    if (index != topCardIndex) {
      return;
    }
    const horizontal = Math.abs(mx) > Math.abs(my);

    if (horizontal) {
      setCardPosition(index, mx, 0);
    } else {
      setCardPosition(index, 0, my);
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
    if (down) {
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
        // console.log('dropped:', dropped, 'swiped:', swiped);
        // gone.add(index);
        // console.log('swiped:', topCardIndex);
        // console.log('key:', cards[topCardIndex].key);
        const direction = getDirection(mx, my);
        gone[cards[topCardIndex].key] = {answer: direction};
        // setGone(topCardIndex);
        setGone(cards[topCardIndex].key, direction);

        console.log(`Chose ${direction} for card ${cards[index].key} for tree ${treeKey} via Swipe`);
        trackSwipe({
          treeKey,
          cardKey: cards[index].key,
          direction,
          answer: cards[index].options[direction] as string,
        });
      // } else if (duration < TAP_THRESHOLD) {
      //   handleCardtap(index);
      } else {
        // setMxPositions state back to 0 so opacity returns to 0
        setCardPosition(index, 0, 0);
      }
    }
    api.start((i: number) => {
      // We're only interested in changing spring-data for the current spring
      if (index !== i) return;
      const isGone = Object.keys(gone).includes(cards[index].key);
      // When a card is gone it flys out left or right, otherwise goes back to 0
      // Go offscreen on same side card is on, not swipe direction
      const xDirection = Math.sign(mx);
      const yDirection = Math.sign(my);
      const x = isGone ? (200 + window.innerWidth) * xDirection : down ? mx : 0;
      const y = isGone ? (200 + window.innerHeight) * yDirection : down ? my : 0;
      // How much the card tilts, flicking it harder makes it rotate faster
      const rot = Math.max(mx, my) / 100 + (isGone ? xDir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1; // Active cards lift up a bit
      return {
        x: horizontal ? x : 0,
        y: horizontal ? 0 : y,
        rot,
        scale,
        delay: undefined,
        config: {friction: 50, tension: down ? (800) : (isGone ? 200 : 500)},
      };
    });
  });

  return (
    <>
      {/* <div className={styles.temp}>{topCardIndex}</div> */}
      {props.map(({x, y, rot, scale, opacity}, i) => {
        const {
          position,
          key,
        } = cards[i];
        return (
          <animated.div className={styles.deck} key={key} style={{x, y}}>
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                opacity: cards[i].visible ? opacity : 0,
                // border: cards[i].visible ? '5px solid lightblue' : '5px solid red',
              }}
              className={styles.card}
            >
              <CardContents
                card={cards[i]}
                index={i}
                isDown={isDown === i}
                isTop={topCardIndex === i}
                numCards={numCards}
                position={position}
                swiped={Object.keys(gone).includes(cards[i].key)}
              />
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
}

export default Deck;
