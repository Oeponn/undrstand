/* eslint-disable max-len */
import {
  CardType,
  CardTree,
} from 'types/deck';

export const blankCard: CardType = {
  key: 'blank',
  title: '',
  description: '',
  question: 'You can still swipe around for fun...',
  position: {x: 0, y: 0},
  options: {
    up: 'Up',
    right: 'Right',
    left: 'Left',
    down: 'Down',
  },
  next: {
    up: '',
    right: '',
    left: '',
    down: '',
  },
  scores: {
    up: {},
    right: {},
    left: {},
    down: {},
  },
};

export const endCard: CardType = {
  key: 'finished',
  title: 'Journey Completed',
  description: 'There are no more paths for you to take.',
  question: 'But you can still swipe around for fun...',
  position: {x: 0, y: 0},
  options: {
    up: 'Up',
    right: 'Right',
    left: 'Left',
    down: 'Down',
  },
  next: {
    up: '',
    right: '',
    left: '',
    down: '',
  },
  scores: {
    up: {},
    right: {},
    left: {},
    down: {},
  },
};

export const tempCards: CardTree = {
  title: 'Default',
  maxLength: 7,
  cards: {
    farewell: {
      key: 'farewell',
      title: 'Farewell',
      description: 'I won\'t take up too much more of your time, I hope you somewhat enjoyed this. Honestly, I\'m pretty excited to get this fully fleshed out. In the meantime though, I would love if you reached out for any job openings or interviews in America. I am in possession of an H1b visa, which will need to be transferred :3 thankyou',
      question: 'Will you reach out to me? (swiping to open links coming soon)',
      options: {
        up: 'LinkedIn: https://www.linkedin.com/in/tiger-shi/',
        right: 'Email: tigershi0110@gmail.com',
        left: 'Personal Website: https://tigershi.com/',
        down: 'GitHub for both my websites: https://github.com/Oeponn/',
      },
      next: {
        up: '_none',
        right: '_none',
        left: '_none',
        down: '_none',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    acceptance: {
      key: 'acceptance',
      title: 'Acceptance',
      description: 'I mean yeah, you\'re probably right. The typewriter effect is such a pain to control, I almost went and redesigned the whole thing myself. But If you\'ve even gotten here to read this, I think it isn\'t bad if thinking in terms of attention economy, which was my main focus when designing this',
      question: 'Which attention time to monetary value exchange rate is highest?',
      options: {
        up: 'Wordle: a few minutes per day. Sold for 1 million',
        right: 'Linktree: short but frequent uses due to utility. Valued at 1.3 billion',
        left: 'TikTok: the ultimate attention economy algorithm. Way too much',
        down: 'Making a personality test web app after being very vocal about disliking them for years: priceless',
      },
      next: {
        up: 'farewell',
        right: 'farewell',
        left: 'farewell',
        down: 'farewell',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    design: {
      key: 'design',
      title: 'The Design',
      description: 'Sometimes I get asked why I insist on making my portfolio so weird looking. Like yeah, I can make conventionally nice UI but in my own time I kind of like to make odd stuff I guess. I have no idea how many recruiters actually look at this because I haven\'t added click tracking yet...',
      question: 'Might as well have fun, eh?',
      options: {
        up: 'A more conventional page with dropdowns and such would probably be better...',
        right: 'Could do with a little bit of color at least...',
        left: 'Aren\'t you a full stack dev? Hurry up with the backend...',
        down: 'Go to the next card',
      },
      next: {
        up: 'acceptance',
        right: 'acceptance',
        left: 'acceptance',
        down: 'acceptance',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    tortoise: {
      key: 'tortoise',
      title: 'The Tortoise',
      description: 'Imagine. You\'re in a desert, walking along in the sand, when all of a sudden you look down and see a tortoise. The tortoise lays on its back, its belly baking in the hot sun, beating its legs trying to turn itself over, but it can\'t. Not without your help.',
      question: 'What do you do?',
      options: {
      // up: 'Sky burial',
        right: 'Flip the tortoise back onto its feet',
        left: 'Keep walking',
      // down: 'Buried',
      },
      next: {
        up: 'design',
        right: 'design',
        left: 'design',
        down: 'design',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    hare: {
      key: 'hare',
      title: 'The Hare',
      description: 'The hare is quite cute, but as you walk closer you realize its actually much bigger than you realize. Its almost chest height.',
      question: 'What would you like to do?',
      options: {
        up: 'A sharp stick is on the ground next to you. Try to hunt and eat it?',
        right: 'Tame it to keep as a pet',
        left: 'Walk past it, hopefully without disturbing it',
        down: 'Go back to the tortoise',
      },
      next: {
        up: 'design',
        right: 'design',
        left: 'design',
        down: 'tortoise',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    animals: {
      key: 'animals',
      title: 'The Race',
      description: 'To your right, you see a hare. To your left, you see a tortoise',
      question: 'Which do you walk towards?',
      options: {
        // up: 'That\'s cool',
        right: 'Walk towards the hare',
        left: 'Walk towards the tortoise',
        // down: 'I see',
      },
      next: {
        // up: 'tortoises',
        right: 'hare',
        left: 'tortoise',
        // down: 'tortoises',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    goal: {
      key: 'goal',
      title: 'The End Goal',
      description: 'This site is a WIP for a personality test / choose your own adventure experience. I am currently building the front and back ends to support custom builds from the user. It is just a project to keep myself entertained mostly',
      question: 'Thoughts?',
      options: {
        up: 'That\'s cool',
        right: 'I see',
        left: 'I am so impressed by this WIP please allow me to hire you immediately',
        down: 'Keep going',
      },
      next: {
        up: 'animals',
        right: 'animals',
        left: 'animals',
        down: 'animals',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    start: {
      key: 'start',
      title: 'The First Card',
      description: 'If you\'re looking at this page as a part of my portfolio, you\'re probably wondering what the hell this is. Try swiping or clicking your keyboard arrows',
      question: 'Click and drag this card',
      options: {
        up: 'Up',
        right: 'Right',
        left: 'Left',
        down: 'Down',
      },
      next: {
        up: 'goal',
        right: 'goal',
        left: 'goal',
        down: 'goal',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    }},
};
