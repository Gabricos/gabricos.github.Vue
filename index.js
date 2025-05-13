const { createApp, ref, computed } = Vue;
        
createApp({
    setup() {
        const board = ref(Array(9).fill(''));
        const currentPlayer = ref('X');
        const gameOver = ref(false);
        const winner = ref(null);
        const winningCells = ref([]);
        const scores = ref({
            X: 0,
            O: 0,
            ties: 0
        });
        
        // Combinazioni vincenti (indici della griglia)
        const winningCombinations = [
            [0, 1, 2], // Prima riga
            [3, 4, 5], // Seconda riga
            [6, 7, 8], // Terza riga
            [0, 3, 6], // Prima colonna
            [1, 4, 7], // Seconda colonna
            [2, 5, 8], // Terza colonna
            [0, 4, 8], // Diagonale principale
            [2, 4, 6]  // Diagonale secondaria
        ];
        
        // Calcolo dello stato del gioco
        const status = computed(() => {
            if (winner.value) {
                return `Giocatore ${winner.value} ha vinto!`;
            } else if (gameOver.value) {
                return 'Pareggio!';
            } else {
                return `Turno del giocatore: ${currentPlayer.value}`;
            }
        });
        
        // Funzione per effettuare una mossa
        function makeMove(index) {
            // Controlla se la cella è già occupata o se il gioco è finito
            if (board.value[index] !== '' || gameOver.value) {
                return;
            }
            
            // Aggiorna la cella con il simbolo del giocatore corrente
            board.value[index] = currentPlayer.value;
            
            // Controlla se c'è un vincitore
            checkWinner();
            
            // Se il gioco non è finito, passa al giocatore successivo
            if (!gameOver.value) {
                currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
            }
        }
        
        // Controlla se c'è un vincitore
        function checkWinner() {
            // Controlla tutte le combinazioni vincenti
            for (const combo of winningCombinations) {
                const [a, b, c] = combo;
                if (
                    board.value[a] && 
                    board.value[a] === board.value[b] && 
                    board.value[a] === board.value[c]
                ) {
                    winner.value = board.value[a];
                    winningCells.value = combo;
                    gameOver.value = true;
                    updateScores(winner.value);
                    return;
                }
            }
            
            // Controlla se c'è un pareggio (tutte le celle piene)
            if (!board.value.includes('')) {
                gameOver.value = true;
                updateScores(null); // Pareggio
            }
        }
        
        // Aggiorna i punteggi
        function updateScores(result) {
            if (result === 'X') {
                scores.value.X++;
            } else if (result === 'O') {
                scores.value.O++;
            } else {
                scores.value.ties++;
            }
            
            // Salva i punteggi nel localStorage
            localStorage.setItem('tictactoe_scores', JSON.stringify(scores.value));
        }
        
        // Resetta il gioco per una nuova partita
        function resetGame() {
            board.value = Array(9).fill('');
            currentPlayer.value = 'X';
            gameOver.value = false;
            winner.value = null;
            winningCells.value = [];
        }
        
        // Azzera tutti i punteggi
        function resetScores() {
            scores.value = {
                X: 0,
                O: 0,
                ties: 0
            };
            localStorage.setItem('tictactoe_scores', JSON.stringify(scores.value));
        }
        
        // Carica i punteggi dal localStorage (se disponibili)
        function loadScores() {
            const savedScores = localStorage.getItem('tictactoe_scores');
            if (savedScores) {
                scores.value = JSON.parse(savedScores);
            }
        }
        
        // Carica i punteggi all'avvio dell'applicazione
        loadScores();
        
        return {
            board,
            currentPlayer,
            gameOver,
            winner,
            winningCells,
            scores,
            status,
            makeMove,
            resetGame,
            resetScores
        };
    }
}).mount('#app');