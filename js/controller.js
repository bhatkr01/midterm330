/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';
const competitions_code=["PL","CL"]
function populateSelect(selectId, competition_list) {
    let sel = document.getElementById(selectId);
    for (let item of competition_list){
        let anOption=document.createElement("option");
        anOption.setAttribute("value", item);
        anOption.innerHTML=item;
        sel.appendChild(anOption);
    }
}
// var full_data={}

async function get_football_data(selected_id) {

    let competition_name=document.querySelector("#competition").value;
    var full_data= await fetch(`https://api.football-data.org/v2/competitions/${competition_name}/matches`,{
        headers : { 'X-Auth-Token': '2e028e92d6ed4a75b8e3ceee3a045715' }
    })
    .then(response => response.json());


    var match_details= await fetch(`https://apiv2.apifootball.com/?action=get_events&from=2020-08-01&to=${new Date().toJSON().slice(0,10)}&league_id=148&APIkey=fab4e5052b71bd0d93e476b678086fc46d690efb1d50b1486a66dbfa91ab3e3d`)
    .then(response => response.json());

    var team_id= await fetch("https://elenasport-io1.p.rapidapi.com/v2/seasons/3260/teams?page=1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "1521a9ed46msh1dbaeb2927d89fap129614jsn4a1066daf85c",
            "x-rapidapi-host": "elenasport-io1.p.rapidapi.com"
        }
    }).then(response => response.json());
    console.log(team_id)
    
    // for (let index2=0; index2<team_id.length;index2++){
    //             if (full_data.matches[index1].awayTeam.name.includes(match_details[index2].match_awayteam_name) && full_data.matches[index1].homeTeam.name.includes(match_details[index2].match_hometeam_name) ){
    //                 console.log(match_details[index2].statistics);
    //                 console.log(match_details[index2].match_hometeam_name);
    //                 console.log(match_details[index2].match_awayteam_name);
    //             }
    //         }
            
    


    // let video_data= await fetch(`https://www.scorebat.com/video-api/v1`)
    // .then(response => response.json());
    // let new_video_data=[];
    // for (let index=0; index<video_data.length;index++){
    //     if (video_data[index].competition.name==="ENGLAND: Premier League"){
    //         new_video_data.push(video_data[index]);
    //     }
        
    // }
    // console.log(new_video_data);

     selected_id.innerHTML="";

    if (document.querySelector("#competition").value==="CL"){
        let main_stage_box=document.createElement("div");
        let group_stage=document.createElement("div");
        let round_of_16=document.createElement("div");
        let quarter_finals=document.createElement("div");
        let semi_finals=document.createElement("div");
        let final=document.createElement("div");
        main_stage_box.classList.add("main_stage_box");
        group_stage.classList.add("group_stage");
        round_of_16.classList.add("round_of_16");
        quarter_finals.classList.add("quarter_finals");
        semi_finals.classList.add("semi_finals");
        final.classList.add("final");
        group_stage.innerHTML="Group Stage";
        round_of_16.innerHTML="Round Of 16";
        quarter_finals.innerHTML="Quarter Finals";
        semi_finals.innerHTML="Semi Finals";
        final.innerHTML="Finals";
        main_stage_box.appendChild(group_stage);
        main_stage_box.appendChild(round_of_16);
        main_stage_box.appendChild(quarter_finals);
        main_stage_box.appendChild(semi_finals);
        main_stage_box.appendChild(final);
        selected_id.appendChild(main_stage_box);


        for (let index=0; index<full_data.matches.length;index++){
                if (full_data.matches[index].stage==="GROUP_STAGE"){
                    display_matches(full_data.matches[index], document.querySelector(".group_stage"));
                }
                else if (full_data.matches[index].stage==="ROUND_OF_16"){
                    display_matches(full_data.matches[index],document.querySelector(".round_of_16"));
                    }
                else if (full_data.matches[index].stage==="QUARTER_FINALS"){
                        display_matches(full_data.matches[index],document.querySelector(".quarter_finals"));
                        }
                else if (full_data.matches[index].stage==="SEMI_FINALS"){
                        display_matches(full_data.matches[index],document.querySelector(".semi_finals"));
                    }
                else if (full_data.matches[index].stage==="FINAL"){
                    display_matches(full_data.matches[index],document.querySelector(".final"));
                }
            }

    
    }
    else if (document.querySelector("#competition").value==="PL"){
        for (let index=0; index<full_data.matches.length;index++){
            display_matches(full_data.matches[index],selected_id,match_details);
            // display_matches(full_data.matches[index],selected_id);

        }
    }
}

