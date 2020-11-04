import {Figure, FigureName} from './figure';
import * as chalk from 'chalk';

const staticHeight = 5;

interface PlacedFigure {
  x: number;
  y: number;
  figure: Figure;
}

export class Board {
  width: number;
  height: number;
  placedFigures: PlacedFigure[];
  _reserved: boolean[];
  _reservedBy: (FigureName | undefined)[];

  constructor(width: number) {
    this.width = width;
    this.height = staticHeight;
    this._reserved = Array(this.height * this.width);
    this._reservedBy = Array(this.height * this.width);
    this.placedFigures = [];
    this._updateReservation();
  }

  _updateReservation() {
    this._reserved.fill(false);
    this._reservedBy.fill(undefined);
    for (let placed of this.placedFigures) {
      for (let y = 0; y < placed.figure.shape.getHeight(); y++) {
        for (let x = 0; x < placed.figure.shape.width; x++) {
          if (placed.figure.shape.pattern[y * placed.figure.shape.width + x]) {
            const index = (placed.y + y) * this.width + placed.x + x;
            this._reserved[index] = true;
            this._reservedBy[index] = placed.figure.name;
          }
        }
      }
    }
  }

  getPrintable() {
    const colors: Record<FigureName, (text: string) => string> = {
      F: chalk.red,
      I: chalk.redBright,
      L: chalk.magenta,
      N: chalk.magentaBright,
      U: chalk.green,
      P: chalk.greenBright,
      T: chalk.blue,
      V: chalk.blueBright,
      W: chalk.yellow,
      X: chalk.white,
      Y: chalk.cyan,
      Z: chalk.cyanBright
    };
    let result = '\n' + '#'.repeat(this.width + 2);
    for (let y = 0; y < this.height; y++) {
      result += '\n#' + this._reservedBy
        .slice(y * this.width, (y + 1) * this.width)
        .map((figureName) => figureName ? colors[figureName](figureName) : ' ')
        .join('') + '#';
    }
    return result + '\n' + '#'.repeat(this.width + 2);
  }

  canPlaceFigure(x: number, y: number, figure: Figure) {
    if (x < 0 || y < 0) {
      return false;
    }
    if (x + figure.shape.width > this.width || y + figure.shape.getHeight() > this.height) {
      return false;
    }
    for (let fY = 0; fY < figure.shape.getHeight(); fY++) {
      for (let fX = 0; fX < figure.shape.width; fX++) {
        if (figure.shape.pattern[fY * figure.shape.width + fX]) {
          if (this._reserved[(y + fY) * this.width + x + fX]) {
            return false;
          }
        }
      }
    }
    return true;
  }

  placeFigure(x: number, y: number, figure: Figure) {
    this.placedFigures.push({x, y, figure});
    figure.lock();
    this._updateReservation();
  }

  removeLastFigure(): Figure {
    const placedFigure = this.placedFigures.pop();
    placedFigure.figure.unlock();
    this._updateReservation();
    return placedFigure.figure;
  }

  findGaps() {
    let gaps: number[][] = [];
    const hasIndexInGaps = (index: number) => gaps.some((gap) => gap.includes(index));
    for (let index = 0; index < this._reserved.length; index++) {
      if (!this._reserved[index]) {
        if (!hasIndexInGaps(index)) {
          gaps.push(this.getGapIndexesFrom(index));
        }
      }
    }
    return gaps;
  }

  getGapIndexesFrom(index: number, found: number[] = []): number[] {
    if (index < 0 || index >= this._reserved.length) {
      return found;
    }
    if (!this._reserved[index]) {
      if (!found.includes(index)) {
        found.push(index);
        found = this.getGapIndexesFrom(index - 1, found);
        found = this.getGapIndexesFrom(index + 1, found);
        found = this.getGapIndexesFrom(index - this.width, found);
        found = this.getGapIndexesFrom(index + this.width, found);
      }
    }
    return found;
  }
}
