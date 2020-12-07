var
    time,
    level,
    timer;

function startGame() {
    time = 20;
    level = 1;
    document.getElementById("level").innerHTML = level;
    squareFilled();
    timer = setInterval(timeTick, 1000);
}


function squareFilled() {
    const
        tone = rand(0, 360),
        saturation = 100,
        lightness = 50,
        squareCount = (level + 1) * (level + 1),
        gameField = document.getElementById("gameField");

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }

    gameField.style.gridTemplateColumns = `repeat(${(level + 1).toString()}, 1fr)`;

    const
        mainColor = "hsl(" + tone.toString() + ", " + saturation.toString() + "%, " + lightness.toString() + "%)",
        differentColor = "hsl(" + tone.toString() + ", " + (saturation - saturation / level).toString() + "%, " + (lightness - lightness / level).toString() + "%)",
        randomSquare = rand(0, squareCount);

    for (let i = 0; i < squareCount; i++) {

        var square = document.createElement('div');
        square.className = 'square';

        if (i === randomSquare) {
            square.style.backgroundColor = differentColor;
            square.id = "differentSquare";
        } else {
            square.style.backgroundColor = mainColor;
            square.id = "mainSquare" + i.toString();
        }

        square.onclick = squareClick;
        gameField.appendChild(square);
    }
}



function squareClick() {
    if (this.id === "differentSquare") {
        level++;
        document.getElementById("level").innerHTML = level;
        squareFilled();
        time=20;
    }
    else {
        loose();
    }
}

function timeTick() {
    document.getElementById("timeText").innerHTML = time;
    if (time === 0) {
        loose();
    }
    time--;
}

function loose() {
    clearInterval(timer);
    let gameField = document.getElementById("gameField");

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }

    alert(`Игра окончена на уровне ${level.toString()}.`);

    level = 0;
    time = 0;

}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
