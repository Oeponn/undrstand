/* eslint-disable max-len */
import {useEffect, useState} from 'react';
import Deck from 'components/global/Deck';
// import {CardType, CardTree} from 'types/deck';
import {
  AnswerKeyType,
  CardType,
  CardTree,
  Direction,
  CardIndex,
} from 'types/deck';
import {difference} from 'components/shared/helpers';
import {blankCard, tempCards} from 'components/shared/cardTemplates';
import styles from './styles.module.scss';

const Home = () => {
  const [cardTree, setCardTree] = useState<CardTree>();
  const [cards, setCards] = useState<CardType[]>([]);
  const [cardIndex, setIndex] = useState<CardIndex>({});
  const [prevCards, setPrevCards] = useState(() => new Set<string>());
  const [gone, setGone] = useState<AnswerKeyType>({});
  const [noMoreCards, setNoMoreCards] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);
  const [resultsMode, setResultsMode] = useState<boolean>(false);
  const [topCardIndex, setTopCardIndex] = useState<number>(-1);

  useEffect(() => {
    return () => {
      // console.log('unmounting home');
      if (!cardTree) {
        return;
      }
      localStorage.setItem('undrstandDeckState', JSON.stringify({
        [cardTree.title]: {
          treeKey: cardTree.title,
          cardTree: cardTree,
          cards: cards,
          cardIndex: cardIndex,
          prevCards: prevCards,
          gone: gone,
          noMoreCards: noMoreCards,
          completed: completed,
          resultsMode: resultsMode,
          topCardIndex: topCardIndex,
        }}));
    };
  }, []);

  useEffect(() => {
    // TODO fetch card tree from database, then set in state here
    setCardTree(tempCards);
  }, []);

  useEffect(() => {
    if (!cardTree) {
      return;
    }
    const storageState = localStorage.getItem('undrstandDeckState');
    const parsedState = JSON.parse(storageState || '{}');
    // console.log('parsedState', parsedState);
    if (cardTree && Object.prototype.hasOwnProperty.call(parsedState, cardTree.title)) {
      // console.log('has it all')!;
      // setCardTree(parsedState[cardTree.title].cardTree);
      setCards(parsedState[cardTree.title].cards);
      // setIndex(parsedState[cardTree.title].cardIndex);
      // setPrevCards(parsedState[cardTree.title].prevCards);
      // setGone(parsedState[cardTree.title].gone);
      // setNoMoreCards(parsedState[cardTree.title].noMoreCards);
      // setCompleted(parsedState[cardTree.title].completed);
      // setResultsMode(parsedState[cardTree.title].resultsMode);
      // setTopCardIndex(parsedState[cardTree.title].topCardIndex);
    }
    // else {
    //   let newCards: CardType[] = [...cards];
    //   if (cards.length === 0) {
    //     newCards = Array.from({length: cardTree.maxLength}, (value, index) => {
    //     // Fill with blank cards except top card on initiation
    //       return {
    //         ...blankCard,
    //         key: 'blank' + (cards.length + index + 1),
    //         visible: false};
    //     });
    //     newCards[newCards.length - 1] = cardTree.cards.start;
    //     setIndex({[cardTree.cards.start.key]: {index: newCards.length - 1}});
    //     setCards(newCards);
    //   }
    // }
    let newCards: CardType[] = [...cards];
    if (cards.length === 0) {
      newCards = Array.from({length: cardTree.maxLength}, (value, index) => {
        // Fill with blank cards except top card on initiation
        return {
          ...blankCard,
          key: 'blank' + (cards.length + index + 1),
          visible: false};
      });
      newCards[newCards.length - 1] = cardTree.cards.start;
      setIndex({[cardTree.cards.start.key]: {index: newCards.length - 1}});
      setCards(newCards);
    }
  }, [cardTree]);

  useEffect(() => {
    // every time the card array updates, iterate through and set the index object to be cards[i].key: index
    const newIndex: CardIndex = {};
    cards.forEach((card, i) => {
      newIndex[card.key] = {index: i};
    });
    setIndex(newIndex);
  }, [cards.length]);


  // useEffect(() => {
  //   console.log('index:', cardIndex);
  // }, [cardIndex]);

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
    // After a card is swiped or added, decide next action/card
    if ((
      cards.length === 0||
      topCardIndex === cards.length - 1 ||
      resultsMode ||
      !cardTree
    )) {
      return;
    }
    // Iterate through all swiped cards and get keys from answered cards
    const required = new Set<string>();
    Object.keys(gone).forEach((key) => {
      const answerOwner: CardType = cardTree.cards[key];
      if (!answerOwner) {
        return;
      }
      const answer: Direction = gone[key].answer;
      const nextCard = answerOwner.next[answer];
      if (nextCard) {
        required.add(nextCard);
      }
    });

    // Get the difference between existing cards and required, should be 1
    const nextKey: string = Array.from(difference(required, prevCards))[0];

    // const lastCard: CardType = cards[topCardIndex + 1];
    // const answer: Direction = gone[lastCard.key].answer;
    // const nextKey: string = lastCard.next[answer];
    if (!nextKey) {
      return;
    } else if (nextKey === '_none') {
      // console.log('no nextKey!');
      setNoMoreCards(true);
      return;
    }
    // console.log('nextKey:', nextKey);
    const nextCard = {...cardTree.cards[nextKey], visible: true};
    if (topCardIndex === -1) {
      // If we've run out of cards, add the card
      // console.log('out of cards! adding:', nextCard.key);
      addCard(nextCard);
    } else {
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
    }
  }, [topCardIndex]);

  useEffect(() => {
    if (Object.keys(gone).length === 0) {
      setCompleted(false);
    }
    if (Object.keys(gone).length === cards.length && noMoreCards) {
      console.log('completed!');
      setCompleted(true);
      setResultsMode(true);
    }
  }, [gone, noMoreCards]);

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

  const updateCardVisibility = (index: number, visible: boolean) => {
    setCards((currentCards) => {
      const newCards = [...currentCards];
      newCards[index] = {
        ...newCards[index],
        visible,
      };
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

  const addCard = (card?: CardType) => {
    const newCards = [...cards];
    if (card) {
      // Adding a new card messes up the previous animation, so delay it
      window.setTimeout(() => {
        newCards.splice(topCardIndex + 1, 0, {
          ...card,
          visible: true,
        });
        setCards(newCards);
      }, 600);
    } else {
      newCards.splice(topCardIndex + 1, 0, {
        ...blankCard,
        title: `ADDED ${newCards.length + 1}`,
        description: 'ADDED THIS CARD',
        key: 'ADDED' + Math.random(),
        // If it is the top card, make it invisible until initialization or it
        // will flicker before the react spring style is initialized
        // visible: topCardIndex + 1 === cards.length ? true : false,
        visible: true,
      });
      setCards(newCards);
    }
  };

  const printCards = () => {
    console.log('cards:', cards);
    console.log('resultsMode:', resultsMode);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.testButtons}>
        <button onClick={() => setCompleted(true)}>setCompleted</button>
        <button onClick={() => addCard()}>Add Card</button>
        <button onClick={printCards}>print button {window.innerHeight}</button>
      </div>
      <Deck
        cards={cards}
        completed={completed}
        resultsMode={resultsMode}
        topCardIndex={topCardIndex}
        gone={gone}
        cardIndex={cardIndex}
        clearGone={clearGone}
        setGone={updateGone}
        prevCards={prevCards}
        setPrevCards={setPrevCards}
        resetPositions={resetPositions}
        setCardPosition={updateCardPosition}
        setCardVisibility={updateCardVisibility}
      />
    </div>
  );
};

export default Home;
