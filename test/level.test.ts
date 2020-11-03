import { expect } from "chai";
import {levels} from '../lib/level';

describe('Level', () => {
  it('should have A-G sets', () => {
    expect(levels).haveOwnProperty('A');
    expect(levels).haveOwnProperty('B');
    expect(levels).haveOwnProperty('C');
    expect(levels).haveOwnProperty('D');
    expect(levels).haveOwnProperty('E');
    expect(levels).haveOwnProperty('F');
    expect(levels).haveOwnProperty('G');
  });

  it('should have 8 figures in each set', () => {
    Object.values(levels).forEach((figureNames) => {
      expect(figureNames.length).to.be.eq(8);
    });
  });

  it('should not have duplicates in a set', () => {
    Object.values(levels).forEach((figureNames) => {
      const set = new Set(figureNames);
      expect(set.size).to.be.eq(8);
    });
  });
});
