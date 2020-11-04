import {createFigures, Figure} from '../lib/figure';
import {expect} from 'chai';

describe('Figures', () => {
  it('should be 5 cells large', () => {
    Object.values(createFigures()).forEach((figure) => {
      expect(
        figure.getShape().pattern.filter((cell) => cell).length
      ).to.be.equal(5);
    });
  });

  it('should have shape size according to its width', () => {
    Object.values(createFigures()).forEach((figure) => {
      const {pattern, width} = figure.getShape();
      expect(
        pattern.length % width
      ).to.be.equal(0, `figure ${figure.name} ${width} ${pattern}`);
    });
  });

  it('returns correct human readable pattern', () => {
    const figureF = createFigures().F;
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ]);
  });

  it('can be rotate left square figure', () => {
    const figureF = createFigures().F;
    figureF.rotate(false);
    expect(figureF.getShape().width).to.be.equal(3, figureF.getPrintablePattern());
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      'X', '.', '.',
      'X', 'X', 'X',
      '.', 'X', '.'
    ], figureF.getPrintablePattern());
  });

  it('can be rotate left non-square figure', () => {
    const figureL = createFigures().L;
    figureL.rotate(false);
    expect(figureL.getShape().width).to.be.equal(4);
    expect(figureL.getHumanReadablePattern()).to.be.deep.equal([
      'X', '.', '.', '.',
      'X', 'X', 'X', 'X'
    ], figureL.getPrintablePattern());
  });

  it('can be rotate left linear figure', () => {
    const figureI = createFigures().I;
    figureI.rotate(false);
    expect(figureI.getShape().width).to.be.equal(1);
    expect(figureI.getHumanReadablePattern()).to.be.deep.equal([
      'X',
      'X',
      'X',
      'X',
      'X'
    ], figureI.getPrintablePattern());
  });

  it('can be rotate right square figure', () => {
    const figureF = createFigures().F;
    figureF.rotate(true);
    expect(figureF.getShape().width).to.be.equal(3);
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      '.', 'X', '.',
      'X', 'X', 'X',
      '.', '.', 'X'
    ], figureF.getPrintablePattern());
  });

  it('can be rotate right non-square figure', () => {
    const figureL = createFigures().L;
    figureL.rotate(true);
    expect(figureL.getShape().width).to.be.equal(4);
    expect(figureL.getHumanReadablePattern()).to.be.deep.equal([
      'X', 'X', 'X', 'X',
      '.', '.', '.', 'X'
    ], figureL.getPrintablePattern());
  });

  it('can be rotate right linear figure', () => {
    const figureI = createFigures().I;
    figureI.rotate(true);
    expect(figureI.getShape().width).to.be.equal(1);
    expect(figureI.getHumanReadablePattern()).to.be.deep.equal([
      'X',
      'X',
      'X',
      'X',
      'X'
    ], figureI.getPrintablePattern());
  });

  it('can flip figures 2 cells wide', () => {
    const figureL = createFigures().L;
    figureL.flip();
    expect(figureL.getShape().width).to.be.equal(2);
    expect(figureL.getHumanReadablePattern()).to.be.deep.equal([
      'X', 'X',
      '.', 'X',
      '.', 'X',
      '.', 'X'
    ], figureL.getPrintablePattern());
  });

  it('can flip figures 3 cells wide', () => {
    const figureF = createFigures().F;
    figureF.flip();
    expect(figureF.getShape().width).to.be.equal(3);
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      'X', 'X', '.',
      '.', 'X', 'X',
      '.', 'X', '.'
    ], figureF.getPrintablePattern());
  });

  it('can not rotate locked figure', () => {
    const figureI = createFigures().I;
    figureI.lock();
    figureI.rotate(true);
    expect(figureI.getShape().width).to.be.equal(5);
    expect(figureI.getHumanReadablePattern())
      .to.be.deep.equal(['X', 'X', 'X', 'X', 'X'], figureI.getPrintablePattern());
  });

  it('can not flip locked figure', () => {
    const figureF = createFigures().F;
    figureF.lock();
    figureF.flip();
    expect(figureF.getShape().width).to.be.equal(3);
    expect(figureF.getHumanReadablePattern()).to.be.deep.equal([
      '.', 'X', 'X',
      'X', 'X', '.',
      '.', 'X', '.'
    ], figureF.getPrintablePattern());
  });

  it('can iterate over possible rotations figure I', () => {
    const figureI = createFigures().I;
    let result: string[] = [];
    figureI.applyAllPossibleRotationsAndFlips((figure) => {
      result.push(Figure.prototype.getPrintablePattern.apply(figure));
      return false;
    });
    expect(result.length).to.be.eq(2);
    expect(result.shift()).to.be.eq('\nXXXXX');
    expect(result.shift()).to.be.eq('\nX\nX\nX\nX\nX');
    expect(figureI.getShape().width).to.be.deep.eq(createFigures().I.getShape().width);
    expect(figureI.getShape().pattern).to.be.deep.eq(createFigures().I.getShape().pattern);
  });

  it('can iterate over possible rotations figure X', () => {
    const figureX = createFigures().X;
    let result: string[] = [];
    figureX.applyAllPossibleRotationsAndFlips((figure) => {
      result.push(Figure.prototype.getPrintablePattern.apply(figure));
      return false;
    });
    expect(result.length).to.be.eq(1);
    expect(result.shift()).to.be.eq('\n.X.\nXXX\n.X.');
    expect(figureX.getShape().width).to.be.deep.eq(createFigures().X.getShape().width);
    expect(figureX.getShape().pattern).to.be.deep.eq(createFigures().X.getShape().pattern);
  });

  it('can iterate over possible rotations figure Z', () => {
    const figureZ = createFigures().Z;
    let result: string[] = [];
    figureZ.applyAllPossibleRotationsAndFlips((figure) => {
      result.push(Figure.prototype.getPrintablePattern.apply(figure));
      return false;
    });
    expect(result.length).to.be.eq(4);
    expect(result.shift()).to.be.eq('\nXX.\n.X.\n.XX');
    expect(result.shift()).to.be.eq('\n..X\nXXX\nX..');
    expect(result.shift()).to.be.eq('\n.XX\n.X.\nXX.');
    expect(result.shift()).to.be.eq('\nX..\nXXX\n..X');
    expect(figureZ.getShape().width).to.be.deep.eq(createFigures().Z.getShape().width);
    expect(figureZ.getShape().pattern).to.be.deep.eq(createFigures().Z.getShape().pattern);
  });

  it('can iterate over possible rotations figure L', () => {
    const figureL = createFigures().L;
    let result: string[] = [];
    figureL.applyAllPossibleRotationsAndFlips((figure) => {
      result.push(Figure.prototype.getPrintablePattern.apply(figure));
      return false;
    });
    expect(result.length).to.be.eq(8);
    expect(result).to.be.deep.eq([
      '\nXX\nX.\nX.\nX.',
      '\nX...\nXXXX',
      '\n.X\n.X\n.X\nXX',
      '\nXXXX\n...X',
      '\nXX\n.X\n.X\n.X',
      '\nXXXX\nX...',
      '\nX.\nX.\nX.\nXX',
      '\n...X\nXXXX'
    ]);
    expect(figureL.getShape().width).to.be.deep.eq(createFigures().L.getShape().width);
    expect(figureL.getShape().pattern).to.be.deep.eq(createFigures().L.getShape().pattern);
  });

});

