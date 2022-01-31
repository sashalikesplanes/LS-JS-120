class Banner {
  constructor(message) {
    this.length = message.length;
    this.message = message;
  }

  horizontalRule() {
    return "+" + "-".repeat(this.length + 2) + "+";
  }

  emptyLine() {
    return "|" + " ".repeat(this.length + 2) + "|";
  }

  messageLine() {
    return "| " + this.message + " |";
  }

  displayBanner() {
    console.log(
      [
        this.horizontalRule(),
        this.emptyLine(),
        this.messageLine(),
        this.emptyLine(),
        this.horizontalRule(),
      ].join("\n")
    );
  }
}

let banner1 = new Banner("To boldly go where no one has gone before.");
banner1.displayBanner();

let banner2 = new Banner("");
banner2.displayBanner();
