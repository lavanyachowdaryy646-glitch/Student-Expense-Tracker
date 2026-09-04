let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function addExpense() {

    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value;

    if (amount === "" || date === "" || description === "") {
        alert("Please fill all the details");
        return;
    }

    let expense = {
        amount: Number(amount),
        category: category,
        date: date,
        description: description
    };

    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();

    document.getElementById("amount").value = "";
    document.getElementById("description").value = "";
}

function displayExpenses() {

    let expenseList = document.getElementById("expenseList");
  let filter = document.getElementById("filterCategory").value;

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(function(expense, index) {
      if (filter !== "All" && expense.category !== filter) {
        return;
        }

        total = total + expense.amount;

        expenseList.innerHTML +=
    '<div class="expense-card">' +
    '<h3>₹' + expense.amount + '</h3>' +
    '<p>Category: ' + expense.category + '</p>' +
    '<p>Date: ' + expense.date + '</p>' +
    '<p>Description: ' + expense.description + '</p>' +
    '<button onclick="editExpense(' + index + ')">Edit</button>' +
    '<button onclick="deleteExpense(' + index + ')">Delete</button>' +
    '</div>';
    });

    document.getElementById("total").innerText = total;
  document.getElementById("count").innerText = expenses.length;

let highest = 0;

expenses.forEach(function(expense) {
    if (expense.amount > highest) {
        highest = expense.amount;
    }
});

document.getElementById("highest").innerText = highest;
  let budget = Number(document.getElementById("budget").value) || 0;

let remaining = budget - total;

document.getElementById("remaining").innerText = remaining;
}

function deleteExpense(index) {

    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    displayExpenses();
}
function editExpense(index) {

    let expense = expenses[index];

    let newAmount = prompt("Enter new amount:", expense.amount);
    let newDescription = prompt("Enter new description:", expense.description);

    if (newAmount !== null && newDescription !== null) {

        expense.amount = Number(newAmount);
        expense.description = newDescription;

        localStorage.setItem("expenses", JSON.stringify(expenses));

        displayExpenses();
    }
}

displayExpenses();