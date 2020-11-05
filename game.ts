import {Board} from './lib/board';
import {Figure} from './lib/figure';
import {
  getBoardSizes,
  getChallengeNames,
  getSetNames,
  loadLevel,
} from './lib/challenge';
import * as prompts from 'prompts';

function findPlace(board: Board, figures: Figure[]): boolean {
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
          if (gaps.some((gap) => gap.length % 5 !== 0)) {
            // console.log('Gap is useless, removing');
            board.removeLastFigure();
            // console.log(board.getPrintable());
            continue;
          }
          const isNextSuccessful = findPlace(board, figures);
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

async function askLevel() {
  const challengeQuestion = await prompts({
    type: 'select',
    name: 'challengeName',
    message: 'Select challenge',
    choices: getChallengeNames().map((name) => ({
      title: name,
      value: name
    }))
  });
  const sizeQuestion = await prompts({
      type: 'select',
      name: 'size',
      message: 'Select board size',
      choices: getBoardSizes(challengeQuestion.challengeName).map((size) => ({
        title: `${size}`,
        value: size
      }))
  });
  const setQuestion = await prompts({
    type: 'select',
    name: 'setName',
    message: 'Select the set of figures',
    choices: getSetNames(challengeQuestion.challengeName).map((name) => ({
      title: name,
      value: name
    }))
  });
  type ArrayElement<A> = A extends (infer T)[] ? T : never
  return {
    challengeName: challengeQuestion.challengeName as ArrayElement<ReturnType<typeof getChallengeNames>>,
    size: sizeQuestion.size as ArrayElement<ReturnType<typeof getBoardSizes>>,
    setName: setQuestion.setName as ArrayElement<ReturnType<typeof getSetNames>>,
  };
}

askLevel().then(({challengeName, size, setName}) => {
  const {name: levelName, board, figures} = loadLevel(challengeName, size, setName);
  console.log(`Board ${board.width}x${board.height}, Level ${levelName}`);
  console.log(`Available figures: ${figures.map((figure) => figure.name).join(', ')}`);
  console.log(board.getPrintable(), '\nSolving...');
  findPlace(board, figures);
  console.log(board.getPrintable());
});

