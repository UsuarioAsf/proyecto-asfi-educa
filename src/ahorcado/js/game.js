const ALPHABET = "QWERTYUIOPASDFGHJKLÑZXCVBNM",
    MAX_ATTEMPTS = 6,
    MASK_CHAR = "_";
// generamos numero aleatorio
let nroPreg = 7;
let pr = Math.floor(Math.random() * nroPreg);
// banco de preguntas
let preg = ["Posibilidad que tiene una persona de poner a crecer su dinero?",
    "Entidad autorizada para llevar a cabo actividades de intermediación en el mercado de valores",
    "Mercado en donde se tranzan los valores",
    "Autoridad de Supervisión del Sistema Financiero",
    "Autoridad de Fiscalización del Juego",
    "Pago parcial o total del capital y/o interés de un crédito.",
    "Orden escrita y girada contra un banco para que este pague"];
// respuestas
let respuestas = ["inversion", "banco", "bursatil", "asfi", "aj", "Amortizacion","Cheque"];
new Vue({
    el: "#app",
    data: () => ({
        letters: {},
        hiddenWord: [],
        remainingAttempts: 0,
    }),
    async mounted() {
        await Swal.fire(
            'Juego del Ahorcado',
            'Presentado con orgullo por ASFI Educa',
            'info'
        );
        console.log(pr);

        this.resetGame();
    },
    methods: {
        resetGame() {
            this.resetAttempts();
            this.setupKeys();
            this.elegirPalabra();
        },
        checkGameStatus() {
            if (this.playerWins()) {
                Swal.fire("¡Tú ganas! La palabra era: " + this.getUnhiddenWord());
                pr = (pr + 1) % nroPreg;
                console.log("pr:  " + pr)
                this.resetGame();
            }
            if (this.playerLoses()) {
                Swal.fire("Perdiste. La palabra era: " + this.getUnhiddenWord());
                this.resetGame();
            }
        },
        getUnhiddenWord() {
            let word = "";
            for (const letter of this.hiddenWord) {
                word += letter.letter;
            }
            return word;
        },
        playerWins() {
            // If there's at least a hidden letter, the player hasn't win yet
            for (const letter of this.hiddenWord) {
                if (letter.hidden) {
                    return false;
                }
            }
            return true;
        },
        playerLoses() {
            return this.remainingAttempts <= 0;
        },
        imagePath() {
            return `img/Ahorcado-${MAX_ATTEMPTS - this.remainingAttempts}.png`;
        },
        resetAttempts() {
            this.remainingAttempts = MAX_ATTEMPTS;
        },
        async elegirPalabra() {
            // Obtener palabras almacenadas en banco de respuetas
            const words = getWords();
            //declarar pregunta
            document.getElementById("idPregunta").innerHTML = preg[pr]
            // declarar respuesta
            let word = words[pr];

            this.prepararPalabra(word);
        },
        prepararPalabra(word) {
            word = word.toUpperCase();
            const hiddenWord = [];
            for (const letter of word) {
                hiddenWord.push({
                    letter,
                    hidden: true,
                });
            }
            this.hiddenWord = hiddenWord;
        },
        displayWord() {
            let displayedWord = "";
            for (const letter of this.hiddenWord) {
                if (letter.hidden) {
                    displayedWord += MASK_CHAR;
                } else {
                    displayedWord += letter.letter;
                }
                displayedWord += " ";
            }
            return displayedWord;
        },
        setupKeys() {
            // We make a dictionary from the letters
            for (const letter of ALPHABET) {
                Vue.set(this.letters, letter, {
                    letter,
                    disabled: false, // We disable it when the user clicks on it
                });
            }
        },
        letterExistsInWord(searchedLetter) {
            for (const letter of this.hiddenWord) {
                if (letter.letter === searchedLetter) {
                    return true;
                }
            }
            return false;
        },
        discoverLetter(letter) {
            for (const index in this.hiddenWord) {
                if (this.hiddenWord[index].letter === letter) {
                    this.hiddenWord[index].hidden = false;
                }
            }
        },
        attemptWithLetter(letter) {
            Vue.set(this.letters[letter], "disabled", true);
            if (!this.letterExistsInWord(letter)) {
                this.remainingAttempts -= 1;
            } else {
                this.discoverLetter(letter);
            }
            this.checkGameStatus();
        }
    }
});