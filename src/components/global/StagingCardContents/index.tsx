/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, {useEffect, useRef, useState} from 'react';
// import Typewriter from 'typewriter-effect';
import {useTheme} from 'components/contexts/ThemeContext';
import {Card, Direction, OptionType} from '~/types/testTypes';
import styles from './styles.module.scss';

const SWIPE_THRESHOLD = 150; // Set a threshold for swipe movement

const future = [
  'Answer the previous card first.',
  'This card is waiting for its turn.',
  'No peeking!',
  'Patience is a virtue.',
  'Your future is still unwritten.',
  'Curiosity didn\'t just kill the cat.',
  'Focus on the now, not the next.',
  'One step at a time.',
  'The best is yet to come.',
  'You cannot cheat fate.',
  'Stay in the present moment.',
  'Hey! I\'m not going to reveal anything so stop looking.',
  'Anticipation is part of the journey.',
  'Are you going to sit there and read these all?',
  'The future is a mystery to be unveiled in due time.',
];

type RefsObject = {
  [key: string]: React.MutableRefObject<any>;
}

// const typewriterOptions = {
//   autoStart: false,
//   delay: 10,
//   loop: false,
//   cursorClassName: styles.cursor,
// };

const Option = ({
  answer,
  // score,
  currDir,
  dir,
  isTop,
  opacity,
  options,
  pressed,
  resultsMode,
  showOptions,
  showTyping,
} : {
  answer: Direction | '',
  score: { [key: string]: number },
  currDir: string,
  dir: keyof OptionType,
  isTop: boolean,
  opacity: number,
  options: OptionType,
  pressed: boolean,
  resultsMode: boolean,
  showOptions: boolean,
  showTyping: boolean,
}) => {
  const selectedStyle: React.CSSProperties = {
    backgroundColor: `rgba(91, 96, 98, ${opacity})`,
  };
  const option = options[dir];
  let backgroundStyle = currDir === dir && !answer ? selectedStyle : {};
  // If answer matches, keep it highlighted even if the card returns
  if (answer === dir) {
    backgroundStyle = {backgroundColor: `rgba(91, 96, 98, 1)`};
  }

  if (Object.keys(options).length === 0) {
    console.log('keys are null:', options);
    return null;
  }

  let optionClasses = styles.optionText;

  // If it is not the top card or show has not been triggered
  if (!isTop || !showOptions) {
    optionClasses = [styles.optionText, styles.optionPreview].join(' ');
  }

  // If pressed, we want the options to appear without fade/delay
  if (pressed || resultsMode || !showTyping) {
    optionClasses = [styles.optionText, styles.appear].join(' ');
  }

  return (
    <div className={styles.option} key={dir} style={backgroundStyle}>
      <span className={styles[dir]}>
        &#10148;
      </span>
      <div className={optionClasses}>
        {/* {option}: {JSON.stringify(score)} */}
        {option}
      </div>
    </div>
  );
};

