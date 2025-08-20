let backendUrl = 'http://localhost:8080';

if (typeof process !== 'undefined' && process.env && process.env.REACT_APP_BACKEND_URL) {
     backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
} else {
    console.warn('process not defined');
}

console.log(`Using backend URL: ${backendUrl}`);

export function createSession() {
    return fetch(`${backendUrl}/api/calculator/session`, {
        method: 'POST'
    })
    .then(response => response.json());
}

export function fetchHistory(sessionId) {
    return fetch(`${backendUrl}/api/calculator/history/${sessionId}`)
        .then(response => response.json());
}

export function resetSession(sessionId) {
    return fetch(`${backendUrl}/api/calculator/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionId)
    });
}

export function calculate(operation, firstOperand, secondOperand, sessionId) {
    const operations = {
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        '/': 'devide'
    };

    const endpoint = operations[operation];
    if (!endpoint) {
        return Promise.reject('Unsupported operation');
    }
    request = `${backendUrl}/api/calculator/${endpoint}?a=${firstOperand}&b=${secondOperand}&session=${sessionId}`;
    console.log('request url: ' + request);
    return fetch(request)
        .then(response => response.text());
}
