'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];


var allShops = [];
var hourlyTotals = [];
var dailyAllTotal = 0;
var salmonTable = document.getElementById('salmonShops');
var locationForm = document.getElementById('location-form');


new Shop('Pike Marketplace', 23, 65, 6.3);
new Shop('SeaTac Airport', 3, 24, 1.2);
new Shop('Seattle Center', 11, 38, 3.1);
new Shop('Capitol Hill', 20, 38, 2.3);
new Shop('Alki', 2, 16, 4.6);

//Random number generator
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//Here is the constructor for each shop
function Shop(name, minCustomerEachHour, maxCustomerEachHour, avgCookiePerCustomer) {
  this.name = name;
  this.minCustomerEachHour = minCustomerEachHour;
  this.maxCustomerEachHour = maxCustomerEachHour;
  this.avgCookiePerCustomer = avgCookiePerCustomer;
  this.customerEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookie = 0;
  allShops.unshift(this);
}

// Generate hourly customer
Shop.prototype.hourlyCustomer = function() {
  for (var i = 0; i < hours.length; i++) {
    this.customerEachHour.push(getRandomInt(this.minCustomerEachHour, this.maxCustomerEachHour));
  }
};
// Generate hourly cookies
Shop.prototype.hourlyCookies = function() {
  for (var i = 0; i < hours.length; i++){
    var cookiesPerHour = Math.floor(this.customerEachHour[i] * this.avgCookiePerCustomer);
    this.cookiesEachHour.push(cookiesPerHour);
    this.totalDailyCookie += cookiesPerHour;
  }
};

// this function gets the hourly total for all shop cookie sales
function hourTotal(){
  for (var i = 0; i < hours.length; i++){
    var perHrCookTotal = 0;
    for (var j = 0; j < allShops.length; j++){
      perHrCookTotal += allShops[j].cookiesEachHour[i];
    }
    hourlyTotals.push(perHrCookTotal);
  }
}

// this function gets the daily total for all shop cookie sales
function allShopsDailyTotal(){
  for (var i = 0; i < hourlyTotals.length; i++){
    dailyAllTotal += hourlyTotals[i];
  }
}
// this function renders the table body
Shop.prototype.render = function () {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = this.name;
  trEl.appendChild(tdEl);
  // Total cookies each hour
  for (var i = 0; i < hours.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = this.cookiesEachHour[i];
    trEl.appendChild(tdEl);
  }
  var tdEl = document.createElement('td');
  tdEl.textContent = this.totalDailyCookie;
  trEl.appendChild(tdEl);
  salmonTable.appendChild(trEl);
};

// This function populates the table with the footer
function headerRow() {
  salmonTable.textContent = '';
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Hours:';
  trEl.appendChild(thEl);
  // create, content, append for
  for (var i = 0; i < hours.length; i++){
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  var thEl = document.createElement('th');
  thEl.textContent = 'Daily Totals';
  trEl.appendChild(thEl);
  salmonTable.appendChild(trEl);
}

// This function populates the table with the footer
function footerRow() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total:';
  trEl.appendChild(tdEl);
  // create, content, append for
  for (var i = 0; i < hours.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = hourlyTotals[i];
    trEl.appendChild(tdEl);
  }
  var allTotalEl = document.createElement('td');
  allTotalEl.textContent = dailyAllTotal;
  trEl.appendChild(allTotalEl);
  salmonTable.appendChild(trEl);
}

// This function sets table to empty and renders all functions
function renderAllShops() {
  for (var i = 0; i < allShops.length; i++) {
    allShops[i].render();
  }
}

// This is the function that handles the event of Shop submission
function handleShopSubmit(event) {
  event.preventDefault(); // Will prevent page refresh on submit
  var name = event.target.where.value;
  var minCustomerEachHour = parseInt(event.target.minimumCustomer.value);
  var maxCustomerEachHour = parseInt(event.target.maximumCustomer.value);
  var avgCookiePerCustomer = parseInt(event.target.averageCookiePer.value);
  //create variable to add new Shops/locations
  new Shop(name, minCustomerEachHour, maxCustomerEachHour, avgCookiePerCustomer);
  // Empty input fields
  event.target.where.value = null;
  event.target.minimumCustomer.value = null;
  event.target.maximumCustomer.value = null;
  event.target.averageCookiePer.value = null;

  for (var i = 0; i < allShops.length ; i++) {
    allShops[i].cookiesEachHour = [];
    allShops[i].totalDailyCookie = 0;
    hourlyTotals = [];
    dailyAllTotal = 0;
  }
  allShops[0].hourlyCustomer();
  pageLoad();
}

// This is the Event listener for shop submission form
locationForm.addEventListener('submit', handleShopSubmit);

function customerLoader() {
  for (var i = 0; i < allShops.length; i++){
    allShops[i].hourlyCustomer();
  }
}

// This function is page load
function pageLoad(){
  for (var i = 0; i < allShops.length; i++){
    allShops[i].hourlyCookies();
  }
  headerRow();
  hourTotal();
  allShopsDailyTotal();
  renderAllShops();
  footerRow();
}

customerLoader();
pageLoad();
