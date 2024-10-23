const inputNode = document.querySelector('#expenses-input');
const buttonNode = document.querySelector('#expenses-btn');
const historyNode = document.querySelector('#expenses-history')
const sumNode = document.querySelector('#expenses-sum');
const limitNode = document.querySelector('#expenses-limit')
const statusNode = document.querySelector('#expenses-status')

const LIMIT = 10000;
const CURRENCY = 'руб.'
const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_LIMIT = 'все плохо';
const STATUS_OUT_OF_LIMIT_CLASSNAME = 'expenses_status-red';

const expenses = [];

init(expenses);


buttonNode.addEventListener('click', function () {
    // Получаем значение из поля ввода, если равно "ничему", то в массив ничего не добавляется
    const expense = getExpenseFromUser();

    if (!expense) {
        return;
    }

    trackExpense(expense);

    render(expenses);
})

function init(expenses) {
    limitNode.innerText = LIMIT;
    statusNode.innerText = STATUS_IN_LIMIT;
    sumNode.innerText = calculateExpenses(expenses);
}

function trackExpense(expense) {
    expenses.push(expense)
}

function getExpenseFromUser() {
    if (!inputNode.value) {
        return null;
    }

    const expense = parseInt(inputNode.value);

    clearInput();

    return expense;
}

function clearInput() {
    inputNode.value = '';
}

function calculateExpenses(expenses) {
    let sum = 0;

    expenses.forEach(exspense => {
        sum += exspense;
    });

    return sum;
}

function render(expenses) {
    const sum = calculateExpenses(expenses);

    renderHistory(expenses);
    renderSum(sum);
    renderStatus(sum);
}

function renderHistory(expenses) {
    let historyHTML = '';

    expenses.forEach(exspense => {
        const exspenseHTML = `<li>${exspense} ${CURRENCY}</li>`;
        historyHTML += exspenseHTML;
    });

    historyNode.innerHTML = `<ol>${historyHTML}</ol>`
}

function renderSum(sum) {
    sumNode.innerText = sum;
}

function renderStatus(sum) {
    if (sum <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
    } else {
        statusNode.innerText = STATUS_OUT_LIMIT;
        statusNode.classList.add(STATUS_OUT_OF_LIMIT_CLASSNAME)
    }
}