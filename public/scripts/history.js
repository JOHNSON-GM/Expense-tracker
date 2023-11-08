const table = document.getElementById('expense-history');
const tbody = table.querySelector('tbody');

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
const historyTable = tbody;

function addTransactionToTable(transaction) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${transaction.text}</td>
        <td>${transaction.category}</td>
        <td>${transaction.amount}</td>
    `;
    historyTable.appendChild(row);
}

localStorageTransactions.forEach(addTransactionToTable);



// function to generate data for the bar chart
function generateBarChartData(transactions) {
    const categoryData = {};

    transactions.forEach((transaction) => {
        const category = transaction.category;

        if (categoryData[category]) {
            categoryData[category] += transaction.amount;
        } else {
            categoryData[category] = transaction.amount;
        }
    });

    const labels = Object.keys(categoryData);
    const data = Object.values(categoryData);

    return { labels, data };
}

// Function to render the bar chart
function renderBarChart() {
    const { expenseLabels, expenseData, incomeLabels, incomeData } = generateBarChartData(localStorageTransactions);

    const ctx = document.getElementById('bar-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [...expenseLabels, ...incomeLabels],
            datasets: [{
                label: 'Expenses',
                data: expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Bar color for expenses
                borderColor: 'rgba(255, 99, 132, 1)', // Border color for expenses
                borderWidth: 1, // Border width
                color: 'white'
            },
            {
                label: 'Income',
                data: incomeData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color for income
                borderColor: 'rgba(92, 192, 192, 1)', // Border color for income
                borderWidth: 1, // Border width
                color: 'white'
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return Math.abs(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
                        },
                        color: 'white',
                    },
                    grid: {
                        color: 'white'
                    }
                },
                x: {
                    ticks: {
                        color: 'white',
                    }
                }
            },
        },
    });
}

// Call the function to render the bar chart when the page loads
renderBarChart();

// Create a function to generate data for the bar chart
function generateBarChartData(transactions) {
    const expenseLabels = [];
    const expenseData = [];
    const incomeLabels = [];
    const incomeData = [];

    transactions.forEach((transaction) => {
        if (transaction.amount < 0) {
            expenseLabels.push(transaction.category);
            expenseData.push(-transaction.amount); // Make expenses positive
        } else {
            incomeLabels.push(transaction.category);
            incomeData.push(transaction.amount);
        }
    });

    return { expenseLabels, expenseData, incomeLabels, incomeData };
}
