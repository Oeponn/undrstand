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
  options: OptionType;
  next: {[key: string]: string};
  // TODO
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  scores: {[key: string]: any};
};

export type CardTree = {
  maxLength: number,
  cards: {[key: string]: CardType}
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export type AnswerType = {
  answer: Direction;
  // dir: number;
};

export type AnswerKeyType = {
  [key: string]: AnswerType;
}

