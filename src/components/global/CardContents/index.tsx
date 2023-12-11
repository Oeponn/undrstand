/* eslint-disable max-len */
import React from 'react';
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

const CardContents = (
    {card, index, numCards, mx, my}:
    {card: CardType, index: number, numCards: number, mx: number, my: number},
) => {
  const {
    title,
    description,
    question,
    options,
  } = card;

  // Color opacity for option being selected by swipe

  const opacity = Math.max(Math.abs(mx/SWIPE_THRESHOLD), Math.abs(my/SWIPE_THRESHOLD));
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
      {/* <div className={styles.index}>mx:{mx} my:{my}</div> */}
      {/* <div className={styles.index}>{opacity}</div> */}
    </div>
  );
};

export default CardContents;
