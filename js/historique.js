function historiqueTemperature(){

	var divLastTemp = document.getElementById("history_title");  
	divLastTemp.textContent = "Historique de la température";  

}

function getDate(){
	var date = document.getElementById('datepicker').value;
	console.log(date);
	date=date.split("/");
	var newDate=date[1]+"/"+date[0]+"/"+date[2];
	console.log(newDate);
	var date = new Date(newDate)
	var now = Date.now();
	return {from:truc.getTime(), to:now};
}