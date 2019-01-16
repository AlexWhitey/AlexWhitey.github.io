'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

//random number generator
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var allShops = [];
var salmonTable = document.getElementById('salmonShops');

new Shop('Pike Marketplace', 23, 65, 6.3);
new Shop('SeaTac Airport', 3, 24, 1.2);
new Shop('Seattle Center', 11, 38, 3.7);
new Shop('Capitol Hill', 20, 38, 2.3);
new Shop('Alki', 2, 16, 4.6);

function Shop(name, minCustomerEachHour, maxCustomerEachHour, avgCookiePerCustomer) {
  this.name = name;
  this.minCustomerEachHour = minCustomerEachHour;
  this.maxCustomerEachHour = maxCustomerEachHour;
  this.avgCookiePerCustomer = avgCookiePerCustomer;
  this.customerEachHour = [];
  this.cookiesEachHour = [];
  this.totalDailyCookie = 0;
  allShops.push(this);
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

var hourTotals = [];

function hourTotal(){
  for (var i = 0; i < hours.length; i++){
    var perHrCookTotal = 0;
    for (var j = 0; j < allShops.length; j++){
      perHrCookTotal += allShops[j].cookiesEachHour[i];
    }
    hourTotals.push(perHrCookTotal);
  }
}
var dailyAllTotal = 0;

function allShopsDailyTotal(){
  for (var i = 0; i < hourTotals.length; i++){
    dailyAllTotal += hourTotals[i];
  }
}

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

function headerRow() {
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

function footerRow() {
  var trEl = document.createElement('tr');
  var tdEl = document.createElement('td');
  tdEl.textContent = 'Total:';
  trEl.appendChild(tdEl);
  // create, content, append for
  for (var i = 0; i < hours.length; i++){
    var tdEl = document.createElement('td');
    tdEl.textContent = hourTotals[i];
    trEl.appendChild(tdEl);
  }
  var allTotalEl = document.createElement('td');
  allTotalEl.textContent = dailyAllTotal;
  trEl.appendChild(allTotalEl);
  salmonTable.appendChild(trEl);
}

function renderAllShops() {
  for (var i = 0; i < allShops.length; i++) {
    allShops[i].render();
  }
}


function pageLoad(){
  for (var i = 0; i < allShops.length; i++){
    allShops[i].hourlyCustomer();
    allShops[i].hourlyCookies();
  }
  hourTotal();
  allShopsDailyTotal();
  headerRow();
  renderAllShops();
  footerRow();
}
pageLoad();
