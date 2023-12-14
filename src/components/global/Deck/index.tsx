/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {useSprings, animated, to as interpolate} from '@react-spring/web';
import {useDrag} from 'react-use-gesture';
import CardContents from 'components/global/CardContents';
import styles from './styles.module.scss';

// const TAP_THRESHOLD = 150;
const SWIPE_THRESHOLD = 150; // Set a threshold for swipe movement

type OptionType = {
  // [key: string]: string;
  up?: string;
  right: string;
  down?: string;
  left: string;
};

type CardType = {
  title: string;
  description: string;
  question: string;
  options: OptionType;
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scores: { [key: string]: any };
};

// const handleCardtap = (index: number) => {
//   console.log(`Tapped ${cards[index].title}`);
// };

// These two are just helpers, they curate spring data, values that are
// later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i: number) => ({x: 0, rot: 0, scale: 1.5, y: -1000});
// This is being used down there in the view, it interpolates rotation and
// scale into a css transform
const trans = (r: number, s: number) =>
  // `perspective(none) rotateX(30deg) rotateY(${r / 10}deg) ` +
  `perspective(2500px) rotateX(30deg) rotateY(${r / 10}deg) ` +
  `rotateZ(${r}deg) scale(${s})`;

function Deck({cards}:{cards: CardType[]}) {
  const numCards = cards.length;
  const [positions, setPositions] =
    useState(new Array(cards.length).fill([0, 0]));
  // The set flags all the cards that are flicked out
  const [gone, setGone] = useState(() => new Set<number>());
  const [isDown, setIsDown] = useState(-1);
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  }));
  const topCardIndex = Math.min.apply(null, [numCards - gone.size, ...gone]) - 1;

  const triggerSwipe = (index: number, direction: string) => {
    // Update the animation/spring to move the card off-screen
    api.start((i) => {
      if (topCardIndex !== i) return;

      let x = 0;
      let y = 0;

      // const numOptions = Object.keys(cards[index].options).length;
      const keys = Object.keys(cards[index].options);

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

      setGone((prevGone) => new Set(prevGone.add(topCardIndex)));

      if (horizontal) {
        setPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions[index] = [x, 0];
          return newPositions;
        });
      } else {
        setPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions[index] = [0, y];
          return newPositions;
        });
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
    switch (event.key) {
      case 'ArrowUp':
        triggerSwipe(topCardIndex, 'up');
        break;
      case 'ArrowRight':
        triggerSwipe(topCardIndex, 'right');
        break;
      case 'ArrowLeft':
        triggerSwipe(topCardIndex, 'left');
        break;
      case 'ArrowDown':
        triggerSwipe(topCardIndex, 'down');
        break;
      default:
        break;
    }
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
        setGone(new Set());
        api.start((i) => to(i));
      }, 600);
      setPositions(new Array(cards.length).fill([0, 0]));
    }
  }, [gone]);
  // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state,
  // delta (current-pos - click-pos), direction and velocity
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
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[index] = [mx, 0];
        return newPositions;
      });
    } else {
      setPositions((prevPositions) => {
        const newPositions = [...prevPositions];
        newPositions[index] = [0, my];
        return newPositions;
      });
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
    // const swiped = velocity >= 0.2 && (Math.sign(mx) == Math.sign(xDir) || Math.sign(my) == Math.sign(yDir));
    // const isSwipe = velocity > 0.2 || Math.abs(mx) > SWIPE_THRESHOLD || Math.abs(my) > SWIPE_THRESHOLD;
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
        setGone((prevGone) => new Set(prevGone.add(topCardIndex)));
      // } else if (duration < TAP_THRESHOLD) {
      //   handleCardtap(index);
      } else {
        // setMxPositions state back to 0 so opacity returns to 0
        setPositions((prevPositions) => {
          const newPositions = [...prevPositions];
          newPositions[index] = [0, 0];
          return newPositions;
        });
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
    // if (!down && gone.size === cards.length) {
    //   setTimeout(() => {
    //     gone.clear();
    //     api.start((i) => to(i));
    //   }, 600);
    //   setPositions(new Array(cards.length).fill([0, 0]));
    // }
  });
  // Now we're just mapping the animated values to our view,
  // that's it. Btw, this component only renders once. :-)
  return (
    <>
      {props.map(({x, y, rot, scale}, i) => {
        const {
          title,
        } = cards[i];
        return (
          <animated.div className={styles.deck} key={title} style={{x, y}}>
            {/* This is the card itself, we're binding our gesture to it
            (and inject its index so we know which is which) */}
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
                mx={positions[i][0]}
                my={positions[i][1]}
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
