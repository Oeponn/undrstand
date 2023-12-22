/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import React, {useEffect, useRef, useState} from 'react';
import Typewriter from 'typewriter-effect';
import styles from './styles.module.scss';

const SWIPE_THRESHOLD = 150; // Set a threshold for swipe movement

const future = [
  'Answer the previous card first.',
  'No peeking!',
  'Are you happy with your last decision?',
  'You cannot cheat fate.',
  'Hey! I\'m not going to reveal anything so stop looking.',
  'Are you going to sit there and read these all?',
];

type OptionType = {
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

type RefsObject = {
  [key: string]: React.MutableRefObject<any>;
}

const typewriterOptions = {
  autoStart: false,
  delay: 10,
  loop: false,
  cursorClassName: styles.cursor,
};

const Option = ({
  answer,
  currDir,
  dir,
  isTop,
  opacity,
  options,
  pressed,
  showOptions,
} : {
  answer: string,
  currDir: string,
  dir: keyof OptionType,
  isTop: boolean,
  opacity: number,
  options: OptionType,
  pressed: boolean,
  showOptions: boolean,
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

  if (!option) {
    return null;
  }

  let optionClasses = styles.optionText;

  // If it is not the top card or show has not been triggered
  if (!isTop || !showOptions) {
    optionClasses = [styles.optionText, styles.optionPreview].join(' ');
  }

  // If pressed, we want the options to appear without fade/delay
  if (pressed) {
    optionClasses = [styles.optionText, styles.appear].join(' ');
  }

  return (
    <div className={styles.option} key={dir} style={backgroundStyle}>
      <span className={styles[dir]}>
        &#10148;
      </span>
      <div className={optionClasses}>
        {option}
      </div>
    </div>
  );
};

const CardContents = (
    {card, index, isDown, isTop, numCards, position, swiped}:
    {
      card: CardType,
      index: number,
      isDown: boolean,
      isTop: boolean,
      numCards: number,
      position?: {x: number, y: number},
      swiped: boolean,
    },
) => {
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
  const [init, setInit] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [answer, setAnswer] = useState('');

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
    if (swiped) {
      setAnswer(currDir);
    }
    if (swiped && !pressed) {
      setPressed(true);
      setShowOptions(true);
    }
  }, [swiped]);

  useEffect(() => {
    if (init && refs.description && refs.description.current) {
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
        refs.description.current
            // .typeString('Decide your previous fate first')
            .typeString(future[index])
            .start();
      }
    }
  }, [isTop, isDown, init]);

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

  return (
    <div className={styles.contentsContainer}>
      <p className={styles.title}>{title}</p>
      <div className={styles.descriptionContainer}>
        {pressed ?
        <div className={styles.description}>{description}</div> :
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
        />}
      </div>
      <div className={styles.questionContainer}>
        {pressed ?
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
          />}
      </div>
      <div className={styles.optionsContainer}>
        {
          Object.keys(options).map((key: string) => {
            return (
              <Option
                answer={answer}
                currDir={currDir}
                dir={key as keyof OptionType}
                isTop={isTop}
                key={key}
                opacity={opacity}
                options={options}
                pressed={pressed}
                showOptions={showOptions}
              />
            );
          })
        }
      </div>
      <div className={styles.index}>{numCards - index}/{numCards}</div>
      {/* <div className={styles.index}>{index}</div> */}
    </div>
  );
};

export default CardContents;
