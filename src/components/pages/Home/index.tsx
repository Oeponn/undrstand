/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import Deck from 'components/global/Deck';
import {CardType, CardTree} from 'types/deck';
import styles from './styles.module.scss';


// const cards: CardType[] = [
//   {
//     title: 'The Third',
//     description: 'You made your decision, but before you\'re able to act, suddenly the giant lickitung monster jumps out again and licks your butt furiously, sending you into anaphylactic shock and you die',
//     question: 'How would you like your body processed?',
//     options: {
//       up: 'Sky burial',
//       right: 'Launched from a trebuchet into the village on your right',
//       left: 'Fed to the pigs in the stable',
//       down: 'Buried',
//     },
//     scores: {
//       up: {},
//       right: {},
//       left: {},
//       down: {},
//     },
//   },
//   {
//     title: 'The Second',
//     description: 'You lack agility. The creature departs after he is done. Your clothes are now torn and you are soaked head to toe in saliva. The temperature is dropping rapidly and you are feeling a chill start to set in. You notice a stable full of pigs a short walk to your left. To your right, far into the distance, you see what might be village lights',
//     question: 'Which direction do you go in?',
//     options: {
//       // up: '',
//       right: 'Go to the pigs and sleep with them in the mud, leeching their body warmth for the night',
//       left: 'Sleeping with pigs is undignified. You don\'t know how far the village is, but the trek there can\'t be that far away if you can see lights',
//       // down: '',
//     },
//     scores: {
//       up: {},
//       right: {},
//       left: {},
//       down: {},
//     },
//   },
//   {
//     title: 'The Beginning',
//     description: 'You wake up in an unfamiliar place. Ahead of you is a lickitung adjacent monster with a huge mouth that is threatening to lick everything in his sight.',
//     question: 'What do you do?',
//     options: {
//       up: 'Walk towards him face first',
//       right: 'Try go around him on the right',
//       left: 'Try go around him on the left',
//       down: 'Walk towards him ass first',
//     },
//     scores: {
//       up: {},
//       right: {},
//       left: {},
//       down: {},
//     },
//   },
// ];
const blankCard: CardType = {
  key: 'blank',
  title: 'Blank',
  description: 'Blank Card',
  question: 'Blank',
  position: {x: 0, y: 0},
  options: {
    up: 'Up',
    right: 'Right',
    left: 'Left',
    down: 'Down',
  },
  next: {
    up: '',
    right: '',
    left: '',
    down: '',
  },
  scores: {
    up: {},
    right: {},
    left: {},
    down: {},
  },
};

