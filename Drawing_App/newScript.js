let item, row, col, density;
const container = document.querySelector(".container");
const phone = window.matchMedia("only screen and (max-width : 600px)");
const reset = document.querySelector(".reset");
const save = document.querySelector(".save");

/* Reset Grid Button */
reset.addEventListener('click', () => {
    resetGrid();
});

function resetGrid() {
    deleteOldGrid();
    makeGrid();
}

/* Save To LocalStorage */
/* Save button functionality */
save.addEventListener('click', () => {
    saveDrawing();
});

function saveDrawing() {
    let gridItems = document.querySelectorAll(".grid-item");
    let gridData = {};

    gridItems.forEach((item, index) => {
        gridData[index] = item.style.backgroundColor;
    });

    localStorage.setItem("drawing", JSON.stringify(gridData));
}

// load the saved drawing.
function loadDrawing() {
    let savedData = localStorage.getItem("drawing");

    if (savedData) {
        savedData = JSON.parse(savedData);
        let gridItems = document.querySelectorAll(".grid-item");

        gridItems.forEach((item, index) => {
            item.style.backgroundColor = savedData[index];
        });
    }
}

// call loadDrawing on page load
loadDrawing();



/* Delete old when U try to change the density. */
function deleteOldGrid() {
    document
        .querySelectorAll(".grid-item")
        .forEach((e) => e.parentNode.removeChild(e));
}

function makeGrid() {
    deleteOldGrid();

    density = density <= 4 ? ++density : (density = 1);

    col = phone.matches ? 9 * density : 16 * density; //18 for phone else 32
    row = phone.matches ? 16 * density : 9 * density; //32 for phone else 18

    container.style.gridTemplateColumns = `repeat(${col}, 1fr`;

    for (let i = 1; i <= row * col; i++) {
        item = document.createElement("cell");

        item.classList.add("grid-item");

        container.appendChild(item);
    }
}

makeGrid();

function changeColor(color) {
    addEventListener("mouseover", (e) => {
        if (e.target.classList.contains("grid-item")) {
            e.target.style.background = color;
        }
    });
}

function random(i) {
    return Math.floor(Math.random() * i);
}

let intervalID;
let isLGBT = false;
let isBW = false;
let isEraser = false;

function hoverAction(e) {
    clearInterval(intervalID);

    if (isLGBT) {
        intervalID = setInterval(() => {
            let color = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
            changeColor(color);
        }, 100);
    } else if (isBW) {
        intervalID = setInterval(() => {
            let color = `hsl(0, 0%, ${random(100)}%)`;
            changeColor(color);

            /*  if (random(2) === 0) {
                changeColor("white");
            } else {
                changeColor("black");
            } */
        }, 100);
    } else if (isEraser) {
        changeColor("white");
    }
}

function selectFunctionality(event) {
    isLGBT = false;
    isBW = false;
    isEraser = false;

    if (event.target.classList.contains("lgbt")) {
        isLGBT = true;
    } else if (event.target.classList.contains("bw")) {
        isBW = true;
    } else if (event.target.classList.contains("eraser")) {
        isEraser = true;
    }
}

document.querySelectorAll(".right button").forEach((button) => {
    button.addEventListener("click", selectFunctionality);
});

container.addEventListener("mouseenter", hoverAction);

container.addEventListener("mouseleave", () => {
    clearInterval(intervalID);
});
