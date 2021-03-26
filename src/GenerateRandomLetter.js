let word = 'abcdefghijklmnopqrstuvw';

export let letters = word.split('');

function getLetter() {
    let index = Math.floor(Math.random() * 23);
    return letters[index];
}

export default getLetter;
