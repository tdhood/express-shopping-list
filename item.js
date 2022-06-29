class Item {

    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
  
    /** Return a list of all items */
    static all() {
      return Object.values(Item.items);
    }
  
    static add(item) {
      Item.items[item.id] = item;
    }
  }

  module.exports = Item;