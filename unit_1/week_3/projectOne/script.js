const DOMAIN = "https://financialmodelingprep.com/api/v3/company/profile/";
const topCompanies = ["fb", 'nvda', 'tsla', "aapl", "msft", "amzn", 'amd', "f", "ino", 'plug', 'ally', 'vktx', 'gern', 'twtr', 'snap', 'ge', 'gm', 'sbux', "LK", 'baba'];
const userInput = document.querySelector("#stock-search-input");
const button = document.querySelector("#search-submit");
const etfStocks = ['TQQQ', 'SPY', 'SQQQ', 'UPRO', 'AAPL', 'UDOW', 'MSFT', 'SPXL', 'SOXL', 'QLD', 'BAC', 'V', 'TQQQ', 'SPY', 'SQQQ', 'UPRO', 'AAPL', 'UDOW', 'MSFT']
let currentCompanyName = "";
let currentCompanySymbol = "";
let currentCompanyPrice;
let currentCompanyPercent;
let currentCompanyChange;
let currentCompanyImg;
let isNegPos;



//Table one cell values
const topStockNames = document.querySelectorAll(".top-stock-company-name");
const watchListCells = document.querySelectorAll(".watch-list-cell");
const topStockImg = document.querySelectorAll(".top-stock-img")
const topStockPrice = document.querySelectorAll(".top-stock-price");
const topStockPercent = document.querySelectorAll(".top-stock-change-percent");
let watchListTotalCells = 0;
const watchList = document.querySelector(".watch-list");



// ON WINDOW LOAD 
window.addEventListener("load", async () => {
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
  }

  let shuffledStocksArray = shuffle(topCompanies);
  for (let i = 0; i < topStockNames.length; i++) {

    let response = await axios.get(`${DOMAIN}${shuffledStocksArray[i]}`);
    let percentColor = "";
    let posiOrNegi = /[-]/;
    if (posiOrNegi.test(response.data.profile.changesPercentage)) {
      percentColor = "#F45532";
    } else {
      percentColor = "green";
    }
    topStockNames[i].innerHTML = `${response.data.profile.companyName}`;
    topStockImg[i].innerHTML = `<img src='${response.data.profile.image}'>`;
    topStockPrice[i].innerHTML = `${response.data.profile.price}`;
    topStockPrice[i].style.color = `${percentColor}`;
    topStockPercent[i].innerHTML = `${response.data.profile.changesPercentage}`;
    topStockPercent[i].style.color = `${percentColor}`;

  }
}
)

const tickerItems = document.querySelectorAll(".ticker-item");









//Ticker Stocks - ON LOAD
window.addEventListener("load", async () => {

  for (let i = 0; i < tickerItems.length; i++) {
    const response = await axios.get(`${DOMAIN}${etfStocks[i]}`)
    tickerItems[i].innerHTML = `<p>
    <span class="ticker-stock-name">${etfStocks[i]}:</span>
    <span class="ticker-num">${response.data.profile.price} -  ${response.data.profile.changesPercentage}</span>
    </p>`;
    const tickerNums = document.querySelectorAll(".ticker-num");
    let posiOrNegi = /[-]/;
    if (posiOrNegi.test(response.data.profile.changesPercentage)) {
      tickerNums[i].style.color = "#F45532";
    } else {
      tickerNums[i].style.color = "green";
    }
  }
}
)






const watchListCellList = document.querySelectorAll(".watch-list-cell");
let emptyWLMessageDiv = document.querySelector(".empty-watchlist-message");







//This event will --
let pageFunc = () => window.location = "stockinfopage.html";
button.addEventListener("click", async () => {
  const response = await axios.get(`${DOMAIN}${userInput.value}`);

  let posiOrNegi = /[-]/;
  let percentColor = "";

  if (posiOrNegi.test(response.data.profile.changesPercentage)) {
    percentColor = "#F45532";
    isNegPos = "red";
  } else {
    percentColor = "green";
    isNegPos = "green";
  }
  
  const watchListCell = document.querySelectorAll(".watch-list-cell");
  let createWatchListCell = document.createElement("div");
  createWatchListCell.classList.add("watch-list-cell-plus");
  createWatchListCell.innerHTML = `
<div onclick='pageFunc();' class='watch-list-cell-value col1'>${response.data.profile.companyName}</div>
<div onclick='pageFunc();' style='color:${percentColor}' class='watch-list-cell-value col2'>${response.data.profile.price}</div>
<div onclick='pageFunc();' style='color:${percentColor}' class='watch-list-cell-value col3'>${response.data.profile.changesPercentage}</div>
`;

console.log(currentCompanyName)
  watchListTotalCells += 1;
  if (watchListTotalCells < 9) {
    emptyWLMessageDiv.style.display = "none";

    document.querySelector(`.watch-list-cell${watchListTotalCells}`).appendChild(createWatchListCell)

    // createWatchListCell.querySelector(".watch-list-cell-value").style.display = "grid";

    watchList.appendChild(createWatchListCell);

    // createWatchListCell.style.display = "grid";
  }
  console.log(response.data)
   currentCompanyName = response.data.profile.companyName;
  currentCompanySymbol = response.data.symbol;
  currentCompanyPrice =  response.data.profile.price;
  currentCompanyPercent = response.data.profile.changesPercentage;
  currentCompanyChange = response.data.profile.changes;
  currentCompanyImg = response.data.profile.image;
 window.localStorage.setItem('companyNamex', `${currentCompanyName}`);
 window.localStorage.setItem('companySymbolx', `${currentCompanySymbol}`);
 window.localStorage.setItem('companyPricex', `${currentCompanyPrice}`);
 window.localStorage.setItem('companyPercentx', `${currentCompanyPercent}`);
 window.localStorage.setItem('companyChangex', `${currentCompanyChange}`);
 window.localStorage.setItem('companyImgx', `${currentCompanyImg}`);
 window.localStorage.setItem('isNegativePositivex', isNegPos)
})

console.log(localStorage)

