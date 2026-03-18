// Game levels configuration
// Each level increases in difficulty with more words and larger grids

// Translation dictionary EN -> PT-BR
const TRANSLATIONS = {
    // Level 1
    'CAT': 'GATO',
    'DOG': 'CACHORRO',
    'BIRD': 'PÁSSARO',
    'FISH': 'PEIXE',
    // Level 2
    'SUN': 'SOL',
    'MOON': 'LUA',
    'STAR': 'ESTRELA',
    'CLOUD': 'NUVEM',
    'WIND': 'VENTO',
    // Level 3
    'APPLE': 'MAÇÃ',
    'GRAPE': 'UVA',
    'LEMON': 'LIMÃO',
    'MELON': 'MELÃO',
    'PEACH': 'PÊSSEGO',
    'BERRY': 'FRUTA SILVESTRE',
    // Level 4
    'RED': 'VERMELHO',
    'BLUE': 'AZUL',
    'GREEN': 'VERDE',
    'YELLOW': 'AMARELO',
    'ORANGE': 'LARANJA',
    'PURPLE': 'ROXO',
    // Level 5
    'BOOK': 'LIVRO',
    'DESK': 'MESA',
    'CHAIR': 'CADEIRA',
    'PENCIL': 'LÁPIS',
    'PAPER': 'PAPEL',
    'RULER': 'RÉGUA',
    // Level 6
    'SPRING': 'PRIMAVERA',
    'SUMMER': 'VERÃO',
    'AUTUMN': 'OUTONO',
    'WINTER': 'INVERNO',
    'SEASON': 'ESTAÇÃO',
    'WEATHER': 'CLIMA',
    // Level 7
    'HAPPY': 'FELIZ',
    'BRAVE': 'CORAJOSO',
    'STRONG': 'FORTE',
    'SMART': 'INTELIGENTE',
    'KIND': 'GENTIL',
    'GENTLE': 'SUAVE',
    'CALM': 'CALMO',
    // Level 8
    'PIZZA': 'PIZZA',
    'BURGER': 'HAMBÚRGUER',
    'PASTA': 'MASSA',
    'SALAD': 'SALADA',
    'SOUP': 'SOPA',
    'BREAD': 'PÃO',
    'RICE': 'ARROZ',
    // Level 9
    'TOKYO': 'TÓQUIO',
    'PARIS': 'PARIS',
    'LONDON': 'LONDRES',
    'ROME': 'ROMA',
    'BERLIN': 'BERLIM',
    'MADRID': 'MADRI',
    'MOSCOW': 'MOSCOU',
    // Level 10
    'SOCCER': 'FUTEBOL',
    'TENNIS': 'TÊNIS',
    'GOLF': 'GOLFE',
    'HOCKEY': 'HÓQUEI',
    'BOXING': 'BOXE',
    'RACING': 'CORRIDA',
    'SWIMMING': 'NATAÇÃO',
    // Level 11
    'MOUNTAIN': 'MONTANHA',
    'OCEAN': 'OCEANO',
    'FOREST': 'FLORESTA',
    'DESERT': 'DESERTO',
    'RIVER': 'RIO',
    'VALLEY': 'VALE',
    'ISLAND': 'ILHA',
    // Level 12
    'GUITAR': 'VIOLÃO',
    'PIANO': 'PIANO',
    'VIOLIN': 'VIOLINO',
    'DRUMS': 'BATERIA',
    'TRUMPET': 'TROMPETE',
    'FLUTE': 'FLAUTA',
    'CELLO': 'VIOLONCELO',
    // Level 13
    'COMPUTER': 'COMPUTADOR',
    'KEYBOARD': 'TECLADO',
    'MONITOR': 'MONITOR',
    'MOUSE': 'MOUSE',
    'PRINTER': 'IMPRESSORA',
    'SCANNER': 'SCANNER',
    'ROUTER': 'ROTEADOR',
    // Level 14
    'DIAMOND': 'DIAMANTE',
    'EMERALD': 'ESMERALDA',
    'SAPPHIRE': 'SAFIRA',
    'RUBY': 'RUBI',
    'TOPAZ': 'TOPÁZIO',
    'PEARL': 'PÉROLA',
    'AMBER': 'ÂMBAR',
    'JADE': 'JADE',
    // Level 15
    'ELEPHANT': 'ELEFANTE',
    'CROCODILE': 'CROCODILO',
    'BUTTERFLY': 'BORBOLETA',
    'DOLPHIN': 'GOLFINHO',
    'PENGUIN': 'PINGUIM',
    'KANGAROO': 'CANGURU',
    'GIRAFFE': 'GIRAFA',
    'LEOPARD': 'LEOPARDO',
    // Level 16
    'ANCIENT': 'ANTIGO',
    'MEDIEVAL': 'MEDIEVAL',
    'RENAISSANCE': 'RENASCIMENTO',
    'MODERN': 'MODERNO',
    'CENTURY': 'SÉCULO',
    'HISTORY': 'HISTÓRIA',
    'EMPIRE': 'IMPÉRIO',
    'DYNASTY': 'DINASTIA',
    // Level 17
    'MERCURY': 'MERCÚRIO',
    'VENUS': 'VÊNUS',
    'EARTH': 'TERRA',
    'MARS': 'MARTE',
    'JUPITER': 'JÚPITER',
    'SATURN': 'SATURNO',
    'URANUS': 'URANO',
    'NEPTUNE': 'NETUNO',
    // Level 18
    'ADVENTURE': 'AVENTURA',
    'MYSTERY': 'MISTÉRIO',
    'FANTASY': 'FANTASIA',
    'THRILLER': 'SUSPENSE',
    'ROMANCE': 'ROMANCE',
    'COMEDY': 'COMÉDIA',
    'HORROR': 'TERROR',
    'DRAMA': 'DRAMA',
    'SCIENCE': 'CIÊNCIA',
    // Level 19
    'CARPENTER': 'CARPINTEIRO',
    'ARCHITECT': 'ARQUITETO',
    'ENGINEER': 'ENGENHEIRO',
    'TEACHER': 'PROFESSOR',
    'DOCTOR': 'MÉDICO',
    'LAWYER': 'ADVOGADO',
    'SCIENTIST': 'CIENTISTA',
    'ARTIST': 'ARTISTA',
    'CHEF': 'CHEF',
    // Level 20
    'JAVASCRIPT': 'JAVASCRIPT',
    'PYTHON': 'PYTHON',
    'TYPESCRIPT': 'TYPESCRIPT',
    'ALGORITHM': 'ALGORITMO',
    'DATABASE': 'BANCO DE DADOS',
    'FRAMEWORK': 'FRAMEWORK',
    'DEVELOPER': 'DESENVOLVEDOR',
    'VARIABLE': 'VARIÁVEL',
    'FUNCTION': 'FUNÇÃO',
    'COMPILER': 'COMPILADOR'
};

