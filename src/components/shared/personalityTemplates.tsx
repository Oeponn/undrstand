/* eslint-disable max-len */
import {PersonalityDict} from 'types/deck';

export const personalities: PersonalityDict = {
  ISTJ: {
    element: 'Earth',
    elementDesc: 'Symbolizes a strong foundation, reliability, and practicality. Takes a pragmatic approach to life.',
    title: 'The Inspector',
    titleDesc: 'Known for their methodical and rule-abiding nature, they bring structure and meticulousness to their endeavors.',
    risk: 'Repression',
    riskDesc: 'May repress feelings or desires to maintain order and tradition.',
    concept: 'Schopenhauer\'s Pessimism',
    conceptDesc: 'Might see the world in a rather pessimistic way, focusing on duties and responsibilities over pleasures.',
    traits: ['Organized', 'Dependable', 'Practical'],
    quotes: [
      'I try to stay grounded',
      'Rules should be followed!',
      'I must work hard',
      'I will be prepared for anything',
      'I could use a change of pace!',
    ],
    compatible: ['ESFJ', 'ISFJ'],
    incompatible: ['ENFP', 'INFP'],
    baseColor: 'rgb(168, 116, 76)', // Earthy brown
    secondaryColor: 'rgb(87, 141, 67)', // Leaf green
    thirdColor: 'rgb(194, 178, 128)', // Sand beige
    fourthColor: 'rgb(120, 91, 59)', // Dark brown
    accentColor: 'rgb(247, 208, 122)', // Sunflower yellow
    darkText: 'rgb(45, 45, 45)',
    lightText: 'rgb(220, 220, 220)',
  },
  ISFJ: {
    element: 'Water',
    elementDesc: 'With its nurturing and adaptable qualities, tends towards a caring and supportive nature.',
    title: 'The Protector',
    titleDesc: 'Dedicated and warm, they focus on creating harmony and security in their environments.',
    risk: 'Projection',
    riskDesc: 'Could project own nurturing needs onto others, constantly caring for them.',
    concept: 'Jung\'s Persona',
    conceptDesc: 'May over-identify with their social roles, losing touch with their inner self.',
    traits: ['Caring', 'Attentive', 'Loyal'],
    quotes: [
      'Let me take care of you!',
      'Are you feeling okay?',
      'I\'m meticulous about schedules',
      'I remember your birthday!',
      'I like to maintain harmony in my environment',
    ],
    compatible: ['ESTJ', 'ESFJ'],
    incompatible: ['ENTP', 'ENFP'],
    baseColor: 'rgb(137, 187, 202)', // Soft blue
    secondaryColor: 'rgb(25, 149, 173)', // Richer blue
    thirdColor: 'rgb(162, 210, 223)', // Pale cyan
    fourthColor: 'rgb(113, 158, 171)', // Slate blue
    accentColor: 'rgb(255, 193, 130)', // Desaturated orange
    darkText: 'rgb(50, 50, 50)',
    lightText: 'rgb(210, 210, 210)',
  },
  INFJ: {
    element: 'Moon',
    elementDesc: 'Reflects depth, intuition, and understanding, empathetic and insightful towards others.',
    title: 'The Counselor',
    titleDesc: 'Empathetic and visionary, they are driven by their deeply held values and a desire to help others grow.',
    risk: 'Sublimation',
    riskDesc: 'Likely to channel deep emotions and insights into creative or humanitarian efforts.',
    concept: 'Kafkaesque Transformation',
    conceptDesc: 'Could struggle with feeling misunderstood or out of place, if energy is not expended in a self-satisfactory way.',
    traits: ['Insightful', 'Empathetic', 'Idealistic'],
    quotes: [
      'I want to know what motivates others',
      'Let me connect with you!',
      'I can make the world better',
      'What is the meaning of life?',
      'I often smell insincerity!',
    ],
    compatible: ['ENFP', 'ENTP'],
    incompatible: ['ESTP', 'ESFP'],
    baseColor: 'rgb(199, 203, 209)', // Moon gray
    secondaryColor: 'rgb(115, 120, 128)', // Darker gray
    thirdColor: 'rgb(225, 229, 234)', // Pale gray
    fourthColor: 'rgb(169, 174, 181)', // Medium gray
    accentColor: 'rgb(255, 223, 186)', // Warm beige
    darkText: 'rgb(55, 55, 55)',
    lightText: 'rgb(200, 200, 200)',
  },
  INTJ: {
    element: 'Dark Matter',
    elementDesc: 'Represents the unseen depths and forces of the universe, possess strategic and innovative thinking that can be difficult for others to decipher.',
    title: 'The Mastermind',
    titleDesc: 'Visionary and determined, they approach life with a clear plan and a focus on future possibilities.',
    risk: 'Intellectualization',
    riskDesc: 'May use intellect and logic to detach from emotional experiences. May consider emotion an inhibitor to productivity.',
    concept: 'Sartre\'s Hell is Other People',
    conceptDesc: 'Strives for self-overcoming and shaping their own values, is aware but fairly unbothered that it may result in an individualism that causes social isolation.',
    traits: ['Strategic', 'Analytical', 'Independent'],
    quotes: [
      'I hold grudges! But also remember favors',
      'I like solving difficult problems!',
      'My brain is wrinkly! I am confident in my abilities',
      'I\'d rather work alone',
      'I have a low tolerance for incompetence',
    ],
    compatible: ['ENTP', 'ENFP'],
    incompatible: ['ESFJ', 'ISFJ'],
    baseColor: 'rgb(49, 38, 75)', // Deep purple
    secondaryColor: 'rgb(77, 59, 119)', // Purple
    // thirdColor: 'rgb(58, 45, 86)', // Dark violet
    thirdColor: 'rgb(94, 81, 122)', // Dark violet
    fourthColor: 'rgb(35, 28, 55)', // Almost black purple
    accentColor: 'rgb(255, 184, 108)', // Bright peach
    darkText: 'rgb(40, 40, 40)',
    lightText: 'rgb(230, 230, 230)',
  },
  ISTP: {
    element: 'Iron',
    elementDesc: 'Known for its strength and versatility, holds a practical, resourceful nature.',
    title: 'The Craftsman',
    titleDesc: 'Skilled problem solvers, they excel in understanding systems and finding efficient solutions.',
    risk: 'Isolation',
    riskDesc: 'Tends to isolate themselves emotionally, focusing more on practical tasks.',
    concept: 'Camus\' Absurdism',
    conceptDesc: 'May resonate with the notion of life\'s inherent meaninglessness and value or operate predominantly on a notion of personal freedom.',
    traits: ['Resourceful', 'Adaptable', 'Independent'],
    quotes: [
      'No talk, just let me do it!',
      'I keep level headed, even in stressful situations',
      'I\'m a bit lonely',
      'I\'ll me fix it!',
      'I am adaptable and resourceful',
    ],
    compatible: ['ESTP', 'ESFP'],
    incompatible: ['ENFJ', 'INFJ'],
    baseColor: 'rgb(77, 77, 77)', // Iron gray
    secondaryColor: 'rgb(128, 128, 128)', // Medium gray
    thirdColor: 'rgb(102, 102, 102)', // Dark gray
    fourthColor: 'rgb(153, 153, 153)', // Light gray
    accentColor: 'rgb(219, 210, 144)', // Warm beige
    darkText: 'rgb(60, 60, 60)',
    lightText: 'rgb(190, 190, 190)',
  },
  ISFP: {
    element: 'Wood',
    elementDesc: 'Symbolizes growth, creativity, and flexibility, reflecting an artistic and adaptable spirit.',
    title: 'The Composer',
    titleDesc: 'Sensitive and creative, they see the world in a unique and aesthetic way.',
    risk: 'Fantasy',
    riskDesc: 'Might escape into their own artistic, idealistic world to avoid mundane or harsh realities.',
    concept: 'Kant\'s Aesthetic Judgment',
    conceptDesc: 'Deeply connected with beauty and the arts, much like Kant\'s views on aesthetic appreciation.',
    traits: ['Creative', 'Sensitive', 'Adventurous'],
    quotes: [
      'The world is so pretty!',
      'I live in the moment and enjoy new experiences',
      'I want to express myself',
      'I don\'t wanna think about it!',
      'If you need this, please take it',
    ],
    compatible: ['ESFP', 'ESTP'],
    incompatible: ['ENTJ', 'INTJ'],
    baseColor: 'rgb(133, 94, 66)', // Wood brown
    secondaryColor: 'rgb(167, 133, 106)', // Tan
    thirdColor: 'rgb(149, 108, 78)', // Cinnamon
    fourthColor: 'rgb(121, 85, 61)', // Dark wood
    // accentColor: 'rgb(112, 168, 0)', // Leaf green
    accentColor: 'rgb(172, 217, 82)',
    darkText: 'rgb(65, 65, 65)',
    lightText: 'rgb(180, 180, 180)',
  },
  INFP: {
    element: 'Light',
    elementDesc: 'As a symbol of hope and positivity, aligns with an idealistic and compassionate outlook.',
    title: 'The Healer',
    titleDesc: 'Guided by strong internal values, they seek to understand themselves and help others find their path.',
    risk: 'Introjection',
    riskDesc: 'Likely to internalize emotions and ideals, both good and bad, deeply into psyche.',
    concept: 'Freud\'s Dream Analysis',
    conceptDesc: 'Tends to delve deep into the symbolism of their dreams and unconscious, because literal experiences tend to imprint deeper than the average person.',
    traits: ['Empathetic', 'Idealistic', 'Introspective'],
    quotes: [
      'Why did I dream that my teeth fell out!?',
      'I believe in justice!',
      'Huh what did you say? I must\'ve spaced out',
      'I may cry on the inside if you tell me sad stories',
      'Many things are possible',
    ],
    compatible: ['ENFJ', 'ENTJ'],
    incompatible: ['ESTJ', 'ISTJ'],
    baseColor: 'rgb(255, 248, 220)', // Light yellow
    secondaryColor: 'rgb(255, 233, 155)', // Yellow
    thirdColor: 'rgb(255, 239, 186)', // Pale yellow
    fourthColor: 'rgb(255, 245, 208)', // Off-white yellow
    accentColor: 'rgb(0, 128, 128)', // Teal for contrast
    darkText: 'rgb(70, 70, 70)',
    lightText: 'rgb(170, 170, 170)',
  },
  INTP: {
    element: 'Ether',
    elementDesc: 'Encompassing the boundless and theoretical, resonates with abstract thinking and an innovative spirit.',
    title: 'The Architect',
    titleDesc: 'They are logical and creative thinkers, often exploring new ideas and possibilities.',
    risk: 'Rationalization',
    riskDesc: 'Could use rational thinking to justify emotional responses or confusing situations.',
    concept: 'Descartes\' Methodological Skepticism',
    conceptDesc: 'Constantly questioning and doubting, torn between objective and subjective. May appear to not take a side in disputes.',
    traits: ['Analytical', 'Inventive', 'Objective'],
    quotes: [
      'I\'m a little bit of an oddball',
      'I love abstract things',
      'Have you thought about it this way?',
      'I want to talk about the universe!',
      'Don\'t sweat the small stuff!',
    ],
    compatible: ['ENTJ', 'ESTJ'],
    incompatible: ['ESFJ', 'ISFJ'],
    baseColor: 'rgb(207, 207, 255)', // Ethereal blue
    secondaryColor: 'rgb(159, 159, 223)', // Medium blue
    thirdColor: 'rgb(223, 223, 255)', // Very light blue
    fourthColor: 'rgb(191, 191, 255)', // Light blue
    // accentColor: 'rgb(255, 69, 0)', // Red-orange
    accentColor: 'rgb(255, 173, 143)', // Red-orange
    darkText: 'rgb(75, 75, 75)',
    lightText: 'rgb(160, 160, 160)',
  },
  ESTP: {
    element: 'Fire',
    elementDesc: 'Symbolizing energy and dynamism, reflects an action-oriented and impactful nature.',
    title: 'The Dynamo',
    titleDesc: 'They live in the moment and enjoy making things happen with their bold and resourceful approach.',
    risk: 'Denial',
    riskDesc: 'May deny problems or emotional complexities, focusing instead on immediate action and thrill.',
    concept: 'Hobbes\' State of Nature',
    conceptDesc: 'Resonates with the idea of natural freedom and self-preservation. Will engage in conflict if social or material resources are scarce.',
    traits: ['Energetic', 'Adventurous', 'Perceptive'],
    quotes: [
      'I\'m good in a crisis',
      'Waiter! My friend\'s food is too salty please fix it',
      'I like to take risks',
      'I will do anything to take care of my circle',
      'Hey, go wake up that sleeping dog!',
    ],
    compatible: ['ISFJ', 'ISTJ'],
    incompatible: ['INFJ', 'INFP'],
    baseColor: 'rgb(230, 115, 0)', // Flame orange
    secondaryColor: 'rgb(255, 69, 0)', // Bright red-orange
    thirdColor: 'rgb(255, 140, 0)', // Dark orange
    fourthColor: 'rgb(255, 165, 0)', // Orange
    accentColor: 'rgb(34, 34, 34)', // Almost black for contrast
    darkText: 'rgb(80, 80, 80)',
    lightText: 'rgb(150, 150, 150)',
  },
  ESFP: {
    element: 'Starlight',
    elementDesc: 'Radiant and captivating, embodies the lively and entertaining qualities.',
    title: 'The Performer',
    titleDesc: 'Charismatic and sociable, they love being the center of attention and bringing joy to others.',
    risk: 'Regression',
    riskDesc: 'In stressful situations, might revert to more childlike, attention-seeking behaviors.',
    concept: 'Epicureanism',
    conceptDesc: 'Focuses on pleasure and avoiding pain as primary motivators. After all, why worry about things out of your control?',
    traits: ['Sociable', 'Spontaneous', 'Fun-loving'],
    quotes: [
      'Put the spotlight on me!',
      'My life is a stage and I am the lead!',
      'Even if I\'m not happy, I can cheer others up',
      'I\'m spontaneous and fun-loving',
      'Can someone take care of me, please?',
    ],
    compatible: ['ISFP', 'ISTP'],
    incompatible: ['INTJ', 'INFJ'],
    baseColor: 'rgb(255, 215, 0)', // Gold
    secondaryColor: 'rgb(255, 223, 0)', // Bright yellow
    thirdColor: 'rgb(255, 228, 181)', // Light gold
    fourthColor: 'rgb(255, 239, 153)', // Pale gold
    accentColor: 'rgb(0, 0, 139)', // Dark blue
    darkText: 'rgb(85, 85, 85)',
    lightText: 'rgb(140, 140, 140)',
  },
  ENFP: {
    element: 'Aurora',
    elementDesc: 'Ever-changing and colorful display, mirrors an imaginative and inspiring nature.',
    title: 'The Champion',
    titleDesc: 'Enthusiastic and imaginative, they champion causes and ideas they passionately believe in.',
    risk: 'Daydreaming',
    riskDesc: 'Prone to daydreaming as a means of escape and to explore their idealistic visions.',
    concept: 'Jung\'s Archetypes',
    conceptDesc: 'Often embodies the archetype of the hero or the rebel, trying to make a significant change in the world. May result in others having strong opinions towards them.',
    traits: ['Enthusiastic', 'Creative', 'Empathetic'],
    quotes: [
      'Life is so full of possibilities!',
      'I will look after you at a party',
      'Go! Go! Go!',
      'I have so many unfinished projects...',
      'Of course you can join me!',
    ],
    compatible: ['INFJ', 'INTJ'],
    incompatible: ['ISTJ', 'ESTJ'],
    baseColor: 'rgb(135, 206, 250)', // Sky blue
    secondaryColor: 'rgb(30, 144, 255)', // Dodger blue
    thirdColor: 'rgb(173, 216, 230)', // Light blue
    fourthColor: 'rgb(176, 224, 230)', // Powder blue
    // accentColor: 'rgb(255, 20, 147)', // Deep pink
    accentColor: 'rgb(255, 157, 209)',
    darkText: 'rgb(90, 90, 90)',
    lightText: 'rgb(130, 130, 130)',
  },
  ENTP: {
    element: 'Plasma',
    elementDesc: 'Representing high energy and versatility, aligns with an innovative and resourceful character.',
    title: 'The Visionary',
    titleDesc: 'Quick-witted and clever, they are constantly generating new ideas and strategies.',
    risk: 'Deflection',
    riskDesc: 'Might deflect personal issues or emotions by focusing on broader ideas or logical puzzles.',
    concept: 'Sartre\'s Existentialism',
    conceptDesc: ' Believes in creating their own essence through choices. May result in minor existential crises between explorations.',
    traits: ['Innovative', 'Intellectual', 'Charismatic'],
    quotes: [
      'Bleh I hate scheduling!',
      'I\'m bored, give me a real challenge',
      'Make the most of it!',
      'I am happy to debate a friend for hours',
      'I can see both sides!',
    ],
    compatible: ['INFJ', 'INTJ'],
    incompatible: ['ISFJ', 'ESFJ'],
    baseColor: 'rgb(255, 20, 147)', // Pink
    secondaryColor: 'rgb(219, 112, 147)', // Pale violet red
    thirdColor: 'rgb(255, 182, 193)', // Light pink
    fourthColor: 'rgb(255, 105, 180)', // Hot pink
    // accentColor: 'rgb(0, 0, 0)', // Black for contrast
    accentColor: 'rgb(255, 255, 255)', // Black for contrast
    darkText: 'rgb(95, 95, 95)',
    lightText: 'rgb(120, 120, 120)',
  },
  ESTJ: {
    element: 'Steel',
    elementDesc: 'Symbolizing strength and structure, resonates with organized and authoritative natures.',
    title: 'The Supervisor',
    titleDesc: 'Natural leaders, they ensure everything runs efficiently and smoothly.',
    risk: 'Reaction Formation',
    riskDesc: 'Could express the opposite of their true feelings or impulses to maintain control.',
    concept: 'Machiavelli\'s The Prince',
    conceptDesc: 'Their leadership style can sometimes reflect Machiavellian strategies - effective, but pragmatic and tactical. May value community wellbeing over individual.',
    traits: ['Leader', 'Organized', 'Practical'],
    quotes: [
      'I am the glue holding this group project together',
      'Efficiency! Efficiency! Efficiency!',
      'I could have saved time by saying it just once...',
      'Don\'t be unreasonable!',
      'Traditions are important to uphold!',
    ],
    compatible: ['ISFJ', 'ISTJ'],
    incompatible: ['INFP', 'ENFP'],
    baseColor: 'rgb(70, 130, 180)', // Steel blue
    secondaryColor: 'rgb(176, 196, 222)', // Light steel blue
    thirdColor: 'rgb(192, 192, 192)', // Silver
    fourthColor: 'rgb(211, 211, 211)', // Light gray
    accentColor: 'rgb(255, 0, 0)', // Red
    darkText: 'rgb(100, 100, 100)',
    lightText: 'rgb(110, 110, 110)',
  },
  ESFJ: {
    element: 'Golden Sun',
    elementDesc: 'Warm and life-giving, mirrors nurturing and supportive qualities.',
    title: 'The Provider',
    titleDesc: 'Sociable and caring, they ensure that the needs of others are met in an organized and harmonious way.',
    risk: 'Identification',
    riskDesc: 'Likely to identify strongly with others\' needs, sometimes losing sight of their own.',
    concept: 'Hume\'s Moral Sentimentalism',
    conceptDesc: 'Emphasizes empathy and communal harmony, believes morality is grounded in sentiment. Very aware of the emotional state of those around them.',
    traits: ['Sociable', 'Caring', 'Responsible'],
    quotes: [
      'Let me take care of you!',
      'Let us all work together!',
      'If you\'re happy, I\'m happy',
      'Orange is the name of my loyalty!',
      'I take my responsibilities seriously',
    ],
    compatible: ['ISTJ', 'ISFJ'],
    incompatible: ['INTP', 'ENTP'],
    baseColor: 'rgb(255, 215, 0)', // Gold
    secondaryColor: 'rgb(218, 165, 32)', // Goldenrod
    thirdColor: 'rgb(255, 232, 80)', // Bright gold
    fourthColor: 'rgb(255, 239, 153)', // Pale gold
    accentColor: 'rgb(202, 242, 255)', // Deep sky blue
    darkText: 'rgb(105, 105, 105)',
    lightText: 'rgb(100, 100, 100)',
  },
  ENFJ: {
    element: 'Wind',
    elementDesc: 'Guiding and influential, symbolizes a charismatic and persuasive character.',
    title: 'The Teacher',
    titleDesc: 'Natural mentors, they are skilled at understanding and motivating others towards growth.',
    risk: 'Altruism',
    riskDesc: 'May engage in altruism to fulfill personal needs and to feel valued.',
    concept: 'Plato\'s Philosopher King',
    conceptDesc: 'Aspires to lead and educate others for the greater good. Has an image of what a virtuous community looks like, and works towards it.',
    traits: ['Motivational', 'Empathetic', 'Charismatic'],
    quotes: [
      'I will sweep you away!',
      'I feel fulfilled when I help others',
      'I have a strong sense of community',
      'Inhale, exhale',
      'I think you\'ve got this!',
    ],
    compatible: ['INFP', 'ISFP'],
    incompatible: ['ISTP', 'ESTP'],
    baseColor: 'rgb(176, 196, 222)', // Light steel blue
    secondaryColor: 'rgb(135, 206, 235)', // Sky blue
    thirdColor: 'rgb(176, 224, 230)', // Powder blue
    fourthColor: 'rgb(240, 248, 255)', // Alice blue
    accentColor: 'rgb(255, 99, 71)', // Tomato red
    darkText: 'rgb(110, 110, 110)',
    lightText: 'rgb(90, 90, 90)',
  },
  ENTJ: {
    element: 'Lightning',
    elementDesc: 'Powerful and decisive, reflects an assertive and strategic nature.',
    title: 'The Commander',
    titleDesc: 'Bold and goal-oriented, they are natural leaders, skilled in decision-making and organization.',
    risk: 'Compensation',
    riskDesc: 'Might compensate for perceived weaknesses by being overly assertive or controlling.',
    concept: 'Ayn Rand\'s Objectivism',
    conceptDesc: 'Resonates with the focus on self-interest and rationality. Happiness is considered the moral purpose, and must be unified with productivity.',
    traits: ['Assertive', 'Strategic', 'Efficient'],
    quotes: [
      'We run this town!',
      'I must find my place in this world',
      'A life without ambition is boring!',
      'I am planning for the future',
      'One must imagine Sisyphus happy',
    ],
    compatible: ['INTP', 'ENTP'],
    incompatible: ['ESFP', 'ISFP'],
    baseColor: 'rgb(255, 255, 0)', // Electric yellow
    secondaryColor: 'rgb(175, 175, 255))', // Blue
    thirdColor: 'rgb(255, 255, 224)', // Light yellow
    fourthColor: 'rgb(173, 216, 230)', // Light blue
    accentColor: 'rgb(128, 0, 0)', // Maroon
    darkText: 'rgb(115, 115, 115)',
    lightText: 'rgb(80, 80, 80)',
  },
};
