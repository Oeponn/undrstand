// import {useTheme} from 'components/contexts/ThemeContext';
// import {useEffect, useRef, useState} from 'react';
import {useEffect} from 'react';
import {personalities} from 'components/shared/personalityTemplates';
import {mb} from 'types/deck';
import {pad} from 'components/shared/helpers';
// import html2canvas from 'html2canvas';
import styles from './styles.module.scss';

const Header = ({element, title}:{element: string, title: string}) => {
  const name = 'Oponn';
  const id = 3427;

  return (
    <div className={styles.header}>
      <div className={styles.userInfo}>
        <div className={styles.numberContainer}>
          <div className={styles.circle}/>
          <div className={styles.number}>NO.{'\n'}{pad(id)}</div>
        </div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.typeContainer}>
        <h4>
          Your element is:
        </h4>
        <p className={styles.resultElement}>{element}</p>
        {/* <h4>
          Your title is:
        </h4> */}
        <p className={styles.resultTitle}>"{title}"</p>
      </div>
    </div>
  );
};

const Traits = (
    {
      element, elementDesc,
      title, titleDesc,
      risk, riskDesc,
      concept, conceptDesc,
      quotes,
      traits,
    }:
    {
      element: string,
      elementDesc: string,
      title: string,
      titleDesc: string,
      risk: string,
      riskDesc: string,
      concept: string,
      conceptDesc: string
      quotes: string[],
      traits: string[],
    }) => {
  const filePath = `/elementIcons/${element.replaceAll(' ', '')}.png`;

  return (
    <div className={styles.content}>
      <div className={styles.elementSection}>
        <div className={styles.innateContainer}>
          <div className={styles.oval1}/>
          <div className={styles.oval2}/>
          <div className={styles.oval3}/>
          <div className={styles.titleContainer}>
            <div className={styles.innateTitle}>Innate Personality</div>
          </div>
          <div className={styles.innateTags}>
            {quotes.map((q) => {
              return <div className={styles.tag} key={q}>{q}</div>;
            })}
          </div>
        </div>
        <div className={styles.iconContainer}>
          <div className={styles.ovalContainer}>
            <div className={styles.oval1}/>
            <div className={styles.oval2}/>
            <div className={styles.oval3}/>
            <div className={styles.oval4}/>
            <div className={styles.oval5}/>
            <div className={styles.oval6}/>
          </div>
          {/* <img className={styles.elementIcon}src='/logo192.png' /> */}
          <img className={styles.elementIcon}src={filePath} />
        </div>
      </div>
      <div className={styles.theorySection}>
        <div className={styles.titleContainer}>
          <div className={styles.conceptTitle}>Conceptual Base</div>
          <div className={styles.oval1}/>
          <div className={styles.oval2}/>
          <div className={styles.oval3}/>
        </div>
        <div className={styles.concepts}>

          <div className={styles.section}>
            <span className={styles.concept}>{element}: </span>
            <span className={styles.conceptDesc}>{elementDesc}</span>
          </div>

          <div className={styles.section}>
            <span className={styles.concept}>{title}: </span>
            <span className={styles.conceptDesc}>{titleDesc}</span>
          </div>

          <div className={styles.section}>
            <span className={styles.concept}>{risk}: </span>
            <span className={styles.conceptDesc}>{riskDesc}</span>
          </div>

          <div className={styles.section}>
            <span className={styles.concept}>{concept}: </span>
            <span className={styles.conceptDesc}>{conceptDesc}</span>
          </div>

          <div className={styles.conceptTags}>
            {traits.map((t) => {
              return <div className={styles.tag} key={t}>{t}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const Compatibility = ({compatible, incompatible}:{
  compatible: mb[],
  incompatible: mb[],
}) => {
  const compat = compatible.map((c) => personalities[c].element);
  const incompat = incompatible.map((i) => personalities[i].element);
  return (
    <div className={styles.compatibility}>
      <div className={styles.compatible}>
        <span className={styles.label}>Most{'\n'}Compatible</span>
        {/* <div className={styles.elements}> */}
        {compat.map((ele) => {
          const filePath = `/elementIcons/${ele.replaceAll(' ', '')}.png`;
          return (
            <div className={styles.element} key={ele}>
              <img className={styles.elementIcon} src={filePath} />
              <p className={styles.type}>{ele}</p>
            </div>
          );
        })}
        {/* </div> */}
      </div>
      <div className={styles.incompatible}>
        <span className={styles.label}>Least{'\n'}Compatible</span>
        {/* <div className={styles.elements}> */}
        {incompat.map((ele) => {
          const filePath = `/elementIcons/${ele.replaceAll(' ', '')}.png`;
          return (
            <div className={styles.element} key={ele}>
              <img className={styles.elementIcon} src={filePath} />
              <p className={styles.type}>{ele}</p>
            </div>
          );
        })}
        {/* </div> */}
      </div>
    </div>
  );
};
const Watermark = () => {
  const text = 'undrstand.me';
  return (
    <div className={styles.watermark}>
      <div className={styles.watermarkText}>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
      </div>
      <div className={styles.watermarkText}>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
        <img className={styles.logo} src='/logo64.png' />
        <span>{text}</span>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.expoInfo}>
        <div className={styles.invert}/>
        <div className={styles.date}>
          "Elements" Test Built by Anonymous User Jan 6 2023
        </div>
      </div>
    </div>
  );
};
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
