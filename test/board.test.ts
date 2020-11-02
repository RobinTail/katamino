import {expect} from 'chai';
import {Board} from '../lib/board';
import {Figure} from '../lib/figure';

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
    const figureI = new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']);
    expect(
      board.canPlaceFigure(0, 0, figureI)
    ).to.be.true;
  });

  it('can check boundaries', () => {
    const board = new Board(7);
    const figureI = new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']);
    expect(board.canPlaceFigure(-1, 0, figureI)).to.be.false;
    expect(board.canPlaceFigure(4, 0, figureI)).to.be.false;
    expect(board.canPlaceFigure(0, 5, figureI)).to.be.false;
    expect(board.canPlaceFigure(4, 5, figureI)).to.be.false;
  });

  it('can check other figures on board', () => {
    const board = new Board(5);
    const figureY = new Figure('Y', 2, true, [
      '.', 'X',
      'X', 'X',
      '.', 'X',
      '.', 'X'
    ]);
    const figureW = new Figure('W', 3, false, [
      'X', '.', '.',
      'X', 'X', '.',
      '.', 'X', 'X'
    ]);
    board.placeFigure(0, 0, figureW);
    expect(board.canPlaceFigure(0, 0, figureY)).to.be.false;
    expect(board.canPlaceFigure(1, 0, figureY)).to.be.false;
    expect(board.canPlaceFigure(2, 0, figureY)).to.be.true;
  });

  it('can place figure', () => {
    const board = new Board(5);
    const figureI = new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']);
    board.placeFigure(0, 0, figureI);
    expect(board._reserved).to.be.deep.eq(
      Array(5).fill(true)
        .concat(Array(20).fill(false)),
      board.getPrintable()
    );
    expect(figureI.isLocked).to.be.true;
  });

  it('can remove last figure', () => {
    const board = new Board(5);
    const figureI = new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']);
    board.placeFigure(0, 0, figureI);
    const removedFigure = board.removeLastFigure();
    expect(removedFigure).to.be.deep.eq(figureI);
    expect(removedFigure === figureI).to.be.true;
    expect(figureI.isLocked).to.be.false;
    expect(board._reserved).to.be.deep.eq(Array(25).fill(false));
  });

  it('can measure gap on empty board', () => {
    const board = new Board(5);
    expect(board.getGapIndexesAt(0, 0).length).to.be.eq(25);
  });

  it('can measure gap between figures', () => {
    const board = new Board(5);
    const figureY = new Figure('Y', 2, true, [
      '.', 'X',
      'X', 'X',
      '.', 'X',
      '.', 'X'
    ]);
    const figureW = new Figure('W', 3, false, [
      'X', '.', '.',
      'X', 'X', '.',
      '.', 'X', 'X'
    ]);
    if (board.canPlaceFigure(0, 0, figureW)) {
      board.placeFigure(0, 0, figureW);
    }
    if (board.canPlaceFigure(2, 0, figureY)) {
      board.placeFigure(2, 0, figureY);
    }
    const gapIndexes = board.getGapIndexesAt(1, 0);
    expect(gapIndexes.length).to.be.eq(2, board.getPrintable());
    expect(gapIndexes).includes(1);
    expect(gapIndexes).includes(2);
  });
});
