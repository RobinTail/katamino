import {Board} from './board';
import {createFigures, Figure, FigureName} from './figure';

interface Level {
  name: string;
  board: Board;
  figures: Figure[];
}

export type ChallengeName = 'SmallSlam' | 'TheSlam';

export type SetName<S extends ChallengeName> = (S extends 'SmallSlam' ? ('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G') : never) |
  (S extends 'TheSlam' ? ('A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N') : never);

interface Challenge<N extends ChallengeName> {
  name: N;
  minSize: number;
  maxSize: number;
  sets: Record<SetName<N>, FigureName[]>;
}

const smallSlam: Challenge<'SmallSlam'> = {
  name: 'SmallSlam',
  minSize: 3,
  maxSize: 8,
  sets: {
    A: ['L', 'Y', 'T', 'P', 'W', 'Z', 'V', 'N'],
    B: ['N', 'P', 'U', 'L', 'Z', 'Y', 'T', 'W'],
    C: ['L', 'V', 'P', 'Y', 'N', 'U', 'Z', 'F'],
    D: ['Y', 'P', 'U', 'N', 'V', 'F', 'W', 'T'],
    E: ['L', 'N', 'V', 'Z', 'U', 'T', 'Y', 'W'],
    F: ['P', 'U', 'F', 'Y', 'T', 'N', 'L', 'W'],
    G: ['L', 'V', 'P', 'Z', 'Y', 'W', 'N', 'F']
  }
}

const theSlam: Challenge<'TheSlam'> = {
  name: 'TheSlam',
  minSize: 5,
  maxSize: 9,
  sets: {
    A: ['L', 'P', 'U', 'F', 'W', 'Y', 'Z', 'N', 'V'],
    B: ['Y', 'N', 'P', 'U', 'Z', 'V', 'T', 'L', 'F'],
    C: ['L', 'Y', 'V', 'T', 'W', 'Z', 'F', 'U', 'P'],
    D: ['N', 'V', 'P', 'U', 'F', 'W', 'L', 'Z', 'T'],
    E: ['L', 'Y', 'N', 'P', 'W', 'T', 'V', 'F', 'U'],
    F: ['L', 'P', 'U', 'Z', 'T', 'F', 'N', 'W', 'Y'],
    G: ['L', 'V', 'P', 'U', 'W', 'N', 'Y', 'T', 'Z'],
    H: ['L', 'N', 'P', 'T', 'W', 'Z', 'Y', 'F', 'V'],
    I: ['L', 'Y', 'V', 'U', 'Z', 'F', 'W', 'N', 'T'],
    J: ['L', 'V', 'P', 'F', 'W', 'Y', 'U', 'T', 'N'],
    K: ['L', 'Y', 'N', 'U', 'W', 'F', 'P', 'V', 'Z'],
    L: ['Y', 'V', 'P', 'Z', 'W', 'N', 'F', 'T', 'U'],
    M: ['L', 'Y', 'V', 'P', 'F', 'U', 'T', 'Z', 'W'],
    N: ['L', 'Y', 'P', 'Z', 'W', 'N', 'U', 'V', 'T']
  }
}

export const challenges: Record<ChallengeName, Challenge<ChallengeName>> = {
  SmallSlam: smallSlam,
  TheSlam: theSlam
}

export function loadLevel<C extends ChallengeName>(challengeName: C, boardSize: number, setName: SetName<C>): Level {
  const challenge = challenges[challengeName];
  let set: FigureName[] = challenge.sets[setName];
  const board = new Board(boardSize);
  const figures = createFigures();
  return {
    name: `${challengeName} ${boardSize}-${setName}`,
    board,
    figures: set.slice(0, boardSize).map((figureName) => figures[figureName])
  };
}
