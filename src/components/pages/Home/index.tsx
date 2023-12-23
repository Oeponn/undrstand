/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import Deck from 'components/global/Deck';
// import {CardType, CardTree} from 'types/deck';
import {AnswerKeyType, CardType, CardTree, Direction} from 'types/deck';
import {difference} from 'components/shared/helpers';
import styles from './styles.module.scss';

const blankCard: CardType = {
  key: 'blank',
  title: 'Blank',
  description: 'There are no more paths for you to take.',
  question: 'But you can still swipe around for fun...',
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
  maxLength: 8,
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
    tortoise: {
      key: 'tortoise',
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
    hare: {
      key: 'hare',
      title: 'The Hare',
      description: 'The hare is quite cute, but as you walk closer you realize its actually much bigger than you realize. Its almost chest height.',
      question: 'What would you like to do?',
      options: {
        up: 'A sharp stick is on the ground next to you. Try to hunt and eat it?',
        right: 'Tame it to keep as a pet',
        left: 'Walk past it, hopefully without disturbing it',
        down: 'Go back to the tortoise',
      },
      next: {
        up: 'design',
        right: 'design',
        left: 'design',
        down: 'tortoise',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    animals: {
      key: 'animals',
      title: 'The Race',
      description: 'To your right, you see a hare. To your left, you see a tortoise',
      question: 'Which do you walk towards?',
      options: {
        // up: 'That\'s cool',
        right: 'Walk towards the hare',
        left: 'Walk towards the tortoise',
        // down: 'I see',
      },
      next: {
        // up: 'tortoises',
        right: 'hare',
        left: 'tortoise',
        // down: 'tortoises',
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
        up: 'animals',
        right: 'animals',
        left: 'animals',
        down: 'animals',
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
  const [prevCards, setPrevCards] = useState(() => new Set<string>());
  const [gone, setGone] = useState<AnswerKeyType>({});
  const [topCardIndex, setTopCardIndex] = useState<number>(-1);

  useEffect(() => {
    // TODO fetch card tree from database, then set in state here
    let newCards: CardType[] = [...cards];
    if (cards.length === 0) {
      newCards = Array.from({length: tempCards.maxLength}, (value, index) => {
        // Fill with blank cards except top card on initiation
        return {...blankCard, key: 'blank' + (cards.length + index + 1)};
      });
      newCards[newCards.length - 1] = tempCards.cards.start;
      setCards(newCards);
    }
  }, []);


  // useEffect(() => {
  //   console.log('cards:', cards);
  // }, [cards]);

  // useEffect(() => {
  //   console.log('gone:', gone);
  // }, [gone]);

  // useEffect(() => {
  //   console.log('current topcard:', topCardIndex);
  // }, [topCardIndex]);

  useEffect(() => {
    // Calculate topCardIndex whenever cards or gone changes
    // console.log('gone or cards changed:', [cards.length - gone.size, ...gone]);
    // const newTopCardIndex = Math.min.apply(null, [cards.length - gone.size, ...gone]) - 1;
    const newTopCardIndex = cards.length - Object.keys(gone).length - 1;
    // console.log(`cards.length: ${cards.length} - gone.size: ${gone.size}, topCardIndex: ${topCardIndex}, newTopCardIndex: ${newTopCardIndex}`);
    setTopCardIndex(newTopCardIndex);
  }, [cards.length, gone]);

  useEffect(() => {
    if (topCardIndex === -1 || cards.length === 0) {
      return;
    }

    // console.log('gone:', gone);
    const required = new Set<string>();
    Object.keys(gone).forEach((key) => {
      const answerOwner: CardType = tempCards.cards[key];
      const answer: Direction = gone[key].answer;
      // console.log('answer:', answer);
      // console.log('answerOwner:', answerOwner.key);
      // console.log('currentCard:', answerOwner);
      const nextCard = answerOwner.next[answer];
      required.add(nextCard);
    });
    // console.log('required:', required);
    // console.log('prevCards:', prevCards);
    // console.log('difference:', difference(required, prevCards));
    const nextKey:string = Array.from(difference(required, prevCards))[0];
    if (!nextKey) {
      return;
    }
    // console.log('nextKey:', nextKey);
    const nextCard = tempCards.cards[nextKey];
    // console.log('nextCard:', nextCard);
    setCards((currentCards) => {
      const newCards = [...currentCards];
      // console.log('newCards:', newCards);
      // console.log('gone topCardIndex:', topCardIndex);
      // console.log('replacing:', newCards[topCardIndex]);
      newCards[topCardIndex] = nextCard;
      setPrevCards((prevState) => {
        const newSet = new Set(prevState);
        // console.log('newCards[topCardIndex].key:', newCards[topCardIndex]);
        newSet.delete(newCards[topCardIndex].key);
        newSet.add(nextKey);
        return newSet;
      });
      return newCards;
    });
  }, [topCardIndex]);

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

  const clearGone = () => {
    setGone({});
  };

  const updateGone = (key: string, direction: Direction) => {
    setGone((prevGone) => ({
      ...prevGone,
      [key]: {
        answer: direction,
        // dir: 1000 * Math.random(),
      },
    }));
  };

  return (
    <div className={styles.pageContainer}>
      <Deck
        cards={cards}
        topCardIndex={topCardIndex}
        gone={gone}
        clearGone={clearGone}
        setGone={updateGone}
        prevCards={prevCards}
        setPrevCards={setPrevCards}
        resetPositions={resetPositions}
        setCardPosition={updateCardPosition}
      />
    </div>
  );
};

export default Home;
