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

/* The function adds random messages if Milad is late by a working day,
 then calls the discount function if Milad is late by a critical day */
function main(){
    // call the element with the id days and then call all its elements
    let messages= document.querySelectorAll("#days li");

    for(var i =0;i< workdays.length; i++){ 
        // the program will only send a message on the days that Milad is late 
        if(sending_info[i]=="late" && workdays[i]=="workday"){
            // add Class to the list
            messages[i].classList.add('message-sent-workday');
            // insert of random messages
            messages[i].innerText = `DAY ${i+1}: ${random_messages[Math.floor(Math.random()*4)]}`;
            // call function deducts
            deducts(i,new_milad_salary);
        }
        else{
            // add Class to the list
            messages[i].classList.add('message-not-sent-offday');
            messages[i].innerText = `DAY ${i+1}:`;
            new_milad_salary[i]= 0;
        }
    }
}
// create a boutton click event by calling function (main)
document.querySelector("#click-here").addEventListener("click",main);

// An object calculates demurrages
let demurrages = {
    critical1: function(x){
        return x - 100;
    },
    critical2: function(x){
        return x - 200;
    },
    critical3: function(x){
        return x - 180;
    },
    critical4: function(x){
        return x - 500;
    },
}

/* A function that deducts Milad`s salary if he is late for work on critical days.
 * and the function works as an iterative loop when it is called. */
function deducts(k,salary){
        if(sending_info[k]=="late" && workdays[k]=="workday" && critical_days[k]=='critical1'){
            // Call the object that is deducted from Milad`s salary and store it in a array
            salary[k] = demurrages.critical1(milad_salary);
            // Change background color of list
            document.querySelectorAll("#days li")[k].style.background="blue";
        }
        else if(sending_info[k]=="late" && workdays[k]=="workday" && critical_days[k]=='critical2'){
            // Call the object that is deducted from Milad`s salary and store it in a array
            salary[k] = demurrages.critical2(milad_salary);
            // Change background color of list
            document.querySelectorAll("#days li")[k].style.background="yellow";
        }
        else if(sending_info[k]=="late" && workdays[k]=="workday" && critical_days[k]=='critical3'){
            // Call the object that is deducted from Milad`s salary and store it in a array
            salary[k] = demurrages.critical3(milad_salary);
            // Change background color of list
            document.querySelectorAll("#days li")[k].style.background="red";
        }
        else if(sending_info[k]=="late" && workdays[k]=="workday" && critical_days[k]=='critical4'){
            // Call the object that is deducted from Milad`s salary and store it in a array
            salary[k] = demurrages.critical4(milad_salary);
            // Change background color of list
            document.querySelectorAll("#days li")[k].style.background="green";
        }
        else{
            salary[k]=0;
        }
}

/* Collect report information into an object */
function report_data(){
    // The object that stores report information
    let data_report = {
         new_milad_salary_data: function(){
            // Add all the elements of the array, then subtract the number from 1000
            return new_milad_salary.reduce((acc, current) => acc + current,-1000); // 620 
        },
        deducted_amount_data: function(){
            // retutn the value of the total discount
            return milad_salary - data_report.new_milad_salary_data(); // 380 
        },
        num_days_milad_late_data: function(){
            // The number of days that Milad was late
            for(let i=0 ; i<workdays.length ;i++){
                let clas= document.getElementsByClassName('message-not-sent-offday').length;
                return  workdays.length - clas; // 8
            }
        },
    }
    // The message that will appear in the report
    return `salary milad befor: ${milad_salary} ****************************** salary milad after: ${data_report.new_milad_salary_data()} *****************************
        number of days milad is late: ${data_report.num_days_milad_late_data()} 
        *********************** discount value: ${data_report.deducted_amount_data()} *******************************`; 
}

/* Show a popup */
function report(){
    /*
     * <in a popup>:
     * salary milad befor = 1000
     * salary milad after = ****
     * number of days milad is late = ****
     * discount value = ****
     */

    // A library that creats a popup
    Swal.fire({
        title: 'Report',
        // Calling the function that returns the report information
        text: report_data(), 
        showCloseButton: true,
        focusConfirm: false,
        confirmButtonText: 'Thanks'
    });
}
// create a boutton click event by calling function (report)
document.querySelector("#get-report").addEventListener("click",report);

/* The function initializes the reset button */
let rst = document.querySelectorAll("#days li");
function reset(){
    for(let i=0;i<20;i++){
        rst[i].innerText = ' ';
        rst[i].style.background= "none";
        rst[i].classList.remove('message-sent-workday');
        rst[i].classList.remove('message-not-sent-offday');
    }
}
// create a boutton click event by calling function (reset)
document.querySelector("#reset").addEventListener("click",reset);