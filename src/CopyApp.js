import './App.css';
import { useState, useEffect } from 'react';
import getLetter from './GenerateRandomLetter';
import api from './api';
import { selectRandomWordByComputer, strToTest } from './essentials';
// import { timer } from './timer';

// function useTimer(inputValue) {
//     const [timerValue,setTimerValue] = useState(60);
    // useEffect(() => {
    //   let timer = setInterval(() => {
    //     if(timerValue < 1) {
    //       return clearInterval(timer)
    //     }
    //     setTimerValue(timerValue - 1)
    //   },1000)
    // },[])    
    // useEffect(() => {
    //     clearInterval(timer);
    //     setTimerValue(60)
    //     let timer = setInterval(() => {
    //       if(timerValue < 1) {
    //         return clearInterval(timer)
    //       }
    //       setTimerValue(timerValue - 1)
    //     },1000)
    // },[inputValue])
    // return timerValue;
// }

function App() {
  const [inputValue, setInputValue] = useState('');
  let [timerCount, setTimerCount] = useState(60);
  const [currentApiWord, setCurrentApiWord] = useState('');
  // const [inputValueLength,setInputValueLength] = useState(inputValue && inputValue.length)
  // const [timer,setTimer] = useState(null);
  let timer = null;
  // const [reset,setReset] = useState(false)
  // let timerCount = useTimer(inputValue);

  useEffect(() => {
      // if(timer === null && inputValue.length > 1){
      //   timer = setTimeout(() => {
      //       if(timerCount < 51) {
      //           console.log('Hi')
      //           clearTimeout(timer);
      //           timer = null;
      //           console.log(timer,'timer')
      //           return;
      //       }
      //       console.log('timer check 2')
      //       setTimerCount(timerCount => timerCount - 1)
      //   },1000)
      // }
      timer = setTimeout(() => {
          if(timerCount < 51) {
              console.log('Hi')
              clearTimeout(timer);
              timer = null;
              console.log(timer,'timer')
              return;
          }
          console.log('timer check 1')
          setTimerCount(timerCount => timerCount - 1)
      },1000)
  },[timerCount])

  // function timerDecrement(initialTimerValue){
  //   setInterval(() => {
  //     initialTimerValue -= 1;
  //   },1000)
  // }

  // useEffect(() => {
  //     // setTimerCount(60)
  //     console.log(inputValue,'inputValue')
  //     if(reset) {
  //       setReset(false)
  //       setTimeout(() => {
  //           setTimerCount(timerCount => timerCount - 1)
  //       },1000)
  //     }
  //     if(!reset && timerCount > 50){
  //       let timer = setTimeout(() => {
  //         // clearTimeout(timer);
  //         if(reset || timerCount < 50){
  //           clearTimeout(timer);
  //           // setTimerCount(60)
  //           return;
  //         }
  //         console.log(timerCount,'timerCount',reset,'reset')   
  //         if(reset) setReset(false)
  //         setTimerCount(timerCount => timerCount - 1);
  //     },1000);
  //     }
         
  // },[inputValue.length > 1,timerCount])

  // let timer = setTimeout(() => {
  //   if(timerCount < 1) {
  //     return clearTimeout(timer);
  //   }
  //   console.log(timerCount,'timerCount')
  //   return setTimerCount(--timerCount);
  // },1000); 

  useEffect(() => {
    let val = getLetter();
    setInputValue(val);
    console.log(val);
  },[])

  // let newTimer = setInterval(() => {
  //   setTimerCount(--timerCount)
  // },1000)

  // const timer = (setTimer,timerInitialValue) => {
  //   let aTimer = null;
  //   clearInterval(aTimer);
  //   aTimer = setInterval(() => {
  //       if((timerInitialValue < 1)){
  //           return clearInterval(aTimer);
  //       }
  //       setTimer(--timerInitialValue);
  //   },1000)
  // }
  
  useEffect(() => {
    // setReset(true)
    // setTimerCount(60)
    // setTimerCount(60);
    // timer(setTimerCount,timerCount);
    // clearTimeout(timer);
    // setTimerCount(60)
    // if(!reset && inputValue.length > 1) {
    //   setReset(true)
    //   let newTimer = setInterval(() => {
    //     if(reset || timerCount < 50){
    //       clearInterval(newTimer);
    //       // setTimerCount(60)
    //       return;
    //     }
    //     console.log(timerCount,'timerCount',reset,'reset')   
    //     if(reset) setReset(false)
    //     setTimerCount(--timerCount)
    //   },1000)
    // }
    // console.log(timerCount,'timerCount')
    if(inputValue.length > 0 && inputValue.length % 2 === 0){
      // let val = getLetter();
      // setInputValue(val);
      // console.log(val);
      async function getData(){
        try{
          let currentLetterLength = inputValue && inputValue.length;
          let strSliced = currentApiWord.slice(0,currentLetterLength);
          if(currentApiWord){            
            if(inputValue === strSliced){
                setInputValue(inputValue => inputValue + currentApiWord[currentLetterLength])
            } else {
                let data = await api.get(`/words?sp=${inputValue}*`);
        
                function selectedWord(){
                  let randomWord = data && data.data && data.data.length > 0 ? selectRandomWordByComputer(data) : null;
                  if(randomWord === null) return null;
                  if((randomWord && randomWord.length) > currentLetterLength) return randomWord;
                  return selectedWord();
                }
                let selectedWordFromApi = selectedWord();
                setCurrentApiWord(selectedWordFromApi);
                // function getCurrentInputLength(value){
                //   if(value) return value.length;
                // }
                // let currentInputLength = getCurrentInputLength(inputValue);
                let letterToBeAddedByComputer = '';
                if(selectedWordFromApi && selectedWordFromApi.length > currentLetterLength) {
                  letterToBeAddedByComputer = selectedWordFromApi[currentLetterLength];
                }
                setInputValue(inputValue => inputValue + letterToBeAddedByComputer)
                
                console.log(selectedWordFromApi,'selectedWordFromApi',currentLetterLength,letterToBeAddedByComputer);  
            }
          }  else {
            let data = await api.get(`/words?sp=${inputValue}*`);
    
            function selectedWord(){
              let randomWord = data && data.data && data.data.length > 0 ? selectRandomWordByComputer(data) : null;
              if(randomWord === null) return null;
              if((randomWord && randomWord.length) > currentLetterLength) return randomWord;
              return selectedWord();
            }
            let selectedWordFromApi = selectedWord();
            setCurrentApiWord(selectedWordFromApi);
            // function getCurrentInputLength(value){
            //   if(value) return value.length;
            // }
            // let currentInputLength = getCurrentInputLength(inputValue);
            let letterToBeAddedByComputer = '';
            if(selectedWordFromApi && selectedWordFromApi.length > currentLetterLength) {
              letterToBeAddedByComputer = selectedWordFromApi[currentLetterLength];
            }
            setInputValue(inputValue => inputValue + letterToBeAddedByComputer)
            
            console.log(selectedWordFromApi,'selectedWordFromApi',currentLetterLength,letterToBeAddedByComputer);  
        }        

          
          // let lettersInStringAtIndex = '';
          // data && data.data && data.data.map(value => {
          //   if(value.word.length > currentLetterLength) {
          //     if(strToTest(value.word[currentLetterLength])){
          //       lettersInStringAtIndex += value.word[currentLetterLength]
          //     }              
          //   }            
          // })
          // console.log(data,'data',lettersInStringAtIndex);
        } catch(err) {
          console.log(err);
        }
      }
      getData();
  
    } else {
  
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
      <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px'}}>
        <h2 style={{margin: '0', marginRight: '10px'}}>Timer</h2>
        {timerCount && <span>{timerCount}s</span>}
      </div>
      <input type='text' onChange={handleChange} value={inputValue} />
    </div>
  );
}

export default App;
