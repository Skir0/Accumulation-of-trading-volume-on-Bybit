// number of iterations required
const CYCLES = 10

const defaultDelay = 1000;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const selectors = {
    limitSectionButton: "#root > el-config-provider > div > div.v-exchange-right.ovh > div.p-relative > div > div.v-exchange-right-inner.v-exchange-right-order > div > div.order-create > ul > li:nth-child(1)",
    marketSectionButton: "#root > el-config-provider > div > div.v-exchange-right.ovh > div.p-relative > div > div.v-exchange-right-inner.v-exchange-right-order > div > div.order-create > ul > li:nth-child(2)",
    setMarket100Button: "#root > el-config-provider > div > div.v-exchange-right.ovh > div.p-relative > div > div.v-exchange-right-inner.v-exchange-right-order > div > div.order-create > div.order-market > div.order-market-form > div.order-market-item.order-market-slider > div > ul > li:nth-child(5)",
    setLimit100Button: "#root > el-config-provider > div > div.v-exchange-right.ovh > div.p-relative > div > div.v-exchange-right-inner.v-exchange-right-order > div > div.order-create > div.order-limit > div.order-limit-form > div.order-limit-item.order-limit-slider > div > ul > li:nth-child(5)",
    orderMarketSubmitButton: "#root > el-config-provider > div > div.v-exchange-right.ovh > div.p-relative > div > div.v-exchange-right-inner.v-exchange-right-order > div > div.order-create > div.order-market > div.order-submit.order-market-submit > button",
    orderLimitSubmitButton: "#root > el-config-provider > div > div.v-exchange-right.ovh > div.p-relative > div > div.v-exchange-right-inner.v-exchange-right-order > div > div.order-create > div.order-limit > div.order-submit.order-limit-submit > button",
    sellSectionButton: "#root > el-config-provider > div > div.v-exchange-right.ovh > div.p-relative > div > div.v-exchange-right-inner.v-exchange-right-order > div > div.order-create > div.order-create-side.flex-items-center.flex-row-space-between > button.sell.flex-1",
    buySectionButton: "#root > el-config-provider > div > div.v-exchange-right.ovh > div.p-relative > div > div.v-exchange-right-inner.v-exchange-right-order > div > div.order-create > div.order-create-side.flex-items-center.flex-row-space-between > button.buy.flex-1",
    highPrice: "#klineContainer > div.v-exchange-hd-tabs.flex-col > div > div.handicap-tab-body.flex-row > div > div.handicap-body.flex-col-center > div.el-scrollbar.sfe-scrollbar.is-hidden.is-sell.handicap-list > div.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default > div > ul > li:nth-child(20) > span.price.flex-row.flex-items-center > em",
    lowPrice: "#klineContainer > div.v-exchange-hd-tabs.flex-col > div > div.handicap-tab-body.flex-row > div > div.handicap-body.flex-col-center > div.el-scrollbar.sfe-scrollbar.is-hidden.is-buy.handicap-list > div.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default > div > ul > li:nth-child(1) > span.price.flex-row.flex-items-center > em"
};

// action click and log function
const clickElement = async (selector, actionDescription, delay = 1000) => {
    console.log(`Action: ${actionDescription}...`);
    document.querySelector(selector).click();
    console.log(`Waiting ${delay / 1000} s after action: ${actionDescription}`);
    await sleep(delay);

};

// create and get a new price (median of high and low prices)
function getPriceMedian(lowElem, highElem) {
    let lowPrice = parseFloat(lowElem.textContent.replace(',', ''));
    let highPrice = parseFloat(highElem.textContent.replace(',', ''));
    console.log("low price: " + lowPrice);
    console.log("high price: " + highPrice);
    return (lowPrice + highPrice) / 2;
}

// main (run) function 
const run = async () => {
    for (let i = 0; i < CYCLES; i++) {
        console.log(`Cicle ${i + 1} from ${CYCLES} started.`);

        // sell (limit) section 
        await clickElement(selectors.limitSectionButton, "Go to the 'Limit'", defaultDelay);
        await clickElement(selectors.sellSectionButton, "Switching back to sell", defaultDelay);
        await clickElement(selectors.setLimit100Button, "The installation is 100% for sale", defaultDelay);
        let median = getPriceMedian(document.querySelector(selectors.lowPrice), document.querySelector(selectors.highPrice));
        let inputField = document.getElementById('order-limit-price');
        inputField.value = median;
        console.log("New price to sell:  " + median);
        await clickElement(selectors.orderLimitSubmitButton, "Sending a sales order", 50);

        // buy (market) section
        await clickElement(selectors.marketSectionButton, "Go to the 'Market'", 50);
        await clickElement(selectors.buySectionButton, "Switching back to buy", 50);
        await clickElement(selectors.setMarket100Button, "The installation is 100% for buy", 50);
        await clickElement(selectors.orderMarketSubmitButton, "Sending a market order", 50);
        console.log(`Cicle ${i + 1} from ${CYCLES} finished.`);

    }
};

run();