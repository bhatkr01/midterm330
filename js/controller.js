/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';
const competitions_code=["CL","PL","PD"]
function populateSelect(selectId, competition_list) {
    let sel = document.getElementById(selectId);
    for (let item of competition_list){
        let anOption=document.createElement("option");
        anOption.setAttribute("value", item);
        anOption.innerHTML=item;
        sel.appendChild(anOption);
    }
}
var full_data={}

async function get_football_data(selected_id) {
    let competition_name=document.querySelector("#competition").value;
    full_data= await fetch(`https://api.football-data.org/v2/competitions/${competition_name}/matches`,{
        headers : { 'X-Auth-Token': '2e028e92d6ed4a75b8e3ceee3a045715' }
    })
    .then(response => response.json());
    // for (let index=0; index<full_data.matches.length;index++){
    //         console.log(full_data.matches[index].score.fullTime)
    //     }
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
}

async function display_matches(data_set, passed_class){
    let row=document.createElement("div");
    let away_div=document.createElement("div");
    let versus_div=document.createElement("div");
    let home_div=document.createElement("div");
    let time_div=document.createElement("div");
    let score_div=document.createElement("div");
    row.classList.add("main_box");
    away_div.classList.add("away_team");
    versus_div.classList.add("versus");
    home_div.classList.add("home_team");
    time_div.classList.add("time");
    score_div.classList.add("score");
    time_div.innerHTML=data_set.utcDate;
    away_div.innerHTML=data_set.awayTeam.name;
    versus_div.innerHTML="VS"
    home_div.innerHTML=data_set.homeTeam.name;
    score_div.innerHTML=data_set.score.fullTime.awayTeam+"-"+data_set.score.fullTime.homeTeam;
    row.appendChild(time_div);
    row.appendChild(away_div);
    row.appendChild(versus_div);
    row.appendChild(home_div);
    row.appendChild(score_div);
    passed_class.appendChild(row);

}

//     for (let index=0; index<data.matches.length;index++){
//         console.log(data.matches[index]);
//         let row=document.createElement("div");
//         let away_div=document.createElement("div");
//         let versus_div=document.createElement("div");
//         let home_div=document.createElement("div");
//         let time_stage=document.createElement("div");
//         row.classList.add("main_box");
//         away_div.classList.add("away_team");
//         versus_div.classList.add("versus");
//         home_div.classList.add("home_team");
//         time_stage.classList.add("time_stage");
//         time_stage.innerHTML=data.matches[index].stage + data.matches[index].utcDate;
//         away_div.innerHTML=data.matches[index].awayTeam.name;
//         versus_div.innerHTML="VS"
//         home_div.innerHTML=data.matches[index].homeTeam.name;
//         row.appendChild(time_stage);
//         row.appendChild(away_div);
//         row.appendChild(versus_div);
//         row.appendChild(home_div);
//         selected_id.appendChild(row);
//     }
        
        
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




