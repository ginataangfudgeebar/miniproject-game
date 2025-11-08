// --- JAVASCRIPT (The Brains) ---

// 1. Get all the HTML elements
const guessInput = document.getElementById('guess-input');
const submitButton = document.getElementById('submit-btn');
const message = document.getElementById('message');
const guessCountDisplay = document.getElementById('guess-count');
const playAgainButton = document.getElementById('play-again-btn');
const gameInputArea = document.getElementById('game-input-area');

// 2. Game variables
let secretNumber;
let guessCount;

// 3. Initialize the game (start a new round)
function initializeGame() {
    
    // Pick a random number between 1 and 100
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;

    // Reset UI
    guessCountDisplay.textContent = guessCount;
    message.textContent = "Good luck!";
    message.className = ''; // Remove any color classes
    guessInput.value = '';
    
    // Show game input and hide play again button
    gameInputArea.style.display = 'block';
    playAgainButton.style.display = 'none';
    guessInput.focus(); // Put cursor in the box
}

// 4. Function to check the user's guess
function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    // --- Validation ---
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        message.textContent = "Please enter a number from 1 to 100.";
        message.className = 'text-high'; // Use red for error
        return; // Stop the function
    }

    // --- Process the guess ---
    guessCount++;
    guessCountDisplay.textContent = guessCount;

    // Remove old color classes
    message.className = '';

    if (userGuess === secretNumber) {
        // --- Player Wins ---
        message.textContent = `You got it in ${guessCount} guesses!`;
        message.classList.add('text-correct');
        
        // Hide game input and show play again button
        gameInputArea.style.display = 'none';
        playAgainButton.style.display = 'block';

    } else if (userGuess > secretNumber) {
        // --- Guess is too high ---
        message.textContent = "Too high! Try again.";
        message.classList.add('text-high');
    } else {
        // --- Guess is too low ---
        message.textContent = "Too low! Try again.";
        message.classList.add('text-low');
    }

    // Clear input for next guess
    guessInput.value = '';
    guessInput.focus(); // Focus back on the input
}

// 5. Add Event Listeners
submitButton.addEventListener('click', checkGuess);
playAgainButton.addEventListener('click', initializeGame);

// Also allow pressing "Enter" to submit
guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

// 6. Start the game for the first time
initializeGame();