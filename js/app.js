'use strict';

var hours = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


var allShops = [];
var salmonTable = document.getElementById('salmonShops');

function Shop(name, minCustomerEachHour, maxCustomerEachHour, avgCookiePerCustomer) {
  this.name = name;
  this.minCustomerEachHour = minCustomerEachHour;
  this.maxCustomerEachHour = maxCustomerEachHour;
  this.avgCookiePerCustomer = avgCookiePerCustomer;
  this.customerEachHour = [];
  this.cookiesEachHour = [];
  // this.totalDailyCookie = 0;
  this.hourlyCustomer = function () {
    for (var i = 0; i < hours.length; i++) {
      this.customerEachHour.push(getRandomInt(this.minCustomerEachHour, this.maxCustomerEachHour));
    }
    // console.log(this.customerEachHour);
  };
  this.hourlyCookies = function () {
    for (var i = 0; i < hours.length; i++){
      this.cookiesEachHour.push(Math.floor(this.customerEachHour[i] * this.avgCookiePerCustomer));
    }
    // console.log(this.cookiesEachHour);
  };
  // this.totalCookie = function () {
  //   for (var i = 0; i < hours.length; i++) {
  //     this.totalDailyCookie = this.totalDailyCookie + this.cookiesEachHour;
  //   }
  //   // console.log(this.totalDailyCookie);
  // } 
  allShops.push(this);
}

var hourTotals = [];

for (var k = 0; k < hours.length; k++){
  var perHrCookTotal = 0;
  for (var l = 0; l < allShops.length; l++){
    perHrCookTotal += allShops[l].cookiesEachHour[k];
  }
  hourTotals.push(perHrCookTotal);
}

new Shop('Pike Marketplace', 23, 65, 6.3);
new Shop('SeaTac Airport', 3, 24, 1.2);
new Shop('Seattle Center', 11, 38, 3.7);
new Shop('Capitol Hill', 20, 38, 2.3);
new Shop('Alki', 2, 16, 4.6);

// console.table(allShops);

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
  salmonTable.appendChild(trEl);
};

function headerRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Hours:';
  trEl.appendChild(thEl);
  // create, content, append for 
  for (var i = 0; i < hours.length; i++){
    // eslint-disable-next-line no-redeclare
    var thEl = document.createElement('th');
    thEl.textContent = hours[i];
    trEl.appendChild(thEl);
  }
  salmonTable.appendChild(trEl);
}

function footerRow() {
  var trEl = document.createElement('tr');
  var thEl = document.createElement('th');
  thEl.textContent = 'Total:';
  trEl.appendChild(thEl);
  // create, content, append for 
  for (var i = 0; i < hours.length; i++){
    // eslint-disable-next-line no-redeclare
    var thEl = document.createElement('th');
    thEl.textContent = dailyTotal;
    trEl.appendChild(thEl);
  }
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
  headerRow();
  renderAllShops();
  footerRow();
}
pageLoad();