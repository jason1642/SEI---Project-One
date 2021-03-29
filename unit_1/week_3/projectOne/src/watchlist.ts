const axios = require('axios');
const watchListCellList = document.querySelectorAll('.watch-list-cell');
const userInput = (<HTMLInputElement>document.querySelector('#stock-search-input')).value;
let emptyWLMessageDiv = <HTMLInputElement>document.querySelector('.empty-watchlist-message');

const CompanyData = (name, symbol, price, changePercent, isNegPos) => ({
  name: name,
  symbol: symbol,
  price: price,
  changePercent: changePercent,
  isNegPos: isNegPos,
});

//This event will look for the stock symbol using a third party API, and if it returns with data,
// it will add a new cell to the watchlist
const button = document.querySelector('#search-submit');
let pageFunc = () => (window.location.href = 'stockinfopage.html');
button.addEventListener('click', async () => {
  const response = await axios.get(DOMAIN(userInput));
  const { changePercent, companyName, latestPrice, symbol } = response.data;
  let posiOrNegi = /[-]/;
  let percentColor = '';

  if (posiOrNegi.test(changePercent)) {
    percentColor = '#F45532';
    isNegPos = 'red';
  } else {
    percentColor = 'green';
    isNegPos = 'green';
  }

  let createWatchListCell = document.createElement('div');
  createWatchListCell.classList.add('watch-list-cell-plus');
  createWatchListCell.innerHTML = `
<div onclick='pageFunc();' class='watch-list-cell-value col1'>${companyName}</div>
<div onclick='pageFunc();' style='color:${percentColor}' class='watch-list-cell-value col2'>${latestPrice}</div>
<div onclick='pageFunc();' style='color:${percentColor}' class='watch-list-cell-value col3'>${changePercent}</div>
`;

  console.log(currentCompanyName);
  watchListTotalCells += 1;
  if (watchListTotalCells < 9) {
    emptyWLMessageDiv.style.display = 'none';
    document.querySelector(`.watch-list-cell${watchListTotalCells}`).appendChild(createWatchListCell);
    watchList.appendChild(createWatchListCell);
  }

  let newObject = CompanyData(companyName, symbol, latestPrice, changePercent, percentColor);

  console.log(newObject);
  // Sets all the items for local storage with data taken from API
  let watchlistArray;
  // If there is already an array for watchlist in the local storage that exists, do not create a new one,
  // assign watchlistArray to the array from the local storage
  !window.localStorage.getItem('watchlistArray')
    ? window.localStorage.setItem('watchlistArray', '[]')
    : (watchlistArray = JSON.parse(window.localStorage.getItem('watchlistArray')));
  console.log(watchlistArray);
  // if
  !watchlistArray.find(ele => ele.symbol == symbol)
    ? alert('that symbol is already in your watchlist')
    : watchlistArray.push(newObject);
  watchlistArray = JSON.stringify(watchlistArray);
  window.localStorage.setItem('watchlistArray', watchlistArray);

  window.localStorage.setItem('companyNamex', `${companyName}`);
  window.localStorage.setItem('companySymbolx', `${symbol}`);
  window.localStorage.setItem('companyPricex', `${latestPrice}`);
  window.localStorage.setItem('companyPercentx', `${changePercent}`);
  // window.localStorage.setItem('companyChangex', `${changes}`);
  // window.localStorage.setItem('companyImgx', `${image}`);
  window.localStorage.setItem('isNegativePositivex', isNegPos);
});
