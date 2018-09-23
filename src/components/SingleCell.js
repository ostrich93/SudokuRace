import React from 'react';

const SingleCell = (props) => {
    console.log('single cell props', props);
    const { isValid, cell, handleCellSelect } = props;
    const cNameTwo = cell.isClue ? 'clue' : '';
    const cNameThree = isValid ? 'valid' : 'invalid';
    const fullClassName = ['cell', cNameTwo, cNameThree].join(' ');
    return (
        <div className={fullClassName} onClick={handleCellSelect}>{cell.fillValue}</div>
    )
}

export default SingleCell;