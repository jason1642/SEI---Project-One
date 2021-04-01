const watchListCellList = document.querySelectorAll('.watch-list-cell');
const userInput = document.getElementById('stock-search-input');
let emptyWLMessageDiv = document.querySelector('.empty-watchlist-message');
const watchListCells = document.querySelectorAll('.watch-list-cell');
const watchList = document.querySelector('.watch-list');
let watchListTotalCells = localStorage.getItem('watchlistArray')
  ? JSON.parse(localStorage.getItem('watchlistArray')).length
  : 0;

const CompanyData = (name, symbol, latestPrice, changePercent, isNegPos) => ({
  name: name,
  symbol: symbol,
  latestPrice: latestPrice,
  changePercent: changePercent,
  isNegPos: isNegPos,
});

//This event will look for the stock symbol using a third party API, and if it returns with data,
// it will add a new cell to the watchlist
const button = document.querySelector('#search-submit');
let pageFunc = () => (window.location.href = 'stockinfopage.html');

button.addEventListener('click', async () => {
  const response = await axios.get(domain(userInput.value));
  const { changePercent, companyName, latestPrice, symbol } = response.data;
  let posiOrNegi = /[-]/;
  let percentColor = '';
  let isNegPos;
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

  let newObject = CompanyData(companyName, symbol, latestPrice, changePercent, percentColor);

  console.log(newObject);
  // Sets all the items for local storage with data taken from API
  let watchlistArray;
  // If there is already an array for watchlist in the local storage that exists, do not create a new one,
  // assign watchlistArray to the array from the local storage
  !window.localStorage.getItem('watchlistArray')
    ? // double expression
      (window.localStorage.setItem('watchlistArray', '[]'),
      (watchlistArray = window.localStorage.getItem('watchlistArray')))
    : (watchlistArray = JSON.parse(window.localStorage.getItem('watchlistArray')));
  console.log(watchlistArray);
  // if the symbol is in the watchlist already, just alert, if not, push it in the object

  watchlistArray && watchlistArray.find(ele => ele.symbol == symbol)
    ? alert('that symbol is already in your watchlist')
    : watchlistArray.push(newObject);
  watchlistArray = JSON.stringify(watchlistArray);
  window.localStorage.setItem('watchlistArray', watchlistArray);

  watchListTotalCells += 1;
  if (watchListTotalCells < 9) {
    emptyWLMessageDiv.style.display = 'none';
    document.querySelector(`.watch-list-cell${watchListTotalCells}`).appendChild(createWatchListCell);
    watchList.appendChild(createWatchListCell);
  }
});
