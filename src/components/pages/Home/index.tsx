/* eslint-disable max-len */
import React from 'react';
// import {useSprings, animated, to as interpolate} from '@react-spring/web';
// import {useDrag} from 'react-use-gesture';
import Deck from 'components/global/Deck';
import styles from './styles.module.scss';

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
    question: 'How would you like your body processed?',
    options: {
      up: 'Sky burial',
      right: 'Launched from a trebuchet into the village on your right',
      left: 'Fed to the pigs in the stable',
      down: 'Buried',
    },
    scores: {
      up: {},
      right: {},
      left: {},
      down: {},
    },
  },
  {
    title: 'The Second',
    description: 'You lack agility. The creature departs after he is done. Your clothes are now torn and you are soaked head to toe in saliva. The temperature is dropping rapidly and you are feeling a chill start to set in. You notice a stable full of pigs a short walk to your left. To your right, far into the distance, you see what might be village lights',
    question: 'Which direction do you go in?',
    options: {
      // up: 'Go up',
      right: 'Go to the pigs and sleep with them in the mud, leeching their body warmth for the night',
      left: 'Sleeping with pigs is undignified. You don\'t know how far the village is, but the trek there can\'t be that far away if you can see lights',
      // down: 'Go down. You see an endless abyss, I just need enough text to break onto the next line so lets see it',
    },
    scores: {
      up: {},
      right: {},
      left: {},
      down: {},
    },
  },
  {
    title: 'The Beginning',
    description: 'You wake up in an unfamiliar place. Ahead of you is a lickitung adjacent monster with a huge mouth that is threatening to lick everything in his sight. What do you do?',
    question: 'What do you do?',
    options: {
      up: 'Walk towards him face first',
      right: 'Try go around him on the right',
      left: 'Try go around him on the left',
      down: 'Walk towards him ass first',
    },
    scores: {
      up: {},
      right: {},
      left: {},
      down: {},
    },
  },
];

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <Deck cards={cards} />
    </div>
  );
};

export default Home;
