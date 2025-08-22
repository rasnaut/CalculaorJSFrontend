export function getBackendUrl() {
  return (window.__APP_CONFIG__ && window.__APP_CONFIG__.BACKEND_URL)
    ? window.__APP_CONFIG__.BACKEND_URL
    : "http://localhost:8080"; // fallback для dev
}

let backendUrl = getBackendUrl();

console.log(`Using backend URL: ${backendUrl}`);

export function createSession() {
    return fetch(`${backendUrl}/calculator/session`, {
        method: 'POST'
    })
    .then(response => response.json());
}

export function fetchHistory(sessionId) {
    return fetch(`${backendUrl}/calculator/history/${sessionId}`)
        .then(response => response.json());
}

export function resetSession(sessionId) {
    return fetch(`${backendUrl}/calculator/reset`, {
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
    let request = `${backendUrl}/calculator/${endpoint}?a=${firstOperand}&b=${secondOperand}&session=${sessionId}`;
    console.log('request url: ' + request);
    return fetch(request)
        .then(response => response.text());
}
