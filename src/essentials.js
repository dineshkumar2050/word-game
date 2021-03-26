import { letters } from './GenerateRandomLetter';
import api from './api';

export function strToTest(str) {
    let res = /^[a-w]+$/
    return res.test(str.toLowerCase());
}

export function generateLetterNotPresentInString(str){
    let checkForStringPresence = letters.find(letter => !str.includes(letter))
    if(letters && str && checkForStringPresence) {
        return checkForStringPresence;
    } else {

    }
}

export function selectRandomWordByComputer(apiData) {
    let data = apiData.data;
    let randomIndex = Math.floor(Math.random() * (data && data.length));
    return data && data[randomIndex] && data[randomIndex].word;
}

export async function performSomeFunction(inputValue,currentLetterLength,setInputValue,setCurrentApiWord,setMessage,timer){
    let data = await api.get(`/words?sp=${inputValue}*`);

    function selectedWord(){
        let randomWord = data && data.data && data.data.length > 0 ? selectRandomWordByComputer(data) : null;
        if(randomWord === null) return null;
        if((randomWord && randomWord.length) > currentLetterLength) return randomWord;
        return selectedWord();
    }
    let selectedWordFromApi = selectedWord();
    if(selectedWordFromApi) {
        setCurrentApiWord(selectedWordFromApi);
        let letterToBeAddedByComputer = '';
        if(selectedWordFromApi && selectedWordFromApi.length > currentLetterLength) {
            letterToBeAddedByComputer = selectedWordFromApi[currentLetterLength];
        }
        setInputValue(inputValue => inputValue + letterToBeAddedByComputer)
        console.log(selectedWordFromApi,'selectedWordFromApi',currentLetterLength,letterToBeAddedByComputer);
    } else {
        if(timer) {
          clearInterval(timer)
        }
        return setMessage('Computer Wins,No word can be made')
    }      
}
