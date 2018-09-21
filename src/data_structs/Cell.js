class Cell {
    /**
     * 
     * @param { Number } fillValue 
     * @param { Number } rowNum 
     * @param { Number } colNum 
     * @param { Number } sgNum 
     * @param { Boolean } isClue
     */
    constructor(fillValue = 0, rowNum, colNum, sgNum, clueMark = false) {
        this.fillValue = fillValue;
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.sgNum = sgNum;
        this.isClue = clueMark;
    }

    /**
     * 
     * @param { Number } fVal 
     */
    fillCell(fVal) {
        if (!this.isClue)
            this.fillValue = fval;
    }

    isFilled() {
        return this.fillValue > 0;
    }

    equals(input) {
        return (this.rowNum === input.rowNum) && (this.colNum == input.colNum) && (this.sgNum === input.sgNum) && (this.isClue === input.isClue);
    }

}

export default Cell;