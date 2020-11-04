const humanReadableTrue = 'X';
const humanReadableFalse = '.';
type HumanReadableFalse = typeof humanReadableFalse;
type HumanReadableTrue = typeof humanReadableTrue;
type HumanReadablePattern = (HumanReadableFalse | HumanReadableTrue)[];

interface Shape {
  width: number;
  height: number;
  pattern: boolean[];
}

export type FigureName = 'F' | 'I' | 'L' | 'N' | 'P' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

type Direction = 'R' | 'L' | 'U' | 'D'; // right, left, up, down
type Vector = Direction[];
const rotationsRight: Record<Direction, Direction> = {
  R: 'D',
  L: 'U',
  U: 'R',
  D: 'L'
};
const rotationsLeft: Record<Direction, Direction> = {
  R: 'U',
  L: 'D',
  U: 'L',
  D: 'R'
};
const flip: Record<Direction, Direction> = {
  L: 'R',
  R: 'L',
  U: 'U',
  D: 'D'
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
  vector: Vector;

  constructor(name: FigureName, options: FigureOptions, vector: Vector) {
    this.name = name;
    this.options = options;
    this.isLocked = false;
    this.vector = vector;
  }

  lock() {
    this.isLocked = true;
  }

  unlock() {
    this.isLocked = false;
  }

  walk(initialX: number, initialY: number, cb: (x: number, y: number) => boolean) {
    let x = initialX;
    let y = initialY;
    let success = cb(x, y);
    if (!success) {
      return false;
    }
    for (let cell of this.vector) {
      switch (cell) {
        case 'R':
          x++;
          break;
        case 'L':
          x--;
          break;
        case 'D':
          y++;
          break;
        case 'U':
          y--;
          break;
      }
      success = cb(x, y);
      if (!success) {
        return false;
      }
    }
    return true;
  }

  getShape(): Shape {
    let matrix: {[K: number]: {[K: number]: true}} = {};
    this.walk(10, 10, (x, y) => {
      if (!matrix[y]) {
        matrix[y] = {};
      }
      matrix[y][x] = true;
      return true;
    })
    const height = Object.keys(matrix).length;
    const minY = Math.min(...Object.keys(matrix).map((y) => Number(y)));
    const minX = Math.min(...Object.values(matrix).map((row) =>
      Math.min(...Object.keys(row).map((x) => Number(x)))));
    const maxX = Math.max(...Object.values(matrix).map((row) =>
      Math.max(...Object.keys(row).map((x) => Number(x)))));
    const width = maxX - minX + 1;
    let pattern: boolean[] = Array(height * width).fill(false);
    Object.keys(matrix).forEach((y) => {
      Object.keys(matrix[y]).forEach((x) => {
        const index = (Number(y) - minY) * width + Number(x) - minX;
        pattern[index] = true;
      });
    });
    return {width, height, pattern}
  }

  getHumanReadablePattern(): HumanReadablePattern {
    return this.getShape().pattern.map((cell) => cell ? humanReadableTrue : humanReadableFalse);
  }

  rotate(isClockwise: boolean = false) {
    if (this.isLocked) {
      return;
    }
    this.vector = this.vector
      .map((direction) => isClockwise ? rotationsRight[direction] : rotationsLeft[direction]);
  }

  flip() {
    if (this.isLocked) {
      return;
    }
    this.vector = this.vector.map((direction) => flip[direction]);
  }

  getPrintablePattern() {
    const shape = this.getShape();
    let result = '';
    for (let y = 0; y < shape.height; y++) {
      result += '\n' + shape.pattern
        .slice(y * shape.width, (y + 1) * shape.width)
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
    F: new Figure('F',  {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    },['R', 'D', 'U', 'U', 'R']),
    I: new Figure('I',  {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: false
    }, ['R', 'R', 'R', 'R']),
    L: new Figure('L',  {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    }, ['U', 'U', 'U', 'R']),
    N: new Figure('N',  {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    }, ['U', 'U', 'R', 'U']),
    P: new Figure('P',  {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    }, ['R', 'D', 'L', 'D']),
    T: new Figure('T', {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: true
    }, ['R', 'R', 'L', 'D', 'D']),
    U: new Figure('U', {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: true
    }, ['D', 'R', 'R', 'U']),
    V: new Figure('V', {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: true
    }, ['D', 'D', 'R', 'R']),
    W: new Figure('W', {
      isFlippable: false,
      isRotatable90: true,
      isRotatable180: true
    }, ['D', 'R', 'D', 'R']),
    X: new Figure('X', {
      isFlippable: false,
      isRotatable90: false,
      isRotatable180: false
    }, ['R', 'U', 'D', 'R', 'L', 'D']),
    Y: new Figure('Y', {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: true
    }, ['R', 'U', 'D', 'D', 'D']),
    Z: new Figure('Z', {
      isFlippable: true,
      isRotatable90: true,
      isRotatable180: false
    }, ['R', 'D', 'D', 'R'])
  };
}


