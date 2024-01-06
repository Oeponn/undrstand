// import {useTheme} from 'components/contexts/ThemeContext';
import {useEffect, useRef, useState} from 'react';
import {personalities} from 'components/shared/personalityTemplates';
import {PersonalityType, mb} from 'types/deck';
import ResultsCard from 'components/global/ResultsCard';
import html2canvas from 'html2canvas';
import styles from './styles.module.scss';

const Results = ({outcome}:{outcome?: mb}) => {
  // const {
  //   theme,
  //   toggleTheme,
  //   showTyping,
  //   toggleShowTyping,
  //   storeState,
  //   toggleStoreState,
  // } = useTheme();
  const [index, setIndex] = useState<number>(0);
  const [key, setKey] = useState<mb>();
  const [result, setResult] = useState<PersonalityType>();
  const resultCardRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (resultCardRef.current) {
      const canvas = await html2canvas(resultCardRef.current, {
      });
      const image = canvas.toDataURL('image/png', 1.0);

      // Create a link to download the image
      const link = document.createElement('a');
      link.href = image;
      link.download = `result-card-${result ? result.element : 'none'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const list: mb[] = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ',
  ];

  useEffect(() => {
    setKey(list[index]);
  }, [index]);

  useEffect(() => {
    if (!key) {
      return;
    }
    setResult(personalities[key]);
  }, [key]);

  if (!key) {
    return <div>key not set</div>;
  }

  const handleClick = (increase: number) => {
    if (increase === 1) {
      // increase index by 1 but if index is 16, reset to 0
      setIndex((index + 1) % list.length);
    } else {
      // decrease index by 1 but if index is 0, reset to 16
      setIndex((index - 1 + list.length) % list.length);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.admin}>
        <button
          className={styles.cycleButton}
          onClick={() => handleClick(1)}
        >cycle up: {index}</button>
        <button
          className={styles.cycleButton}
          onClick={() => handleClick(-1)}
        >cycle down: {index}</button>
        <button
          className={styles.cycleButton}
          onClick={downloadImage}>Download Result Card</button>
      </div>
      <ResultsCard outcome={outcome || key} resultCardRef={resultCardRef} />
    </div>
  );
};

export default Results;
