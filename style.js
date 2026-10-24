const input=document.querySelector("#text-input");
const btn=document.querySelector("#add-btn");
let tasks = document.querySelector(".task-box");
const taskCount = document.querySelector(".task-count");
const completedCount = document.querySelector(".completed-count");
const filterButtons = document.querySelectorAll(".filter button");
const clear=document.querySelector("#clear");
const emptyMessage = document.querySelector(".empty-message");
const clearModal = document.querySelector("#clear-modal");
const history_date=document.querySelector("#history-date");
let completed = 0;
let currentFilter = "all";
let count=0;
let taskList = [];
const today = new Date().toISOString().split("T")[0];

taskList = JSON.parse(localStorage.getItem("tasks")) || [];
// console.log(taskList);
// console.log(today);
const todayTasks = taskList.filter((task) => {
    return task.date === today;
});

// console.log(todayTasks);

 const todayTaskss = taskList.filter((task) => task.date === today);

count = todayTaskss.length;

completed = todayTaskss.filter((task) => task.completed).length;

updateTaskCount();
// input.value
btn.addEventListener("click",()=>{

    if(input.value.trim()===""){

        alert("please enter a task");

        return;

    }

    const taskData = {

        text: input.value.trim(),

        completed: false,
        date: new Date().toISOString().split("T")[0],
        id:Date.now(),
        taskkey:input.value.trim().toLowerCase()

    };

    taskList.push(taskData);

    localStorage.setItem("tasks", JSON.stringify(taskList));

    createTask(taskData);
    showhistory();
    input.value="";
    count = taskList.length;
    
    completed = taskList.filter((task) => task.completed).length;
    updateTaskCount();
   
    updateEmptyMessage();

});
// add task form enter
input.addEventListener("keydown",(event)=>{
    if (event.key === "Enter") {
        btn.click();
    }
})
function applyfilter(){

    const allTasks = document.querySelectorAll(".task");
    allTasks.forEach((task) => {

    const checkBox = task.querySelector("input");

    task.style.display = "none";

    if (currentFilter === "all") {
        task.style.display = "flex";
    }

    if (currentFilter === "active" && !checkBox.checked) {
        task.style.display = "flex";
    }
    if (currentFilter === "completed" && checkBox.checked) {
    task.style.display = "flex";
}

});
}
filterButtons.forEach((button) => {

    button.addEventListener("click", () => {
currentFilter = button.dataset.filter;
updateActiveFilter();
applyfilter();
// const allTasks = document.querySelectorAll(".task");
// allTasks.forEach((task) => {

//     const checkBox = task.querySelector("input");

//     task.style.display = "none";

//     if (filter === "All") {
//         task.style.display = "flex";
//     }

//     if (filter === "active" && !checkBox.checked) {
//         task.style.display = "flex";
//     }
//     if (filter === "completed" && checkBox.checked) {
//     task.style.display = "flex";
// }

// });
    });

});


// fuctions
function updateTaskCount(){
     taskCount.textContent = `Total Tasks: ${count}`;
    completedCount.textContent = `Completed: ${completed}`;
}
taskList
    .filter((taskData) => taskData.date === today)
    .forEach((taskData) => {
        createTask(taskData);
    });
function createTask(taskData) {
    const task = document.createElement("div");
    const taskText = document.createElement("span");
    taskText.textContent = taskData.text;
     const checkBox = document.createElement("input");
     
 checkBox.type = "checkbox";
 checkBox.checked = taskData.completed;
 if (taskData.completed === true) {
    taskText.style.textDecoration = "line-through";
   
}
 checkBox.addEventListener("change", () => {
     
     taskData.completed = checkBox.checked;
     if (taskData.completed === true) {
        taskText.style.textDecoration = "line-through";
    }
     else {
            taskText.style.textDecoration = "none";
        }

    completed = taskList.filter((task) => task.completed).length;

updateTaskCount();

localStorage.setItem("tasks", JSON.stringify(taskList));

applyfilter();
showhistory();
});

    task.classList.add("task");

    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.addEventListener("click", () => {

    const newText = prompt("Edit your task:", taskData.text);

    if (newText !== null && newText.trim() !== "") {

        taskData.text = newText.trim();

        taskText.textContent = taskData.text;
        

        localStorage.setItem("tasks", JSON.stringify(taskList));
        showhistory();
    }

});

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.addEventListener("click", () => {

    taskList = taskList.filter((task) => task !== taskData);

    localStorage.setItem("tasks", JSON.stringify(taskList));
    showhistory();

    task.remove();
    count = taskList.length;
    
    completed = taskList.filter((task) => task.completed).length;
    updateEmptyMessage();

    applyfilter();

updateTaskCount();
});

task.appendChild(checkBox);
    task.appendChild(taskText);
    task.appendChild(editBtn);
    task.appendChild(deleteBtn);

    tasks.appendChild(task);
    applyfilter();

}
// clear
clear.addEventListener("click", () => {
    // if (!confirm("Are you sure you want to clear all tasks?")) {
    //     return;
    // }

    // taskList = [];
    // localStorage.removeItem("tasks");
    // tasks.querySelectorAll(".task").forEach((task) => task.remove());
    // count=0;
    // completed=0;
    // updateTaskCount();
    // updateEmptyMessage();
    clearModal.style.display = "flex";
    const cancelClear = document.querySelector("#cancel-clear");

cancelClear.addEventListener("click", () => {
    clearModal.style.display = "none";
});
clearModal.addEventListener("click", (event) => {
    if (event.target === clearModal) {
        clearModal.style.display = "none";
    }
});
const clearToday = document.querySelector("#clear-today");

clearToday.addEventListener("click", () => {
    taskList = taskList.filter((task) => task.date !== today);

    localStorage.setItem("tasks", JSON.stringify(taskList));

    tasks.querySelectorAll(".task").forEach((task) => task.remove());

    count = 0;
    completed = 0;

    updateTaskCount();
    updateEmptyMessage();
    showhistory();

    clearModal.style.display = "none";
});
});

