const humanReadableTrue = 'X';
const humanReadableFalse = '.';
type HumanReadableFalse = typeof humanReadableFalse;
type HumanReadableTrue = typeof humanReadableTrue;
type HumanReadablePattern = (HumanReadableFalse | HumanReadableTrue)[];

export type FigureName = 'F' | 'I' | 'L' | 'N' | 'P' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

export interface Shape {
  width: number;
  getHeight: () => number;
  pattern: boolean[];
}

interface FigureOptions {
  isRotatable90: boolean;
  isRotatable180: boolean;
  isFlippable: boolean;
}

export class Figure {
  name: FigureName;
  options: FigureOptions;
  isLocked: boolean;
  shape: Shape;

  constructor(name: FigureName, width: number, options: FigureOptions, pattern: HumanReadablePattern) {
    this.name = name;
    this.options = options;
    this.isLocked = false;
    this.shape = {
      width,
      getHeight: () => pattern.length / this.shape.width,
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

  /**
   * Iterates over all possible rotations and flips of the figure calling cb function with the figure as an argument
   * @param cb should return true if iteration was successful and the cycle should be stopped on that
   * @return boolean if some iteration was successful
   */
  applyAllPossibleRotationsAndFlips(cb: (figure: Figure) => boolean): boolean {
    if (this.isLocked) {
      return;
    }
    if (cb(this)) { // 0
      return true;
    }
    if (this.options.isRotatable90) {
      this.rotate();
      if (cb(this)) { // -90
        return true;
      }
      if (this.options.isRotatable180) {
        this.rotate();
        if (cb(this)) { // -180
          return true;
        }
        this.rotate();
        if (cb(this)) { // -270
          return true;
        }
        this.rotate(); // back to 0
      } else {
        this.rotate(true); // back to 0
      }
    }
    if (this.options.isFlippable) {
      this.flip();
      if (cb(this)) { // 0
        return true;
      }
      if (this.options.isRotatable90) {
        this.rotate();
        if (cb(this)) { // -90
          return true;
        }
        if (this.options.isRotatable180) {
          this.rotate();
          if (cb(this)) { // -180
            return true;
          }
          this.rotate();
          if (cb(this)) { // -270
            return true;
          }
          this.rotate(); // back to 0
        } else {
          this.rotate(true); // back to 0
        }
      }
      this.flip(); // back initial flip
    }
    return false;
  }
}

export function createFigures(): Record<FigureName, Figure> {
  return {
    F: new Figure('F', 3, {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    }, [
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]),
    I: new Figure('I', 5, {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: false
    }, ['X', 'X', 'X', 'X', 'X']),
    L: new Figure('L', 2, {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    }, [
      'X', 'X',
      'X', '.',
      'X', '.',
      'X', '.'
    ]),
    N: new Figure('N', 2, {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    }, [
      '.', 'X',
      'X', 'X',
      'X', '.',
      'X', '.'
    ]),
    P: new Figure('P', 2, {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    }, [
      'X', 'X',
      'X', 'X',
      'X', '.'
    ]),
    T: new Figure('T', 3, {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: true
    }, [
      'X', 'X', 'X',
      '.', 'X', '.',
      '.', 'X', '.'
    ]),
    U: new Figure('U', 3, {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: true
    }, [
      'X', '.', 'X',
      'X', 'X', 'X'
    ]),
    V: new Figure('V', 3, {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: true
    }, [
      'X', '.', '.',
      'X', '.', '.',
      'X', 'X', 'X'
    ]),
    W: new Figure('W', 3, {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: true
    }, [
      'X', '.', '.',
      'X', 'X', '.',
      '.', 'X', 'X'
    ]),
    X: new Figure('X', 3, {
      isFlippable: false,
      isRotatable90: false,
      isRotatable180: false
    }, [
      '.', 'X', '.',
      'X', 'X', 'X',
      '.', 'X', '.'
    ]),
    Y: new Figure('Y', 2, {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    }, [
      '.', 'X',
      'X', 'X',
      '.', 'X',
      '.', 'X'
    ]),
    Z: new Figure('Z', 3, {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: false
    }, [
      'X', 'X', '.',
      '.', 'X', '.',
      '.', 'X', 'X'
    ])
  };
}


