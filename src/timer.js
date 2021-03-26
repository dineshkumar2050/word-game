export const timer = (setTimer,timerInitialValue) => {
    let aTimer = setInterval(() => {
        if(timerInitialValue < 1){
            return clearInterval(aTimer);
        }
        setTimer(--timerInitialValue);
    },1000)
}
