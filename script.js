const puzzleContainer = document.getElementById('puzzle-container');
const tiles = [];

function createPuzzle() {
    for (let i = 1; i <= 8; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');
        tile.textContent = i;
        tiles.push(tile);
    }

    // Add an empty tile
    const emptyTile = document.createElement('div');
    emptyTile.classList.add('tile', 'empty');
    tiles.push(emptyTile);

    // Shuffle the tiles
    shuffleTiles(tiles);

    // Add the tiles to the puzzle container
    tiles.forEach(tile => {
        puzzleContainer.appendChild(tile);
        tile.addEventListener('click', () => moveTile(tile));
    });
}

function shuffleTiles(tiles) {
    for (let i = tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
    }
}

function moveTile(tile) {
    const emptyTile = tiles.find(tile => tile.classList.contains('empty'));
    const tileIndex = tiles.indexOf(tile);
    const emptyTileIndex = tiles.indexOf(emptyTile);

    // Check if the selected tile can be moved
    if (isAdjacent(tileIndex, emptyTileIndex)) {
        swapTiles(tileIndex, emptyTileIndex);
        checkWin();
    }
}

function isAdjacent(index1, index2) {
    const row1 = Math.floor(index1 / 3);
    const col1 = index1 % 3;
    const row2 = Math.floor(index2 / 3);
    const col2 = index2 % 3;

    const rowDiff = Math.abs(row1 - row2);
    const colDiff = Math.abs(col1 - col2);

    return (rowDiff === 0 && colDiff === 1) || (rowDiff === 1 && colDiff === 0);
}

function swapTiles(index1, index2) {
    [tiles[index1], tiles[index2]] = [tiles[index2], tiles[index1]];
    updatePuzzleView();
}

function updatePuzzleView() {
    puzzleContainer.innerHTML = '';
    tiles.forEach(tile => puzzleContainer.appendChild(tile));
}

function checkWin() {
    if (tiles.every((tile, index) => tile.textContent == index + 1)) {
        setTimeout(() => alert('Congratulations! You solved the puzzle!'), 100);
    }
}

createPuzzle();
