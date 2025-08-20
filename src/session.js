import { createSession, fetchHistory, resetSession as resetSessionApi } from './api.js';

let sessionId = null;

export function initializeSession() {
    createSession()
        .then(data => {
            sessionId = data.sessionId;
        })
        .catch(error => console.error('Error creating session:', error));
}

export function getSessionId() {
    return sessionId;
}

export function resetSession() {
    resetSessionApi(sessionId)
        .then(() => {
            initializeSession();
            fetchHistory(sessionId)
                .then(displayHistory)
                .catch(error => console.error('Error fetching history:', error));
        })
        .catch(error => console.error('Error resetting session:', error));
}

export function displayHistory(history) {
    const historyContainer = document.getElementById('history');
    historyContainer.innerHTML = '';

    if (history.length === 0) {
        historyContainer.innerHTML = '<p>No calculations found for this session.</p>';
    } else {
        const list = document.createElement('ul');
        history.forEach(calculation => {
            const listItem = document.createElement('li');
            listItem.textContent = `${calculation.operand1} ${calculation.operation} ${calculation.operand2} = ${calculation.result}`;
            list.appendChild(listItem);
        });
        historyContainer.appendChild(list);
    }
}
