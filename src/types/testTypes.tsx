export type OptionType = {
  up?: string;
  right?: string;
  down?: string;
  left?: string;
};

export type CardType = 'question' | 'results' | 'link';

export type mb =
  'INTJ' |
  'INTP' |
  'ENTJ' |
  'ENTP' |
  'INFJ' |
  'INFP' |
  'ENFJ' |
  'ENFP' |
  'ISTJ' |
  'ISFJ' |
  'ESTJ' |
  'ESFJ' |
  'ISTP' |
  'ISFP' |
  'ESTP' |
  'ESFP';

export type traitKey = 'I' | 'E' | 'S' | 'N' | 'F' | 'T' | 'J' | 'P';

export type Element = 'Earth' | 'Water' | 'Moon' | 'Dark Matter' | 'Iron' |
  'Wood' | 'Light' | 'Ether' | 'Fire' | 'Starlight' | 'Aurora' |
  'Plasma' | 'Steel' | 'Golden Sun' | 'Wind' | 'Lightning';

export type PersonalityDict = {[key in mb]: PersonalityType};
export type PersonalityType = {
  element: Element;
  elementDesc: string;
  title: string;
  titleDesc: string;
  risk: string;
  riskDesc: string;
  concept: string;
  conceptDesc: string;
  traits: string[];
  quotes: string[];
  compatible: mb[];
  incompatible: mb[];
  baseColor: string;
  secondaryColor: string;
  thirdColor: string;
  fourthColor: string;
  accentColor: string;
  darkText: string;
  lightText: string;
}

export type Attribute = 'E' | 'I'| 'S'| 'N'| 'F'| 'T'| 'P'| 'J';

export type ScoreType = {[key in Attribute]?: number};
export type ScoreResultType = {[key in Attribute]: number};

export type Card = {
  key: string;
  title: string;
  description: string;
  question: string;
  position?: {x: number, y: number}
  visible?: boolean;
  options: OptionType;
  isGone?: boolean;
  answer: Direction | '';
  index?: number;
  type: CardType;
  next: {[key in Direction]?: string};
  scores: {
    [key in Direction]: ScoreType
  };
  result?: mb;
};

export type CardTree = {
  key: string;
  title: string;
  maxLength: number;
  cards: {[key: string]: Card};
}

export type IndexType = {
  index: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export type AnswerKeyType = {
  [key: string]: Direction;
}

