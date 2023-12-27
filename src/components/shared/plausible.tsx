import plausibleTracker from 'plausible-tracker';
import {Direction} from 'types/deck';
import {isTouchDevice} from 'components/shared/helpers';

const plausible = plausibleTracker({
  domain: 'undrstand.me', // Replace with your domain
  apiHost: 'https://plausible.undrstand.me',
  // You can add additional options here if needed
});

export const trackAnswer = ({
  treeKey, cardKey, direction, answer, method, resultsMode,
}:{
  treeKey: string,
  cardKey: string,
  direction: Direction,
  answer: string,
  method?: 'touch' | 'mouse' | 'keyPress',
  resultsMode: boolean,
},
) => {
// Track a custom event
  plausible.trackEvent('Answer', {
    props: {
      treeKey,
      cardKey,
      direction,
      answer,
      method: method ? method : (isTouchDevice() ? 'touch' : 'mouse'),
      resultsMode,
    },
  });
};

export default plausible;
