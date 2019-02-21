/*jslint browser:true */

/* ***************************
From the homeowner: 
1. How much electricity the home uses per day, on average (kWh)
2. Average sunlight per day
3. Solar panel choice (different amounts of energy generation)
*/

/* ****************************
Program flow:
1. First, gather power use for twelve months and add them all together; divide by 365 for daily average
2. Learn region of home for hours of sun per day average
3. Home's daily need / sunshine hours = how much generated per hour?
4. Account for bad weather: increase need by 25%
5. Multiply kWh * 100 to get wH (how panels are rated)
6. Find out which panel the homeowner wants
7. Divide to find out how many panels are needed to take care of 100% of the home's needs
*/

"use strict";

/* ****************************
Program flow:
1. First, gather power use for twelve months and add them all together; divide by 365 for daily average
*/ 

function addMonths (id) {
    var annualUseKw = 0;
    var dailyUseKW = 0;
    var i = 0;
    var monthUseKw = 0;

    var months = document.getElementById(id).getElementsByTagName("input");

    for (i=0; i<months.length; i++) {
        monthUseKw = Number(months[i].value);
        annualUseKw += monthUseKw;
    }; //end loop

    dailyUseKW = annualUseKw / 365;

    return dailyUseKW;
}; // end function

/* *******************************
2. Collect selected home region info
*/

function regionHours () {
    var selectedZone = document.forms.solarForm.zone.selectedIndex;
    selectedZone += 1; // make index number equal to number in the list

    var sunHours; // use a switch case to change zone number into hours of sunlight

    switch(selectedZone) {
        case 1: 
            sunHours = 6;
            break;
        case 2:
            sunHours = 5.5;
            break;
        case 3:
            sunHours = 5;
            break;
        case 4:
            sunHours = 4.5;
            break;
        case 5:
            sunHours = 4.2;
            break;
        case 6:
            sunHours = 3.5;
            break;
    default:
            sunHours = 0;
    }; // end switch
    return sunHours; //NEED TO REMEMBER THIS PART
};

/* ******************************************
6. Find out which panel the homeowner wants
*/

function calculatePanel() {
    var userChoice = document.forms.solarForm.panel.selectedIndex; //this will give us a 0, 1 or 2
    var panelOptions = document.forms.solarForm.panel.options;
    var power = panelOptions[userChoice].value;
    var name = panelOptions[userChoice].text;
    var x = [power, name];
    return x;
}
    

/* ****************************************
3. Home's daily need / sunshine hours = how much generated per hour?
4. Account for bad weather: increase need by 25%
5. Multiply kWh * 100 to get wH (how panels are rated)
7. Divide to find out how many panels are needed to take care of 100% of the home's needs
*/

function calculateSolar () {
    var dailyUseKw = addMonths("mpc");

    var sunHours = regionHours();

    var minEnergy = dailyUseKw / sunHours;

    var maxEnergy = (minEnergy * 1.25);

    var energyWatts = maxEnergy * 1000;

    var panelInfo = calculatePanel();
    var panelOutput = panelInfo[0];
    var panelName = panelInfo[1];

    var panelsNeeded = Math.ceil(energyWatts / panelOutput); 

    var feedback = "";
    feedback += "<p>Based on your average daily use of " + Math.round(dailyUseKw) + ", you will need " + 
        panelsNeeded + " " + panelName + " solar panels to cover 100% of your energy needs.<br></p>";
    feedback += "<h2>Additional Details</h2>";
    feedback += "<p>Your average daily electricity consumption: " + Math.round(dailyUseKw) + " kWh</p>";
    feedback += "<p>Average sunshine hours per day: " + sunHours + " hrs</p>";
    feedback += "<p>Realistic watts needed per hour: " + Math.round(energyWatts) + " W/h</p>";
    feedback += "<p>The " + panelName + " you chose generates about " + panelOutput + " per hour</p>";
    
    document.getElementById("feedback").innerHTML = feedback;
}; //end function

