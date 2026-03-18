// Word Search Game - Main Logic
class WordSearchGame {
    constructor() {
        this.currentLevel = 1;
        this.score = 0;
        this.grid = [];
        this.words = [];
        this.foundWords = new Set();
        this.selectedCells = [];
        this.isSelecting = false;
        this.wordPositions = []; // Stores {word, cells: [{row, col}]}

        this.initElements();
        this.loadProgress();
        this.loadLevel(this.currentLevel);
        this.attachEventListeners();
    }

    initElements() {
        this.gridElement = document.getElementById('grid');
        this.wordsListElement = document.getElementById('wordsList');
        this.currentLevelElement = document.getElementById('currentLevel');
        this.scoreElement = document.getElementById('score');
        this.resetBtn = document.getElementById('resetBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.victoryModal = document.getElementById('victoryModal');
        this.continueBtn = document.getElementById('continueBtn');
    }

    loadLevel(levelNumber) {
        const levelData = LEVELS[levelNumber - 1];
        if (!levelData) {
            this.showVictory('You completed all levels! 🎊');
            return;
        }

        this.currentLevel = levelNumber;
        this.words = levelData.words;
        this.foundWords.clear();
        this.selectedCells = [];
        this.wordPositions = [];

        this.currentLevelElement.textContent = levelNumber;
        this.nextBtn.style.display = 'none';

        this.createGrid(levelData.gridSize);
        this.placeWordsInGrid();
        this.fillEmptySpaces();
        this.renderGrid();
        this.renderWordsList();
    }

    createGrid(size) {
        this.grid = Array(size).fill(null).map(() => Array(size).fill(''));
    }

    // TODO: USER IMPLEMENTATION
    // This is a key algorithm that determines how words are placed in the grid
    // Multiple approaches are valid here - you decide the strategy!
    placeWordsInGrid() {
        const directions = [
            { dr: 0, dc: 1 },   // Horizontal right
            { dr: 1, dc: 0 },   // Vertical down
            { dr: 1, dc: 1 },   // Diagonal down-right
            { dr: -1, dc: 1 },  // Diagonal up-right
        ];

        for (const word of this.words) {
            let placed = false;
            let attempts = 0;
            const maxAttempts = 100;

            while (!placed && attempts < maxAttempts) {
                attempts++;

                // Random starting position
                const row = Math.floor(Math.random() * this.grid.length);
                const col = Math.floor(Math.random() * this.grid[0].length);

                // Random direction
                const dir = directions[Math.floor(Math.random() * directions.length)];

                // Check if word fits
                const cells = [];
                let canPlace = true;

                for (let i = 0; i < word.length; i++) {
                    const newRow = row + (dir.dr * i);
                    const newCol = col + (dir.dc * i);

                    // Check bounds
                    if (newRow < 0 || newRow >= this.grid.length ||
                        newCol < 0 || newCol >= this.grid[0].length) {
                        canPlace = false;
                        break;
                    }

                    // Check if cell is empty or has the same letter (allows overlap)
                    if (this.grid[newRow][newCol] !== '' &&
                        this.grid[newRow][newCol] !== word[i]) {
                        canPlace = false;
                        break;
                    }

                    cells.push({ row: newRow, col: newCol });
                }

                // Place the word if possible
                if (canPlace) {
                    for (let i = 0; i < word.length; i++) {
                        this.grid[cells[i].row][cells[i].col] = word[i];
                    }
                    this.wordPositions.push({ word, cells });
                    placed = true;
                }
            }

            if (!placed) {
                console.warn(`Could not place word: ${word}`);
            }
        }
    }

    fillEmptySpaces() {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                if (this.grid[row][col] === '') {
                    this.grid[row][col] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
    }

    renderGrid() {
        this.gridElement.innerHTML = '';
        this.gridElement.style.gridTemplateColumns = `repeat(${this.grid.length}, 1fr)`;

        for (let row = 0; row < this.grid.length; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.textContent = this.grid[row][col];
                cell.dataset.row = row;
                cell.dataset.col = col;
                this.gridElement.appendChild(cell);
            }
        }
    }

    renderWordsList() {
        this.wordsListElement.innerHTML = '';
        this.words.forEach(word => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.textContent = word;
            wordItem.dataset.word = word;
            if (this.foundWords.has(word)) {
                wordItem.classList.add('found');
            }
            this.wordsListElement.appendChild(wordItem);
        });
    }

