const manager = new TransactionManager()
let activeCategory = "all";

function render() {
  const transactions = manager.getByCategory(activeCategory);

  renderTransactions(transactions)
  updateSummary(
    manager.calculateBalance(),
    manager.calculateIncome(),
    manager.calculateExpenses(),
  )
  
}

function handleAddTransaction() {
  const description = document.getElementById("description").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const type = document.querySelector('input[name="type"]:checked').value;

  if (description === "" || isNaN(amount) || amount <= 0) return;



  const operation = new Transaction(description, amount, type, category);

  manager.addTransaction(operation);
  
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";

  render();

}

function handleDeleteTransaction(event) {

if (!event.target.classList.contains("btn-delete")) return;

const id = Number(event.target.dataset.id);
manager.deleteTransaction(id);
render();
}

function handleFilterClick(event) {

  if (!event.target.classList.contains("filter-btn")) return;

  activeCategory = event.target.dataset.category;

  render();
}

document.getElementById("add-btn").addEventListener("click", handleAddTransaction);
document.getElementById("transaction-list").addEventListener("click", handleDeleteTransaction);
document.querySelector(".filters").addEventListener("click", handleFilterClick);
render();
