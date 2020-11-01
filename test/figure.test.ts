import {figures} from '../figure';
import {expect} from 'chai';

describe('Figures', () => {
  it('should be 5 cells large', () => {
    Object.values(figures).forEach((figure) => {
      expect(
        figure.shape.pattern.filter((cell) => cell).length
      ).to.be.equal(5);
    });
  });

  it('should have shape size according to its width', () => {
    Object.values(figures).forEach((figure) => {
      expect(
        figure.shape.pattern.length % figure.shape.width
      ).to.be.equal(0);
    });
  });

  it('returns correct human readable pattern', () => {
    const figureF = figures.F;
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]);
  });

  it('can be rotate properly', () => {
    const figureF = figures.F;
    figureF.rotate()
    expect(figureF.shape.width).to.be.equal(3);
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      'X', '.', '.',
      'X', 'X', 'X',
      '.', 'X', '.'
    ], figureF.getPrintablePattern())
  });
});

