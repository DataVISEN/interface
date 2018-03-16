function historiqueTemperature(){

	var divLastTemp = document.getElementById("history_title");  
	divLastTemp.textContent = "Historique de la température";  

}

function getDate(){
	var date = document.getElementById('datepicker').value;
	console.log(date);
	date=date.split("/");
	var newDate=date[1]+","+date[0]+","+date[2];
	console.log(date[1]+","+date[0]+","+date[2]);
	alert(new Date(newDate).getTime());​ //will alert 1330192800000
}