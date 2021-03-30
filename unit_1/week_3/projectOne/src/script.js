// API Access
// const domain = 'https://financialmodelingprep.com/api/v3/company/profile/';
// const APIKEY = '0dafce6ce2fa49c8f0acd0ac316dfa33';
const IEX_API_KEY = 'pk_51d6e645bcac4eb18566f2ccca4d7515';
const domain = symbol => `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${IEX_API_KEY}`;

//
// Template for main page, randomized 5 stocks
const topCompanies = [
  'fb',
  'nvda',
  'tsla',
  'aapl',
  'msft',
  'amzn',
  'amd',
  'f',
  'ino',
  'plug',
  'ally',
  'vktx',
  'gern',
  'twtr',
  'snap',
  'ge',
  'gm',
  'sbux',
  'LK',
  'baba',
];

// Static etf stock symbols displaying on top of main page
const etfStocks = [
  'TQQQ',
  'SPY',
  'SQQQ',
  'UPRO',
  'AAPL',
  'UDOW',
  'MSFT',
  'SPXL',
  'SOXL',
  'QLD',
  'BAC',
  'V',
  'TQQQ',
  'SPY',
  'SQQQ',
  'UPRO',
  'AAPL',
  'UDOW',
  'MSFT',
];
let currentCompanyName = '';
let currentCompanySymbol = '';
let currentCompanyPrice;
let currentCompanyPercent;
let currentCompanyChange;
let currentCompanyImg;
let isNegPos;

//Table one cell values
const topStockNames = document.querySelectorAll('.top-stock-company-name');
const topStockImg = document.querySelectorAll('.top-stock-img');
const topStockPrice = document.querySelectorAll('.top-stock-price');
const topStockPercent = document.querySelectorAll('.top-stock-change-percent');

// ON WINDOW LOAD
window.addEventListener('load', async () => {
  let shuffle = stocks => {
    let shuffledStocks = stocks;
    let currentIndex = stocks.length;
    let temporaryValue;
    let randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temporaryValue = shuffledStocks[currentIndex];
      shuffledStocks[currentIndex] = shuffledStocks[randomIndex];
      shuffledStocks[randomIndex] = temporaryValue;
    }
    return shuffledStocks;
  };

  let shuffledStocksArray = shuffle(topCompanies);
  for (let i = 0; i < topStockNames.length; i++) {
    let response = await axios.get(domain(shuffledStocksArray[i]));
    const { companyName, latestPrice, changePercent } = response.data;
    console.log(response);
    let percentColor = '';
    let posiOrNegi = /[-]/;
    if (posiOrNegi.test(changePercent)) {
      percentColor = '#F45532';
    } else {
      percentColor = 'green';
    }
    topStockNames[i].innerHTML = `${companyName}`;
    // topStockImg[i].innerHTML = `<img src='${response.data.profile.image}'>`;
    topStockPrice[i].innerHTML = `${latestPrice}`;
    topStockPercent[i].innerHTML = `${changePercent}`;
    topStockPrice[i].style.color = `${percentColor}`;
    topStockPercent[i].style.color = `${percentColor}`;
  }
});

const tickerItems = document.querySelectorAll('.ticker-item');

//Ticker Stocks - ON LOAD
window.addEventListener('load', async () => {
  for (let i = 0; i < tickerItems.length; i++) {
    const response = await axios.get(domain(etfStocks[i]));
    const { changePercent, latestPrice } = response.data;
    console.log(response);
    tickerItems[i].innerHTML = `<p>
    <span class="ticker-stock-name">${etfStocks[i]}:</span>
    <span class="ticker-num">${latestPrice} -  ${changePercent}</span>
    </p>`;
    const tickerNums = document.querySelectorAll('.ticker-num');
    let posiOrNegi = /[-]/;
    if (posiOrNegi.test(changePercent)) {
      tickerNums[i].style.color = '#F45532';
    } else {
      tickerNums[i].style.color = 'green';
    }
  }
});
