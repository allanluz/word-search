// Word Search Game - Enhanced Version with Timer, Hints, Combos, and Advanced Features
class WordSearchGame {
    constructor() {
        // Core game state
        this.currentLevel = 1;
        this.score = 0;
        this.grid = [];
        this.words = [];
        this.foundWords = new Set();
        this.selectedCells = [];
        this.isSelecting = false;
        this.currentSelectionPath = null; // Stores the current selection in correct order
        this.wordPositions = []; // Stores {word, cells: [{row, col}]}

        // Enhanced features
        this.timer = null;
        this.timeRemaining = 0;
        this.combo = 0;
        this.lastWordFoundTime = 0;
        this.comboTimeout = null;
        this.hintsUsed = 0;
        this.levelStartTime = 0;
        this.isPaused = false;

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
        this.timerElement = document.getElementById('timer');
        this.comboElement = document.getElementById('combo');
        this.themeDisplayElement = document.getElementById('themeDisplay');
        this.progressBarElement = document.getElementById('progressBar');
        this.progressTextElement = document.getElementById('progressText');
        this.resetBtn = document.getElementById('resetBtn');
        this.hintBtn = document.getElementById('hintBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.victoryModal = document.getElementById('victoryModal');
        this.continueBtn = document.getElementById('continueBtn');
        this.toastElement = document.getElementById('toast');
    }

    loadLevel(levelNumber) {
        const levelData = LEVELS[levelNumber - 1];
        if (!levelData) {
            this.showVictory('🎊 Congratulations! You completed all levels!');
            return;
        }

        this.currentLevel = levelNumber;
        this.words = [...levelData.words]; // Copy array
        this.foundWords.clear();
        this.selectedCells = [];
        this.wordPositions = [];
        this.combo = 0;
        this.hintsUsed = 0;
        this.levelStartTime = Date.now();

        this.currentLevelElement.textContent = levelNumber;
        this.themeDisplayElement.textContent = `Theme: ${levelData.theme}`;
        this.nextBtn.style.display = 'none';

        // Update hint cost based on difficulty
        const difficulty = DIFFICULTY_SETTINGS[levelData.difficulty];
        document.getElementById('hintCost').textContent = `(${difficulty.hintCost})`;
        this.hintBtn.disabled = false;

        this.createGrid(levelData.gridSize);
        this.placeWordsInGridAdvanced(levelData.difficulty);
        this.fillEmptySpaces();
        this.renderGrid();
        this.renderWordsList();
        this.updateProgress();

        // Start timer
        this.startTimer(levelData.timeLimit);
    }

    createGrid(size) {
        this.grid = Array(size).fill(null).map(() => Array(size).fill(''));
    }

    // ENHANCED ALGORITHM: Intelligent word placement with backtracking
    placeWordsInGridAdvanced(difficulty) {
        const settings = DIFFICULTY_SETTINGS[difficulty];

        // Define all 8 directions
        const allDirections = [
            { dr: 0, dc: 1, name: 'right' },        // Horizontal right
            { dr: 1, dc: 0, name: 'down' },         // Vertical down
            { dr: 1, dc: 1, name: 'diag-down' },    // Diagonal down-right
            { dr: -1, dc: 1, name: 'diag-up' },     // Diagonal up-right
        ];

        // Sort words by length (longest first) for better placement success
        const sortedWords = [...this.words].sort((a, b) => b.length - a.length);

        for (const word of sortedWords) {
            let placed = false;
            let attempts = 0;
            const maxAttempts = 150;

            // Shuffle directions based on difficulty
            const availableDirections = this.getDirectionsForDifficulty(allDirections, settings);

            while (!placed && attempts < maxAttempts) {
                attempts++;

                // Try different starting positions
                const row = Math.floor(Math.random() * this.grid.length);
                const col = Math.floor(Math.random() * this.grid[0].length);

                // Try each direction
                for (const dir of availableDirections) {
                    // Randomly reverse word based on difficulty
                    const shouldReverse = Math.random() < settings.reverseChance;
                    const finalWord = shouldReverse ? word.split('').reverse().join('') : word;

                    if (this.tryPlaceWord(finalWord, row, col, dir)) {
                        placed = true;
                        break;
                    }
                }
            }

            if (!placed) {
                console.warn(`Could not place word: ${word} after ${attempts} attempts`);
            }
        }
    }

    getDirectionsForDifficulty(allDirections, settings) {
        const directions = [];

        // Always include horizontal and vertical
        directions.push(allDirections[0], allDirections[1]);

        // Add diagonals based on difficulty
        if (Math.random() < settings.diagonalChance) {
            directions.push(allDirections[2]);
        }
        if (Math.random() < settings.diagonalChance) {
            directions.push(allDirections[3]);
        }

        // Shuffle for randomness
        return directions.sort(() => Math.random() - 0.5);
    }

    tryPlaceWord(word, startRow, startCol, direction) {
        const cells = [];

        // Check if word fits
        for (let i = 0; i < word.length; i++) {
            const row = startRow + (direction.dr * i);
            const col = startCol + (direction.dc * i);

            // Check bounds
            if (row < 0 || row >= this.grid.length ||
                col < 0 || col >= this.grid[0].length) {
                return false;
            }

            // Check if cell is empty or has matching letter
            if (this.grid[row][col] !== '' && this.grid[row][col] !== word[i]) {
                return false;
            }

            cells.push({ row, col });
        }

        // Place the word
        for (let i = 0; i < word.length; i++) {
            this.grid[cells[i].row][cells[i].col] = word[i];
        }

        // Find the original word (might be reversed)
        const originalWord = this.words.find(w =>
            w === word || w.split('').reverse().join('') === word
        );

        this.wordPositions.push({
            word: originalWord,
            cells,
            placedWord: word
        });

        return true;
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

    updateProgress() {
        const progress = (this.foundWords.size / this.words.length) * 100;
        this.progressBarElement.style.width = `${progress}%`;
        this.progressTextElement.textContent = `${this.foundWords.size}/${this.words.length} words found`;
    }

    // TIMER SYSTEM
    startTimer(seconds) {
        this.timeRemaining = seconds;
        this.updateTimerDisplay();

        if (this.timer) {
            clearInterval(this.timer);
        }

        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.timeRemaining--;
                this.updateTimerDisplay();

                if (this.timeRemaining <= 0) {
                    this.timeUp();
                } else if (this.timeRemaining <= 30) {
                    this.timerElement.style.color = '#ef4444';
                }
            }
        }, 1000);
    }

    updateTimerDisplay() {
        const minutes = Math.floor(this.timeRemaining / 60);
        const seconds = this.timeRemaining % 60;
        this.timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    timeUp() {
        clearInterval(this.timer);
        this.showToast('⏰ Time\'s up!', 'error');
        setTimeout(() => {
            this.resetLevel();
        }, 2000);
    }

    // HINT SYSTEM
    useHint() {
        const levelData = LEVELS[this.currentLevel - 1];
        const hintCost = DIFFICULTY_SETTINGS[levelData.difficulty].hintCost;

        if (this.score < hintCost) {
            this.showToast('Not enough points for a hint!', 'error');
            return;
        }

        // Find an unfound word
        const unfoundWords = this.words.filter(word => !this.foundWords.has(word));
        if (unfoundWords.length === 0) return;

        const randomWord = unfoundWords[Math.floor(Math.random() * unfoundWords.length)];
        const wordPos = this.wordPositions.find(wp => wp.word === randomWord);

        if (wordPos) {
            // Highlight first letter
            const firstCell = wordPos.cells[0];
            const cellElement = document.querySelector(`[data-row="${firstCell.row}"][data-col="${firstCell.col}"]`);

            if (cellElement) {
                cellElement.classList.add('hint');
                setTimeout(() => {
                    cellElement.classList.remove('hint');
                }, 3000);

                this.score -= hintCost;
                this.scoreElement.textContent = this.score;
                this.hintsUsed++;
                this.showToast(`💡 Hint: Look for "${randomWord}"`, 'info');
                this.saveProgress();
            }
        }
    }

    // COMBO SYSTEM
    updateCombo() {
        const now = Date.now();
        const timeSinceLastWord = now - this.lastWordFoundTime;

        // Reset combo if more than 5 seconds passed
        if (timeSinceLastWord > 5000) {
            this.combo = 0;
        }

        this.combo++;
        this.lastWordFoundTime = now;
        this.comboElement.textContent = `${this.combo}x`;
        this.comboElement.classList.add('active');

        setTimeout(() => {
            this.comboElement.classList.remove('active');
        }, 500);

        // Reset combo after 5 seconds
        if (this.comboTimeout) {
            clearTimeout(this.comboTimeout);
        }
        this.comboTimeout = setTimeout(() => {
            this.combo = 0;
            this.comboElement.textContent = '0x';
        }, 5000);
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
        this.hintBtn.addEventListener('click', () => this.useHint());
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
            // Store the current selection path for later use
            this.currentSelectionPath = cells;

            cells.forEach(cell => {
                if (!cell.classList.contains('selected') && !cell.classList.contains('found')) {
                    cell.classList.add('temporary');
                }
            });
        } else {
            this.currentSelectionPath = null;
        }
    }

    handleSelectionEnd() {
        if (!this.isSelecting) return;
        this.isSelecting = false;

        // Use the stored selection path to maintain correct order
        let allSelected = this.currentSelectionPath || [];

        // Fallback: if no path stored, try to get from DOM (shouldn't happen but safety check)
        if (allSelected.length === 0) {
            allSelected = [
                ...document.querySelectorAll('.cell.selected'),
                ...document.querySelectorAll('.cell.temporary')
            ];
        }

        if (allSelected.length > 0) {
            // Get the word from the selected cells in order
            const word = Array.from(allSelected)
                .filter(cell => cell && cell.textContent)
                .map(cell => cell.textContent)
                .join('');

            if (word.length > 0) {
                this.checkWord(word, allSelected);
            }
        }

        // Clear selections
        document.querySelectorAll('.cell.selected, .cell.temporary').forEach(cell => {
            cell.classList.remove('selected', 'temporary');
        });

        this.selectedCells = [];
        this.currentSelectionPath = null;
    }

    getCellsInLine(startCell, endCell) {
        const startRow = parseInt(startCell.dataset.row);
        const startCol = parseInt(startCell.dataset.col);
        const endRow = parseInt(endCell.dataset.row);
        const endCol = parseInt(endCell.dataset.col);

        const deltaRow = endRow - startRow;
        const deltaCol = endCol - startCol;

        // Check if it's a straight line (horizontal, vertical, or diagonal)
        if (deltaRow !== 0 && deltaCol !== 0 && Math.abs(deltaRow) !== Math.abs(deltaCol)) {
            return null;
        }

        const steps = Math.max(Math.abs(deltaRow), Math.abs(deltaCol));

        // Calculate step direction (-1, 0, or 1 for each axis)
        const stepRow = steps === 0 ? 0 : deltaRow / steps;
        const stepCol = steps === 0 ? 0 : deltaCol / steps;

        const cells = [];
        for (let i = 0; i <= steps; i++) {
            const row = Math.round(startRow + (stepRow * i));
            const col = Math.round(startCol + (stepCol * i));
            const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
            if (cell) {
                cells.push(cell);
            }
        }

        return cells.length > 0 ? cells : null;
    }

    checkWord(word, cells) {
        if (!word || word.length === 0 || cells.length === 0) {
            return;
        }

        // Check both forward and backward
        const reversedWord = word.split('').reverse().join('');

        // Debug log (can be removed later)
        console.log('Checking word:', word);
        console.log('Reversed word:', reversedWord);
        console.log('Available words:', this.words);
        console.log('Word found forward?', this.words.includes(word));
        console.log('Word found backward?', this.words.includes(reversedWord));

        // Try to find the word in either direction
        let foundWord = null;

        if (this.words.includes(word) && !this.foundWords.has(word)) {
            foundWord = word;
        } else if (this.words.includes(reversedWord) && !this.foundWords.has(reversedWord)) {
            foundWord = reversedWord;
        }

        // If word found in either direction, mark it
        if (foundWord) {
            console.log('✅ Found word:', foundWord);
            this.markWordFound(foundWord, cells);
        } else {
            console.log('❌ Word not found in list');
        }
    }

    markWordFound(word, cells) {
        this.foundWords.add(word);
        cells.forEach(cell => cell.classList.add('found'));

        // Update word list
        const wordItem = document.querySelector(`[data-word="${word}"]`);
        if (wordItem) wordItem.classList.add('found');

        // Update combo
        this.updateCombo();

        // Calculate score with multipliers
        const levelData = LEVELS[this.currentLevel - 1];
        const difficultyMultiplier = DIFFICULTY_SETTINGS[levelData.difficulty].scoreMultiplier;
        const comboBonus = this.combo > 1 ? this.combo * 0.5 : 1;
        const baseScore = word.length * 10;
        const totalScore = Math.floor(baseScore * difficultyMultiplier * comboBonus);

        this.score += totalScore;
        this.scoreElement.textContent = this.score;

        // Show combo message
        if (this.combo > 1) {
            this.showToast(`🔥 ${this.combo}x Combo! +${totalScore}`, 'success');
        } else {
            this.showToast(`✓ ${word} found! +${totalScore}`, 'success');
        }

        this.updateProgress();

        // Check if level is complete
        if (this.foundWords.size === this.words.length) {
            setTimeout(() => this.levelComplete(), 500);
        }

        this.saveProgress();
    }

    levelComplete() {
        clearInterval(this.timer);

        const levelData = LEVELS[this.currentLevel - 1];

        // Calculate bonuses
        const timeBonus = Math.floor(this.timeRemaining * 5);
        const perfectBonus = this.hintsUsed === 0 ? 500 : 0;
        const totalBonus = timeBonus + perfectBonus;

        this.score += totalBonus;
        this.scoreElement.textContent = this.score;

        // Update victory modal
        document.getElementById('victoryTitle').textContent = '🎉 Level Complete!';
        document.getElementById('timeBonus').textContent = `+${timeBonus}`;
        document.getElementById('perfectBonus').textContent = `+${perfectBonus}`;
        document.getElementById('totalScore').textContent = this.score;

        let message = `Theme: ${levelData.theme}\n`;
        if (perfectBonus > 0) {
            message += '🌟 Perfect! No hints used!';
        }

        document.getElementById('victoryMessage').textContent = message;

        this.showVictory();
        this.nextBtn.style.display = 'block';
        this.saveProgress();
    }

    showVictory(customMessage) {
        if (customMessage) {
            document.getElementById('victoryTitle').textContent = customMessage;
            document.getElementById('victoryMessage').textContent = '';
            document.querySelector('.victory-stats').style.display = 'none';
        } else {
            document.querySelector('.victory-stats').style.display = 'flex';
        }
        this.victoryModal.classList.add('active');
    }

    closeVictoryModal() {
        this.victoryModal.classList.remove('active');
    }

    showToast(message, type = 'info') {
        this.toastElement.textContent = message;
        this.toastElement.className = `toast ${type} show`;

        setTimeout(() => {
            this.toastElement.classList.remove('show');
        }, 3000);
    }

    resetLevel() {
        clearInterval(this.timer);
        this.loadLevel(this.currentLevel);
    }

    saveProgress() {
        localStorage.setItem('wordSearchProgress', JSON.stringify({
            level: this.currentLevel,
            score: this.score,
            timestamp: Date.now()
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
