import {Board} from './board';
import {createFigures, Figure, FigureName} from './figure';

interface Level {
  board: Board;
  figures: Figure[];
}

type SetName = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';

export const levels: Record<SetName, FigureName[]> = {
  A: ['L', 'Y', 'T', 'P', 'W', 'Z', 'V', 'N'],
  B: ['N', 'P', 'U', 'L', 'Z', 'Y', 'T', 'W'],
  C: ['L', 'V', 'P', 'Y', 'N', 'U', 'Z', 'F'],
  D: ['Y', 'P', 'U', 'N', 'V', 'F', 'W', 'T'],
  E: ['L', 'N', 'V', 'Z', 'U', 'T', 'Y', 'W'],
  F: ['P', 'U', 'F', 'Y', 'T', 'N', 'L', 'W'],
  G: ['L', 'V', 'P', 'Z', 'Y', 'W', 'N', 'F']
};

export function loadLevel(boardSize: number, setName: SetName): Level {
  const board = new Board(boardSize);
  const figures = createFigures();
  return {
    board,
    figures: levels[setName].slice(0, boardSize + 1).map((figureName) => figures[figureName])
  };
}
