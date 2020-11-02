import {Figure} from './figure';

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

  constructor(width: number) {
    this.width = width;
    this.height = staticHeight;
    this._reserved = Array(this.height * this.width);
    this.placedFigures = [];
    this._updateReservation();
  }

  _updateReservation() {
    this._reserved.fill(false);
    for (let placed of this.placedFigures) {
      for (let y = 0; y < placed.figure.shape.getHeight(); y++) {
        for (let x = 0; x < placed.figure.shape.width; x++) {
          this._reserved[(placed.y + y) * this.width + placed.x + x] =
            placed.figure.shape.pattern[y * placed.figure.shape.width + x];
        }
      }
    }
  }

  getPrintable() {
    let result = '\n' + '#'.repeat(this.width + 2);
    for (let y = 0; y < this.height; y++) {
      result += '\n#' + this._reserved
        .slice(y * this.width, (y + 1) * this.width)
        .map((cell) => cell ? 'F' : ' ')
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
    this._updateReservation();
  }

  removeLastFigure(): Figure {
    const placedFigure = this.placedFigures.pop();
    this._updateReservation();
    return placedFigure.figure;
  }
}