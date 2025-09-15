Tris con Vue.js
Questo è un progetto per un mini-sito del famoso gioco Tic Tac Toe (Tris), sviluppato utilizzando Vue.js per l'interfaccia utente. L'applicazione è strutturata in componenti per una logica chiara e un codice manutenibile.
1) Griglia 3x3 interattiva: L'utente può cliccare su ogni cella per fare una mossa.
2) 2)Turni dei giocatori: Il gioco si alterna automaticamente tra i giocatori 'X' e 'O'.
3) Il sistema controlla e dichiara la vittoria o un pareggio.

Il progetto è diviso in due componenti principali per separare la logica dall'interfaccia utente esi basa su un'architettura a componenti che sfrutta le migliori pratiche di Vue.js.

1. Board.vue (Componente Genitore)
Questo componente contiene la logica del gioco.

Gestisce lo stato mantenendo l'array della griglia, il giocatore corrente e il vincitore, esegue i controlli per la vittoria e gestisce le mosse dei giocatori, passa il valore di ogni cella (X, O, o vuoto) al componente figlio tramite props.

2. Cell.vue (Componente Figlio)
Questo componente rappresenta una singola cella della griglia, riceve il valore da Board.vue e lo mostra a schermo.
Non contiene alcuna logica di gioco; emette semplicemente un evento @click al componente genitore, che gestirà la mossa.
