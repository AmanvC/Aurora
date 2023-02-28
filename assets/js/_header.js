const questionWrapper = document.querySelector('#question-wrapper');
const input = document.querySelector('#question-form textarea');

let askQuestion = document.getElementById('ask-question')
if(askQuestion){
    askQuestion.addEventListener('click', () => {
        questionWrapper.style.display = 'flex';
    })
}

let close = document.getElementById('close');
if(close){
    close.addEventListener('click', () => {
        questionWrapper.style.display = 'none';
        console.log(input)
        input.value = '';
    });
}