document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const gridSize = 4;
    let tiles = [];

    // Initialize game board
    function initBoard() {
        for (let i = 0; i < gridSize * gridSize; i++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tiles.push(tile);
            board.appendChild(tile);
        }
        generateNewTile();
        generateNewTile();
    }

    // Generate a new tile with value 2
    function generateNewTile() {
        const emptyTiles = tiles.filter(tile => !tile.innerText);
        if (emptyTiles.length === 0) return;
        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
        randomTile.innerText = "2";
    }

    // Handle user input
    function handleKeyPress(event) {
        switch (event.key) {
            case "ArrowUp":
                moveTiles("up");
                break;
            case "ArrowDown":
                moveTiles("down");
                break;
            case "ArrowLeft":
                moveTiles("left");
                break;
            case "ArrowRight":
                moveTiles("right");
                break;
        }
        generateNewTile();
    }

    // Move tiles based on direction
    function moveTiles(direction) {
        // Implementation of tile movement logic goes here
        // This is a basic implementation, you can replace it with the actual logic
        console.log(`Moving tiles ${direction}`);
    }

    initBoard();
    document.addEventListener("keydown", handleKeyPress);
});
