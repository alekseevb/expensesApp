const STATUS_IN_LIMIT = 'все хорошо';
const STATUS_OUT_OF_LIMIT = 'все плохо';
const STORAGE_LABEL_LIMIT = 'limit';
const STORAGE_LABEL_EXPENSES = 'expenses';

const inputNode = document.getElementById('expensesInput');
const categorySelectNode = document.getElementById('categorySelect')
const addButtonNode = document.getElementById('addButton');
const clearButtonNode = document.getElementById('clearButton')
const changeButtonNode = document.getElementById('limitButton')
const limitNode = document.getElementById('limitValue')
const totalValueNode = document.getElementById('totalValue');
const statusNode = document.getElementById('statusText')
const historyList = document.getElementById('historyList')

let expenses = [];

let LIMIT = parseInt(limitNode.innerText)
const CURRENCY = 'руб.'

const initLimit = () => {
    const limitFromStorage = parseInt(localStorage.getItem(STORAGE_LABEL_LIMIT))
    if (!limitFromStorage) {
        return;
    }
    limitNode.innerText = limitFromStorage;
    LIMIT = parseInt(limitNode.innerText)
}

initLimit();



const getTotal = () => {
    let sum = 0;
    //сделать тоже самое только через for
    expenses.forEach((newExpense) => {
        sum += newExpense.expense;

    });
    return sum;
}

const renderStatus = () => {
    const total = getTotal(expenses);
    totalValueNode.innerText = total;

    if (total <= LIMIT) {
        statusNode.innerText = STATUS_IN_LIMIT;
        statusNode.className = `expenses_status-green`
    } else {
        statusNode.innerText = `${STATUS_OUT_OF_LIMIT}(${LIMIT - total})`;
        statusNode.className = 'expenses_status-red'
    }
}

const renderHistory = () => {
    historyList.innerHTML = '';
    expenses.forEach((newExpense) => {
        const historyItem = document.createElement('li');
        historyItem.innerText = `${newExpense.category} - ${newExpense.expense} ${CURRENCY}`;

        //попробовать написать через historyItem.innerText = `<li class="rub">`

        historyList.appendChild(historyItem);
    })
}

const render = () => {
    renderStatus();
    renderHistory();
}

const expensesFromStorageString = localStorage.getItem(STORAGE_LABEL_EXPENSES);
const expensesFromStorage = JSON.parse(expensesFromStorageString)

if (Array.isArray(expensesFromStorage)) {
    expenses = expensesFromStorage;
}
render();

const getExpenseFromUser = () => parseInt(inputNode.value);

const getSelectedCategory = () => categorySelectNode.value

const clearInput = () => inputNode.value = '';

function saveExpensesToStorage() {
    const expensesString = JSON.stringify(expenses);
    localStorage.setItem(STORAGE_LABEL_EXPENSES, expensesString);
}

const addButtonHandler = () => {
    const expense = getExpenseFromUser();
    if (!expense) {
        alert("Выберете введите сумму")
        return;
    }

    const category = getSelectedCategory();
    if (category === 'категории') {
        alert("Выберете категорию")
        return;
    }

    const newExpense = {
        expense: expense,
        category: category,
    }

    console.log(newExpense);

    expenses.push(newExpense);

    saveExpensesToStorage();
    render();
    clearInput();


}

const clearButtonHandler = () => {
    expenses = [];
    render();
}

const changeButtonHandler = () => {
    const newLimit = prompt('введите новый лимит');

    const newLimitValue = parseInt(newLimit);
    if (!newLimitValue) {
        return;
    }

    limitNode.innerText = newLimitValue;
    LIMIT = newLimitValue;
    localStorage.setItem(STORAGE_LABEL_LIMIT, newLimitValue)

    render();
}

addButtonNode.addEventListener('click', addButtonHandler);
clearButtonNode.addEventListener('click', clearButtonHandler);
changeButtonNode.addEventListener('click', changeButtonHandler)