    attachEventListeners() {
        // Mouse events
        this.gridElement.addEventListener('mousedown', (e) => this.handleSelectionStart(e));
        this.gridElement.addEventListener('mouseover', (e) => this.handleSelectionMove(e));
        document.addEventListener('mouseup', () => this.handleSelectionEnd());

        // Touch events for mobile
        this.gridElement.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            this.handleSelectionStart({target: element});
        });

        this.gridElement.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const element = document.elementFromPoint(touch.clientX, touch.clientY);
            this.handleSelectionMove({target: element});
        });

        this.gridElement.addEventListener('touchend', (e) => {
            e.preventDefault();
            this.handleSelectionEnd();
        });

        // Buttons
        this.resetBtn.addEventListener('click', () => this.resetLevel());
        this.nextBtn.addEventListener('click', () => this.loadLevel(this.currentLevel + 1));
        this.continueBtn.addEventListener('click', () => this.closeVictoryModal());
    }

    handleSelectionStart(e) {
        if (!e.target.classList.contains('cell')) return;
        if (e.target.classList.contains('found')) return;

        this.isSelecting = true;
        this.selectedCells = [e.target];
        e.target.classList.add('selected');
    }

    handleSelectionMove(e) {
        if (!this.isSelecting) return;
        if (!e.target.classList.contains('cell')) return;
        if (e.target.classList.contains('found')) return;

        const lastCell = this.selectedCells[this.selectedCells.length - 1];
        if (lastCell === e.target) return;

        // Clear temporary selections
        document.querySelectorAll('.cell.temporary').forEach(cell => {
            cell.classList.remove('temporary');
        });

        // Check if selection is valid (straight line)
        const cells = this.getCellsInLine(this.selectedCells[0], e.target);
        if (cells) {
            cells.forEach(cell => {
                if (!cell.classList.contains('selected') && !cell.classList.contains('found')) {
                    cell.classList.add('temporary');
                }
            });
        }
    }

    handleSelectionEnd() {
        if (!this.isSelecting) return;
        this.isSelecting = false;

        // Get all selected cells (including temporary)
        const allSelected = [
            ...document.querySelectorAll('.cell.selected'),
            ...document.querySelectorAll('.cell.temporary')
        ];

        if (allSelected.length > 0) {
            const word = Array.from(allSelected).map(cell => cell.textContent).join('');
            this.checkWord(word, allSelected);
        }

        // Clear selections
        document.querySelectorAll('.cell.selected, .cell.temporary').forEach(cell => {
            cell.classList.remove('selected', 'temporary');
        });

        this.selectedCells = [];
    }

    getCellsInLine(startCell, endCell) {
        const startRow = parseInt(startCell.dataset.row);
        const startCol = parseInt(startCell.dataset.col);
        const endRow = parseInt(endCell.dataset.row);
        const endCol = parseInt(endCell.dataset.col);

        const deltaRow = endRow - startRow;
        const deltaCol = endCol - startCol;

        // Check if it's a straight line
        if (deltaRow !== 0 && deltaCol !== 0 && Math.abs(deltaRow) !== Math.abs(deltaCol)) {
            return null;
        }

        const steps = Math.max(Math.abs(deltaRow), Math.abs(deltaCol));
        const stepRow = deltaRow === 0 ? 0 : deltaRow / Math.abs(deltaRow);
        const stepCol = deltaCol === 0 ? 0 : deltaCol / Math.abs(deltaCol);

        const cells = [];
        for (let i = 0; i <= steps; i++) {
            const row = startRow + (stepRow * i);
            const col = startCol + (stepCol * i);
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) cells.push(cell);
        }

        return cells;
    }

    checkWord(word, cells) {
        // Check forward and backward
        const reversedWord = word.split('').reverse().join('');

        if (this.words.includes(word) && !this.foundWords.has(word)) {
            this.markWordFound(word, cells);
        } else if (this.words.includes(reversedWord) && !this.foundWords.has(reversedWord)) {
            this.markWordFound(reversedWord, cells);
        }
    }

    markWordFound(word, cells) {
        this.foundWords.add(word);
        cells.forEach(cell => cell.classList.add('found'));

        // Update word list
        const wordItem = document.querySelector(`[data-word="${word}"]`);
        if (wordItem) wordItem.classList.add('found');

        // Update score
        this.score += word.length * 10;
        this.scoreElement.textContent = this.score;

        // Check if level is complete
        if (this.foundWords.size === this.words.length) {
            setTimeout(() => this.levelComplete(), 500);
        }

        this.saveProgress();
    }

    levelComplete() {
        const levelData = LEVELS[this.currentLevel - 1];
        this.showVictory(`Level ${this.currentLevel} Complete! 🎉`);
        this.nextBtn.style.display = 'block';
    }

    showVictory(message) {
        document.getElementById('victoryMessage').textContent = message;
        this.victoryModal.classList.add('active');
    }

    closeVictoryModal() {
        this.victoryModal.classList.remove('active');
    }

    resetLevel() {
        this.loadLevel(this.currentLevel);
    }

    saveProgress() {
        localStorage.setItem('wordSearchProgress', JSON.stringify({
            level: this.currentLevel,
            score: this.score
        }));
    }

    loadProgress() {
        const saved = localStorage.getItem('wordSearchProgress');
        if (saved) {
            const data = JSON.parse(saved);
            this.currentLevel = data.level;
            this.score = data.score;
            this.scoreElement.textContent = this.score;
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new WordSearchGame();
});
