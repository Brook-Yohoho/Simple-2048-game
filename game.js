document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const scoreValue = document.getElementById('score-value');
    const resetBtn = document.getElementById('reset-btn');

    let score = 0;
    let grid = [];
    let size = 4;

    function initialize() {
        score = 0;
        scoreValue.textContent = score;
        grid = Array.from({ length: size }, () => Array(size).fill(0));
        addNewTile();
        addNewTile();
        updateBoard();
    }

    function updateBoard() {
        board.innerHTML = '';
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const tileValue = grid[i][j];
                const tile = document.createElement('div');
                tile.className = `tile tile-${tileValue}`;
                tile.textContent = tileValue === 0 ? '' : tileValue;
                board.appendChild(tile);
            }
        }
    }

    function addNewTile() {
        const availableCells = [];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (grid[i][j] === 0) {
                    availableCells.push({ x: i, y: j });
                }
            }
        }
        if (availableCells.length > 0) {
            const { x, y } = availableCells[Math.floor(Math.random() * availableCells.length)];
            grid[x][y] = Math.random() < 0.9 ? 2 : 4;
        }
    }

    function move(direction) {
        let moved = false;
        let merged = Array.from({ length: size }, () => Array(size).fill(false));

        const reverse = direction === 'up' || direction === 'left';

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const x = reverse ? (direction === 'up' ? j : size - 1 - j) : i;
                const y = reverse ? (direction === 'left' ? j : size - 1 - j) : i;
                const currentValue = grid[x][y];

                if (currentValue !== 0) {
                    let nextX = x;
                    let nextY = y;

                    if (direction === 'up') {
                        while (nextX > 0 && grid[nextX - 1][y] === 0) {
                            nextX--;
                        }
                    } else if (direction === 'down') {
                        while (nextX < size - 1 && grid[nextX + 1][y] === 0) {
                            nextX++;
                        }
                    } else if (direction === 'left') {
                        while (nextY > 0 && grid[x][nextY - 1] === 0) {
                            nextY--;
                        }
                    } else if (direction === 'right') {
                        while (nextY < size - 1 && grid[x][nextY + 1] === 0) {
                            nextY++;
                        }
                    }

                    if (nextX !== x || nextY !== y) {
                        if (grid[nextX][nextY] === 0) {
                            grid[nextX][nextY] = currentValue;
                            grid[x][y] = 0;
                            moved = true;
                        } else if (grid[nextX][nextY] === currentValue && !merged[nextX][nextY]) {
                            grid[nextX][nextY] *= 2;
                            grid[x][y] = 0;
                            score += grid[nextX][nextY];
                            scoreValue.textContent = score;
                            moved = true;
                            merged[nextX][nextY] = true;
                        }
                    }
                }
            }
        }

        if (moved) {
            addNewTile();
            updateBoard();
        }
    }

    function handleKeyDown(event) {
        if (event.key === 'ArrowUp' || event.key === 'w') {
            move('up');
        } else if (event.key === 'ArrowDown' || event.key === 's') {
            move('down');
        } else if (event.key === 'ArrowLeft' || event.key === 'a') {
            move('left');
        } else if (event.key === 'ArrowRight' || event.key === 'd') {
            move('right');
        }
    }

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }

    function handleTouchEnd(event) {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                move('right');
            } else {
                move('left');
            }
        } else {
            if (deltaY > 0) {
                move('down');
            } else {
                move('up');
            }
        }
    }

    initialize();

    document.addEventListener('keydown', handleKeyDown);
    board.addEventListener('touchstart', handleTouchStart);
    board.addEventListener('touchend', handleTouchEnd);
    resetBtn.addEventListener('click', initialize);
});
