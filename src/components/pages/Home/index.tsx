/* eslint-disable max-len */
import React, {useState} from 'react';
import {useSprings, animated, to as interpolate} from '@react-spring/web';
import {useDrag} from 'react-use-gesture';
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


const cards: CardType[] = [
  {
    title: 'The Third',
    description: 'You made your decision, but before you\'re able to act, suddenly the giant lickitung monster jumps out again and licks your butt furiously, sending you into anaphylactic shock and you die',
    question: 'Would you like to be...',
    options: {
      up: 'Sky burial',
      right: 'Launched from a trebuchet into the village on your left',
      down: 'Buried',
      left: 'Fed to the pigs',
    },
    scores: {
      up: {},
      right: {},
      down: {},
      left: {},
    },
  },
  {
    title: 'The Second',
    description: 'You lack agility. The creature departs after he is done. Your clothes are now torn and you are soaked head to toe in saliva. The temperature is dropping rapidly and you are feeling a chill start to set in. You notice a stable full of pigs a short walk to your left. To your right, far into the distance, you see what might be village lights',
    question: 'Which direction do you go in?',
    options: {
      // up: 'Go up',
      right: 'Go to the pigs and sleep with them in the mud, leeching their body warmth for the night',
      // down: 'Go down. You see an endless abyss, I just need enough text to break onto the next line so lets see it',
      left: 'Sleeping with pigs is undignified. You don\'t know how far the village is, but the trek there can\'t be that far away if you can see lights',
    },
    scores: {
      up: {},
      right: {},
      down: {},
      left: {},
    },
  },
  {
    title: 'The Beginning',
    description: 'You wake up in an unfamiliar place. Ahead of you is a lickitung adjacent monster with a huge mouth that is threatening to lick everything in his sight. What do you do?',
    question: 'What do you do?',
    options: {
      up: 'Walk towards him face first',
      right: 'Try go around him on the right',
      down: 'Walk towards him ass first',
      left: 'Try go around him on the left',
    },
    scores: {
      up: {},
      right: {},
      down: {},
      left: {},
    },
  },
];

const numCards = cards.length;

const CardContents = (
    {index, mx}:
    {index: number, mx: number},
) => {
  const {
    title,
    description,
    question,
    options,
  } = cards[index];

  // Color opacity for option being selected by swipe
  const opacity = Math.min(1, Math.abs(mx/SWIPE_THRESHOLD));
  let currDir = '';
  if (mx < 0) {
    currDir = 'left';
  } else {
    currDir = 'right';
  }

  const selectedStyle: React.CSSProperties = {backgroundColor: `rgba(91, 96, 98, ${opacity})`};

  const Option = ({dir} : {dir: keyof OptionType}) => {
    const option = options[dir];
    const backgroundStyle = currDir === dir ? selectedStyle : {};

    if (!option) {
      return null;
    }

    return (
      <div className={styles.option} key={dir} style={backgroundStyle}>
        <span className={styles[dir]}>
          &#10148;
        </span>
        <div className={styles.optionText}>
          {option}
        </div>
      </div>
    );
  };

  const descriptionStyle = {'--n': description.length} as React.CSSProperties;

  return (
    <div className={styles.contentsContainer}>
      <p className={styles.title}>{title}</p>
      <div className={styles.descriptionContainer}>
        <p className={styles.description} style={descriptionStyle}>
          <span className={styles.type} style={descriptionStyle}>
            {description}
          </span>
        </p>
      </div>
      <p className={styles.question}>{question}</p>
      <div className={styles.optionsContainer}>
        {
          Object.keys(options).map((key: string) => {
            return (
              <Option
                dir={key as keyof OptionType}
                key={key}
              />
            );
          })
        }
      </div>
      <div className={styles.index}>{numCards - index}/{numCards}</div>
      {/* <div className={styles.index}>{mx}</div> */}
      {/* <div className={styles.index}>{opacity}</div> */}
    </div>
  );
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

function Deck() {
  const [mxPositions, setMxPositions] =
    useState(new Array(cards.length).fill(0));
  // The set flags all the cards that are flicked out
  const [gone] = useState(() => new Set());
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state,
  // delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({
    args: [index], down, movement: [mx], direction: [xDir], velocity, event,
  }) => {
    // console.log('velocity:', velocity);
    // console.log('mx:', mx);
    setMxPositions((prevMxPositions) => {
      const newMxPositions = [...prevMxPositions];
      newMxPositions[index] = mx;
      return newMxPositions;
    });

    const dir = xDir < 0 ? -1 : 1; // Direction should either be left or right
    const target = event.currentTarget as HTMLElement;
    // Dropping on the side you want to select also triggers the card to fly out
    // and have a velocity threshold for accidental micromovements on release
    const dropped = Math.abs(mx) > SWIPE_THRESHOLD && velocity < 0.2;
    // Flicking triggers the card to fly out ONLY if you finish on the same side
    // you swiped towards
    const swiped = velocity >= 0.2 && Math.sign(mx) == Math.sign(dir);
    if (down) {
      // When the drag starts, record the start time
      if (event) {
        target.dataset.dragStartTime = Date.now().toString();
      }
    } else {
      // When the drag ends, calculate the duration
      // const dragStartTime = target.dataset.dragStartTime ?
      //   Number(target.dataset.dragStartTime) : Date.now();
      // const duration = Date.now() - dragStartTime;

      if (dropped || swiped) {
        gone.add(index);
      // } else if (duration < TAP_THRESHOLD) {
      //   handleCardtap(index);
      } else {
        // setMxPositions state back to 0 so opacity returns to 0
        setMxPositions((prevMxPositions) => {
          const newMxPositions = [...prevMxPositions];
          newMxPositions[index] = 0;
          return newMxPositions;
        });
      }
    }
    api.start((i) => {
      // We're only interested in changing spring-data for the current spring
      if (index !== i) return;
      const isGone = gone.has(index);
      // When a card is gone it flys out left or right, otherwise goes back to 0
      // Go offscreen on same side card is on, not swipe direction
      const direction = Math.sign(mx);
      const x = isGone ? (200 + window.innerWidth) * direction : down ? mx : 0;
      // How much the card tilts, flicking it harder makes it rotate faster
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1; // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: {friction: 50, tension: down ? 800 : isGone ? 200 : 500},
      };
    });
    if (!down && gone.size === cards.length) {
      setTimeout(() => {
        gone.clear();
        api.start((i) => to(i));
      }, 600);
      setMxPositions(new Array(cards.length).fill(0));
    }
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
              <CardContents index={i} mx={mxPositions[i]}/>
            </animated.div>
          </animated.div>
        );
      })}
    </>
  );
}


const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <Deck />
    </div>
  );
};

export default Home;
