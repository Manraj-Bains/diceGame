const Game = {
    playerScore: 0,
    computerScore: 0,
    round: 0,

    rollDice: function() {
        document.querySelectorAll('.dice').forEach(dice => dice.style.animation = 'none');

        setTimeout(() => {
            document.querySelectorAll('.dice').forEach(dice => dice.style.animation = '');
            let playerDiceValues = this.rollTwoDice();
            let computerDiceValues = this.rollTwoDice();
            this.updateDiceDisplay(playerDiceValues, computerDiceValues);
            this.calculateScores(playerDiceValues, computerDiceValues);
            this.round++;

            if (this.round >= 3) {
                this.determineWinner();
            }
        }, 10); // Delay to restart animation
    },

    rollTwoDice: function() {
        return [this.getRandomDiceRoll(), this.getRandomDiceRoll()];
    },

    getRandomDiceRoll: function() {
        return Math.floor(Math.random() * 6) + 1;
    },

    updateDiceDisplay: function(playerDiceValues, computerDiceValues) {
        document.getElementById('player-dice').style.backgroundImage = `url('images/dice-${playerDiceValues[0]}.png')`;
        document.getElementById('computer-dice').style.backgroundImage = `url('images/dice-${computerDiceValues[0]}.png')`;
    },

    calculateScores: function(playerDiceValues, computerDiceValues) {
        this.playerScore += this.calculateScore(playerDiceValues);
        this.computerScore += this.calculateScore(computerDiceValues);
        document.getElementById('player-score').textContent = this.playerScore;
        document.getElementById('computer-score').textContent = this.computerScore;
    },

    calculateScore: function(diceValues) {
        if (diceValues.includes(1)) {
            return 0;
        } else if (diceValues[0] === diceValues[1]) {
            return (diceValues[0] + diceValues[1]) * 2;
        } else {
            return diceValues[0] + diceValues[1];
        }
    },

    determineWinner: function() {
        let winner = this.playerScore > this.computerScore ? 'Player wins!' : 'Computer wins!';
        document.getElementById('winner-announcement').textContent = winner;
        this.disableButtons();
    },

    resetGame: function() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 0;
        document.getElementById('player-score').textContent = '0';
        document.getElementById('computer-score').textContent = '0';
        document.getElementById('winner-announcement').textContent = '';
        this.enableButtons();
    },

    disableButtons: function() {
        document.getElementById('roll-dice').disabled = true;
    },

    enableButtons: function() {
        document.getElementById('roll-dice').disabled = false;
    }
};

document.getElementById('roll-dice').addEventListener('click', () => Game.rollDice());
document.getElementById('reset-game').addEventListener('click', () => Game.resetGame());
