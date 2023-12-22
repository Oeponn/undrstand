/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {useSprings, animated, to as interpolate} from '@react-spring/web';
import {useDrag} from 'react-use-gesture';
import CardContents from 'components/global/CardContents';
import {CardType} from 'types/deck';
import styles from './styles.module.scss';
// import plausibleTracker from 'plausible-tracker';

// const TAP_THRESHOLD = 150;
const SWIPE_THRESHOLD = 150; // Set a threshold for swipe movement

// const handleCardtap = (index: number) => {
//   console.log(`Tapped ${cards[index].title}`);
// };

const keyPressDirection = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowLeft: 'left',
  ArrowDown: 'down',
};

// Calculate card direciton based off key press
const keyPressCardPosition = (keys: string[], direction: string) => {
  let x = 0;
  let y = 0;

  // If the options include a corresponding answer to keypress, send the card
  // Otherwise, move it slightly
  switch (direction) {
    case 'up':
      if (keys.includes('up')) {
        y = -(200 + window.innerWidth);
      } else {
        y = -10 * Math.random();
      }
      break;
    case 'right':
      if (keys.includes('right')) {
        x = (200 + window.innerWidth);
      } else {
        x = 10 * Math.random();
      }
      break;
    case 'left':
      if (keys.includes('left')) {
        x = -(200 + window.innerWidth);
      } else {
        x = -10 * Math.random();
      }
      break;
    case 'down':
      if (keys.includes('down')) {
        y = (200 + window.innerHeight);
      } else {
        y = 10 * Math.random();
      }
      break;
  }

  return [x, y];
};

// These two are helpers, they curate spring data, values that are
// later being interpolated into css
const stacked = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i: number) => ({x: 0, rot: 0, scale: 1.5, y: -1000});
// This is being used in the view, it interpolates rotation and
// scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(2500px) rotateX(30deg) rotateY(${r / 10}deg) ` +
  `rotateZ(${r}deg) scale(${s})`;

// Deck manages the state of all the cards and running the animations
function Deck({
  cards,
  gone,
  resetPositions,
  setGone,
  topCardIndex,
  updateCardPosition,
}:{
  cards: CardType[],
  gone: Set<number>,
  resetPositions: () => void,
  setGone: (index: number) => void,
  topCardIndex: number,
  updateCardPosition: (index: number, x: number, y: number) => void
}) {
  const numCards = cards.length;
  const [isDown, setIsDown] = useState(-1);
  const [props, api] = useSprings(numCards, (i) => {
    console.log('useSprings!', i, cards[i].title);
    return {
      ...stacked(i),
      from: from(i),
    };
  });
  // const plausible = plausibleTracker({
  //   domain: 'undrstand.me',
  // });

  // console.log('plausible:', plausible);

  const triggerSwipe = (index: number, direction: string) => {
    // Update the animation/spring to move the card off-screen
    api.start((i) => {
      if (topCardIndex !== i) return;
      const keys = Object.keys(cards[index].options);
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


      const horizontal = Math.abs(x) > Math.abs(y);

      setGone(topCardIndex);

      if (horizontal) {
        updateCardPosition(index, x, 0);
      } else {
        updateCardPosition(index, 0, y);
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
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [topCardIndex, gone]);

  useEffect(() => {
    if (gone.size === cards.length) {
      setTimeout(() => {
        setGone(-1);
        api.start((i) => stacked(i));
      }, 600);
      resetPositions();
    }
  }, [gone]);

  const bind = useDrag(({
    args: [index], down, movement: [mx, my], direction: [xDir, yDir], velocity, event,
  }) => {
    if (Object.keys(cards[index].options).length == 2) {
      my = 0;
    }
    console.log('index, tci:', index, topCardIndex);
    // If the card being clicked is not the top card, ignore
    if (index != topCardIndex) {
      return;
    }
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
        gone.add(index);
        setGone(topCardIndex);
      // } else if (duration < TAP_THRESHOLD) {
      //   handleCardtap(index);
      } else {
        // setMxPositions state back to 0 so opacity returns to 0
        updateCardPosition(index, 0, 0);
      }
    }
    api.start((i) => {
      // We're only interested in changing spring-data for the current spring
      if (index !== i) return;
      const isGone = gone.has(index);
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
        config: {friction: 50, tension: down ? 800 : isGone ? 200 : 500},
      };
    });
  });

  return (
    <>
      <div className={styles.temp}>{topCardIndex}</div>
      {props.map(({x, y, rot, scale}, i) => {
        const {
          title,
          position,
        } = cards[i];
        return (
          <animated.div className={styles.deck} key={title} style={{x, y}}>
            <animated.div
              {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
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
                swiped={gone.has(i)}
              />
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
}

export default Deck;
