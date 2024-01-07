// import {useTheme} from 'components/contexts/ThemeContext';
// import {useEffect, useRef, useState} from 'react';
import {useEffect} from 'react';
import {personalities} from 'components/shared/personalityTemplates';
import {mb} from 'types/deck';
import {
  Compatibility,
  Footer,
  Header,
  Traits,
  Watermark,
} from 'components/global/ResultsCard/components';
// import html2canvas from 'html2canvas';
import styles from './styles.module.scss';
const ResultsCard = ({outcome, resultCardRef}:{
  outcome: mb,
  resultCardRef: React.RefObject<HTMLDivElement>,
  }) => {
  // console.log('what:', outcome);

  useEffect(() => {
    if (!outcome) {
      return;
    }
    const {
      baseColor,
      secondaryColor,
      thirdColor,
      fourthColor,
      accentColor,
      darkText,
      lightText,
    } = personalities[outcome];
    const documentStyle = document.documentElement.style;
    documentStyle.setProperty('--baseColor', baseColor);
    documentStyle.setProperty('--secondaryColor', secondaryColor);
    documentStyle.setProperty('--thirdColor', thirdColor);
    documentStyle.setProperty('--fourthColor', fourthColor);
    documentStyle.setProperty('--accentColor', accentColor);
    documentStyle.setProperty('--accentColor', accentColor);
    documentStyle.setProperty('--darkText', darkText);
    documentStyle.setProperty('--lightText', lightText);
  }, [outcome]);

  if (!outcome) {
    return <div>Outcome not set</div>;
  }

  const {
    element,
    elementDesc,
    title,
    titleDesc,
    risk,
    riskDesc,
    concept,
    conceptDesc,
    traits,
    quotes,
    compatible,
    incompatible,
  } = personalities[outcome];

  return (
    <div className={styles.resultCard}>
      <div className={styles.resultCardDownload} ref={resultCardRef}>
        <Header element={element} title={title}/>
        <Watermark />
        <Traits
          element={element}
          elementDesc={elementDesc}
          title={title}
          titleDesc={titleDesc}
          risk={risk}
          riskDesc={riskDesc}
          concept={concept}
          conceptDesc={conceptDesc}
          quotes={quotes}
          traits={traits}
        />
        <Compatibility
          compatible={compatible}
          incompatible={incompatible}
        />
        <Watermark />
        <Footer />
      </div>
    </div>
  );
};

export default ResultsCard;
