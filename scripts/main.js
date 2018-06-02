const adjHtml = {
  Before: 'beforebegin',
  After: 'afterend',
}

let money = 200;
let plotCount = 0;
let activePlotCount = 0;
let rowCount = 1;
let rentPrice = 0;
let buildingPrice = 200;
let rowPrice = 1000;

function load() {

  update();
  updateRentPrice();

}

function update() {
  //Money, etc.
  updateMoney();
  plotCount = document.getElementsByClassName('plot').length;
  buildingPrice = 200 + (20*activePlotCount);
  rowPrice = rowCount*1000;

  //Display
  document.getElementById('money').innerHTML = money;
  document.getElementById('plots').innerHTML = activePlotCount;
  document.getElementById('buildingCost').innerHTML = buildingPrice;
  document.getElementById('rowPrice').innerHTML = rowPrice;

  for (let i = 0; i < document.getElementsByClassName('moneyGenPerSec').length; i++) {
    document.getElementsByClassName('moneyGenPerSec')[i].innerHTML = rentPrice;
  }

  setTimeout('update()', 1000);
}

function updateMoney() {
  activePlotCount = document.getElementsByClassName('active').length;
  money += activePlotCount*rentPrice;
}

function updateRentPrice() {
  rentPrice++;
  setTimeout('updateRentPrice()', 10000);
}

function buyPlot(plotIndex) {
  let plot = document.getElementsByClassName('plot')[plotIndex];
  if (money >= buildingPrice) {
    plot.innerHTML =
      '<p>Name: <span class="plotName"></span></p>\n' +
      '<p>MoneyGen/Sec: <span class="moneyGenPerSec"></span></p>'
    ;
    document.getElementsByClassName('plotName')[plotIndex].innerHTML = generateName();
    plot.setAttribute('class', 'plot active');
    money -= buildingPrice;
  } else {
    //alert('Building costs more than you have!\nCurrent Money: ' + money + '\nBuilding Price: ' + buildingPrice);
    plotError(plotIndex);
  }
}

function plotError(plotIndex) {
  //let contents = document.getElementsByClassName('plot')[plotIndex].innerHTML.toString();
  document.getElementsByClassName('plot')[plotIndex].setAttribute('class', 'plot error');
  //document.getElementsByClassName('plot')[plotIndex].innerHTML = '';
  setTimeout('document.getElementsByClassName(\'plot\')[' + plotIndex + '].setAttribute(\'class\', \'plot\')', 5000);
  //setTimeout('document.getElementsByClassName(\'plot\')[' + plotIndex + '].innerHTML = \'' + contents + '\'', 5000);
}

function buyRow() {
  if (money >= rowPrice) {
    document.getElementById('game').innerHTML +=
    '<tr>\n' +
    ' <td class="plot">\n' +
    '    <button onclick="buyPlot(' + plotCount + ')">Buy Plot</button>\n' +
    '  </td>\n' +
    '  <td class="plot">\n' +
    '    <button onclick="buyPlot(' + (plotCount + 1) + ')">Buy Plot</button>\n' +
    '  </td>\n' +
    '  <td class="plot">\n' +
    '    <button onclick="buyPlot(' + (plotCount + 2) + ')">Buy Plot</button>\n' +
    '  </td>\n' +
    '</tr>'
    ;
    rowCount++;
  } else {
    document.getElementsByTagName('body')[0].setAttribute('class', 'error');
    setTimeout('document.getElementsByTagName(\'body\')[0].removeAttribute(\'class\')', 5000);
  }
}
