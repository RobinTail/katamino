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

  it('can place figure', () => {
    const board = new Board(5);
    const figureI = new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']);
    board.placeFigure(0, 0, figureI);
    expect(board._reserved).to.be.deep.eq(
      Array(5).fill(true)
        .concat(Array(20).fill(false)),
      board.getPrintable()
    );
  });

  it('can remove last figure', () => {
    const board = new Board(5);
    const figureI = new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']);
    board.placeFigure(0, 0, figureI);
    const removedFigure = board.removeLastFigure();
    expect(removedFigure).to.be.deep.eq(figureI);
    expect(board._reserved).to.be.deep.eq(Array(25).fill(false));
  });
});
