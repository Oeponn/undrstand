/* eslint-disable max-len */
import {useEffect, useRef, useState} from 'react';
import Deck from 'components/global/Deck';
import {
  AnswerKeyType,
  CardType,
  CardTree,
  Direction,
} from 'types/deck';
import {blankCard, tempCards} from 'components/shared/cardTemplates';
import {useTheme} from 'components/contexts/ThemeContext';
import {trackAnswer, trackExit} from 'components/shared/plausible';
import styles from './styles.module.scss';

const Home = () => {
  // Master state
  const [cardTree, setCardTree] = useState<CardTree>({
    title: '',
    maxLength: 0,
    cards: {},
  });

  // States derived from master state for display
  const [stack, setStack] = useState<CardType[]>([]);
  const [gone, setGone] = useState<AnswerKeyType>({});

  // States to aid in animation management
  const [prevCards, setPrevCards] = useState(() => new Set<string>());
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [resultsMode, setResultsMode] = useState<boolean>(false);
  const [reStack, setReStack] = useState<boolean>(false);
  const [topCardIndex, setTopCardIndex] = useState<number>(-1);
  const [delayId, setDelayId] = useState<number[]>([]);

  // States for interaction tracking
  const [loadedFromStorage, setLoadedFromStorage] = useState<boolean>(false);
  const [swipes, setSwipes] = useState<number>(0);
  const [arrowkeyPresses, setArrowkeyPresses] = useState<number>(0);

  // Refs for event listener handlers
  const cardTreeRef = useRef<CardTree>(cardTree);
  const stackRef = useRef<CardType[]>(stack);
  const resultsModeRef = useRef<boolean>(resultsMode);
  const reachedEndRef = useRef<boolean>(reachedEnd);
  const swipesRef = useRef<number>(swipes);
  const arrowkeyPressesRef = useRef<number>(arrowkeyPresses);
  const loadedFromStorageRef = useRef<boolean>(loadedFromStorage);
  const topCardIndexRef = useRef<number>(topCardIndex);

  const {storeState} = useTheme();

  // useEffect(() => {
  //   console.log('gone', gone);
  // }, [gone]);

  useEffect(() => {
    // TODO fetch card tree from database, then set in state here
    const storageState = localStorage.getItem('undrstandDeckState');
    const parsedState = JSON.parse(storageState || '{}');
    // console.log('parsedState', parsedState[tempCards.title]);
    // eslint-disable-next-line no-constant-condition
    // if (false) {
    if (storeState && Object.keys(parsedState).includes(tempCards.title)) {
      // console.log('existing state found:', tempCards.title, 'in', parsedState[tempCards.title]);
      setLoadedFromStorage(true);
      setResultsMode(parsedState[tempCards.title].resultsMode);
      setCardTree(parsedState[tempCards.title].cardTree);
    } else {
      // initialize start card to be top card
      const cardToUpdate = tempCards.cards['start'];
      const newCardTree: CardTree = {
        ...tempCards,
        cards: {
          ...tempCards.cards,
          start: {...cardToUpdate, index: tempCards.maxLength - 1},
        },
      };
      // iterate from tempCards.maxLength -2 down to 0
      for (let i = tempCards.maxLength - 2; i >= 0; i--) {
        // console.log('blank' + (i));
        newCardTree.cards['blank' + (i)] = {
          ...blankCard,
          key: 'blank' + (i),
          // title: 'blank' + (i),
          title: '',
          next: {
            up: '_none',
            right: '_none',
            left: '_none',
            down: '_none',
          },
          index: i,
        };
      }
      setCardTree(newCardTree);
    }
  }, []);

  useEffect(() => {
    // On unMount and on refresh, store the cardTree in localStorage
    const beforeUnmount = () => {
      if (!cardTreeRef || !cardTreeRef.current) {
        return;
      }
      const currentTree = cardTreeRef.current;
      const storageState = localStorage.getItem('undrstandDeckState');
      const parsedState = JSON.parse(storageState || '{}');
      localStorage.setItem('undrstandDeckState', JSON.stringify({
        ...parsedState,
        [currentTree.title]: {
          cardTree: currentTree,
          resultsMode: resultsModeRef.current || false,
        },
      }));
    };

    const handleBeforeUnload = (_event?: BeforeUnloadEvent) => {
      if (_event) {
        // console.log('Before unload!');
        _event.preventDefault();
      }
      beforeUnmount();
      const currentTree = cardTreeRef.current;
      const currentResultsMode = resultsModeRef.current;
      const currentReachedEnd = reachedEndRef.current;
      const currentStack = stackRef.current;
      const currentTop = topCardIndexRef.current;
      const currentSwipes = swipesRef.current;
      const currentArrowkeyPresses = arrowkeyPressesRef.current;
      const fromStorage = loadedFromStorageRef.current;

      const answers: AnswerKeyType = {};
      Object.keys(currentTree.cards).forEach((key) => {
        const card = currentTree.cards[key];
        if (card.answer) {
          answers[card.key] = card.answer;
        }
      });
      if (currentTree.title === '' || currentStack.length === 0) {
        // console.log('currentStack or currentTree is empty!');
        return;
      }
      // console.log('tracking page exit');
      // console.log('currentTop:', currentTop);
      // console.log('currentStack[currentTop].key,:', currentStack[currentTop].key);
      // console.log('currentSwipes:', currentSwipes);
      // console.log('currentResultsMode:', currentResultsMode);
      // console.log('currentReachedEnd:', currentReachedEnd);

      // Track if fresh state or loaded from storage but an action was taken
      if (!fromStorage ||
        (fromStorage && currentSwipes + currentArrowkeyPresses > 0)) {
        trackExit({
          treeKey: currentTree.title,
          // treeState: currentTree,
          topCard: currentStack[currentTop].key,
          answers: answers,
          actions: currentSwipes + currentArrowkeyPresses,
          swipes: currentSwipes,
          keyPresses: currentArrowkeyPresses,
          completed: currentResultsMode || currentReachedEnd,
          loaded: fromStorage,
        });
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    // Store the cardTree in localStorage on unmount or refresh
    return () => {
      beforeUnmount();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Automatically update gone and index objects based off cardTree
    if (!cardTree) {
      return;
    }
    const newGone: AnswerKeyType = {};
    let newStack: CardType[] = [...stack];
    // If no cards, construct with blank cards
    if (newStack.length !== cardTree.maxLength && cardTree.title) {
      // If no cards, construct with blank cards
      newStack = Array.from({length: cardTree.maxLength}, (value, index) => {
        return {
          ...blankCard,
          key: 'blank' + (stack.length + index),
          visible: true,
        };
      });
    }

    // Iterate through cardTree.cards and update newGone and newCards
    Object.keys(cardTree.cards).forEach((key) => {
      const card = cardTree.cards[key];

      const cardKey = card.key;
      const isGone = card.isGone;
      const index = card.index;
      if (index === undefined) {
        // If not in deck
        return;
      }

      if (isGone && card.answer) {
        // If card isGone, add it to gone
        newGone[cardKey] = card.answer;
      }

      if (newStack[index].key !== cardKey) {
      // if (newCards[index].key !== cardKey && !resultsMode) {
        newStack[index] = card;
      }
    });
    setStack(newStack);
    setGone(newGone);
  }, [cardTree]);

  useEffect(() => {
    // Calculate topCardIndex whenever cards or gone changes
    const newTopCardIndex = stack.length - Object.keys(gone).length - 1;
    setTopCardIndex(newTopCardIndex);
  }, [stack.length, gone]);

  useEffect(() => {
    if (Object.keys(gone).length === 0) {
      // Cards have been stacked, or start state
      setReStack(false);
    }
    if (Object.keys(gone).length === stack.length && reachedEnd) {
      setReStack(true);
      setResultsMode(true);
    }
    if (resultsMode &&
      Object.keys(gone).length === stack.length &&
      stack.length > 0) {
      // Come back to an existing state where all cards swiped but exited page
      // Without waiting for them to return first
      setReStack(true);
    }
  }, [gone, reachedEnd, resultsMode]);

  useEffect(() => {
    // Update refs / refs updater
    cardTreeRef.current = cardTree;
    resultsModeRef.current = resultsMode;
    reachedEndRef.current = reachedEnd;
    stackRef.current = stack;
    swipesRef.current = swipes;
    arrowkeyPressesRef.current = arrowkeyPresses;
    topCardIndexRef.current = topCardIndex;
    loadedFromStorageRef.current = loadedFromStorage;
  }, [cardTree,
    loadedFromStorage,
    resultsMode,
    reachedEnd,
    stack, swipes,
    arrowkeyPresses,
    topCardIndex]);

  if (stack.length === 0 || cardTree.title === '') {
    return (
      <div className={styles.pageContainer}>
        <div>Loading...</div>
      </div>
    );
  }

  const updateCardPosition = (index: number, x: number, y: number) => {
    setStack((currentCards) => {
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
    setStack((currentCards) => {
      const newCards = [...currentCards];
      newCards.forEach((card) => {
        card.position = {x: 0, y: 0};
      });
      return newCards;
    });
  };

  // update card visibility in cardTree
  const updateCardVisibility = (key: string, visible: boolean) => {
    setCardTree((prevCardTree) => {
      const newCardTree = {
        ...prevCardTree,
        cards: {
          ...prevCardTree.cards,
          [key]: {
            ...prevCardTree.cards[key],
            visible,
          },
        },
      };
      return newCardTree;
    });
  };

  const clearGone = () => {
    delayId.forEach((id) => window.clearTimeout(id));
    stack.forEach((_card, i) => {
      updateCardVisibility(stack[i].key, true);
    });
    const newCardTree = {
      ...cardTree,
      cards: Object.entries(cardTree.cards).reduce((newCards, [key, card]) => {
        newCards[key] = {...card, isGone: false};
        return newCards;
      }, {} as {[key: string]: CardType}),
    };
    setCardTree(newCardTree);
    setGone({});
  };

  const updateGone = (key: string, direction: Direction, method: number) => {
    // Capture a none stateful gone update here
    const newTopCardIndex = stack.length - Object.keys(gone).length - 1;

    // 0 === swipe, 1 === arrowkey press
    if (method === 0) {
      setSwipes((prevCount) => prevCount + 1);
    } else {
      setArrowkeyPresses((prevCount) => prevCount + 1);
    }

    const forFun = !!cardTree.cards[key].answer;
    // console.log('tracking answer');
    trackAnswer({
      treeKey: cardTree.title,
      cardKey: key,
      direction,
      answer: forFun ? '' : cardTree.cards[key].options[direction] || '',
      method: method === 0 ? 'swipe' : 'keyPress',
      resultsMode,
      // It is a swipe for fun
      forFun,
    });


    const thisCard = cardTree.cards[key];
    const nextCardKey = thisCard.next[direction];
    const cardToUpdate = cardTree.cards[key];
    if (!nextCardKey) {
      // They should all have a cardKey, this would be an error
      console.error('no next cardKey for', key);
      return;
    // } else if (newTopCardIndex === -1 && nextCardKey === '_none') {
    //   // This was the designated end of the story
    //   setReachedEnd(true);
    //   return;
    } else if (newTopCardIndex === -1) {
      // If swiped the last card, set the answer for that card
      setCardTree((prevCardTree) => {
        const newCardTree = {
          ...prevCardTree,
          cards: {
            ...prevCardTree.cards,
            [key]: {...cardToUpdate, answer: direction, isGone: true, visible: true},
          },
        };
        return newCardTree;
      });
      // If that was the designated last card, we reached the end
      if (nextCardKey === '_none') {
        setReachedEnd(true);
        return;
      }
      // Else, add the next card
      setTimeout(() => {
        addCard(nextCardKey);
      }, 600);
    } else if (nextCardKey === '_none') {
      setCardTree((prevCardTree) => {
        const newCardTree = {
          ...prevCardTree,
          cards: {
            ...prevCardTree.cards,
            [key]: {...cardToUpdate, answer: direction, isGone: true, visible: true},
          },
        };
        return newCardTree;
      });
    }


    if (newTopCardIndex < 0) {
      return;
    }
    const replaceKey = stack[newTopCardIndex].key;
    const replaceCard = cardTree.cards[replaceKey];
    const nextCard = cardTree.cards[nextCardKey];

    if (!nextCard) {
      return;
    }
    if (cardToUpdate && resultsMode) {
      // If results mode is on, do not change cards in stack
      setCardTree((prevCardTree) => {
        const newCardTree = {
          ...prevCardTree,
          cards: {
            ...prevCardTree.cards,
            [key]: {...cardToUpdate, answer: direction, isGone: true, visible: true},
          },
        };
        return newCardTree;
      });
    } else if (cardToUpdate) {
      setCardTree((prevCardTree) => {
        const newCardTree = {
          ...prevCardTree,
          cards: {
            ...prevCardTree.cards,
            [key]: {...cardToUpdate, answer: direction, isGone: true, visible: true},
            [replaceKey]: {...replaceCard, index: undefined},
            [nextCardKey]: {...nextCard, index: newTopCardIndex},
          },
        };
        setPrevCards((prevState) => {
          const newSet = new Set(prevState);
          newSet.delete(replaceKey);
          newSet.add(nextCardKey);
          return newSet;
        });
        return newCardTree;
      });
    }
    // After the card is offscreen, set a timeout to turn the card invisible
    const id = window.setTimeout(() => {
      updateCardVisibility(key, false);
    }, 750);
    setDelayId((prevDelayId) => [...prevDelayId, id]);
  };

  const addCard = (cardKey: string) => {
    const newTopCardIndex = stack.length - Object.keys(gone).length - 1;
    const card = cardTree.cards[cardKey];

    if (!card) {
      console.error('Unable to find card in tree:', cardKey);
      return;
    }

    setCardTree((prevCardTree) => {
      const newCardTree = {
        ...prevCardTree,
        maxLength: prevCardTree.maxLength + 1,
      };
        // increase all cards with index greater than topCardIndex by 1
      Object.keys(prevCardTree.cards).forEach((key) => {
        const i = prevCardTree.cards[key].index;
        if (i === undefined) {
          return;
        }
        if (i > newTopCardIndex) {
          newCardTree.cards[key] = {
            ...prevCardTree.cards[key],
            index: i + 1,
          };
        }
      });

      newCardTree.cards[cardKey] = {
        ...card,
        index: newTopCardIndex + 1,
        visible: true,
      };
      return newCardTree;
    });
  };

  // For testing purposes only
  const addTestCard = () => {
    const newTopCardIndex = stack.length - Object.keys(gone).length - 1;

    setCardTree((prevCardTree) => {
      const newCardTree = {
        ...prevCardTree,
        maxLength: prevCardTree.maxLength + 1,
      };
      // increase all cards with index greater than topCardIndex by 1
      Object.keys(prevCardTree.cards).forEach((key) => {
        const i = prevCardTree.cards[key].index;
        if (i === undefined) {
          return;
        }
        if (i > newTopCardIndex) {
          newCardTree.cards[key] = {
            ...prevCardTree.cards[key],
            index: i + 1,
          };
        }
      });


      const currentTopCardKey = stack[newTopCardIndex].key;
      newCardTree.cards[`ADDED${stack.length + 1}`] = {
        ...blankCard,
        title: `ADDED${stack.length + 1}`,
        description: 'ADDED THIS CARD',
        key: `ADDED${stack.length + 1}`,
        index: newTopCardIndex + 1,
        next: {
          up: currentTopCardKey,
          right: currentTopCardKey,
          left: currentTopCardKey,
          down: currentTopCardKey,
        },
        // If it is the top card, make it invisible until initialization or it
        // will flicker before the react spring style is initialized
        visible: false,
      };
      console.log(`ADDED${stack.length + 1}`);
      return newCardTree;
    });
  };

  const printCards = () => {
    console.log('cardTree:', cardTree);
    console.log('cards:', stack);
    console.log('gone:', gone);
    console.log('resultsMode:', resultsMode);
  };

  const printStorage = () => {
    console.log('localStorage:', localStorage);
  };

  const clearStorage = () => {
    // remove the key undrstandDeckState from localStorage
    localStorage.removeItem('understandDeckState');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.temp}>{topCardIndex}</div>
      <div className={styles.testButtons}>
        <button onClick={() => setReStack(true)}>setCompleted</button>
        <button onClick={() => addTestCard()}>Add Card</button>
        <button onClick={() => clearStorage()}>clear localstorage</button>
        <button onClick={printCards}>print cards</button>
        <button onClick={printStorage}>print storage</button>
        <div>swipes: {swipes} keypress: {arrowkeyPresses}</div>
      </div>
      <Deck
        cardTree={cardTree}
        stack={stack}
        reStack={reStack}
        resultsMode={resultsMode}
        topCardIndex={topCardIndex}
        gone={gone}
        clearGone={clearGone}
        updateGone={updateGone}
        prevCards={prevCards}
        setPrevCards={setPrevCards}
        resetPositions={resetPositions}
        updateCardPosition={updateCardPosition}
        updateCardVisibility={updateCardVisibility}
      />
    </div>
  );
};

export default Home;
