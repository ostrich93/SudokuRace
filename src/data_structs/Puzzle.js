import Cell from './Cell';
import CellGroup, { groupType } from './CellGroup';
import fillRanges from './fillRanges';
import { union, intersection, difference } from '../utils/set-operators';

class Puzzle {
    constructor(id, clues) {
        this.id = id;
        this.rows = Array(9).fill(new CellGroup(groupType.ROW));
        this.cols = Array(9).fill(new CellGroup(groupType.COLUMN));
        this.sgs = Array(9).fill(new CellGroup(groupType.SUBGRID));
        this.cells = [];
        this.buildPuzzle(clues);
    }

    buildPuzzle(clues) {
        let rn = 0;
        let cn = 0;
        for (let i = 0; i < 81; i ++) {
            rn = i/9;
            cn = i%9;
            let sgval = 0;
            if (rn < 3) {
                if (cn < 3)
                    sgval = 1;
                else if (cn < 6)
                    sgval = 2;
                else
                    sgval = 3;
            }
            else if (rn < 6) {
                if (cn < 3)
                    sgval = 4;
                else if (cn < 6)
                    sgval = 5;
                else
                    sgval = 6;
            }
            else {
                if (cn < 3)
                    sgval = 7;
                else if (cn < 6)
                    sgval = 8;
                else
                    sgval = 9;
            }
            let possClue = clues.find(clue => clue.rowNum === rn+1 && clue.colNum === cn+1 && clue.sgNum === sgval);
            if (!possClue){
                let newCell = new Cell(0, rn+1, cn+1, sgval);
                this.cells.push(newCell);
                this.rows[rn].cells.push(newCell);
                this.cols[cn].cells.push(newCell);
                this.sgs[sgval].cells.push(newCell);
            }
            else {
                this.cells.push(newCell);
                this.rows[rn].cells.push(possClue);
                this.cols[cn].cells.push(possClue);
                this.sgs[sgval].cells.push(possClue);
            }
        }
    }

    getRow(num) {
        return this.rows[num];
    }

    getColumn(num) {
        return this.cols[num];
    }

    getSubgrid(num) {
        this.sgs[num];
    }
}

export default Puzzle;