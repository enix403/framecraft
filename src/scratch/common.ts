export const CELL_SIZE = 5;

export const BG_COLOR = "#26102b";
export const ROOM_COLOR = "rgba(107, 30, 189, 0.3)";
export const WALL_COLOR = "#CAC0C9";
export const ACTIVE_COLOR = "#1c5ce8";

export const snapToGrid = value => Math.round(value / CELL_SIZE) * CELL_SIZE;

