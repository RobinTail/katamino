import { expect } from "chai";
import {challenges} from '../lib/challenge';

describe('Challenge', () => {
  it('should have two challenges', () => {
    expect(Object.keys(challenges).length).to.be.eq(2);
    expect(challenges).haveOwnProperty('SmallSlam');
    expect(challenges).haveOwnProperty('TheSlam');
  });

  it('Small Slam should have A-G sets', () => {
    expect(challenges.SmallSlam.sets).haveOwnProperty('A');
    expect(challenges.SmallSlam.sets).haveOwnProperty('B');
    expect(challenges.SmallSlam.sets).haveOwnProperty('C');
    expect(challenges.SmallSlam.sets).haveOwnProperty('D');
    expect(challenges.SmallSlam.sets).haveOwnProperty('E');
    expect(challenges.SmallSlam.sets).haveOwnProperty('F');
    expect(challenges.SmallSlam.sets).haveOwnProperty('G');
  });

  it('The Slam should have A-N sets', () => {
    expect(challenges.TheSlam.sets).haveOwnProperty('A');
    expect(challenges.TheSlam.sets).haveOwnProperty('B');
    expect(challenges.TheSlam.sets).haveOwnProperty('C');
    expect(challenges.TheSlam.sets).haveOwnProperty('D');
    expect(challenges.TheSlam.sets).haveOwnProperty('E');
    expect(challenges.TheSlam.sets).haveOwnProperty('F');
    expect(challenges.TheSlam.sets).haveOwnProperty('G');
    expect(challenges.TheSlam.sets).haveOwnProperty('H');
    expect(challenges.TheSlam.sets).haveOwnProperty('I');
    expect(challenges.TheSlam.sets).haveOwnProperty('J');
    expect(challenges.TheSlam.sets).haveOwnProperty('K');
    expect(challenges.TheSlam.sets).haveOwnProperty('L');
    expect(challenges.TheSlam.sets).haveOwnProperty('M');
    expect(challenges.TheSlam.sets).haveOwnProperty('N');

  });

  it('each challenge should have equal number of figures in each set', () => {
    Object.values(challenges).forEach(({maxSize, sets}) => {
      Object.values(sets).forEach((figureNames) => {
        expect(figureNames.length).to.be.eq(maxSize);
      });
    });
  });

  it('each challenge should not have duplicates in a set', () => {
    Object.values(challenges).forEach(({sets, maxSize}) => {
      Object.values(sets).forEach((figureNames) => {
        const set = new Set(figureNames);
        expect(set.size).to.be.eq(maxSize);
      });
    });
  });
});