function updateEmptyMessage() {

    if (taskList.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }

}
updateEmptyMessage();

function updateActiveFilter() {

    filterButtons.forEach((button) => {

        button.classList.remove("active");

        if (button.dataset.filter === currentFilter) {
            button.classList.add("active");
        }

    });

}
updateActiveFilter();





// menu


// menu

const menubtn = document.querySelectorAll(".option button");
const taskpage = document.querySelector("#task-page");
const habitspage = document.querySelector("#habits-page");
const historypage = document.querySelector(".history-page");

// Initially show only My Task page
taskpage.style.display = "block";
habitspage.style.display = "none";
historypage.style.display = "none";

menubtn.forEach((button) => {
    button.addEventListener("click", () => {

        // Remove active class from all buttons
        menubtn.forEach((btn) => {
            btn.classList.remove("active");
        });

        const switchfilter = button.dataset.page;

        // Hide all pages first
        taskpage.style.display = "none";
        habitspage.style.display = "none";
        historypage.style.display = "none";

        // Show the selected page
        if (switchfilter === "task") {
            taskpage.style.display = "block";
            taskpage.classList.remove("page-animate");
            taskpage.classList.add("page-animate");
        }
        else if (switchfilter === "history") {
            historypage.style.display = "block";
            historypage.classList.remove("page-animate");
            historypage.classList.add("page-animate");
        }
        else if (switchfilter === "habits") {
            habitspage.style.display = "block";
            habitspage.classList.remove("page-animate");
            habitspage.classList.add("page-animate");
        }

        button.classList.add("active");
    });
});
// History page elements
const historyMonth = document.querySelector("#history-month");
const historyContent = document.querySelector("#history-content");

// Set current month by default
historyMonth.value = today.slice(0, 7);
// change event addEventListener
function showhistory(){ 
    const selectedMonth = historyMonth.value;
    const selectedDate=history_date.value;
    // console.log(selectedMonth);
    const monthtask=taskList.filter((task)=>
        {
            return task.date.startsWith(selectedMonth);
        })
    // const dateTasks=taskList.filter((task)=>
    //     {
    //         return task.date.startsWith(selectedDate);
    //     })
        console.log(monthtask);
        historyContent.innerHTML = "";
        const dategroup={};
        monthtask.forEach((task)=>{
            if(!dategroup[task.date]){
                dategroup[task.date] = [];
            }
            dategroup[task.date].push(task);

        })
        console.log(dategroup);
       const dates = Object.keys(dategroup).sort().reverse();
       if(dates.length==0){
        historyContent.textContent = "No tasks found for this month.";
        return;
        
       }

dates.forEach((date) => {
    const dateBox = document.createElement("div");
    dateBox.classList.add("history-date-box");
    const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric"
});
    const heading = document.createElement("h3");
    heading.textContent = formattedDate;

    dateBox.appendChild(heading);
    
dategroup[date].forEach((task) => {
    const taskItem = document.createElement("p");

    taskItem.textContent =
        `${task.completed ? "✅ Completed" : "⬜ Incomplete"} — ${task.text}`;

    dateBox.appendChild(taskItem);
});

    historyContent.appendChild(dateBox);
});
};
historyMonth.addEventListener("change", showhistory);
history_date.addEventListener("change",showhistory);

showhistory();
function updateTodayStats() {

    const todayTasks = taskList.filter((task) => task.date === today);

    const todayTotal = todayTasks.length;

    const todayCompleted = todayTasks.filter((task) => task.completed).length;



}
function analyzeTasks() {
    const taskGroups = {};
    const currentMonth = today.slice(0, 7);
    const monthtask=taskList.filter((task)=>{return task.date.startsWith(currentMonth)})
    monthtask.forEach((task) => {
        taskGroups [task.taskkey];
        
    if (!taskGroups[task.taskkey]) {

        taskGroups[task.taskkey] = {
            total: 1,
            completed: task.completed ? 1 : 0
        };

    }
    else {
    taskGroups[task.taskkey].total++;

    if (task.completed === true) {
        taskGroups[task.taskkey].completed++;
    }
}

});
for (const key in taskGroups) {
    // console.log(key);
    // console.log(taskGroups[key].completed);
    if (taskGroups[key].completed>=15){
        console.log('habit is becaming');
        
    }
}
// console.log(taskGroups);
// console.log(currentMonth);
}

analyzeTasks();

