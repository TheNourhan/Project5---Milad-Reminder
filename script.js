/* Name: Nourhan hasan
 * Email: Nourhan.M.Hasan@gmail.com
 * Github page: TheNourhan
 */
let sending_info= 
[
    "late", "not-late", "late", "late", "late",
    "not-late","not-late","not-late","not-late", "not-late",
    "late","late", "late","late", "not-late", 
    "not-late", "not-late","late", "late","not-late"];
const workdays=
[
    "offday", "workday", "workday", "workday", "workday",
    "offday", "offday", "offday", "workday","workday",
    "workday", "workday", "workday", "offday", "offday",
    "workday", "workday", "workday", "workday", "offday"];
 let random_messages=
 [
    "I will be late today, Sorry", 
    "I have to take my kids to school, I will be late", 
    "I have a doctor appointment this morning, I will be late", 
    "My car broke down, I will be late!"];
let critical_days=
[
    "critical1", "non-critical", "non-critical", "critical3", "non-critical",
    "non-critical", "critical4", "critical3", "critical2", "non-critical",
    "non-critical", "non-critical", "non-critical", "non-critical", "critical1",
    "critical1", "non-critical", "non-critical", "critical2", "critical4"];

const milad_salary = 1000;
let new_milad_salary = [];

// creat a new list
let list=document.querySelector("#days");
for(let j=0;j<workdays.length;j++){
    list.innerHTML+="<li></li>";
}

// An object calculates demurrages
let demurrages = {
    critical1: {
        C1: 100,
    },
    critical2: {
        C2: 200,
    },
    critical3: {
        C3: 180,
    },
    critical4: {
        C4: 500,
    },
}

/* The function adds random messages if Milad is late by a working day,
   and deducts from him by calling the demurrages object and storing its value in an array
   if he is late on critical working day */
function main(){
    // call the element with the id days and then call all its elements
    let messages= document.querySelectorAll("#days li");

    for(let i =0;i< workdays.length; i++){ 
        // the program will only send a message on the days that Milad is late 
        if(sending_info[i]=="late" && workdays[i]=="workday"){
            // add Class to the list
            messages[i].classList.add('message-sent-workday');
            // insert of random messages
            messages[i].innerText = `DAY ${i+1}: ${random_messages[Math.floor(Math.random()*random_messages.length)]}`;

            // the program will be deducted from Milad`s salary only on critical days
            if(critical_days[i]=='critical1'){
                // Call the object that is deducted from Milad`s salary and store it in a array
                new_milad_salary[i] = demurrages.critical1.C1;
                // Change background color of list
                document.querySelectorAll("#days li")[i].style.background="blue";
            }
            else if(critical_days[i]=='critical2'){
                // Call the object that is deducted from Milad`s salary and store it in a array
                new_milad_salary[i] = demurrages.critical2.C2;
                // Change background color of list
                document.querySelectorAll("#days li")[i].style.background="yellow";
            }
            else if(critical_days[i]=='critical3'){
                // Call the object that is deducted from Milad`s salary and store it in a array
                new_milad_salary[i] = demurrages.critical3.C3;
                // Change background color of list
                document.querySelectorAll("#days li")[i].style.background="red";
            }
            else if(critical_days[i]=='critical4'){
                // Call the object that is deducted from Milad`s salary and store it in a array
                new_milad_salary[i] = demurrages.critical4.C4;
                // Change background color of list
                document.querySelectorAll("#days li")[i].style.background="green";
            }
            else{
                new_milad_salary[i]=0;
            }
        }
        else{
            // add Class to the list
            messages[i].classList.add('message-not-sent-offday');
            messages[i].innerText = `DAY ${i+1}:`;
            new_milad_salary[i]= 0;
        }
    }
    // To activate the report button
    btn_report.disabled = false;
}
// create a boutton click event by calling function (main)
document.querySelector("#click-here").addEventListener("click",main);

/* Show repotr data in a table */
function report_data(){
    // Add all the elements of the array
    let deducted_amount_data = new_milad_salary.reduce((acc, current) => acc + current); // 380
    // Milad`s salary after the deducted
    let new_milad_salary_data = milad_salary - deducted_amount_data; // 620 
    // The number of days that Milad was late
    let num_days_milad_late_data =  workdays.length - document.getElementsByClassName('message-not-sent-offday').length; // 8
    
    // Insert report data into table elements
    document.querySelector('#report_info').innerHTML = `<tr><th>salary milad befor: </th><th>${milad_salary}</th></tr>
    <tr><th>salary milad after: </th><th>${new_milad_salary_data}</th></tr>
    <tr><th>number of days milad is late: </th><th>${num_days_milad_late_data}</th></tr>
    <tr><th>discount value: </th><th>${deducted_amount_data}</th></tr>`;

    // To show report information
    document.querySelector('#report_info').style.display = "block";
}
// create a boutton click event by calling function (report)
let btn_report = document.querySelector("#get-report");
btn_report.addEventListener("click",report_data);

/* The function initializes the reset button */
let rst = document.querySelectorAll("#days li");
function reset(){
    for(let i=0;i<workdays.length;i++){
        rst[i].innerText = ' ';
        rst[i].style.background= "none";
        rst[i].classList.remove('message-sent-workday');
        rst[i].classList.remove('message-not-sent-offday');
    }
    // To hide report information
    document.querySelector('#report_info').style.display = "none";
    // To disabled the report button
    btn_report.disabled = true;
}
// create a boutton click event by calling function (reset)
document.querySelector("#reset").addEventListener("click",reset);
