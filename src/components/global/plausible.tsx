import plausibleTracker from 'plausible-tracker';

const plausible = plausibleTracker({
  domain: 'undrstand.me', // Replace with your domain
  apiHost: 'https://plausible.undrstand.me',
  // You can add additional options here if needed
});

export default plausible;
