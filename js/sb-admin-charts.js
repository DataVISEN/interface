var tempDate;
var tempValue;
var oxygenDate;
var oxygenValue;
var arterialPressureDia_Date;
var arterialPressureDia_Value;
var arterialPressureSys_Date;
var arterialPressureSys_Value;
var respiratoryRateDate;
var respiratoryRateValue;
var heartbeatDate;
var heartbeatValue;

function formatDate(date) {
  var monthNames = [
    "Janvier", "Février", "Mars",
    "Avril", "Mai", "Juin", "Juillet",
    "Août", "Septembre", "Octobre",
    "Novembre", "Decembre"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var min = date.getMinutes();

  return day + ' ' + monthNames[monthIndex] + ' ' + year+ ' ' + hour+ ':' + min;
}

if ("WebSocket" in window)
      {
         // Let us open a web socket
         var ws = new WebSocket("ws://172.17.4.96:8080");
            
         // Web Socket is connected : we send send data using send()
         ws.onopen = function()
         {
            // Constructing JSON object
            var patientFetchJSON = {"type": "patientFetch", "payload": {"id" :getId() }};
            patientFetch = JSON.stringify(patientFetchJSON);
            ws.send(patientFetch);
            console.log("Envoi serveur : "+patientFetch);


            // We have received new data
            ws.onmessage = function (event) 
            { 
              var received_msg = event.data;
              console.log("Message is received...", received_msg);

              var data = JSON.parse(event.data);
               switch(data.type)
               {
                  case "patientSent":
                      if(data.payload!=null){
                        initializePatient(data.payload);

                        // Constructing JSON object
                        var donneesFetchJSON = {"type": "donneesFetch", "payload": {"id" :getId(), "from":Date.now()-1000*60*5, "to":Date.now()}};
                        donneesFetch = JSON.stringify(donneesFetchJSON);
                        ws.send(donneesFetch);
                        console.log("Envoi historique : "+donneesFetch);
                        document.getElementById("from_date").innerHTML = formatDate(new Date(Date.now()-1000*60*5));
                      }
                      else{
                        alert("L'utilisateur n'existe pas");
                        document.location.href="../index.html";
                      }
                      break;
                  case "donneesSent":
                      initializeArterialPressureSys(data.payload.arterial_pressure_sys);
                      initializeArterialPressureDia(data.payload.arterial_pressure_dia);
                      initializeTemperature(data.payload.temperature);
                      initializeOxygenLevel(data.payload.oxygen_level);
                      initializeHeartbeat(data.payload.heartbeat);
                      initializeRespiratoryRate(data.payload.respiratory_rate);
                      break;
               }
            };
               
            // Websocket is closed by server
            ws.onclose = function()
            { 
               console.log("Connection is closed..."); 
            };
         };
            

         ws.onerror = function(error) {
             console.log(error);
         };

         window.onbeforeunload = function(event) {
            ws.close();
         };

      }
      else
      {
         // The browser doesn't support WebSocket
         console.log("WebSocket NOT supported by your Browser!");
      }

      function initializePatient(payload)
      {
          document.getElementById("patient_name").innerHTML = payload.prenom+" "+payload.nom;
          document.getElementById("patient_name2").innerHTML = payload.prenom+" "+payload.nom;
          document.getElementById("patient_gender").innerHTML = payload.sexe;
          var date = new Date(payload.date_naissance);
          document.getElementById("patient_birth").innerHTML = date.getDay()+"/"+date.getMonth()+"/"+date.getFullYear();
      }


      function initializeArterialPressureSys(payload)
      {
        arterialPressureSys_Date=[payload.length];
        arterialPressureSys_Value=[payload.length];

        for (i = 0; i < payload.length; i++) {
          arterialPressureSys_Date[i]=timestampToMyString(payload[i].temps);
          arterialPressureSys_Value[i]=payload[i].valeur;
        }

        // -- Area Chart ArterialPressureSys
          var ctx = document.getElementById("pressSysChart");
          var divLastPressSys = document.getElementById("lastPressSys");  
          divLastPressSys.textContent = arterialPressureSys_Value[payload.length-1].toString();  
          document.getElementById("minPressSys").innerHTML = Math.min.apply(null, arterialPressureSys_Value);
          document.getElementById("maxPressSys").innerHTML = Math.max.apply(null, arterialPressureSys_Value);
          var total =  0;
            for(var i=0;i<payload.length;i++)
              {                  
                  total += arterialPressureSys_Value[i];
              }
          document.getElementById("moyPressSys").innerHTML = Math.round(total/payload.length*100)/100;
          var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels:  arterialPressureSys_Date,
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
                data: arterialPressureSys_Value,
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
      }

      function initializeArterialPressureDia(payload)
      {

        arterialPressureDia_Date=[payload.length];
        arterialPressureDia_Value=[payload.length];

        for (i = 0; i < payload.length; i++) {
          arterialPressureDia_Date[i]=timestampToMyString(payload[i].temps);
          arterialPressureDia_Value[i]=payload[i].valeur;
        }

        // -- Area Chart ArterialPressureDia
          var ctx = document.getElementById("pressDiaChart");
          var divLastPressDia = document.getElementById("lastPressDia");  
          divLastPressDia.textContent = arterialPressureDia_Value[payload.length-1].toString();  
          document.getElementById("minPressDia").innerHTML = Math.min.apply(null, arterialPressureDia_Value);
          document.getElementById("maxPressDia").innerHTML = Math.max.apply(null, arterialPressureDia_Value);
          var total =  0;
            for(var i=0;i<payload.length;i++)
              {                  
                  total += arterialPressureDia_Value[i];
              }
          document.getElementById("moyPressDia").innerHTML = Math.round(total/payload.length*100)/100;
          var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels:  arterialPressureDia_Date,
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
                data: arterialPressureDia_Value,
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
      }

      function initializeTemperature(payload)
      {
        tempDate=[payload.length];
        tempValue=[payload.length];

        for (i = 0; i < payload.length; i++) {
          tempDate[i]=timestampToMyString(payload[i].temps);
          tempValue[i]=payload[i].valeur;
        }

            // -- Area Chart Temperature
          var ctx = document.getElementById("temperatureChart");
          var divLastTemp = document.getElementById("lastTemp");  
          divLastTemp.textContent = tempValue[payload.length-1].toString().concat(symbolTemp);  
          document.getElementById("minTemp").innerHTML = Math.min.apply(null, tempValue);
          document.getElementById("maxTemp").innerHTML = Math.max.apply(null, tempValue);
          var total =  0;
            for(var i=0;i<payload.length;i++)
              {                  
                  total += tempValue[i];
              }
          document.getElementById("moyTemp").innerHTML = Math.round(total/payload.length*100)/100;

          var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: tempDate,
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
                data: tempValue,
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
      }

      function initializeOxygenLevel(payload)
      {
        oxygenDate=[payload.length];
        oxygenValue=[payload.length];

        for (i = 0; i < payload.length; i++) {
          oxygenDate[i]=timestampToMyString(payload[i].temps);
          oxygenValue[i]=payload[i].valeur;
        }

        // -- Area Chart Oxygen
          var ctx = document.getElementById("oxygeneChart");
          var divLastOxygene = document.getElementById("lastOxygen");  
          divLastOxygene.textContent = oxygenValue[payload.length-1].toString().concat(symbolOxygene);  
          document.getElementById("minOxygen").innerHTML = Math.min.apply(null, oxygenValue);
          document.getElementById("maxOxygen").innerHTML = Math.max.apply(null, oxygenValue);
          var total =  0;
            for(var i=0;i<payload.length;i++)
              {                  
                  total += oxygenValue[i];
              }
          document.getElementById("moyOxygen").innerHTML = Math.round(total/payload.length*100)/100;  
          var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: oxygenDate,
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
                data: oxygenValue,
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

      }
      function initializeHeartbeat(payload)
      {
        heartbeatDate=[payload.length];
        heartbeatValue=[payload.length];

        for (i = 0; i < payload.length; i++) {
          heartbeatDate[i]=timestampToMyString(payload[i].temps);
          heartbeatValue[i]=payload[i].valeur;
        }

            // -- Area Chart Heartbeat
          var ctx = document.getElementById("heartbeatChart");
          var divLastHeartbeat = document.getElementById("lastHeartbeat");  
          divLastHeartbeat.textContent = heartbeatValue[payload.length-1].toString().concat(symbolHeartbeat);    
          document.getElementById("minHeartbeat").innerHTML = Math.min.apply(null, heartbeatValue);
          document.getElementById("maxHeartbeat").innerHTML = Math.max.apply(null, heartbeatValue);
          var total =  0;
            for(var i=0;i<payload.length;i++)
              {                  
                  total += heartbeatValue[i];
              }
          document.getElementById("moyHeartbeat").innerHTML = Math.round(total/payload.length*100)/100; 
          var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: heartbeatDate,
              datasets: [{
                label: "Sessions",
                lineTension: 0.3,
                backgroundColor: "rgba(245,25,25,0.2)",
                borderColor: "rgba(245,25,25,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(245,25,25,1)",
                pointBorderColor: "rgba(245,25,25,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(245,25,25,1)",
                pointHitRadius: 20,
                pointBorderWidth: 2,
                data: heartbeatValue,
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
                    max: 240,
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
      }

      function initializeRespiratoryRate(payload)
      {
        respiratoryRateDate=[payload.length];
        respiratoryRateValue=[payload.length];

        for (i = 0; i < payload.length; i++) {
          respiratoryRateDate[i]=timestampToMyString(payload[i].temps);
          respiratoryRateValue[i]=payload[i].valeur;
        }

            // -- Area Chart Respiratory Rate
          var ctx = document.getElementById("respiratoryRateChart");
          var divLastRespiratoryRate = document.getElementById("lastRespiratoryRate");  
          divLastRespiratoryRate.textContent = respiratoryRateValue[payload.length-1].toString().concat(symbolRespiratoryRate);     
          document.getElementById("minRespiratoryRate").innerHTML = Math.min.apply(null, respiratoryRateValue);
          document.getElementById("maxRespiratoryRate").innerHTML = Math.max.apply(null, respiratoryRateValue);
          var total =  0;
            for(var i=0;i<payload.length;i++)
              {                  
                  total += respiratoryRateValue[i];
              }
          document.getElementById("moyRespiratoryRate").innerHTML = Math.round(total/payload.length*100)/100; 
          var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: respiratoryRateDate,
              datasets: [{
                label: "Sessions",
                lineTension: 0.3,
                backgroundColor: "rgba(140,30,200,0.2)",
                borderColor: "rgba(140,30,200,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(140,30,200,1)",
                pointBorderColor: "rgba(140,30,200,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(140,30,200,1)",
                pointHitRadius: 20,
                pointBorderWidth: 2,
                data: respiratoryRateValue,
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
      }

    function getDate(){
      var date = document.getElementById('datepicker').value;
      console.log(date);
      date=date.split("/");
      var newDate=date[1]+"/"+date[0]+"/"+date[2];
      console.log(newDate);
      var date = new Date(newDate)
      var now = Date.now();

      // Constructing JSON object
       var donneesFetchJSON = {"type": "donneesFetch", "payload": {"id" :getId(), "from":date.getTime(), "to":now}};
       donneesFetch = JSON.stringify(donneesFetchJSON);
       ws.send(donneesFetch);
       console.log("Envoi historique : "+donneesFetch);
       console.log("test:"+date.getTime());
       document.getElementById("from_date").innerHTML = formatDate(new Date(date.getTime()));
    }


  function getId(){
        //We get patient's id
            var url_string =  window.location.href;
            var url = new URL(url_string);
            var id = url.searchParams.get("id");
            id=id/147854-57;
            return id;
      }

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

// Constants
var symbolTemp = "°C";
var symbolOxygene = "%";
var symbolHeartbeat = " bpm";
var symbolRespiratoryRate = " cpm";
