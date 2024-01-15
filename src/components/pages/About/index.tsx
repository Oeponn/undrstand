/* eslint-disable max-len */
import {ReactComponent as OutboundIcon} from 'components/shared/icons/outbound.svg';
import styles from './styles.module.scss';

const About = () => {
  return (
    <div className={styles.container}>
      <h1>About Page</h1>
      <div className={styles.linkWrapper}>
        <a
          className={styles.link}
          href="https://www.linkedin.com/in/tiger-shi/"
          rel="noreferrer"
          target="_blank">
            LinkedIn
          <OutboundIcon className={styles.outbound} />
        </a>
        <a
          className={styles.link}
          href="https://tigershi.com/"
          rel="noreferrer"
          target="_blank">
            Personal
          <OutboundIcon className={styles.outbound} />
        </a>
        <a
          className={styles.link}
          href="https://github.com/Oeponn/"
          rel="noreferrer"
          target="_blank">
            Github
          <OutboundIcon className={styles.outbound} />
        </a>
      </div>
      <p>
        I did a really whimsical personality test and decided that I wanted
        to make my own, but with more interesting UI. I think swiping is pretty
        ingrained in our UX patterns these days, so I wanted to add that
        dimension to it. I guess I just kept expanding the scope and now here I
        am, with a whole personality-test/choose-your-own-adventure/survey
        builder.
      </p>
      <h1>Building Your Own</h1>
      <p>
        I am currently building the feature to let you build your own tests. The idea is that you'll be able to
        create custom tests and surveys with optional different levels of complexity, ranging from simple linear
        surveys to full on personality tests or choose your own adventures with dynamic tree pathing and answer weighting.
        The plan is to allow users to create and share tests with friends, and
        also have the option to privatize the final result distribution for
        personal use if you make an account... perhaps. Thinking about how to make it easy for someone to build one of these.
      </p>
      <h1>Privacy</h1>
      <p>
        I use Plausible.io, a privacy-focused analytics service. Your data does
        not go to any third parties, its just for me to see where I can improve
        the user experience and to see how many people are actually using this
        site haha.
      </p>
      <h1>Engagement</h1>
      <p>
        If you were to read what companies selling survey tools say, they claim
        to achieve up to 90% completition rates with a bunch of caveats. Honestly, I think there are
        some amazingly talented writers out there and it would be fun to see what they could come up with.
        {/* Well, undrstand.me on average achieves 400% more actions than what is
        necessary to complete the survey, meaning that after completing the,
        survey, users tend to continue interacting for fun.  I mean of course,
        if you just make the survey more entertaining, you get more engagement. */}
      </p>
    </div>
  );
};

export default About;
