import styles from './styles.module.scss';

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

export default Traits;
