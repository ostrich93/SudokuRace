import React from 'react';
import { connect } from 'react-redux';

const SingleCell = (props) => {
    const { isValid, cell, onClick, currentCell, handleChange } = props;
    const cNameTwo = cell.isClue ? 'clue' : '';
    const cNameThree = isValid ? 'valid' : 'invalid';
    const fullClassName = ['cell', cNameTwo, cNameThree].join(' ');
    return (
        <div className={fullClassName} onClick={onClick} onChange={e => handleChange(cell, e)}>{cell.fillValue}</div>
    )
}

export default SingleCell;