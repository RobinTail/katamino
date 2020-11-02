import {Figure, figures} from '../lib/figure';
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
    const figureF = new Figure('F', 3, true, [
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]);
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]);
  });

  it('can be rotate left square figure', () => {
    const figureF = new Figure('F', 3, true, [
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]);
    figureF.rotate(false);
    expect(figureF.shape.width).to.be.equal(3);
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      'X', '.', '.',
      'X', 'X', 'X',
      '.', 'X', '.'
    ], figureF.getPrintablePattern());
  });

  it('can be rotate left non-square figure', () => {
    const figureL = new Figure('L', 2, true, [
      'X', 'X',
      'X', '.',
      'X', '.',
      'X', '.'
    ]);
    figureL.rotate(false);
    expect(figureL.shape.width).to.be.equal(4);
    expect(figureL.getHumanReadablePattern()).to.be.deep.equal([
      'X', '.', '.', '.',
      'X', 'X', 'X', 'X'
    ], figureL.getPrintablePattern());
  });

  it('can be rotate left linear figure', () => {
    const figureI = new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']);
    figureI.rotate(false);
    expect(figureI.shape.width).to.be.equal(1);
    expect(figureI.getHumanReadablePattern()).to.be.deep.equal([
      'X',
      'X',
      'X',
      'X',
      'X'
    ], figureI.getPrintablePattern());
  });

  it('can be rotate right square figure', () => {
    const figureF = new Figure('F', 3, true, [
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]);
    figureF.rotate(true);
    expect(figureF.shape.width).to.be.equal(3);
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      '.', 'X', '.',
      'X', 'X', 'X',
      '.', '.', 'X'
    ], figureF.getPrintablePattern());
  });

  it('can be rotate right non-square figure', () => {
    const figureL = new Figure('L', 2, true, [
      'X', 'X',
      'X', '.',
      'X', '.',
      'X', '.'
    ]);
    figureL.rotate(true);
    expect(figureL.shape.width).to.be.equal(4);
    expect(figureL.getHumanReadablePattern()).to.be.deep.equal([
      'X', 'X', 'X', 'X',
      '.', '.', '.', 'X'
    ], figureL.getPrintablePattern());
  });

  it('can be rotate right linear figure', () => {
    const figureI = new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']);
    figureI.rotate(true);
    expect(figureI.shape.width).to.be.equal(1);
    expect(figureI.getHumanReadablePattern()).to.be.deep.equal([
      'X',
      'X',
      'X',
      'X',
      'X'
    ], figureI.getPrintablePattern());
  });

  it('can flip figures 2 cells wide', () => {
    const figureL = new Figure('L', 2, true, [
      'X', 'X',
      'X', '.',
      'X', '.',
      'X', '.'
    ]);
    figureL.flip();
    expect(figureL.shape.width).to.be.equal(2);
    expect(figureL.getHumanReadablePattern()).to.be.deep.equal([
      'X', 'X',
      '.', 'X',
      '.', 'X',
      '.', 'X'
    ], figureL.getPrintablePattern());
  });

  it('can flip figures 3 cells wide', () => {
    const figureF = new Figure('F', 3, true, [
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]);
    figureF.flip();
    expect(figureF.shape.width).to.be.equal(3);
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      'X', 'X', '.',
      '.', 'X', 'X',
      '.', 'X', '.'
    ], figureF.getPrintablePattern());
  });

  it('can not rotate locked figure', () => {
    const figureI = new Figure('I', 5, false, ['X', 'X', 'X', 'X', 'X']);
    figureI.lock();
    figureI.rotate(true);
    expect(figureI.shape.width).to.be.equal(5);
    expect(figureI.getHumanReadablePattern())
      .to.be.deep.equal(['X', 'X', 'X', 'X', 'X'], figureI.getPrintablePattern());
  });

  it('can not flip locked figure', () => {
    const figureF = new Figure('F', 3, true, [
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]);
    figureF.lock();
    figureF.flip();
    expect(figureF.shape.width).to.be.equal(3);
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ], figureF.getPrintablePattern());
  });
});

