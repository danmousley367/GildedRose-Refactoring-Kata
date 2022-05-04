class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.nonDegradingItems = ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert", "Sulfuras, Hand of Ragnaros"]
    this.conjuredItems = ["Fake Apple"]
    this.legendaryItems = ["Sulfuras, Hand of Ragnaros"]
  }

  decreaseDaysToSell(item) {
    item.sellIn -= 1
  }

  changeQuality(item, amount) {
    if (amount < 0) {
      item.quality = item.quality + amount < 0 ? 0 : item.quality + amount
    } else {
      item.quality = item.quality + amount > 50 ? 50 : item.quality + amount
    }
  }

  handleBackstagePass(backstagePass) {
    if (backstagePass.sellIn > 10) {this.changeQuality(backstagePass, 1)}
    if (backstagePass.sellIn > 5 && backstagePass.sellIn <= 10) {this.changeQuality(backstagePass, 2)}
    if (backstagePass.sellIn >= 0 && backstagePass.sellIn <= 5) {this.changeQuality(backstagePass, 3)}
    if (backstagePass.sellIn < 0) {this.changeQuality(backstagePass, -backstagePass.quality)}
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      let item = this.items[i]

      if (!this.legendaryItems.includes(item.name)) {
        this.decreaseDaysToSell(item)
      }

      if (!this.nonDegradingItems.includes(item.name)) {
        let decrease = item.sellIn < 0 ? -2 : -1
        if (this.conjuredItems.includes(item.name)) {decrease *= 2}
        this.changeQuality(item, decrease)
      }

      if (this.nonDegradingItems.includes(item.name) && !this.legendaryItems.includes(item.name)) {
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            this.handleBackstagePass(item)
          } else if (item.name === "Aged Brie" && item.sellIn < 0) {
            this.changeQuality(item, 2)
          }
          else {
            this.changeQuality(item, 1)
          }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
