document.addEventListener('DOMContentLoaded', (event) => {
    loadExpenses();
});

function loadExpenses() {
    fetch('/get_expenses')
        .then(response => response.json())
        .then(data => {
            if (data.expenses) {
                updateExpenseList(data.expenses);
            }
        });
}

function addExpense() {
    const category = document.getElementById('category').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const date = document.getElementById('date').value.trim();

    if (category && amount && date) {
        fetch('/add_expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category, amount, date })
        })
        .then(response => response.json())
        .then(data => {
            if (data.expenses) {
                updateExpenseList(data.expenses);
                document.getElementById('category').value = '';
                document.getElementById('amount').value = '';
                document.getElementById('date').value = '';
            } else {
                alert(data.error);
            }
        });
    }
}

function updateExpenseList(expenses) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach(expense => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `${expense.category}: $${expense.amount} on ${expense.date}`;
        expenseList.appendChild(li);
    });
}
