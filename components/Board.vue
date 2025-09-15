<template>
    <div class="game-container">
        <h1>Tic Tac Toe</h1>
        <div class="board">
            <Cell
                v-for="(cell, index) in board"
                :key="index"
                :value="cell"
                @click="makeMove(index)"
            />
        </div>
        <h2 class="status">{{ boardStatus }}</h2>
        <button v-if="winner || isDraw" @click="resetGame" class="reset-button">Gioca ancora</button>
    </div>
</template>

<script>
import Cell from './Cell.vue';

export default {
    components: {
        Cell,
    },
    data() {
        return {
            board: ['', '', '', '', '', '', '', '', ''],
            currentPlayer: 'X',
            winner: null,
        };
    },
    computed: {
        boardStatus() {
            if (this.winner) {
                return `Ha vinto il giocatore ${this.winner}! 🎉`;
            }
            if (this.isDraw) {
                return `Pareggio! 🤝`;
            }
            return `Turno del giocatore ${this.currentPlayer}`;
        },
        isDraw() {
            return this.board.every(cell => cell !== '') && !this.winner;
        }
    },
    methods: {
        makeMove(index) {
            if (this.board[index] === '' && !this.winner) {
                this.board[index] = this.currentPlayer;
                this.checkWinner();
                if (!this.winner) {
                    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
                }
            }
        },
        checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            for (const pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (
                    this.board[a] !== '' &&
                    this.board[a] === this.board[b] &&
                    this.board[b] === this.board[c]
                ) {
                    this.winner = this.board[a];
                    return;
                }
            }
        },
        resetGame() {
            this.board = ['', '', '', '', '', '', '', '', ''];
            this.currentPlayer = 'X';
            this.winner = null;
        }
    }
};
</script>

<style>
.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.board {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    gap: 5px;
    background-color: #333;
    border: 5px solid #333;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.status {
    font-size: 1.5rem;
    color: #555;
}

.reset-button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.reset-button:hover {
    background-color: #45a049;
}
</style>