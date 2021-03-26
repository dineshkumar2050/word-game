import './App.css';
import { useState, useEffect } from 'react';
import getLetter from './GenerateRandomLetter';
import api from './api';
import { selectRandomWordByComputer, performSomeFunction } from './essentials';
import DeclareWinner from './DeclareWinner';

function App() {
    const [inputValue, setInputValue] = useState('');
    let [timerCount, setTimerCount] = useState(60);
    const [currentApiWord, setCurrentApiWord] = useState('');
    const [message, setMessage] = useState('');
    let timer = null;

    useEffect(() => {
        timer = setTimeout(() => {
            if(timerCount < 51) {
                console.log('Hi')
                clearTimeout(timer);
                timer = null;
                console.log(timer,'timer')
                setMessage('You lose,Please try again')
                return;
            }
            console.log('timer check 1')
            setTimerCount(timerCount => timerCount - 1)
        },1000)
    },[timerCount])

    useEffect(() => {
        let val = getLetter();
        setInputValue(val);
        console.log(val);
    },[])

    useEffect(() => {      
        if(inputValue.length > 0 && inputValue.length % 2 === 0){
            if(inputValue === currentApiWord){
                if(inputValue.length % 2 === 0) return setMessage('Computer Wins,Please try again') 
                else return setMessage('You Win, Play again')
            }
            async function getData(){
                try{
                    let currentLetterLength = inputValue && inputValue.length;
                    let strSliced = currentApiWord.slice(0,currentLetterLength);
                    if(currentApiWord){            
                        if(inputValue === strSliced){
                            setInputValue(inputValue => inputValue + currentApiWord[currentLetterLength])
                        } else {                
                            performSomeFunction(inputValue,currentLetterLength,setInputValue,setCurrentApiWord,setMessage,timer)
                        }
                    }  else {
                        performSomeFunction(inputValue,currentLetterLength,setInputValue,setCurrentApiWord,setMessage,timer)            
                    }          

                } catch(err) {
                    console.log(err);
                }
            }
            getData();      
        } 
    },[inputValue])

    const handleChange = e => {
        e.preventDefault();
        setInputValue(e.target.value);
        console.log(e.target.value);
        if(timer) {
            clearInterval(timer)
            setTimerCount(60)
        }
    }
    return (
        <div className="App">
            {
                message &&
                <DeclareWinner message={message} />
            }
            <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
                <h2 style={{margin: '0', marginRight: '10px'}}>Timer</h2>
                {timerCount && <span>{timerCount}s</span>}
            </div>
            <input type='text' onChange={handleChange} value={inputValue} />
        </div>
    );
}

export default App;
