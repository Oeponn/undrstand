import plausibleTracker from 'plausible-tracker';
import {AnswerKeyType, Direction} from 'types/deck';
import {isTouchDevice} from 'components/shared/helpers';

const plausible = plausibleTracker({
  domain: 'undrstand.me', // Replace with your domain
  apiHost: 'https://plausible.undrstand.me',
  // trackLocalhost: true,
  // You can add additional options here if needed
});

export const trackAnswer = ({
  treeKey, cardKey, direction, answer, method, resultsMode, forFun,
}:{
  treeKey: string,
  cardKey: string,
  direction: Direction,
  answer: string,
  method?: 'swipe' | 'keyPress',
  resultsMode: boolean,
  forFun: boolean,
},
) => {
  // console.log('trackAnswer');
  plausible.trackEvent('answerEvent', {
    props: {
      treeKey,
      cardKey,
      direction,
      answer,
      method: method === 'swipe' ?
        // If swipe, decide touch or mouse based off device
        (isTouchDevice() ? 'touch' : 'mouse') :
        'keyPress',
      resultsMode,
      forFun,
    },
  });
};

export const trackExit = ({
  treeKey, topCard, answers, actions, swipes, keyPresses, completed, loaded,
}: {
  treeKey: string,
  // treeState: CardTree, // Too big to send, 2000 byte value limit, 300 for key
  topCard: string,
  answers: AnswerKeyType,
  actions: number,
  swipes: number,
  keyPresses: number,
  completed: boolean,
  loaded: boolean,
}) => {
  if (completed) {
    plausible.trackEvent('exitAfterComplete', {
      props: {
        treeKey,
        topCard,
        answers: JSON.stringify(answers),
        actions,
        swipes,
        keyPresses,
        loaded,
      },
    });
  } else {
    plausible.trackEvent('exitBeforeComplete', {
      props: {
        treeKey,
        // treeState: JSON.stringify(treeState),
        answers: JSON.stringify(answers),
        actions,
        swipes,
        keyPresses,
        loaded,
      },
    });
  }
};

export const trackComplete = ({
  treeKey, answers, swipes, keyPresses,
}: {
  treeKey: string,
  // treeState: CardTree, // Too big to send, 2000 byte value limit, 300 for key
  answers: AnswerKeyType,
  swipes: number,
  keyPresses: number,
}) => {
  plausible.trackEvent('quizComplete', {
    props: {
      treeKey,
      answers: JSON.stringify(answers),
      swipes,
      keyPresses,
    },
  });
};

export default plausible;
