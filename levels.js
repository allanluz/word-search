// Game levels configuration
// Each level increases in difficulty with more words and larger grids

const LEVELS = [
    {
        level: 1,
        gridSize: 8,
        words: ['CAT', 'DOG', 'BIRD', 'FISH'],
        theme: 'Animals - Easy'
    },
    {
        level: 2,
        gridSize: 10,
        words: ['APPLE', 'GRAPE', 'LEMON', 'MELON', 'PEACH'],
        theme: 'Fruits'
    },
    {
        level: 3,
        gridSize: 10,
        words: ['BLUE', 'GREEN', 'YELLOW', 'ORANGE', 'PURPLE', 'RED'],
        theme: 'Colors'
    },
    {
        level: 4,
        gridSize: 12,
        words: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'SEASON'],
        theme: 'Seasons'
    },
    {
        level: 5,
        gridSize: 12,
        words: ['HAPPY', 'BRAVE', 'STRONG', 'SMART', 'KIND', 'GENTLE'],
        theme: 'Emotions'
    },
    {
        level: 6,
        gridSize: 14,
        words: ['MOUNTAIN', 'OCEAN', 'FOREST', 'DESERT', 'RIVER', 'VALLEY'],
        theme: 'Nature'
    },
    {
        level: 7,
        gridSize: 14,
        words: ['GUITAR', 'PIANO', 'VIOLIN', 'DRUMS', 'TRUMPET', 'FLUTE'],
        theme: 'Music Instruments'
    },
    {
        level: 8,
        gridSize: 15,
        words: ['COMPUTER', 'KEYBOARD', 'MONITOR', 'MOUSE', 'PRINTER', 'SCANNER'],
        theme: 'Technology'
    },
    {
        level: 9,
        gridSize: 15,
        words: ['FOOTBALL', 'BASKETBALL', 'TENNIS', 'BASEBALL', 'HOCKEY', 'GOLF'],
        theme: 'Sports'
    },
    {
        level: 10,
        gridSize: 16,
        words: ['ELEPHANT', 'CROCODILE', 'BUTTERFLY', 'DOLPHIN', 'PENGUIN', 'KANGAROO', 'GIRAFFE'],
        theme: 'Wild Animals - Hard'
    }
];
