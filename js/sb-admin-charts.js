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

// Exemples datas
var date1 = timestampToMyString(1382086394000);
var date2 = timestampToMyString(1382096395000);
var date3 = timestampToMyString(1382186396000);
var date4 = timestampToMyString(1382286397000);
var date5 = timestampToMyString(1382386398000);

var TempData1 = 36;
var TempData2 = 37;
var TempData3 = 35;
var TempData4 = 40;
var TempData5 = 43;

// -- Area Chart 1
var ctx = document.getElementById("myAreaChart");
var divLastTemp = document.getElementById("lastTemp");  
divLastTemp.textContent = TempData5;  
var text = divLastTemp.textContent;  
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
      data: [TempData1, TempData2, TempData3, TempData4, TempData5],
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
var ctx = document.getElementById("myAreaChart2");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
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
      data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
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
          max: 40000,
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
var ctx = document.getElementById("myAreaChart3");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
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
      data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
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
          max: 40000,
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

