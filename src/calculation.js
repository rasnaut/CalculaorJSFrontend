import { calculate as calculateApi, fetchHistory } from './api.js';
import { getSessionId, displayHistory } from './session.js';

let currentOperation = null;
let firstOperand = null;

export function appendNumber(number) {
    console.log('index.html appendNumber with argument:', number);
    const display = document.getElementById('display');
    display.value += number;
}

export function setOperation(operation) {
    console.log('index.html set operation:', operation);
    const display = document.getElementById('display');
    firstOperand = parseInt(display.value);
    currentOperation = operation;
    display.value = '';
}

export function calculate() {
    const display = document.getElementById('display');
    const secondOperand = parseInt(display.value);
    const sessionId = getSessionId();

    calculateApi(currentOperation, firstOperand, secondOperand, sessionId)
        .then(result => {
            display.value = result;
            // Обновление истории после успешного вычисления
            fetchHistory(sessionId)
                .then(displayHistory)
                .catch(error => console.error('Error fetching history:', error));
        })
        .catch(error => console.error('Error calculating:', error));
}
