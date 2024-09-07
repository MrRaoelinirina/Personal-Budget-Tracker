document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const descriptionInput = document.getElementById('description');
    const amountInput = document.getElementById('amount');
    const transactionsList = document.getElementById('transactions');
    const totalIncomeElement = document.getElementById('total-income');
    const totalExpensesElement = document.getElementById('total-expenses');
    const balanceElement = document.getElementById('balance');

    let transactions = [];

    function updateSummary() {
        const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0);
        const balance = totalIncome + totalExpenses;

        totalIncomeElement.textContent = totalIncome.toFixed(2);
        totalExpensesElement.textContent = Math.abs(totalExpenses).toFixed(2);
        balanceElement.textContent = balance.toFixed(2);
    }

    function renderTransactions() {
        transactionsList.innerHTML = transactions.map(t => `
            <li>
                ${t.description}: $${t.amount.toFixed(2)}
            </li>
        `).join('');
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);

        if (description && !isNaN(amount)) {
            transactions.push({ description, amount });
            descriptionInput.value = '';
            amountInput.value = '';

            renderTransactions();
            updateSummary();
        }
    });
})
