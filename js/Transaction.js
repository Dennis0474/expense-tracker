class Transaction {
  constructor(description, amount, type, category) {
  this.description = description;
  this.amount = amount;
  this.type = type;
  this.category = category;
  this.id = Date.now();
  this.date = new Date().toLocaleDateString();
  }

  getSignedAmount() {
    if (this.type === "income") {
      return this.amount;
    } else {
      return -this.amount;
    }
  }

}