const LEVELS = [
    // BEGINNER LEVELS (1-5)
    {
        level: 1,
        gridSize: 8,
        words: ['CAT', 'DOG', 'BIRD', 'FISH'],
        theme: 'Pets',
        difficulty: 'easy',
        timeLimit: 180
    },
    {
        level: 2,
        gridSize: 9,
        words: ['SUN', 'MOON', 'STAR', 'CLOUD', 'WIND'],
        theme: 'Sky',
        difficulty: 'easy',
        timeLimit: 180
    },
    {
        level: 3,
        gridSize: 10,
        words: ['APPLE', 'GRAPE', 'LEMON', 'MELON', 'PEACH', 'BERRY'],
        theme: 'Fruits',
        difficulty: 'easy',
        timeLimit: 200
    },
    {
        level: 4,
        gridSize: 10,
        words: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'ORANGE', 'PURPLE'],
        theme: 'Colors',
        difficulty: 'easy',
        timeLimit: 200
    },
    {
        level: 5,
        gridSize: 11,
        words: ['BOOK', 'DESK', 'CHAIR', 'PENCIL', 'PAPER', 'RULER'],
        theme: 'School',
        difficulty: 'easy',
        timeLimit: 220
    },

    // INTERMEDIATE LEVELS (6-10)
    {
        level: 6,
        gridSize: 12,
        words: ['SPRING', 'SUMMER', 'AUTUMN', 'WINTER', 'SEASON', 'WEATHER'],
        theme: 'Seasons',
        difficulty: 'medium',
        timeLimit: 240
    },
    {
        level: 7,
        gridSize: 12,
        words: ['HAPPY', 'BRAVE', 'STRONG', 'SMART', 'KIND', 'GENTLE', 'CALM'],
        theme: 'Feelings',
        difficulty: 'medium',
        timeLimit: 240
    },
    {
        level: 8,
        gridSize: 13,
        words: ['PIZZA', 'BURGER', 'PASTA', 'SALAD', 'SOUP', 'BREAD', 'RICE'],
        theme: 'Food',
        difficulty: 'medium',
        timeLimit: 260
    },
    {
        level: 9,
        gridSize: 13,
        words: ['TOKYO', 'PARIS', 'LONDON', 'ROME', 'BERLIN', 'MADRID', 'MOSCOW'],
        theme: 'Cities',
        difficulty: 'medium',
        timeLimit: 260
    },
    {
        level: 10,
        gridSize: 14,
        words: ['SOCCER', 'TENNIS', 'GOLF', 'HOCKEY', 'BOXING', 'RACING', 'SWIMMING'],
        theme: 'Sports',
        difficulty: 'medium',
        timeLimit: 280
    },

    // ADVANCED LEVELS (11-15)
    {
        level: 11,
        gridSize: 14,
        words: ['MOUNTAIN', 'OCEAN', 'FOREST', 'DESERT', 'RIVER', 'VALLEY', 'ISLAND'],
        theme: 'Geography',
        difficulty: 'hard',
        timeLimit: 280
    },
    {
        level: 12,
        gridSize: 15,
        words: ['GUITAR', 'PIANO', 'VIOLIN', 'DRUMS', 'TRUMPET', 'FLUTE', 'CELLO'],
        theme: 'Music',
        difficulty: 'hard',
        timeLimit: 300
    },
    {
        level: 13,
        gridSize: 15,
        words: ['COMPUTER', 'KEYBOARD', 'MONITOR', 'MOUSE', 'PRINTER', 'SCANNER', 'ROUTER'],
        theme: 'Technology',
        difficulty: 'hard',
        timeLimit: 300
    },
    {
        level: 14,
        gridSize: 16,
        words: ['DIAMOND', 'EMERALD', 'SAPPHIRE', 'RUBY', 'TOPAZ', 'PEARL', 'AMBER', 'JADE'],
        theme: 'Gemstones',
        difficulty: 'hard',
        timeLimit: 320
    },
    {
        level: 15,
        gridSize: 16,
        words: ['ELEPHANT', 'CROCODILE', 'BUTTERFLY', 'DOLPHIN', 'PENGUIN', 'KANGAROO', 'GIRAFFE', 'LEOPARD'],
        theme: 'Wild Animals',
        difficulty: 'hard',
        timeLimit: 320
    },

    // EXPERT LEVELS (16-20)
    {
        level: 16,
        gridSize: 17,
        words: ['ANCIENT', 'MEDIEVAL', 'RENAISSANCE', 'MODERN', 'CENTURY', 'HISTORY', 'EMPIRE', 'DYNASTY'],
        theme: 'History',
        difficulty: 'expert',
        timeLimit: 340
    },
    {
        level: 17,
        gridSize: 17,
        words: ['MERCURY', 'VENUS', 'EARTH', 'MARS', 'JUPITER', 'SATURN', 'URANUS', 'NEPTUNE'],
        theme: 'Planets',
        difficulty: 'expert',
        timeLimit: 340
    },
    {
        level: 18,
        gridSize: 18,
        words: ['ADVENTURE', 'MYSTERY', 'FANTASY', 'THRILLER', 'ROMANCE', 'COMEDY', 'HORROR', 'DRAMA', 'SCIENCE'],
        theme: 'Genres',
        difficulty: 'expert',
        timeLimit: 360
    },
    {
        level: 19,
        gridSize: 18,
        words: ['CARPENTER', 'ARCHITECT', 'ENGINEER', 'TEACHER', 'DOCTOR', 'LAWYER', 'SCIENTIST', 'ARTIST', 'CHEF'],
        theme: 'Professions',
        difficulty: 'expert',
        timeLimit: 360
    },
    {
        level: 20,
        gridSize: 20,
        words: ['JAVASCRIPT', 'PYTHON', 'TYPESCRIPT', 'ALGORITHM', 'DATABASE', 'FRAMEWORK', 'DEVELOPER', 'VARIABLE', 'FUNCTION', 'COMPILER'],
        theme: 'Programming',
        difficulty: 'expert',
        timeLimit: 400
    }
];

// Difficulty settings
const DIFFICULTY_SETTINGS = {
    easy: {
        diagonalChance: 0.2,
        reverseChance: 0.1,
        hintCost: 50,
        scoreMultiplier: 1.0
    },
    medium: {
        diagonalChance: 0.4,
        reverseChance: 0.3,
        hintCost: 100,
        scoreMultiplier: 1.5
    },
    hard: {
        diagonalChance: 0.6,
        reverseChance: 0.5,
        hintCost: 150,
        scoreMultiplier: 2.0
    },
    expert: {
        diagonalChance: 0.8,
        reverseChance: 0.7,
        hintCost: 200,
        scoreMultiplier: 2.5
    }
};
