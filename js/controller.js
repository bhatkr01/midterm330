/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';


async function get_football_data(selected_id) {
    var full_data= await fetch(`https://api.football-data.org/v2/competitions/PL/matches`,{
        headers : { 'X-Auth-Token': '2e028e92d6ed4a75b8e3ceee3a045715' }
    })
    .then(response => response.json());
    selected_id.innerHTML="";
    for (let index=0; index<full_data.matches.length;index++){
        localStorage.setItem("local_storage", JSON.stringify(full_data));
        display_matches(full_data.matches[index],selected_id);
    }
}

// async function display_matches(data_set, passed_class){
async function display_matches(...options){
    let row=document.createElement("div");
    let away_div=document.createElement("button");
    let home_div=document.createElement("button");
    let time_div=document.createElement("div");
    let score_div=document.createElement("div");
    let match_details_div=document.createElement("button");
    let hr_item=document.createElement("hr");
    hr_item.classList.add("hr_line");
    row.classList.add("main_box");
    away_div.classList.add("away_team");
    away_div.addEventListener("click", () => display_team_info(options[0].awayTeam.name));
    home_div.classList.add("home_team");
    home_div.addEventListener("click", () => display_team_info(options[0].homeTeam.name));
    time_div.classList.add("time");
    score_div.classList.add("score");
    match_details_div.classList.add("match_details");
    time_div.innerHTML=options[0].utcDate;
    away_div.innerHTML=options[0].awayTeam.name;
    home_div.innerHTML=options[0].homeTeam.name;
    if (options[0].score.fullTime.awayTeam!=null || options[0].score.fullTime.homeTeam!=null){
        score_div.innerHTML=options[0].score.fullTime.awayTeam+"-"+options[0].score.fullTime.homeTeam;
       
    }
    else{
        score_div.innerHTML="To Be played";  
    }
    if (options[0].homeTeam.name!=null || options[0].awayTeam.name!=null ){
        match_details_div.innerHTML="Match Details";
        match_details_div.addEventListener("click", () => display_match_details(options[0].homeTeam.name,options[0].awayTeam.name));
    }
    else{
        match_details_div.innerHTML="To Be Played";
    }
    row.appendChild(time_div);
    row.appendChild(away_div);
    row.appendChild(score_div);
    row.appendChild(home_div);
    row.appendChild(match_details_div);
    options[1].appendChild(row);
    options[1].appendChild(hr_item);
    options[1].style.border="5px solid purple";

}
async function display_team_info(team_name){
    var team_id= await fetch("https://elenasport-io1.p.rapidapi.com/v2/seasons/3260/teams?page=1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "2f8207c178msh3715e1040d443d3p194863jsnf8ae466e7fed",
            "x-rapidapi-host": "elenasport-io1.p.rapidapi.com",
        }
    }).then(response => response.json());
    for (let i=0; i<team_id.data.length;i++){
        if (team_id.data[i].fullName==team_name){
            var team_info= await fetch(`https://elenasport-io1.p.rapidapi.com/v2/teams/${team_id.data[i].id}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "2f8207c178msh3715e1040d443d3p194863jsnf8ae466e7fed",
                "x-rapidapi-host": "elenasport-io1.p.rapidapi.com",

            }
            }).then(response =>response.json());
            }
    }
    document.querySelector("#match_info").innerHTML="";
    let details_div=document.createElement("div");
    details_div.innerHTML=`<img src=${team_info.data[0].badgeURL}>`
    for (let info in team_info.data[0]){
        if (info!="badgeURL" && info!="id"){    
           details_div.innerHTML+=info+":"+ " "+ team_info.data[0][info]+ "\n";
           details_div.style.whitespace = "pre-line";
        }
        
    }
    details_div.classList.add("details");
    document.querySelector("#match_info").appendChild(details_div);
    


}

async function display_match_details(hometeam,awayteam){
    var matchdetails= await fetch(`https://apiv2.apifootball.com/?action=get_events&from=2020-08-01&to=${new Date().toJSON().slice(0,10)}&league_id=148&APIkey=fab4e5052b71bd0d93e476b678086fc46d690efb1d50b1486a66dbfa91ab3e3d`)
    .then(response => response.json());
    console.log(matchdetails)
    for (let index2=0; index2<matchdetails.length;index2++){
        let details_div=document.createElement("div");
        details_div.classList.add("details");
        if (awayteam.includes(matchdetails[index2].match_awayteam_name) && hometeam.includes(matchdetails[index2].match_hometeam_name) ){
            document.querySelector("#match_info").innerHTML="";
            let title=document.createElement("h1");
            title.classList.add("tile_of_match");
            let match_stats=document.createElement("div");
            match_stats.classList.add("match_stats");
            title.innerHTML=matchdetails[index2].match_awayteam_name+" "+"VS"+" "+matchdetails[index2].match_hometeam_name;
            for (let i=0;i<matchdetails[index2].statistics.length; i++){
                let row=document.createElement("div");
                row.classList.add("main_box");
                let away_div=document.createElement("div");
                away_div.classList.add("away_stats");
                let home_div=document.createElement("div");
                home_div.classList.add("home_stats");
                let category_div=document.createElement("div");
                category_div.classList.add("home_stats");
                away_div.innerHTML= matchdetails[index2].statistics[i].away;
                category_div.innerHTML=matchdetails[index2].statistics[i].type;
                home_div.innerHTML=matchdetails[index2].statistics[i].home;
                row.appendChild(away_div);
                row.appendChild(category_div);
                row.appendChild(home_div);
                match_stats.appendChild(row) 
            }
            details_div.appendChild(title);
            details_div.appendChild(match_stats);
            document.querySelector("#match_info").appendChild(details_div);
           
        }
    }

}


async function clickedon() {
    get_football_data(document.querySelector("#match_info"));
}


async function clear_all(){
    $("#match_info").empty(); 
    document.querySelector("#match_info").style.border="none";
    localStorage.removeItem("local_storage");
 
 }
window.onload = function() {
    let match_list=localStorage.getItem("local_storage");
    if (match_list){
        match_list=JSON.parse(match_list);
        for (let index=0; index<match_list.matches.length;index++){
            display_matches(match_list.matches[index],document.querySelector("#match_info"));
        }
    }
    
};




