import { initializeSession, resetSession } from './session.js';
import { appendNumber, setOperation, calculate } from './calculation.js';

console.log('Calculation Started!');

document.addEventListener('DOMContentLoaded', () => {
    initializeSession();

    // Обработчики для цифровых кнопок
    const numButtons = document.querySelectorAll('button[id^="btn-num-"]');
    numButtons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            appendNumber(parseInt(value));
        });
    });

    // Обработчики для кнопок действий
    const actionButtons = document.querySelectorAll('button[id^="btn-act-"]');
    actionButtons.forEach(button => {
        const action = button.getAttribute('data-action');
             if (action)                        { button.addEventListener('click', () => setOperation(action)); }
        else if (button.id === 'btn-act-equal') { button.addEventListener('click', calculate); }
        else if (button.id === 'btn-act-ac'   ) { button.addEventListener('click', resetSession); }
    });
});

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { appendNumber, setOperation, calculate };
}
