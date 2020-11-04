import {loadLevel} from './lib/level';

const {name, board, figures} = loadLevel(8, 'A');

console.log(`Board ${board.width}x${board.height}, Level ${name}`);
console.log(`Available figures: ${figures.map((figure) => figure.name).join(', ')}`);
console.log(board.getPrintable());

function findPlace(): boolean {
  const figure = figures.shift();
  if (!figure) {
    return true; // no more figures
  }
  // console.log(`Dealing with figure ${figure.name}`);
  const isPlaced = figure.applyAllPossibleRotationsAndFlips((variant) => {
    // console.log(figure.getPrintablePattern());
    for (let y = 0; y < board.height; y++) {
      for (let x = 0; x < board.width; x++) {
        if (board.canPlaceFigure(x, y, variant)) {
          board.placeFigure(x, y, variant);
          // console.log(board.placedFigures.map((placed) => `Figure ${placed.figure.name} on ${placed.x}:${placed.y}`));
          // console.log(board.getPrintable());
          const gaps = board.findGaps();
          if (gaps.some((gap) => gap.length < 5)) {
            // console.log('Gap is useless, removing');
            board.removeLastFigure();
            // console.log(board.getPrintable());
            continue;
          }
          const isNextSuccessful = findPlace();
          if (!isNextSuccessful) {
            // console.log('Branch was not successful, rolling back')
            board.removeLastFigure();
            // console.log(board.getPrintable());
            continue;
          }
          return true;
        }
      }
    }
    return false;
  });
  if (!isPlaced) {
    // console.log(`placing figure ${figure.name} was not successful, hold it for next time`);
    figures.push(figure); // put back in stack
  }
  return isPlaced;
}

findPlace();
console.log(board.getPrintable());
