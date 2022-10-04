
// Tomado de https://parzibyte.me/blog/2019/06/26/menu-responsivo-bootstrap-4-sin-dependencias/

const LOCAL_STORAGE_WORDS_KEY = "words";
let bancoRespuestas = ["inversion", "banco", "bursatil", "asfi", "aj","Amortizacion","Cheque"];
const getWords = () => (bancoRespuestas);
const saveWords = (words) => (localStorage.setItem(LOCAL_STORAGE_WORDS_KEY, JSON.stringify(words)));