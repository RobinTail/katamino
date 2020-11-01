const humanReadableTrue = 'X';
const humanReadableFalse = '.';
type HumanReadableFalse = typeof humanReadableFalse;
type HumanReadableTrue = typeof humanReadableTrue;
type HumanReadablePattern = (HumanReadableFalse | HumanReadableTrue)[];

export interface Shape {
  width: number;
  pattern: boolean[];
}

export class Figure {
  name: string;
  shape: Shape;

  constructor(name: string, width: number, pattern: HumanReadablePattern) {
    this.name = name;
    this.shape = {
      width,
      pattern: pattern.map((item) => item === humanReadableTrue)
    };
  }

  getHumanReadablePattern(): HumanReadablePattern {
    return this.shape.pattern.map((cell) => cell ? humanReadableTrue : humanReadableFalse);
  }

  rotate(isClockwise: boolean) {
    const newWidth = this.shape.pattern.length / this.shape.width;
    let newPattern: Shape['pattern'] = [];
    for (let y = 0; y < this.shape.pattern.length / this.shape.width; y++) {
      for (let x = 0; x < this.shape.width; x++) {
        const srcIndex = y * this.shape.width + x;
        const newIndex = isClockwise ? newWidth * x + newWidth - y - 1 : (this.shape.width - x - 1) * newWidth + y;
        newPattern[newIndex] = this.shape.pattern[srcIndex];
      }
    }
    this.shape = {
      width: newWidth,
      pattern: newPattern
    };
  }

  getPrintablePattern() {
    let result = '';
    for (let y = 0; y < this.shape.pattern.length / this.shape.width; y++) {
      result += '\n' + this.shape.pattern
        .slice(y * this.shape.width, (y + 1) * this.shape.width)
        .map((cell) => cell ? humanReadableTrue : humanReadableFalse)
        .join('');
    }
    return result;
  }
}

export const figures: Record<string, Figure> = {
  F: new Figure('F', 3, [
    '.', 'X', 'X',
    'X', 'X', '.',
    '.', 'X', '.'
  ]),
  I: new Figure('I', 5, ['X', 'X', 'X', 'X', 'X']),
  L: new Figure('L', 2, [
    'X', 'X',
    'X', '.',
    'X', '.',
    'X', '.'
  ]),
  N: new Figure('N', 2, [
    '.', 'X',
    'X', 'X',
    'X', '.',
    'X', '.'
  ]),
  P: new Figure('P', 2, [
    'X', 'X',
    'X', 'X',
    'X', '.'
  ]),
  T: new Figure('T', 3, [
    'X', 'X', 'X',
    '.', 'X', '.',
    '.', 'X', '.'
  ]),
  U: new Figure('U', 3, [
    'X', '.', 'X',
    'X', 'X', 'X'
  ]),
  V: new Figure('V', 3, [
    'X', '.', '.',
    'X', '.', '.',
    'X', 'X', 'X'
  ]),
  W: new Figure('W', 3, [
    'X', '.', '.',
    'X', 'X', '.',
    '.', 'X', 'X'
  ]),
  X: new Figure('X', 3, [
    '.', 'X', '.',
    'X', 'X', 'X',
    '.', 'X', '.'
  ]),
  Y: new Figure('Y', 2, [
    '.', 'X',
    'X', 'X',
    '.', 'X',
    '.', 'X'
  ]),
  Z: new Figure('Z', 3, [
    'X', 'X', '.',
    '.', 'X', '.',
    '.', 'X', 'X'
  ])
};


