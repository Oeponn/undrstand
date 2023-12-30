import styles from './styles.module.scss';
const About = () => {
  return (
    <div className={styles.container} onClick={() => console.log('Test abt')}>
      <h1>About Page</h1>
      <p>I did a really whimsical personality test and decided that i wanted
        to make my own, but with more interesting UI. I think swiping is pretty
        ingrained in our UX patterns these days, so I wanted to add that
        dimension to it. I guess I just kept expanding the scope and now here I
        am, with a whole personality-test/choose-your-own-adventure/survey
        builder.
      </p>
      <h1>Building Your Own</h1>
      <p>You can build your own and share them. If you create an account, you
        also have the option to privatize the final result distribution for
        personal use.
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
        to achieve up to 90% completition rates with a bunch of caveats. Well,
        undrstand.me on average achieves 400% more actions than what is
        necessary to complete the survey, meaning that after completing the,
        survey, users tend to continue interacting for fun.  I mean of course,
        if you just make the survey more entertaining, you get more engagement.
      </p>
    </div>
  );
};

export default About;