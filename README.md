# Word Search Game 🔍

A modern, feature-rich word search game with 20 progressive levels, timer challenges, combo system, and hints. Built entirely with vanilla JavaScript - no frameworks, no dependencies!

![Game Preview](https://img.shields.io/badge/Status-Ready%20to%20Play-success)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow)
![CSS3](https://img.shields.io/badge/CSS3-Grid%20%26%20Flexbox-blue)
![Mobile](https://img.shields.io/badge/Mobile-Optimized-green)

## ✨ Features

### 🎮 Gameplay
- **20 Progressive Levels** - From beginner to expert difficulty
- **15+ Unique Themes** - Pets, Nature, Technology, Programming, Sports, and more
- **4 Difficulty Tiers** - Easy, Medium, Hard, and Expert
- **Multiple Word Directions** - Horizontal, vertical, and diagonal placements
- **Reverse Words** - Words can appear backwards for extra challenge

### ⏱️ Advanced Mechanics
- **Timer System** - Race against the clock with level-specific time limits
- **Combo Multiplier** - Build combos for massive score bonuses
- **Hint System** - Get help when stuck (costs points)
- **Smart Scoring** - Based on word length, difficulty, combos, and speed
- **Bonus Points** - Time bonuses and perfect completion rewards

### 🎨 User Experience
- **📱 Fully Responsive** - Perfect on mobile, tablet, and desktop
- **💾 Auto-Save** - Progress automatically saved to localStorage
- **🔔 Toast Notifications** - Real-time feedback for every action
- **📊 Progress Tracking** - Visual progress bar and statistics
- **✨ Smooth Animations** - Polished transitions and effects

### 🔧 Technical Highlights
- **Intelligent Algorithm** - Advanced word placement with backtracking
- **Touch Optimized** - Seamless mobile experience with touch events
- **Zero Dependencies** - Pure vanilla JavaScript
- **No Build Process** - Just open and play!

## 🎯 How to Play

1. **Select Words** - Click/touch the first letter and drag to the last letter
2. **Find All Words** - Complete the word list before time runs out
3. **Build Combos** - Find words quickly for score multipliers
4. **Use Hints Wisely** - Hints cost points but reveal word locations
5. **Beat the Clock** - Faster completion = bigger time bonus!

### Controls
- **Desktop**: Click and drag with mouse
- **Mobile**: Touch and swipe
- **Hint**: Click the 💡 button
- **Reset**: Start the level over

## 🚀 Quick Start

### Option 1: Play Locally
```bash
# Clone the repository
git clone https://github.com/allanluz/word-search.git
cd word-search

# Open in browser
open index.html  # Mac
xdg-open index.html  # Linux
start index.html  # Windows
```

### Option 2: GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages
3. Set Source to "main" branch
4. Your game will be live at `https://yourusername.github.io/word-search/`

## 📁 Project Structure

```
word-search/
├── index.html          # Main HTML structure
├── styles.css          # Responsive styling & animations
├── game.js             # Core game logic (600+ lines)
├── levels.js           # 20 level definitions
├── README.md           # This file
├── FEATURES.md         # Detailed customization guide
└── .gitignore
```

## 🎨 Customization

The game is highly customizable! Check out [FEATURES.md](FEATURES.md) for detailed guides on:

- Adding new levels and themes
- Modifying difficulty settings
- Changing color schemes
- Adjusting scoring formulas
- Creating power-ups
- And much more!

### Quick Customization Examples

**Change Colors:**
```css
/* In styles.css */
:root {
    --primary-color: #your-color;
    --secondary-color: #your-accent;
}
```

**Add New Level:**
```javascript
// In levels.js
{
    level: 21,
    gridSize: 18,
    words: ['YOUR', 'WORDS', 'HERE'],
    theme: 'Your Theme',
    difficulty: 'expert',
    timeLimit: 360
}
```

**Adjust Difficulty:**
```javascript
// In levels.js - DIFFICULTY_SETTINGS
easy: {
    diagonalChance: 0.2,  // 20% diagonal words
    reverseChance: 0.1,    // 10% reversed
    hintCost: 50,
    scoreMultiplier: 1.0
}
```

## 🎯 Scoring System

```
Base Score = word.length × 10
Final Score = Base × Difficulty Multiplier × Combo Bonus

Difficulty Multipliers:
- Easy: 1.0x
- Medium: 1.5x
- Hard: 2.0x
- Expert: 2.5x

Bonuses:
- Time Bonus: +5 points per second remaining
- Perfect Bonus: +500 points (no hints used)
- Combo Bonus: +0.5x per consecutive find
```

## 🏆 Level Progression

| Levels | Difficulty | Grid Size | Words | Time Limit |
|--------|-----------|-----------|-------|------------|
| 1-5    | Easy      | 8-11      | 4-6   | 180-220s   |
| 6-10   | Medium    | 12-14     | 6-7   | 240-280s   |
| 11-15  | Hard      | 14-16     | 7-8   | 280-320s   |
| 16-20  | Expert    | 17-20     | 8-10  | 340-400s   |

## 🛠️ Tech Stack

- **HTML5** - Semantic structure with accessibility in mind
- **CSS3** - Modern Grid & Flexbox layouts, CSS Variables, Animations
- **JavaScript ES6+** - Classes, Arrow Functions, Spread Operator, Template Literals
- **LocalStorage API** - Progress persistence
- **Touch Events API** - Mobile optimization

## 📱 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Share your custom levels

## 📄 License

MIT License - feel free to use this project for learning or in your own applications!

## 🌟 Credits

Created with [Claude Code](https://claude.com/claude-code) - An AI-powered development tool by Anthropic.

## 🎮 Future Ideas

- [ ] Multiplayer mode
- [ ] Custom puzzle creator
- [ ] Daily challenges
- [ ] Achievements system
- [ ] Sound effects
- [ ] Leaderboards
- [ ] More themes (50+ levels)
- [ ] Difficulty selector
- [ ] Color blind mode

---

**Ready to play?** Just open `index.html` in your browser and start finding words! 🎉
