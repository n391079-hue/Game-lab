const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let tool = "player";

let objects = [];

function setTool(selectedTool) {
    tool = selectedTool;

    document.getElementById("status").textContent =
        "Tool: " + selectedTool;
}

canvas.addEventListener("click", function(event) {

    const rect = canvas.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (tool === "erase") {

        objects = objects.filter(obj => {
            return !(
                x > obj.x &&
                x < obj.x + obj.width &&
                y > obj.y &&
                y < obj.y + obj.height
            );
        });

    } else {

        objects.push({
            type: tool,
            x: x - 20,
            y: y - 20,
            width: 40,
            height: 40
        });

    }

    drawEditor();
});

function drawEditor() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Grid
    ctx.strokeStyle = "rgba(0,0,0,0.1)";

    for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    objects.forEach(drawObject);
}

function drawObject(obj) {

    if (obj.type === "player") {
        ctx.fillStyle = "blue";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }

    if (obj.type === "platform") {
        ctx.fillStyle = "green";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }

    if (obj.type === "coin") {
        ctx.fillStyle = "gold";
        ctx.beginPath();
        ctx.arc(
            obj.x + 20,
            obj.y + 20,
            15,
            0,
            Math.PI * 2
        );
        ctx.fill();
    }

    if (obj.type === "enemy") {
        ctx.fillStyle = "red";
        ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    }
}

function clearGame() {
    objects = [];
    drawEditor();
}

function playGame() {

    alert(
        "Game started! 🎮\n\n" +
        "Player: " +
        objects.filter(o => o.type === "player").length +
        "\nCoins: " +
        objects.filter(o => o.type === "coin").length +
        "\nEnemies: " +
        objects.filter(o => o.type === "enemy").length
    );
}

drawEditor();
