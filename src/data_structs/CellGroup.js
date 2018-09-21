import Cell from './Cell';
import fillRanges from './fillRanges';
import { union, intersection, difference } from '../utils/set-operators';

export const groupType = { //enums
    ROW = 0,
    COLUMN = 1,
    SUBGRID = 2
};

class CellGroup {
    /**
     * 
     * @param { groupType } gType 
     * @param { Cell[] } cells 
     * @param { Number } index
     */
    constructor(gType, cells) {
        this.groupType = gType;
        this.cells = cells || new Array(9);
        // this.index = index;
    }

    /**
     * @param { Cell } cell
     * @param { groupType } gType
     */
    getNeighbors(cell, gType) {
        switch (gType) {
            case ROW:
                return this.cells.filter(c => c.rowNum === cell.rowNum && c !== cell);
            case COLUMN:
                return this.cells.filter(c => c.colNum === cell.colNum && c !== cell);
            default:
                return this.cells.filter(c => c.sgNum === cell.sgNum && c !== cell);
        }
    }

    getFillsSet() {
        return new Set(this.cells.map(square => square.fillValue));
    }

    isValid() { //used to check if there are any repeating values in list of filledValues
        let filledValues = this.cells.map(sq => sq.fillValue);
        filledValues = filledValues.filter(val => val > 0);
        let fillSet = new Set(filledValues);
        return fillSet.size === fillRanges.length;
    }

    isFilled() {
        let filledValues = this.cells.map(sq => sq.fillValue);
        filledValues = filledValues.filter(val => val > 0);
        return filledValues.length === 9;
    }

    isCorrect() { //if returns true, able to submit.
        let fillVals = new Set(this.cells.map(sq => sq.fillValue));
        return union(fillVals, fillRanges) === fillVals; //might need to sort first?
    }
}

export default CellGroup;