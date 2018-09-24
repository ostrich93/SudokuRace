import React from 'react';

const mapStateToProps = state => {
    return {
        
    }
}

const SingleCell = (props) => {
    const { isValid, cell, handleCellSelect, currentCell } = props;
    const cNameTwo = cell.isClue ? 'clue' : '';
    const cNameThree = isValid ? 'valid' : 'invalid';
    const fullClassName = ['cell', cNameTwo, cNameThree].join(' ');
    return (
        <div className={fullClassName} onClick={handleCellSelect}>{cell.fillValue}</div>
    )
}

export default SingleCell;