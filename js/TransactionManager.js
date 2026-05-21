class TransactionManager {
  constructor() {
    this.transactions =  [];
    this.load();
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);

    localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  deleteTransaction(id) {
  this.transactions = this.transactions.filter(operation => operation.id !== id);

  localStorage.setItem("transactions", JSON.stringify(this.transactions));
  }

  getByCategory(category) {
    if (category === "all") {
      return this.transactions;
    } else {
      return this.transactions.filter(t => t.category === category);
    }
  }

  calculateBalance() {
    return this.transactions.reduce((total, t) => total + t.getSignedAmount(), 0);
  }

  calculateIncome() {
   return this.transactions.filter(t => t.type === "income").reduce((total, t) => total + t.amount, 0);
  }

  calculateExpenses() {
    return this.transactions.filter(t => t.type === "expense").reduce((total, t) => total + t.amount, 0);
  }

  load() {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    this.transactions = saved.map(obj => {
      const t = new Transaction(obj.description, obj.amount, obj.type, obj.category);
      t.id = obj.id;
      t.date = obj.date;
      return t;
    })
  }
}