import {loadLevel} from './lib/level';

const {board, figures} = loadLevel(3, 'A');

console.log(`Available figures ${figures.map((figure) => figure.name).join(', ')}`);

for (let figure of figures) {
  figure.applyAllPossibleRotationsAndFlips((variant) => {
    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        if (board.canPlaceFigure(x, y, variant)) {
          board.placeFigure(x, y, variant);
          console.log(board.placedFigures.map((placed) => `Figure ${placed.figure.name} on ${placed.x}:${placed.y}`));
          console.log(board.getPrintable());
          const gaps = board.findGaps();
          if (gaps.some((gap) => gap.length < 5)) {
            board.removeLastFigure();
            continue;
          }
          return true;
        }
      }
    }
    return false;
  });
}

