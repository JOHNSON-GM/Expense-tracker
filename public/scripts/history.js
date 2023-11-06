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

// history.js

// const localStorageTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Create a function to generate data for the bar chart
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
    const { labels, data } = generateBarChartData(localStorageTransactions);

    const ctx = document.getElementById('bar-chart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Expense Amount',
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Bar color
                borderColor: 'rgba(92, 192, 192, 1)', // Border color
                borderWidth: 1, // Border width
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks:{
                        color: 'white',
                    },
                    grid:{
                        color: 'white'
                    }
                },
                x: {
                    ticks:{
                        color: 'white',
                    }
                }
            },
        },
    });
}

// Call the function to render the bar chart when the page loads
renderBarChart();

