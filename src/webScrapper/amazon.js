const nightmare = require("nightmare")();

async function checkPrice() {
  const priceString = await nightmare
    .goto(
      "https://www.amazon.com/s?shoes"
    )
    .wait(".a-price-whole")
    .evaluate(() => document.getElementsByClassName("a-price-whole").innerText)
    .end();

    const priceNumber = parseFloat(priceString.replace('$', ''))

    console.log(priceNumber)
}


checkPrice()