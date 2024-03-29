/* eslint-disable max-len */
import {
  Card,
  CardTree,
  ScoreResultType,
} from '~/types/testTypes';

export const baseScores: ScoreResultType = {
  E: 0,
  I: 0,
  N: 0,
  S: 0,
  F: 0,
  T: 0,
  J: 0,
  P: 0,
};

export const blankCard: Card = {
  key: 'blank',
  title: '',
  description: '',
  question: 'You can still swipe around for fun...',
  visible: true,
  answer: '',
  type: 'question',
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

export const endCard: Card = {
  key: 'finished',
  title: 'Journey Completed',
  description: 'There are no more paths for you to take.',
  question: 'But you can still swipe around for fun...',
  visible: true,
  answer: '',
  type: 'question',
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
  key: 'default',
  title: 'Default',
  maxLength: 8,
  cards: {
    farewell: {
      key: 'farewell',
      title: 'Farewell',
      description: 'I won\'t take up too much more of your time, I hope you somewhat enjoyed this. Honestly, I\'m pretty excited to get this fully fleshed out. In the meantime though, I would love if you reached out for any job openings or interviews in America. I am in possession of an H1b visa, which will need to be transferred :3 thankyou',
      question: 'Will you reach out to me? (swiping to open links coming soon)',
      visible: true,
      answer: '',
      type: 'question',
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
        up: {E: 1},
        right: {I: 1},
        left: {P: 1},
        down: {J: 1},
      },
    },
    design: {
      key: 'design',
      title: 'Design',
      description: 'The typewriter effect was kind of a pain to control, I almost went and forked a branch for myself. But If you\'ve even gotten here to read this, I think it isn\'t bad if thinking in terms of attention economy, which was my main focus when designing this',
      question: 'Which attention time to monetary value exchange rate is highest?',
      visible: true,
      answer: '',
      type: 'question',
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
        up: {S: 1},
        right: {N: 1},
        left: {F: 1},
        down: {T: 1},
      },
    },
    hired: {
      key: 'hired',
      title: 'Hired',
      description: 'Oh you actually picked this one... in theory I\'ll see this in tracking but your best bet is to just contact me; my contacts are on the info page.',
      question: '',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        // up: 'A more conventional page with dropdowns and such would probably be better...',
        right: 'You will hear from me shortly',
        left: 'I just wanted to see what this would show, sorry',
        // down: 'Go to the next card',
      },
      next: {
        up: 'design',
        right: 'design',
        left: 'design',
        down: 'design',
      },
      scores: {
        up: {},
        right: {E: 1},
        left: {I: 1},
        down: {},
      },
    },
    goal: {
      key: 'goal',
      title: 'The End Goal',
      description: 'This site is a WIP for a personality test / choose your own adventure experience builder. I am currently finalizing the front and backends to support custom user builds. It is just a project to keep myself entertained mostly',
      question: 'Thoughts?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        up: 'That\'s neat',
        right: 'How does the typewriter effect work?',
        left: 'I am so impressed by this WIP allow me to hire you immediately',
        down: 'Was this difficult to make?',
      },
      next: {
        up: 'design',
        right: 'design',
        left: 'hired',
        down: 'design',
      },
      scores: {
        up: {F: 1},
        right: {N: 1},
        left: {E: 1},
        down: {S: 1},
      },
    },
    portfolio: {
      key: 'portfolio',
      title: 'Hello, World!',
      description: 'Hope that was somewhat fun. If you\'re looking at this page as a part of my portfolio, you\'re probably wondering what this is meant to be.',
      question: 'Go any direction to continue',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        up: 'Continue',
        right: 'Continue',
        left: 'Continue',
        down: 'Continue',
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
    },
    human: {
      key: 'human',
      title: 'The Prince',
      description: 'Turns out, that tortoise was the prince of a tortoise-man village! The king has personally come to reward you for saving his son - he is notably of a huge menacing stature. He laughs "Thank you for rescuing my son! This was definitely not a test and you definitely would not have been punished for walking past him!" You are welcomed as a permanent member of the village via party.',
      question: '',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        // up: 'Hmmm',
        right: 'Continue',
        left: 'Continue',
        // down: 'You need to work on your writing',
      },
      next: {
        up: 'settle',
        right: 'settle',
        left: 'settle',
        down: 'settle',
      },
      scores: {
        up: {},
        right: {T: 1},
        left: {F: 1},
        down: {},
      },
    },
    replicant: {
      key: 'replicant',
      title: 'Really?',
      description: 'A huge tortoise-man appears out of nowhere with literal boulders for fists. "How dare you abandon our tortoise prince?" He screams and starts pummelling you down into approximately a mashed potato consistency. "Honestly, I thought that was a pretty easy moral challenge to pass", he adds. "Bit unnecessary", you think, right before you black out.',
      question: 'Your journey has ended.',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        // up: 'Hmmm',
        right: 'End',
        left: 'End',
        // down: 'You need to work on your writing',
      },
      next: {
        up: 'portfolio',
        right: 'portfolio',
        left: 'portfolio',
        down: 'portfolio',
      },
      scores: {
        up: {},
        right: {F: 1},
        left: {T: 1},
        down: {},
      },
    },
    lose2: {
      key: 'lose2',
      title: 'Darwin Award',
      description: 'The rabbit comes flying out of the bushes and uppercuts you with its right paw, severing your brain stem and killing you instantly. Maybe you would do better to listen to advice given to you when entering a new environemnt.',
      question: 'Happy?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        up: 'Hmmm',
        right: 'Yes',
        left: 'No, I\'m dead',
        down: 'You need to work on your writing',
      },
      next: {
        up: 'portfolio',
        right: 'portfolio',
        left: 'portfolio',
        down: 'portfolio',
      },
      scores: {
        up: {T: 1},
        right: {E: 1},
        left: {I: 1},
        down: {F: 1},
      },
    },
    settle: {
      key: 'settle',
      title: 'Happily Ever After',
      description: 'You settle down and find a perfect tortoise partner, and end up with a dozen half-tortoise half-human children running around. You live happily ever after.',
      question: 'Which kid is your favorite?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        up: 'Raphael',
        right: 'Leonardo',
        left: 'Donatello',
        down: 'Michelangelo',
      },
      next: {
        up: 'portfolio',
        right: 'portfolio',
        left: 'portfolio',
        down: 'portfolio',
      },
      scores: {
        up: {F: 1},
        right: {J: 1},
        left: {P: 1},
        down: {T: 1},
      },
    },
    village: {
      key: 'village',
      title: 'The Village',
      description: 'You make the reasonable decision and walk around it. You arrive at the gates of a village of tortoise people. The guard at the gate tells you "Oh yeah, there\'s a feral hare out there, he would\'ve mauled the shit out of you if you got close for sure". You better get in here, or you\'ll be dead before you know it.',
      question: 'Enter this village?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        // up: 'End',
        right: 'Yes',
        left: 'No',
        // down: 'End',
      },
      next: {
        up: 'portfolio',
        right: 'settle',
        left: 'lose2',
        down: 'portfolio',
      },
      scores: {
        up: {},
        right: {F: 1},
        left: {T: 1},
        down: {},
      },
    },
    lose: {
      key: 'lose',
      title: 'Darwin Award',
      description: 'Yeah your survival instincts are pretty poor. The personality results page is a WIP but just know you\'ll be getting the most dead one. Like jesus, did you miss the fact that it was chest height and probably rabid!? I had to make a card for your death by rabid hare because you picked this option!',
      question: 'What do you have to say for yourself?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        // up: 'End',
        right: 'You literally could\'ve written it so I didn\'t die.',
        left: 'Booo! (disapproval)',
        // down: 'End',
      },
      next: {
        up: 'portfolio',
        right: 'portfolio',
        left: 'portfolio',
        down: 'portfolio',
      },
      scores: {
        up: {},
        right: {},
        left: {},
        down: {},
      },
    },
    closer: {
      key: 'closer',
      title: 'Worrying',
      description: 'After getting closer, you realize it truly is a little bit horrifying. It\'s foaming at the mouth, posturing aggressively and gnashing its teeth at you. Its white fur is matted in something crusted and dark.',
      question: 'There\'s a stick next to you. What do you do?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        up: 'Make a wide berth around it',
        right: 'Try to pet it',
        left: 'Fight it barehanded',
        down: 'Fight it with the stick',
      },
      next: {
        up: 'village',
        right: 'lose',
        left: 'lose',
        down: 'lose',
      },
      scores: {
        up: {J: 1},
        right: {F: 1},
        left: {T: 1},
        down: {P: 1},
      },
    },
    tortoise2: {
      key: 'tortoise2',
      title: 'The Tortoise',
      description: 'The road behind you crumbles. You find yourself in a desert, walking along in the sand. You look down and see the tortoise. The tortoise lays on its back, its belly baking in the hot sun, beating its legs trying to turn itself over, but it can\'t. Not without your help.',
      question: 'What do you do?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        right: 'Flip the tortoise back onto its feet',
        left: 'Keep walking',
      },
      next: {
        right: 'human',
        left: 'replicant',
      },
      scores: {
        up: {},
        right: {F: 1},
        left: {T: 1},
        down: {},
      },
    },
    tortoise: {
      key: 'tortoise',
      title: 'The Tortoise',
      description: 'You find yourself in a desert, walking along in the sand. You look down and see the tortoise. The tortoise lays on its back, its belly baking in the hot sun, beating its legs trying to turn itself over, but it can\'t. Not without your help.',
      question: 'What do you do?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        right: 'Flip the tortoise back onto its feet',
        left: 'Keep walking',
      },
      next: {
        right: 'human',
        left: 'replicant',
      },
      scores: {
        up: {},
        right: {F: 1},
        left: {T: 1},
        down: {},
      },
    },
    hare: {
      key: 'hare',
      title: 'The Hare',
      description: 'As you walk towards it, you realize the hare is actually much bigger than you thought. Its almost chest height. It blocks your path, eyes bloodshot and a little too jittery for comfort',
      question: 'What would you like to do?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        right: 'Get closer, maybe you can calm it down',
        left: 'Go back to the tortoise',
      },
      next: {
        right: 'closer',
        left: 'tortoise2',
      },
      scores: {
        up: {},
        right: {E: 1},
        left: {I: 1},
        down: {},
      },
    },
    fork: {
      key: 'fork',
      title: 'The Fork',
      description: 'You wake in an unfamiliar place. Ahead of you is a fork in the road. To your right, you see a hare. To your left, you see a tortoise',
      question: 'Which do you walk towards?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        right: 'Walk towards the hare',
        left: 'Walk towards the tortoise',
      },
      next: {
        right: 'hare',
        left: 'tortoise',
      },
      scores: {
        up: {},
        right: {S: 1},
        left: {N: 1},
        down: {},
      },
    },
    detour: {
      key: 'detour',
      title: 'Detour',
      description: 'Bit of a rebel ay? That\'s fine. I\'ve written a card to handle it, but just know you ARE adding more work for me.',
      question: 'LEFT or RIGHT?',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        // up: 'Up',
        right: 'Right',
        left: 'Left',
      },
      next: {
        // up: 'fork',
        right: 'fork',
        left: 'fork',
      },
      scores: {
        up: {},
        right: {P: 1},
        left: {J: 1},
        down: {},
      },
    },
    start: {
      key: 'start',
      title: 'The Beginning',
      description: 'Swipe left or right to make your decision, or you can use arrow keys on your keyboard if you are on desktop.',
      question: 'Try swiping left or right',
      visible: true,
      answer: '',
      type: 'question',
      options: {
        up: 'Up',
        right: 'Right',
        left: 'Left',
      },
      next: {
        up: 'detour',
        right: 'fork',
        left: 'fork',
      },
      scores: {
        up: {J: 1},
        right: {E: 1},
        left: {I: 1},
        down: {},
      },
    },
  },
};