const tempCards: CardTree = {
  maxLength: 6,
  cards: {
    farewell: {
      key: 'farewell',
      title: 'Farewell',
      description: 'I won\'t take up too much more of your time, I hope you somewhat enjoyed this. Honestly, I\'m pretty excited to get this fully fleshed out. In the meantime though, I would love if you reached out for any job openings or interviews in America. I am in possession of an H1b visa, which will need to be transferred :3 thankyou',
      question: 'Will you reach out to me? (swiping to open links coming soon)',
      options: {
        up: 'LinkedIn: https://www.linkedin.com/in/tiger-shi/',
        right: 'Email: tigershi0110@gmail.com',
        left: 'Personal Website: https://tigershi.com/',
        down: 'GitHub for both my websites: https://github.com/Oeponn/',
      },
      next: {
        up: '',
        right: '',
        left: '',
        down: '',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    acceptance: {
      key: 'acceptance',
      title: 'Acceptance',
      description: 'I mean yeah, you\'re probably right. The typewriter effect is such a pain to control, I almost went and redesigned the whole thing myself. But If you\'ve even gotten here to read this, I think it isn\'t bad if thinking in terms of attention economy, which was my main focus when designing this',
      question: 'Which attention time to monetary value exchange rate is highest?',
      options: {
        up: 'Wordle: a few minutes per day. Sold for 1 million',
        right: 'Linktree: short but frequent uses due to utility. Valued at 1.3 billion',
        left: 'TikTok: the ultimate attention economy algorithm. Way too much',
        down: 'Making a personality test web app after being very vocal about disliking them for years: priceless',
      },
      next: {
        up: 'farewell',
        right: 'farewell',
        left: 'farewell',
        down: 'farewell',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    design: {
      key: 'design',
      title: 'The Design',
      description: 'Sometimes I get asked why I insist on making my portfolio so weird looking. Like yeah, I can make conventionally nice UI but in my own time I kind of like to make odd stuff I guess. I have no idea how many recruiters actually look at this because I haven\'t added click tracking yet...',
      question: 'Might as well have fun, eh?',
      options: {
        up: 'A more conventional page with dropdowns and such would probably be better...',
        right: 'Could do with a little bit of color at least...',
        left: 'Aren\'t you a full stack dev? Hurry up with the backend...',
        down: 'This seems like very high effort for not that much payoff...',
      },
      next: {
        up: 'acceptance',
        right: 'acceptance',
        left: 'acceptance',
        down: 'acceptance',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    tortoises: {
      key: 'tortoises',
      title: 'The Tortoise',
      description: 'Imagine. You\'re in a desert, walking along in the sand, when all of a sudden you look down and see a tortoise. The tortoise lays on its back, its belly baking in the hot sun, beating its legs trying to turn itself over, but it can\'t. Not without your help.',
      question: 'What do you do?',
      options: {
      // up: 'Sky burial',
        right: 'Flip the tortoise back onto its feet',
        left: 'Keep walking',
      // down: 'Buried',
      },
      next: {
        up: 'design',
        right: 'design',
        left: 'design',
        down: 'design',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    goal: {
      key: 'goal',
      title: 'The End Goal',
      description: 'This site is a WIP for a personality test / choose your own adventure experience. I am currently building the front and back ends to support custom builds from the user. It is just a project to keep myself entertained mostly',
      question: 'Thoughts?',
      options: {
        up: 'That\'s cool',
        right: 'Keep going',
        left: 'I am so impressed by this WIP please allow me to hire you immediately',
        down: 'I see',
      },
      next: {
        up: 'tortoises',
        right: 'tortoises',
        left: 'tortoises',
        down: 'tortoises',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    start: {
      key: 'start',
      title: 'The First Card',
      description: 'If you\'re looking at this page as a part of my portfolio, you\'re probably wondering what the hell this is. Try swiping or clicking your keyboard arrows',
      question: 'Click and drag this card',
      options: {
        up: 'Up',
        right: 'Right',
        left: 'Left',
        down: 'Down',
      },
      next: {
        up: 'goal',
        right: 'goal',
        left: 'goal',
        down: 'goal',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    }},
};

const Home = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [gone, setGone] = useState(() => new Set<number>());
  const [topCardIndex, setTopCardIndex] = useState<number>(-1);
  // const topCardIndex: number = Math.min.apply(null, [cards.length - gone.size, ...gone]) - 1;
  // const [answers, setAnswers] = useState<CardType[]>([]);

  // const updateCards = (index: number, card: CardType) => {
  //   setCards((prevState) => {
  //     const newState = [...prevState];
  //     newState[index] = card;
  //     return newState;
  //   });
  // };

  useEffect(() => {
    let newCards: CardType[] = [...cards];
    if (cards.length === 0) {
      newCards = Array.from({length: tempCards.maxLength}, (value, index) => {
        return {...blankCard, title: `Card ${index}`};
      });
      newCards[newCards.length - 1] = tempCards.cards.start;
      setCards(newCards);
    }
  }, []);

  useEffect(() => {
    // Calculate topCardIndex whenever cards or gone changes
    console.log('gone or cards changed:', [cards.length - gone.size, ...gone]);
    const newTopCardIndex = Math.min.apply(null, [cards.length - gone.size, ...gone]) - 1;
    // console.log(`cards.length: ${cards.length} - gone.size: ${gone.size}, topCardIndex: ${topCardIndex}, newTopCardIndex: ${newTopCardIndex}`);
    setTopCardIndex(newTopCardIndex);
  }, [cards.length, gone]);

  useEffect(() => {
    console.log('cards:', cards);
  }, [cards.length]);

  // useEffect(() => {
  //   console.log('current topcard:', topCardIndex);
  // }, [topCardIndex]);

  useEffect(() => {
    console.log('gone:', gone);
  }, [gone]);

  if (cards.length === 0) {
    return (
      <div className={styles.pageContainer}>
        <div>Loading...</div>
      </div>
    );
  }

  const updateCardPosition = (index: number, x: number, y: number) => {
    setCards((currentCards) => {
      // Clone the array to avoid directly mutating the state
      const newCards = [...currentCards];

      // Check if the card exists at the specified index
      if (newCards[index]) {
        // Update the position of the specified card
        newCards[index] = {
          ...newCards[index],
          position: {x, y},
        };
      }

      return newCards;
    });
  };

  const resetPositions = () => {
    setCards((currentCards) => {
      const newCards = [...currentCards];
      newCards.forEach((card) => {
        card.position = {x: 0, y: 0};
      });
      return newCards;
    });
  };

  const updateGone = (index: number) => {
    // Reset all the cards if index is negative
    if (index < 0) {
      setGone(new Set());
    } else {
      setGone((prevGone) => {
        const newGone = new Set(prevGone);
        newGone.add(index);
        return newGone;
      });
    }
  };

  const changeCard = () => {
    const newCards = [...cards];
    newCards[newCards.length - 1] = {...blankCard, title: 'TEST CHANGE', description: 'new description hello karen yadda yada meoew oewowe'};
    setCards(newCards);
  };

  const addCard = () => {
    console.log('cards before:', cards);
    const newCards = [...cards];
    // newCards.unshift({...blankCard, title: `ADDED ${newCards.length + 1}`, description: 'ADDED THIS CARD'});
    // newCards.push({...blankCard, title: `ADDED ${newCards.length + 1}`, description: 'ADDED THIS CARD'});
    newCards.splice(topCardIndex + 1, 0, {...blankCard, title: `ADDED ${newCards.length + 1}`, description: 'ADDED THIS CARD'});
    setCards(newCards);
    // increase all the numbers in the set gone by 1:
    setGone((prevGone) => {
      const newGone = new Set<number>();
      prevGone.forEach((i) => newGone.add(i + 1));

      // console.log('newGone:', newGone);
      return newGone;
    });
    // setCards(newCards);
  };


  return (
    <div className={styles.pageContainer}>
      <button className={styles.options} onClick={changeCard}>Change Card</button>
      <button className={styles.options2} onClick={addCard}>Add Card</button>
      <Deck
        cards={cards}
        gone={gone}
        setGone={updateGone}
        resetPositions={resetPositions}
        topCardIndex={topCardIndex}
        updateCardPosition={updateCardPosition}
      />
    </div>
  );
};

export default Home;
