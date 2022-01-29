function createPayment(services = {}) {
  // implement the factory function here
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount || (services.phone || 0) + (services.internet || 0),

    total() {
      return this.amount;
    },
  };
}

function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(payments) {
      payments.forEach((payment) => this.addPayment(payment), this);
    },

    amountDue() {
      return this.payments.reduce(
        (totalPaid, payment) => totalPaid - payment.total(),
        this.total()
      );
    },
  };
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({ amount: 2000 });
let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({ phone: 1000 });

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());
