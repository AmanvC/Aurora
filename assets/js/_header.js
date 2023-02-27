const questionWrapper = document.querySelector('#question-wrapper');
const input = document.querySelector('#question-form textarea');

document.getElementById('ask-question').addEventListener('click', () => {
    questionWrapper.style.display = 'flex';
})

document.getElementById('close').addEventListener('click', () => {
    questionWrapper.style.display = 'none';
    console.log(input)
    input.value = '';
});