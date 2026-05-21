function updateSummary(balance, income, expenses) {

  function formatCurrency(amount) {
    return "$" + Math.abs(amount).toFixed(2);
  }

  document.getElementById("balance").textContent = formatCurrency(balance);
  document.getElementById("total-income").textContent = formatCurrency(income);
  document.getElementById("total-expenses").textContent = formatCurrency(expenses);
}

function renderTransactions(transactions) {
const list = document.getElementById("transaction-list");
const emptyMsg = document.getElementById("empty-state");

list.innerHTML = "";

if (transactions.length === 0) {
  emptyMsg.hidden = false;
  return;
} else {
  emptyMsg.hidden = true;
}

transactions.forEach((t) => {
  const item = createTransactionElement(t);
  list.appendChild(item);
})
}

function createTransactionElement(transaction) {
const li = document.createElement("li");

li.classList.add("transaction-item");
li.classList.add(transaction.type === "income" ? "transaction-income" : "transaction-expense");

li.innerHTML = `
             <div class="transaction-info">
                <span class="transaction-desc">${transaction.description}</span>
                <span class="transaction-category">${transaction.category}</span>
              </div>
              <div class="transaction-right">
                <span class="transaction-amount">${transaction.type === "income" ? "+" : "-"}$${transaction.amount.toFixed(2)}</span>
                <button class="btn-delete" data-id="${transaction.id}">✕</button>
              </div>
              `;

              return li;
}