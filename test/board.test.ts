import {expect} from 'chai';
import {Board} from '../lib/board';
import {createFigures} from '../lib/figure';

describe('Board', () => {
  it('should be initialized properly', () => {
    const board = new Board(7);
    expect(board.width).to.be.eq(7);
    expect(board.height).to.be.eq(5);
    expect(board.placedFigures.length).to.be.eq(0);
    expect(board._reserved).to.be.deep.eq(Array(35).fill(false));
  });

  it('can check possibility of placing a figure', () => {
    const board = new Board(7);
    const figureI = createFigures().I;
    expect(
      board.canPlaceFigure(0, 0, figureI)
    ).to.be.true;
  });

  it('can check boundaries', () => {
    const board = new Board(7);
    const figureI = createFigures().I;
    expect(board.canPlaceFigure(-1, 0, figureI)).to.be.false;
    expect(board.canPlaceFigure(4, 0, figureI)).to.be.false;
    expect(board.canPlaceFigure(0, 5, figureI)).to.be.false;
    expect(board.canPlaceFigure(4, 5, figureI)).to.be.false;
  });

  it('can check other figures on board', () => {
    const board = new Board(5);
    const figures = createFigures();
    const figureY = figures.Y;
    const figureW = figures.W;
    board.placeFigure(0, 0, figureW);
    expect(board.canPlaceFigure(0, 1, figureY)).to.be.false;
    expect(board.canPlaceFigure(1, 1, figureY)).to.be.false;
    expect(board.canPlaceFigure(2, 1, figureY)).to.be.true;
  });

  it('can place figure', () => {
    const board = new Board(5);
    const figureI = createFigures().I;
    if (board.canPlaceFigure(0, 0, figureI)) {
      board.placeFigure(0, 0, figureI);
    }
    expect(board._reserved).to.be.deep.eq(
      Array(5).fill(true)
        .concat(Array(20).fill(false)),
      board.getPrintable()
    );
    expect(figureI.isLocked).to.be.true;
  });

  it('can place two figures', () => {
    const board = new Board(3);
    const figureL = createFigures().L;
    const figureT = createFigures().T;
    figureT.rotate();
    figureT.rotate(); // 180
    if (board.canPlaceFigure(0, 3, figureL)) {
      board.placeFigure(0, 3, figureL);
    }
    if (board.canPlaceFigure(2, 4, figureT)) {
      board.placeFigure(2, 4, figureT);
    }
    expect(board._reserved).to.be.deep.eq([
      true, true, false,
      true, false, false,
      true, true, false,
      true, true, false,
      true, true, true,
    ], board.getPrintable());
  });

  it('can remove last figure', () => {
    const board = new Board(5);
    const figureI = createFigures().I;
    board.placeFigure(0, 0, figureI);
    const removedFigure = board.removeLastFigure();
    expect(removedFigure).to.be.deep.eq(figureI);
    expect(removedFigure === figureI).to.be.true;
    expect(figureI.isLocked).to.be.false;
    expect(board._reserved).to.be.deep.eq(Array(25).fill(false));
  });

  it('can measure gap on empty board', () => {
    const board = new Board(5);
    expect(board.getGapIndexesFrom(0).length).to.be.eq(25);
  });

  it('can measure gap between figures', () => {
    const board = new Board(5);
    const figures = createFigures();
    const figureY = figures.Y;
    const figureW = figures.W;
    if (board.canPlaceFigure(0, 0, figureW)) {
      board.placeFigure(0, 0, figureW);
    }
    if (board.canPlaceFigure(2, 1, figureY)) {
      board.placeFigure(2, 1, figureY);
    }
    const gapIndexes = board.getGapIndexesFrom(1);
    expect(gapIndexes.length).to.be.eq(2, board.getPrintable());
    expect(gapIndexes).includes(1);
    expect(gapIndexes).includes(2);
  });

  it('can find all gaps', () => {
    const board = new Board(5);
    const figures = createFigures();
    const figureY = figures.Y;
    const figureW = figures.W;
    if (board.canPlaceFigure(0, 0, figureW)) {
      board.placeFigure(0, 0, figureW);
    }
    if (board.canPlaceFigure(2, 1, figureY)) {
      board.placeFigure(2, 1, figureY);
    }
    const gaps = board.findGaps();
    expect(gaps.length).to.be.eq(2);
    expect(gaps).to.be.deep.eq([
      [1, 2],
      [4, 9, 10, 15, 14, 19, 20, 21, 22, 23, 24, 17, 16]
    ], board.getPrintable());
  });

  it('can be solved in packing mode', () => {
    const board = new Board(12);
    const figures = createFigures();
    if (board.canPlaceFigure(0, 3, figures.L)) {
      board.placeFigure(0, 3, figures.L);
    }
    figures.W.rotate();
    if (board.canPlaceFigure(0, 4, figures.W)) {
      board.placeFigure(0, 4, figures.W);
    }
    figures.U.rotate();
    figures.U.rotate();
    if (board.canPlaceFigure(3, 2, figures.U)) {
      board.placeFigure(3, 2, figures.U);
    }
    figures.N.rotate(true);
    if (board.canPlaceFigure(2, 0, figures.N)) {
      board.placeFigure(2, 0, figures.N);
    }
    figures.P.flip();
    figures.P.rotate(true);
    if (board.canPlaceFigure(4, 4, figures.P)) {
      board.placeFigure(4, 4, figures.P);
    }
    if (board.canPlaceFigure(4, 2, figures.Z)) {
      board.placeFigure(4, 2, figures.Z);
    }
    if (board.canPlaceFigure(5, 0, figures.T)) {
      board.placeFigure(5, 0, figures.T);
    }
    figures.Y.flip();
    figures.Y.rotate();
    if (board.canPlaceFigure(7, 2, figures.Y)) {
      board.placeFigure(7, 2, figures.Y);
    }
    if (board.canPlaceFigure(7, 1, figures.X)) {
      board.placeFigure(7, 1, figures.X);
    }
    if (board.canPlaceFigure(7, 4, figures.I)) {
      board.placeFigure(7, 4, figures.I);
    }
    figures.F.flip();
    figures.F.rotate();
    figures.F.rotate();
    if (board.canPlaceFigure(9, 2, figures.F)) {
      board.placeFigure(9, 2, figures.F);
    }
    figures.V.rotate();
    figures.V.rotate();
    if (board.canPlaceFigure(11, 2, figures.V)) {
      board.placeFigure(11, 2, figures.V);
    }
    expect(board._reserved).to.be.deep.eq(Array(12 * 5).fill(true));
  });
});
