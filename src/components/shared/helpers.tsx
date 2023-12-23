import {Direction} from 'types/deck';
export function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0));
}

// export function difference(
//     setA: Set<number | string>, setB: Set<number | string>,
// ) {
//   const _difference = new Set(setA);
//   for (const elem of setB) {
//     _difference.delete(elem);
//   }
//   return _difference;
// }
export function difference(setA: Set<string>, setB: Set<string>): Set<string>;
export function difference(setA: Set<number>, setB: Set<number>): Set<number>;

export function difference<T extends number | string>(
    setA: Set<T>, setB: Set<T>,
): Set<T> {
  const _difference = new Set<T>(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

const keyPressDirection: { [key: string]: Direction } = {
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowLeft: 'left',
  ArrowDown: 'down',
};

const getDirection = (x: number, y: number): Direction => {
  if (Math.abs(x) > Math.abs(y)) {
    // Horizontal movement is dominant
    return x > 0 ? 'right' : 'left';
  } else {
    // Vertical movement is dominant or equal
    return y > 0 ? 'down' : 'up';
  }
};

export function getXYFromDirection(
    direction: Direction,
): { x: number; y: number } {
  switch (direction) {
    case 'right':
      return {x: 200 + window.innerWidth, y: 0};
    case 'left':
      return {x: -200 - window.innerWidth, y: 0};
    case 'down':
      return {x: 0, y: 200 + window.innerHeight};
    case 'up':
      return {x: 0, y: -200 - window.innerHeight};
    default:
      return {x: 0, y: 0};
  }
}

// Calculate card direciton based off key press
const keyPressCardPosition = (keys: string[], direction: string) => {
  let x = 0;
  let y = 0;

  // If the options include a corresponding answer to keypress, send the card
  // Otherwise, move it slightly
  switch (direction) {
    case 'up':
      if (keys.includes('up')) {
        y = -(200 + window.innerWidth);
      } else {
        y = -10 * Math.random();
      }
      break;
    case 'right':
      if (keys.includes('right')) {
        x = (200 + window.innerWidth);
      } else {
        x = 10 * Math.random();
      }
      break;
    case 'left':
      if (keys.includes('left')) {
        x = -(200 + window.innerWidth);
      } else {
        x = -10 * Math.random();
      }
      break;
    case 'down':
      if (keys.includes('down')) {
        y = (200 + window.innerHeight);
      } else {
        y = 10 * Math.random();
      }
      break;
  }

  return [x, y];
};

export {
  keyPressDirection,
  getDirection,
  keyPressCardPosition,
};
