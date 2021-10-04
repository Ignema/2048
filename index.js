const board = document.getElementById("board");

const BOARD_WIDTH = 4,
  BOARD_HEIGHT = 4;

board.style.cssText = `
        width: 25rem;
        background-color: rgb(23 42 55);
        padding: 5px;
        border-radius: 12px;
        display: grid;
        grid-template-rows: repeat(${BOARD_HEIGHT}, 1fr);
        grid-template-columns: repeat(${BOARD_WIDTH}, 1fr);
    `;

let cells = [];

for (let i = 0; i < BOARD_WIDTH; i++) {
  for (let j = 0; j < BOARD_HEIGHT; j++) {
    cells.push({
      x: j,
      y: i,
      element: document.createElement("div"),
    });
  }
}

const bootstrapCell = (cell) => {
  const element = cell.element;
  element.style.cssText = `
        height: 6rem;
        background-color: #7fb3dc;
        margin: 5px;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        animation-name: Appear;
        animation-duration: 1s;
    `;
  return { ...cell, element: element };
};

const initializeCell = (cell) => {
  const element = cell.element;
  const value = document.createElement("p");
  value.style.cssText = `
        color: white;
        font-family: Nunito;
        font-size: 3rem;
    `;
  element.appendChild(value);
  return { ...cell, element: element };
};

cells
  .map(bootstrapCell)
  .map(initializeCell)
  .forEach((cell) => board.appendChild(cell.element));

const getVal = (item) => item.element.firstElementChild.innerText;
const setVal = (item, num) => {
  item.element.firstElementChild.innerText = num;
};

const setRandomCell = () => {
  if (cells.every((cell) => getVal(cell) !== "")) return;
  const location = {
    x: Math.floor(Math.random() * BOARD_WIDTH),
    y: Math.floor(Math.random() * BOARD_HEIGHT),
  };
  getVal(
    cells.filter((cell) => cell.x === location.x && cell.y === location.y)[0]
  ) === ""
    ? setVal(
        cells.filter(
          (cell) => cell.x === location.x && cell.y === location.y
        )[0],
        2
      )
    : setRandomCell();
};

[1, 2].forEach(setRandomCell);

document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      for (let cell of cells) {
        if (cell.y === 0) continue;
        if (getVal(cell) === "") continue;
        const test = cells.filter((c) => c.x === cell.x && c.y < cell.y);
        if (test.every((t) => getVal(t) === "")) {
          setVal(
            cells.filter((c) => c.x === cell.x && c.y === 0)[0],
            getVal(cell)
          );
          setVal(cell, "");
          continue;
        }
        const upperCellIndex = Math.max(
          ...test.filter((t) => getVal(t) !== "").map((t) => t.y)
        );
        const upperCell = cells.filter(
          (c) => c.x === cell.x && c.y === upperCellIndex
        )[0];
        if (getVal(upperCell) === getVal(cell)) {
          setVal(upperCell, getVal(cell) * 2);
          setVal(cell, "");
          continue;
        }
        if (upperCellIndex + 1 === cell.y) continue;
        setVal(
          cells.filter((c) => c.x === cell.x && c.y === upperCellIndex + 1)[0],
          getVal(cell)
        );
        setVal(cell, "");
      }
      setRandomCell();
      break;
    case "ArrowDown":
      for (let cell of cells) {
        if (cell.y === BOARD_HEIGHT - 1) continue;
        if (getVal(cell) === "") continue;
        const test = cells.filter((c) => c.x === cell.x && c.y > cell.y);
        if (test.every((t) => getVal(t) === "")) {
          setVal(
            cells.filter((c) => c.x === cell.x && c.y === BOARD_HEIGHT - 1)[0],
            getVal(cell)
          );
          setVal(cell, "");
          continue;
        }
        const bottomCellIndex = Math.min(
          ...test.filter((t) => getVal(t) !== "").map((t) => t.y)
        );
        const bottomCell = cells.filter(
          (c) => c.x === cell.x && c.y === bottomCellIndex
        )[0];
        if (getVal(bottomCell) === getVal(cell)) {
          setVal(bottomCell, getVal(cell) * 2);
          setVal(cell, "");
          continue;
        }
        if (bottomCellIndex - 1 === cell.y) continue;
        setVal(
          cells.filter((c) => c.x === cell.x && c.y === bottomCellIndex - 1)[0],
          getVal(cell)
        );
        setVal(cell, "");
      }
      setRandomCell();
      break;
    case "ArrowLeft":
      for (let cell of cells) {
        if (cell.x === 0) continue;
        if (getVal(cell) === "") continue;
        const test = cells.filter((c) => c.x < cell.x && c.y === cell.y);
        if (test.every((t) => getVal(t) === "")) {
          setVal(
            cells.filter((c) => c.x === 0 && c.y === cell.y)[0],
            getVal(cell)
          );
          setVal(cell, "");
          continue;
        }
        const leftCellIndex = Math.max(
          ...test.filter((t) => getVal(t) !== "").map((t) => t.x)
        );
        const leftCell = cells.filter(
          (c) => c.x === leftCellIndex && c.y === cell.y
        )[0];
        if (getVal(leftCell) === getVal(cell)) {
          setVal(leftCell, getVal(cell) * 2);
          setVal(cell, "");
          continue;
        }
        if (leftCellIndex + 1 === cell.x) continue;
        setVal(
          cells.filter((c) => c.x === leftCellIndex + 1 && c.y === cell.y)[0],
          getVal(cell)
        );
        setVal(cell, "");
      }
      setRandomCell();
      break;
    case "ArrowRight":
      for (let cell of cells) {
        if (cell.x === BOARD_WIDTH - 1) continue;
        if (getVal(cell) === "") continue;
        const test = cells.filter((c) => c.x > cell.x && c.y === cell.y);
        if (test.every((t) => getVal(t) === "")) {
          setVal(
            cells.filter((c) => c.x === BOARD_WIDTH - 1 && c.y === cell.y)[0],
            getVal(cell)
          );
          setVal(cell, "");
          continue;
        }
        const rightCellIndex = Math.min(
          ...test.filter((t) => getVal(t) !== "").map((t) => t.x)
        );
        const rightCell = cells.filter(
          (c) => c.x === rightCellIndex && c.y === cell.y
        )[0];
        if (getVal(rightCell) === getVal(cell)) {
          setVal(rightCell, getVal(cell) * 2);
          setVal(cell, "");
          continue;
        }
        if (rightCellIndex - 1 === cell.x) continue;
        setVal(
          cells.filter((c) => c.x === rightCellIndex - 1 && c.y === cell.y)[0],
          getVal(cell)
        );
        setVal(cell, "");
      }
      setRandomCell();
      break;
    default:
      break;
  }
});
