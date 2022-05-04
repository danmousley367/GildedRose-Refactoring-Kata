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
    // quality decreases unless brie, backstage pass or sulfuras
    for (let i = 0; i < this.items.length; i++) {
      if (!this.nonDegradingItems.includes(this.items[i].name)) {
        let decrease = this.items[i].sellIn < 0 ? -2 : -1
        if (this.conjuredItems.includes(this.items[i].name)) {decrease *= 2}
        this.changeQuality(this.items[i], decrease)
      }
      if (this.nonDegradingItems.includes(this.items[i].name) && !this.legendaryItems.includes(this.items[i].name)) {  // Quality increases by 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            this.handleBackstagePass(this.items[i])//backstage pass
          } else {
            this.changeQuality(this.items[i], 1)
          }
      }
      // decrease days to sell unless Sulfuras
      if (!this.legendaryItems.includes(this.items[i].name)) {
        this.decreaseDaysToSell(this.items[i])
      }
      // Quality decreases twice as fast after sellby
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else { // Quality reduce to 0 if backstage pass
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else { // Brie increases in quality with age
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
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
