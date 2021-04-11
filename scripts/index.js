function CallApi()
{
    var country=document.getElementById("country").value;
    var start=document.getElementById("start_date").value;
    var end=document.getElementById("end_date").value;

    if(country==""||start==""||end=="")
    {
        alert("Please Enter Vaild credentials");
    }
    var xhttp = new XMLHttpRequest();
    var url = "https://api.covid19api.com/country/" + country + "?from=" + start + "T00:00:00Z&to=" + end + "T00:00:00Z";

    //document.getElementById("display").innerHTML = url;
    xhttp.open("GET", url, true);
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var list = JSON.parse(this.responseText);
            var confirmed = 0;
            var death = 0;
            var active = 0;
            for (var i = 0; i < list.length; i++) {
                confirmed = confirmed + list[i].Confirmed;
                active = active + list[i].Active;
                death = death + list[i].Deaths;
            }
            create(confirmed, active, death);

        }
    };
    xhttp.send();
}


function create(confirmed, active, death) {
    var displayList = document.getElementById("display");
    var div1 = document.createElement("div");
    
    //Confirmed case Line
    var concase = document.createElement("p");
    var conftext = document.createTextNode("Confirmed Cases : ");
    concase.appendChild(conftext);

    var span = document.createElement("span");
    var spantext = document.createTextNode(confirmed);

    span.appendChild(spantext);
    concase.appendChild(span);

   
    //Active Case Line
    var activeCase = document.createElement("p");
    var activetext = document.createTextNode("Active Cases : ");
    activeCase.appendChild(activetext);

    var Aspan = document.createElement("span");
    var Aspantext = document.createTextNode(active);

    Aspan.appendChild(Aspantext);
    activeCase.appendChild(Aspan);
   


    //Death case Line
    var deathCase = document.createElement("p");
    var deathtext = document.createTextNode("Death Cases : ");
    deathCase.appendChild(deathtext);

    var deathspan = document.createElement("span");
    var deathspantext = document.createTextNode(death);

    deathspan.appendChild(deathspantext);
    deathCase.appendChild(deathspan);
   

    //Div with all the cases
    div1.appendChild(concase);
    div1.appendChild(activeCase);
    div1.appendChild(deathCase);


    div1.setAttribute("class", "db");
    displayList.appendChild(div1);
}