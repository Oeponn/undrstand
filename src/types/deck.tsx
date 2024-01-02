export type OptionType = {
  // [key: string]: string;
  up?: string;
  right: string;
  down?: string;
  left: string;
};

export type CardType = {
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
  // next: {[key: string]: string};
  next: {[key in Direction]?: string};
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scores: {[key in Direction]?: any};
};

export type CardTree = {
  title: string;
  maxLength: number;
  cards: {[key: string]: CardType};
}

export type IndexType = {
  index: number;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

// export type AnswerType = {
//   answer: Direction;
//   // dir: number;
// };

export type AnswerKeyType = {
  [key: string]: Direction;
}

