export const CELL_SIZE = 5;
export const snapToGrid = value => Math.round(value / CELL_SIZE) * CELL_SIZE;