// async function display_matches(data_set, passed_class){
async function display_matches(...options){
    let row=document.createElement("div");
    let away_div=document.createElement("div");
    let versus_div=document.createElement("div");
    let home_div=document.createElement("div");
    let time_div=document.createElement("div");
    let score_div=document.createElement("div");
    let highlight_div=document.createElement("div");
    let match_details_div=document.createElement("div");
    row.classList.add("main_box");
    away_div.classList.add("away_team");
    versus_div.classList.add("versus");
    home_div.classList.add("home_team");
    time_div.classList.add("time");
    score_div.classList.add("score");
    highlight_div.classList.add("highlight");
    match_details_div.classList.add("match_details");
    time_div.innerHTML=options[0].utcDate;
    away_div.innerHTML=options[0].awayTeam.name;
    versus_div.innerHTML="VS";
    home_div.innerHTML=options[0].homeTeam.name;
    score_div.innerHTML=options[0].score.fullTime.awayTeam+"-"+options[0].score.fullTime.homeTeam
    match_details_div.innerHTML="Match Details";
    match_details_div.addEventListener("click", () => display_match_details(options[0].homeTeam.name,options[0].awayTeam.name,options[2]));
    // match_details_div.innerHTML="<a href='match_details.html' target='_blank'>Match Details</a>";
    row.appendChild(time_div);
    row.appendChild(away_div);
    row.appendChild(versus_div);
    row.appendChild(home_div);
    row.appendChild(score_div);
    row.appendChild(match_details_div);
    options[1].appendChild(row);

}
async function display_match_details(hometeam,awayteam, matchdetails){
        for (let index2=0; index2<matchdetails.length;index2++){
            if (awayteam.includes(matchdetails[index2].match_awayteam_name) && hometeam.includes(matchdetails[index2].match_hometeam_name) ){
                document.querySelector("#match_info").innerHTML="";
                let title=document.createElement("h2");
                title.classList.add("tile_of_match");
                let details=document.createElement("div");
                details.classList.add("details");
                title.innerHTML=matchdetails[index2].match_awayteam_name+"VS"+matchdetails[index2].match_hometeam_name;
                for (let i=0;i<matchdetails[index2].statistics.length; i++){
                    details.innerHTML+=matchdetails[index2].statistics[i].type+ ":" + matchdetails[index2].statistics[i].away+ " " + matchdetails[index2].statistics[i].home + `\n`;
                }
                document.querySelector("#match_info").appendChild(title);
                document.querySelector("#match_info").appendChild(details);
                
                console.log(matchdetails[index2].statistics);
                // console.log(match_details[index2].match_hometeam_name);
                // console.log(match_details[index2].match_awayteam_name);
                
              
            }
        }

}

        
//         // 
//         // row.classList.add("main_box");
//         // div1.classList.add("number_itself");
//         // div2.classList.add("smth_about_number");
//         // div1.innerHTML=number.number;
//         // div2.innerHTML=number.text;
//         // row.appendChild(div1);
//         // row.appendChild(div2);
//         // all_numbers.appendChild(row);
            
//         }

    
    
    



async function clickedon() {
    get_football_data(document.querySelector("#match_info"));
    // if (document.querySelector('#batch').checked) {
    //     get_batch(num, all_numbers);
    // } else {
    //     get_individual(num, all_numbers);
    // }
}

window.onload = function() {
    
    populateSelect("competition", competitions_code);
    
};




