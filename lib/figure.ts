const humanReadableTrue = 'X';
const humanReadableFalse = '.';
type HumanReadableFalse = typeof humanReadableFalse;
type HumanReadableTrue = typeof humanReadableTrue;
type HumanReadablePattern = (HumanReadableFalse | HumanReadableTrue)[];

type FigureName = 'F' | 'I' | 'L' | 'N' | 'P' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

export interface Shape {
  width: number;
  getHeight: () => number;
  pattern: boolean[];
}

export class Figure {
  name: FigureName;
  isFlippable: boolean;
  isLocked: boolean;
  shape: Shape;

  constructor(name: FigureName, width: number, isFlippable: boolean, pattern: HumanReadablePattern) {
    this.name = name;
    this.isFlippable = isFlippable;
    this.isLocked = false;
    this.shape = {
      width,
      getHeight: () => pattern.length / width,
      pattern: pattern.map((item) => item === humanReadableTrue)
    };
  }

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }

  getHumanReadablePattern(): HumanReadablePattern {
    return this.shape.pattern.map((cell) => cell ? humanReadableTrue : humanReadableFalse);
  }

  rotate(isClockwise: boolean = false) {
    if (this.isLocked) {
      return;
    }
    const newWidth = this.shape.getHeight();
    let newPattern: Shape['pattern'] = [];
    for (let y = 0; y < this.shape.getHeight(); y++) {
      for (let x = 0; x < this.shape.width; x++) {
        const srcIndex = y * this.shape.width + x;
        const newIndex = isClockwise ? newWidth * x + newWidth - y - 1 : (this.shape.width - x - 1) * newWidth + y;
        newPattern[newIndex] = this.shape.pattern[srcIndex];
      }
    }
    this.shape = {
      width: newWidth,
      getHeight: this.shape.getHeight,
      pattern: newPattern
    };
  }

  flip() {
    if (this.isLocked) {
      return;
    }
    for (let y = 0; y < this.shape.getHeight(); y++) {
      for (let x = 0; x < this.shape.width / 2; x++) {
        const srcIndex = y * this.shape.width + x;
        const newIndex = (y + 1) * this.shape.width - x - 1;
        [this.shape.pattern[newIndex], this.shape.pattern[srcIndex]] =
          [this.shape.pattern[srcIndex], this.shape.pattern[newIndex]];
      }
    }
  }

  getPrintablePattern() {
    let result = '';
    for (let y = 0; y < this.shape.getHeight(); y++) {
      result += '\n' + this.shape.pattern
        .slice(y * this.shape.width, (y + 1) * this.shape.width)
        .map((cell) => cell ? humanReadableTrue : humanReadableFalse)
        .join('');
    }
    return result;
  }
}

export function createFigures(): Record<FigureName, Figure>{
  return {
    F: new Figure('F', 3, true, [
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]),
    I: new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']),
    L: new Figure('L', 2, true, [
      'X', 'X',
      'X', '.',
      'X', '.',
      'X', '.'
    ]),
    N: new Figure('N', 2, true, [
      '.', 'X',
      'X', 'X',
      'X', '.',
      'X', '.'
    ]),
    P: new Figure('P', 2, true, [
      'X', 'X',
      'X', 'X',
      'X', '.'
    ]),
    T: new Figure('T', 3, false, [
      'X', 'X', 'X',
      '.', 'X', '.',
      '.', 'X', '.'
    ]),
    U: new Figure('U', 3, false, [
      'X', '.', 'X',
      'X', 'X', 'X'
    ]),
    V: new Figure('V', 3, false, [
      'X', '.', '.',
      'X', '.', '.',
      'X', 'X', 'X'
    ]),
    W: new Figure('W', 3, false, [
      'X', '.', '.',
      'X', 'X', '.',
      '.', 'X', 'X'
    ]),
    X: new Figure('X', 3, false, [
      '.', 'X', '.',
      'X', 'X', 'X',
      '.', 'X', '.'
    ]),
    Y: new Figure('Y', 2, true, [
      '.', 'X',
      'X', 'X',
      '.', 'X',
      '.', 'X'
    ]),
    Z: new Figure('Z', 3, true, [
      'X', 'X', '.',
      '.', 'X', '.',
      '.', 'X', 'X'
    ])
  };
}