const CardContents = (
    {card, index, isDown, isTop, numCards, position, resultsMode, swiped}:
    {
      card: Card,
      index: number,
      isDown?: boolean,
      isTop: boolean,
      numCards: number,
      position?: {x: number, y: number},
      resultsMode: boolean,
      swiped: boolean,
    },
) => {
  // console.log('cc:', card.key);
  if (!card) {
    console.log('null');
    return null;
  }
  const {
    title,
    description,
    question,
    options,
  } = card;

  let mx = 0;
  let my = 0;
  if (position) {
    ({x: mx, y: my} = position);
  }

  // TypewriterClass does not allow for assigning of ref.current
  const refs: RefsObject = {
    description: useRef<any>(null),
    question: useRef<any>(null),
  };
  const [completed, setCompleted] = useState({
    description: false,
    question: false,
  });
  // const [init, setInit] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const {showTyping} = useTheme();

  // Color opacity for option being selected by swipe, biggest x y distance
  const opacity = 2 * Math.max(
      Math.abs(mx/SWIPE_THRESHOLD), Math.abs(my/SWIPE_THRESHOLD,
      ));
  let currDir = '';
  if (mx < 0) {
    currDir = 'left';
  } else if (mx > 0) {
    currDir = 'right';
  }
  if (my < 0) {
    currDir = 'up';
  } else if (my > 0) {
    currDir = 'down';
  }

  useEffect(() => {
    if (isDown) {
      setPressed(true);
      setShowOptions(true);
    }
  }, [isDown]);

  useEffect(() => {
    if (swiped && !pressed) {
      setPressed(true);
      setShowOptions(true);
    }
  }, [swiped]);

  useEffect(() => {
    if (refs.description && refs.description.current) {
    // if (init && refs.description && refs.description.current) {
      if (isTop && !isDown && !pressed) {
        refs.description.current
            .pauseFor(500)
            .deleteAll(1)
            .typeString(description)
            .start()
            .callFunction(() => {
              setCompleted({...completed, description: true});
            });
      } else {
        const futureDesc = future[(numCards - index - 2) % future.length];
        refs.description.current
            // .typeString('Decide your previous fate first')
            .typeString(futureDesc)
            .start();
      }
    }
  }, [isTop, isDown]);

  useEffect(() => {
    if (completed.description && !completed.question && refs.question) {
      refs.question.current
          .pauseFor(500)
          .typeString(question)
          .start()
          .pauseFor(250)
          .callFunction(() => {
            setCompleted({...completed, question: true});
          });
    }

    if (completed.question) {
      // Only show options after the question is completed
      setShowOptions(true);
    }
  }, [completed]);

  // If it is not top card, show preview text
  // numcards is 1 indexed, index is 0 indexed, subtract 1
  // Subtract 1 nmore because top card is never previewed
  const previewDescription = isTop ?
    description :
    future[(numCards - index - 2) % future.length];

  // if (isTop) {
  //   // console.log('pressed || resultsMode || !showTyping', pressed || resultsMode || !showTyping);
  //   // console.log('pressed: ', pressed);
  //   // console.log('resultsMode: ', resultsMode);
  //   // console.log('showTyping: ', showTyping);
  // }


  return (
    <div className={styles.contentsContainer}>
      <p className={styles.title}>{title}</p>
      <div className={styles.descriptionContainer}>
        <div className={styles.description}>{previewDescription}</div>
        {/* {pressed || resultsMode || !showTyping ?
        <div className={styles.description}>{previewDescription}</div> :
        <Typewriter
          options={{
            ...typewriterOptions,
            wrapperClassName: styles.description,
          }}
          onInit={(typewriter) => {
            typewriter.callFunction(() => {
              refs.description.current = typewriter;
              setInit(true);
            }).start();
          }}
        />} */}
      </div>
      <div className={styles.questionContainer}>
        <p className={styles.question}>{question}</p>
        {/* {pressed || resultsMode || !showTyping ?
        <p className={styles.question}>{question}</p> :
          <Typewriter
            options={{
              ...typewriterOptions,
              wrapperClassName: styles.question,
            }}
            onInit={(typewriter) => {
              typewriter.callFunction(() => {
                refs.question.current = typewriter;
              }).start();
            }}
          />} */}
      </div>
      <div className={styles.optionsContainer}>
        {
          Object.keys(options).map((key: string) => {
            return (
              <Option
                answer={card.answer}
                score={card.scores[key as keyof typeof card.scores]}
                currDir={currDir}
                dir={key as keyof OptionType}
                isTop={isTop}
                key={key}
                opacity={opacity}
                options={options}
                pressed={pressed}
                resultsMode={resultsMode}
                showOptions={showOptions}
                showTyping={showTyping}
              />
            );
          })
        }
      </div>
      <div className={styles.index}>{numCards - index}/{numCards}</div>
    </div>
  );
};

export default CardContents;
