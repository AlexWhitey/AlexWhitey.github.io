'use strict';

var times = ['6am', '7am', '8am', '9am', '10am', '11am', '12am', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

var pike = document.getElementById('onePike');
var seaTac = document.getElementById('SeaTac');
var seaCenter = document.getElementById('SeaCenter');
var capitol = document.getElementById('capitolHill');
var alki = document.getElementById('Alki');


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function mult(a,b) {
    var output = a * b;
    return [output]
}
// 1st and Pike 
var shopOne = {
    name: '1st and Pike',
    min: 23,
    max: 65,
    avgCookies: 6.3,
    render: function() {
        for (var i = 0; i < times.length; i++) {
        var randCust = getRandomIntInclusive(this.min, this.max);  
        var totCooky = Math.floor(mult(randCust, this.avgCookies)[0]);
        var liEl = document.createElement('li');
        console.log('just created liEl', liEl);
        liEl.textContent = `${times[i]}: ${totCooky} cookies`
        console.log('assigned value to liEl', liEl);
        pike.appendChild(liEl);
        }
    }
}
// 1st and pike function call
shopOne.render();

// SeaTac Airport
var shopTwo = {
    name: 'SeaTac Airport',
    min: 3,
    max: 24,
    avgCookies: 1.2,
    render: function() {
        for (var i = 0; i < times.length; i++) {
        var randCust = getRandomIntInclusive(this.min, this.max);  
        var totCooky = Math.floor(mult(randCust, this.avgCookies)[0]);
        var liEl = document.createElement('li');
        console.log('just created liEl', liEl);
        liEl.textContent = `${times[i]}: ${totCooky} cookies`
        console.log('assigned value to liEl', liEl);
        seaTac.appendChild(liEl);
        }
    }
}
// SeaTac Airport function call
shopTwo.render();

// Seattle Center 
var shopThree = {
    name: 'Seattle Center',
    min: 11,
    max: 38,
    avgCookies: 3.7,
    render: function() {
        for (var i = 0; i < times.length; i++) {
        var randCust = getRandomIntInclusive(this.min, this.max);  
        var totCooky = Math.floor(mult(randCust, this.avgCookies)[0]);
        var liEl = document.createElement('li');
        console.log('just created liEl', liEl);
        liEl.textContent = `${times[i]}: ${totCooky} cookies`
        console.log('assigned value to liEl', liEl);
        seaCenter.appendChild(liEl);
        }
    }
}
//Seattle Center function call
shopThree.render();

// Capitol Hill
var shopFour = {
    name: 'Capitol Hill',
    min: 20,
    max: 38,
    avgCookies: 2.3,
    render: function() {
        for (var i = 0; i < times.length; i++) {
        var randCust = getRandomIntInclusive(this.min, this.max);  
        var totCooky = Math.floor(mult(randCust, this.avgCookies)[0]);
        var liEl = document.createElement('li');
        console.log('just created liEl', liEl);
        liEl.textContent = `${times[i]}: ${totCooky} cookies`
        console.log('assigned value to liEl', liEl);
        capitol.appendChild(liEl);
        }
    }
}
// Capitol Hill function call
shopFour.render();

// Alki
var shopFive = {
    name: 'Alki',
    min: 2,
    max: 16,
    avgCookies: 4.6,
    render: function() {
        var cookyTotal = 0;
        for (var i = 0; i < times.length; i++) {
            var randCust = getRandomIntInclusive(this.min, this.max);  
            var hourlyCooky = Math.floor(mult(randCust, this.avgCookies)[0]);
            cookyTotal = cookyTotal + hourlyCooky;
            console.log('total cookies', cookyTotal);
            var liEl = document.createElement('li');
            // console.log('just created liEl', liEl);
            liEl.textContent = `${times[i]}: ${hourlyCooky} cookies`
            // console.log('assigned value to liEl', liEl);
            alki.appendChild(liEl);
        }
        var totalLi = document.createElement('li');
        totalLi.textContent = `Total: ${cookyTotal} cookies`;
        alki.appendChild(totalLi);
    }
}
// Alki function call
shopFive.render();

