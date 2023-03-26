let item, row, col, density;
const container = document.querySelector(".container");
const phone = window.matchMedia("only screen and (max-width : 600px)");

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

let color, intervalID, lastColor, newColor;

function hoverAction(e) {
    clearInterval(intervalID);

    let short = e.target.classList;

    switch (true) {

        case short.contains("bw") || lastColor === "bw":
            lastColor = "bw";
            intervalID = setInterval(() => {
                console.log(1);
                color = `hsl(0, 0%, ${random(100)}%)`;
                changeColor(color);
            }, 100);
            break;

        case short.contains("lgbt") || lastColor === "lgbt":
            lastColor = "lgbt";
            intervalID = setInterval(() => {
                console.log(2);
                color = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
                changeColor(color);
            }, 100);
            break;

        case short.contains("eraser") || lastColor === "eraser":
            lastColor = "eraser";
            console.log(e.target);
            changeColor("white");
            break;
    }
}

document.querySelector(".right").addEventListener("mousedown", hoverAction);

container.addEventListener("mouseenter", hoverAction);

container.addEventListener("mouseleave", () => {
    clearInterval(intervalID);
});
