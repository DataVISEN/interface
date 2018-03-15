// Chart.js scripts
// -- Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

function timestampToMyString(myTimestamp){

  var hours = new Date(myTimestamp).getHours();
  var minutes = new Date(myTimestamp).getMinutes();

  hours = (hours<10) ? '0' + hours : hours;
  minutes = (minutes<10) ? '0' + minutes : minutes;

  var myString = hours + ':' + minutes;

  return myString;
}

// Examples datas
var date1 = timestampToMyString(1382086394000);
var date2 = timestampToMyString(1382096395000);
var date3 = timestampToMyString(1382186396000);
var date4 = timestampToMyString(1382286397000);
var date5 = timestampToMyString(1382386398000);

var tempData1 = 36;
var tempData2 = 37;
var tempData3 = 35;
var tempData4 = 40;
var tempData5 = 43;

var oxygeneData1 = 80;
var oxygeneData2 = 83;
var oxygeneData3 = 86;
var oxygeneData4 = 90;
var oxygeneData5 = 87;

var pressData1 = 10;
var pressData2 = 12;
var pressData3 = 15;
var pressData4 = 13;
var pressData5 = 16;

// Constants
var symbolTemp = "°C";
var symbolOxygene = "%";

// -- Area Chart 1
var ctx = document.getElementById("temperatureChart");
var divLastTemp = document.getElementById("lastTemp");  
divLastTemp.textContent = tempData5.toString().concat(symbolTemp);  
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [date1, date2, date3, date4, date5],
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: "rgba(0,165,0,0.2)",
      borderColor: "rgba(0,165,0,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(0,165,0,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(0,165,0,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: [tempData1, tempData2, tempData3, tempData4, tempData5],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 50,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});


// -- Area Chart 2
var ctx = document.getElementById("oxygeneChart");
var divLastOxygene = document.getElementById("lastOxygene");  
divLastOxygene.textContent = oxygeneData5.toString().concat(symbolOxygene);  
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [date1, date2, date3, date4, date5],
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: [oxygeneData1, oxygeneData2, oxygeneData3, oxygeneData4, oxygeneData5],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 100,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

// -- Area Chart 3
var ctx = document.getElementById("pressChart");
var divLastPress = document.getElementById("lastPress");  
divLastPress.textContent = pressData5.toString();
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [date1, date2, date3, date4, date5],
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: "rgba(255,225,0,0.2)",
      borderColor: "rgba(255,225,0,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(255,225,0,1)",
      pointBorderColor: "rgba(255,225,0,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(255,225,0,1)",
      pointHitRadius: 20,
      pointBorderWidth: 2,
      data: [pressData1, pressData2, pressData3, pressData4, pressData5],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 30,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});

