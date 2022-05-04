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
      let item = this.items[i]
      if (!this.legendaryItems.includes(item.name)) {
        this.decreaseDaysToSell(item)
      }
      if (!this.nonDegradingItems.includes(item.name)) {
        let decrease = item.sellIn < 0 ? -2 : -1
        if (this.conjuredItems.includes(item.name)) {decrease *= 2}
        this.changeQuality(item, decrease)
      }
      if (this.nonDegradingItems.includes(item.name) && !this.legendaryItems.includes(item.name)) {  // Quality increases by 1
          if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
            this.handleBackstagePass(item)//backstage pass
          } else {
            this.changeQuality(item, 1)
          }
      }
      // decrease days to sell unless Sulfuras

      // Quality decreases twice as fast after sellby
      // if (item.sellIn < 0) {
      //   if (item.name != 'Aged Brie') {
      //     if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      //       if (item.quality > 0) {
      //         if (item.name != 'Sulfuras, Hand of Ragnaros') {
      //           item.quality = item.quality - 1;
      //         }
      //       }
      //     } else { // Quality reduce to 0 if backstage pass
      //       item.quality = item.quality - item.quality;
      //     }
      //   } else { // Brie increases in quality with age
      //     if (item.quality < 50) {
      //       item.quality = item.quality + 1;
      //     }
      //   }
      // }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
