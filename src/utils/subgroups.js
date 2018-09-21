import { Cell, fillRanges } from '../data_structs';

export function getRow(grid, rowNum) {
    return grid.find(cell => cell.rowNum === rowNum);
}

export function getColumn(grid, colNum) {
    return grid.find(cell => cell.colNum === colNum);
}

export function getSubgrid(grid, sgNum) {
    return grid.find(cell => cell.sgNum === sgNum);
}

export function hasViolations(subgroup) {
    let subgroupFills = subgroup.map(c => c.fillValue);
    let sgSet = new Set(subgroupFills.sort(function(a,b) { return a-b; }));
    return sgSet !== fillRanges;
}