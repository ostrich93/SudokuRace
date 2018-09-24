class Cell {
    /**
     * @param { Number } index
     * @param { Number } fillValue 
     * @param { Number } rowNum 
     * @param { Number } colNum 
     * @param { Number } sgNum 
     * @param { Boolean } isClue
     */
    constructor(fillValue = 0, rowNum, colNum, sgNum, index, clueMark = false) {
        this.fillValue = fillValue;
        this.rowNum = rowNum;
        this.colNum = colNum;
        this.sgNum = sgNum;
        this.isClue = clueMark;
        this.index = index;
    }

    /**
     * 
     * @param { Number } fVal 
     */
    fillCell(fVal) {
        if (!this.isClue)
            this.fillValue = fVal;
    }

    isFilled() {
        return this.fillValue > 0;
    }

    equals(input) {
        console.log(input);
        return (this.index === input.index);
    }

}

export default Cell;