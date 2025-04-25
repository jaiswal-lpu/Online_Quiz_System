# Interactive Quiz Application
![Quiz App Preview Banner](https://raw.githubusercontent.com/jaiswal-lpu/Online_Quiz_System/main/assets/home.png)
![Quiz App Preview Banner](https://raw.githubusercontent.com/jaiswal-lpu/Online_Quiz_System/main/assets/question.png)
![Quiz App Preview Banner](https://raw.githubusercontent.com/jaiswal-lpu/Online_Quiz_System/main/assets/score.png)
![Quiz App Preview Banner](https://raw.githubusercontent.com/jaiswal-lpu/Online_Quiz_System/main/assets/submisshion.png)
![Quiz App Preview Banner](https://raw.githubusercontent.com/jaiswal-lpu/Online_Quiz_System/main/assets/highscore.png)
A responsive and interactive quiz application that allows users to test their knowledge across various categories.

## Live Link 
- https://quiz-ten-orcin.vercel.app/

## Features

### Core Functionality
- **Multiple Categories**: Choose from General Knowledge, Computer Science, Sports, History, and Animals
- **Dynamic Questions**: Questions are fetched from the Open Trivia Database API
- **Timed Quizzes**: 60-second timer for each quiz session
- **Score Tracking**: Points awarded for correct answers
- **High Score System**: Save and view top scores with player names

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Visual Feedback**: Color-coded answers (green for correct, red for incorrect)
- **Loading Indicator**: Spinner shown while questions are being loaded
- **Timer Warning**: Visual alert when time is running low

### Game Flow
1. Home screen with Play and High Scores options
2. Category selection
3. Quiz gameplay with timer and score tracking
4. End screen with final score and name input
5. High scores display

## Technical Details

### HTML Structure
- Semantic HTML5 elements
- Organized sections for different game states (home, game, end, high scores)
- Responsive container layout

### CSS Features
- CSS Variables for consistent color scheme
- Flexbox layout for responsive design
- Transitions and animations for interactive elements
- Media queries for mobile responsiveness

### JavaScript Functionality
- Fetch API for retrieving questions from external API
- Local Storage for saving high scores
- DOM manipulation for dynamic content
- Event handling for user interactions
- Timer implementation with visual feedback

## How to Use

1. Open `index.html` in a web browser
2. Click "Play" to start a new game
3. Select a category
4. Answer the questions by clicking on your chosen option
5. Complete the quiz before the timer runs out
6. Enter your name to save your score
7. View high scores and compare your results

## Future Enhancements

- Difficulty levels (Easy, Medium, Hard)
- Additional categories
- Sound effects and background music
- User accounts and online leaderboards
- Question feedback with explanations

## Credits

- Questions provided by [Open Trivia Database](https://opentdb.com/)
- Developed as a learning project for web development skills
```

```

I've improved the code by:

1. **Restructuring the HTML** for better organization and semantic markup
2. **Refactoring the JavaScript** with:
   - Clear variable and function organization
   - Improved error handling
   - Better code comments
   - More consistent naming conventions
3. **Enhancing the CSS** with:
   - CSS variables for consistent theming
   - Better responsive design
   - Improved animations and transitions
4. **Added a comprehensive README.md** that documents all features and functionality

The application now has a cleaner structure, better organization, and improved user experience while maintaining all the original functionality.

<Actions>
  <Action name="Add user authentication" description="Implement user accounts to track progress across sessions" />
  <Action name="Add difficulty levels" description="Allow users to select Easy, Medium, or Hard difficulty" />
  <Action name="Implement sound effects" description="Add audio feedback for correct/incorrect answers and timer" />
  <Action name="Create custom themes" description="Add theme selection with different color schemes" />
  <Action name="Add question feedback" description="Show explanations for answers after each question" />
</Actions>

```

