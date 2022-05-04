var {expect} = require('chai');
var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  it("should decrease in quality after running the update function", function() {
    const gildedRose = new Shop([ new Item("Apple", 5, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(4);
  });

  it("should decrease in days to sell after running the update function", function() {
    const gildedRose = new Shop([ new Item("Orange", 5, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).to.equal(4);
  });

  it("should decrease in quality by 2 after the sell by date", () => {
    const gildedRose = new Shop([ new Item("Banana", 0, 5) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(3);
  })

  it("should not decrease quality below 0", () => {
    const gildedRose = new Shop([ new Item("Sock", 3, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  })

  it("should increase the quality of brie after each run", () => {
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 25) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(26);
  })

  it("should increase the quality of brie by 2 after the sell by date", () => {
    const gildedRose = new Shop([ new Item("Aged Brie", -1, 25) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(27);
  })

  it("should not increase the quality of an item above 50", () => {
    const gildedRose = new Shop([ new Item("Aged Brie", 10, 50) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(50);
  })

  it("never reduces the quality or days to sell of Sulfuras", () => {
    const gildedRose = new Shop([ new Item("Sulfuras, Hand of Ragnaros", 10, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(30);
    expect(items[0].sellIn).to.equal(10);
  })

  it("increases the quality of backstage passes as sell date approaches", () => {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 15, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(31);
  })

  it("increases the quality of backstage passes by 2 between 6 and 10 days to sell date", () => {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(32);
  })

  it("increases the quality of backstage passes by 2 between 0 and 5 days to sell date", () => {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 4, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(33);
  })

  it("decreases the quality of backstage passes to 0 after sell date", () => {
    const gildedRose = new Shop([ new Item("Backstage passes to a TAFKAL80ETC concert", 0, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(0);
  })

  it("decreases the quality of conjured items by 2", () => {
    const gildedRose = new Shop([ new Item("Fake Apple", 4, 30) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).to.equal(28);
  })

});
