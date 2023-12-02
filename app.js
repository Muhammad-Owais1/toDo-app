let addBtn = document.getElementById("add-btn");
let createBtn = document.getElementById("create-btn");
let cancelBtn = document.getElementById("cancel-btn")
let changeBtn = document.getElementById("change-btn");
let discardBtn = document.getElementById("discard-btn")
let adder = document.getElementById("adder");
let editor = document.getElementById("editor")
let adderTitle = document.getElementById("adder-title");
let adderStatus = document.getElementById("adder-status");
let editorTitle = document.getElementById("editor-title");
let editorStatus = document.getElementById("editor-status");
let lower = document.getElementById("lower");
let filterMode = document.getElementById("filter-mode")
let body = document.getElementById("body")
let messageLine = document.getElementById("message-line")

// functions
let messages = document.createElement("div")
body.appendChild(messages)
messages.classList.add("messages")

let saveTasksToLocalStorage = () => {
    localStorage.setItem('tasks', JSON.stringify(mainArr));
};

// Function to load tasks from localStorage
let loadTasksFromLocalStorage = () => {
    let tasks = localStorage.getItem('tasks');
    if (tasks) {
        mainArr = JSON.parse(tasks);
        let result = mainArr.map((todoArr, index) => {
            return [index + 1].concat(todoArr)
        })
        displayTask(result);
    }
};

// Call this function when the page loads to load tasks from localStorage
window.addEventListener('load', () => {
    loadTasksFromLocalStorage();
});

let mainArr = []


let dataHandler = () => {
    let title = adderTitle.value;
    let status = adderStatus.value;
    let todoArr = []
    todoArr.push(title, date(), time(), status)
    mainArr.push(todoArr)
    let result = mainArr.map((todoArr, index) => {
        return [index + 1].concat(todoArr)
    })

    displayTask(result)
    saveTasksToLocalStorage();
}


let adderDisplay = () => {
    adder.style.display === "none" ? adder.style.display = "flex" : adder.style.display = "none";
}


let editorDisplay = () => {
    editor.style.display === "none" ? editor.style.display = "flex" : editor.style.display = "none";
}


let displayTask = (tasks) => {
    lower.innerHTML = ""
    let i = 0

    for (i; i < tasks.length; i++) {
        let status = tasks[i][4] === 'Incomplete' ? 'unchecked' : 'checked';
        let statusMark = `<input class='status-mark' type='checkbox' ${status}>`
        lower.innerHTML += `
            <div class="task">
                <div class="task-left">
                    ${statusMark} 
                        <div>
                            <p class="task-title">(${tasks[i][0]}) ${tasks[i][1]}</p>
                            <p class="task-timing">${tasks[i][3]}, ${tasks[i][2]}</p>
                        </div>
                    </div>
                <div class="task-right">
                    <button class="delete-btn"><i class="fa-solid fa-trash delete-btn" style="color: #000000;"></i></button>
                    <button class="edit-btn"><i class="fa-solid fa-pencil edit-btn" style="color: #000000;"></i></button>
                </div>
            </div>
        `
    }

}

let date = () => {
    let dayArr = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ]

    let d = new Date();

    let date = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear()
    let day = d.getDay()

    let dateString = `${date}/${month}/${year}, ${dayArr[day - 1]}`
    return dateString
}

let time = () => {
    let d = new Date();

    let result = d.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });

    return result

}


let taskDeleter = (e, i) => {

    e.closest(".task").remove()
    mainArr.splice(i, 1)

    let result = mainArr.map((todoArr, index) => {
        return [index + 1].concat(todoArr)
    })

    displayTask(result)
    saveTasksToLocalStorage();
}

let taskEditor = (i) => {
    if (editorTitle.value === "") {
        msgBoxMaker(`<i class="fa-regular fa-circle-xmark" style="color: #fb0000;"></i>`, "red", "Please Add Title")

    }
    else {
        mainArr[i][0] = editorTitle.value
        mainArr[i][3] = editorStatus.value

        msgBoxMaker(`<i class="fa-regular fa-circle-check" style="color: #0bd900;"></i>`, "chartreuse", "Changed Sucessfully")

        let result = mainArr.map((todoArr, index) => {
            return [index + 1].concat(todoArr)
        })

        displayTask(result)
        console.log(editorTitle.value, editorStatus.value)
    }
}


//event listners

addBtn.addEventListener("click", () => {
    adderDisplay()
})


cancelBtn.addEventListener("click", () => {
    adderDisplay()
})


createBtn.addEventListener("click", () => {
    if (adderTitle.value === "") {
        msgBoxMaker(`<i class="fa-regular fa-circle-xmark" style="color: #fb0000;"></i>`, "red", "Please Add Title")
        return
    }

    else {
        adderDisplay();


        dataHandler()

        msgBoxMaker(`<i class="fa-regular fa-circle-check" style="color: #0bd900;"></i>`, "chartreuse", "Task Added Sucessfully")

    }
})


lower.addEventListener('click', (event) => {
    const target = event.target;


    if (target.classList.contains('edit-btn')) {


        const taskElement = target.closest('.task');
        if (!taskElement) {
            return;
        }
        const tasks = Array.from(document.querySelectorAll('.task'));
        const index = tasks.indexOf(taskElement);

        editorDisplay()
        saveTasksToLocalStorage();

        editorTitle.value = mainArr[index][0]
        editorStatus.value = mainArr[index][3]
        
        changeBtn.addEventListener("click", () => {
            editor.style.display = "none"
            if (editorTitle.value === "") {
                return
            }
            else {
                mainArr[index][0] = editorTitle.value
                mainArr[index][3] = editorStatus.value
        
                let result = mainArr.map((todoArr, index) => {
                    return [index + 1].concat(todoArr)
                })
        
                displayTask(result)
                console.log(editorTitle.value, editorStatus.value)
            }
            saveTasksToLocalStorage();
        })
    }

    if (target.classList.contains('delete-btn')) {


        const taskElement = target.closest('.task');
        if (!taskElement) {
            return;
        }
        const tasks = Array.from(document.querySelectorAll('.task'));
        const index = tasks.indexOf(taskElement);

        msgBoxMaker(`<i class="fa-regular fa-circle-check" style="color: #0bd900;"></i>`, "chartreuse", "Task Deleted Sucessfully")
        // message.style.animation = "message 2s"
        // messageLine.style.background = "chartreuse"
        // messageLine.style.animation = "messageLine 2s"
        // messageContent.innerHTML = `<i class="fa-regular fa-circle-check" style="color: #0bd900;"></i><p>Task Deleted Sucessfully</p>`

        // setTimeout(function () {
        //     message.style.animation = ""
        //     messageLine.style.background = ""
        //     messageLine.style.animation = ""
        //     messageContent.innerHTML = ``
        // }, 2000)

        taskDeleter(target, index)

    }
});

discardBtn.addEventListener("click", () => {
    editor.style.display = "none"
})

filterMode.addEventListener("change", () => {
    const tasks = document.querySelectorAll(".task");

    tasks.forEach((todo) => {
        const checkbox = todo.querySelector(".status-mark");

        if (filterMode.value === "Complete") {
            if (checkbox && checkbox.checked) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        } else if (filterMode.value === "Incomplete") {
            if (checkbox && !checkbox.checked) {
                todo.style.display = "flex";
            } else {
                todo.style.display = "none";
            }
        } else {
            // For "All" mode, display all tasks
            todo.style.display = "flex";
        }
    });
});

let msgBoxMaker = (sign, lineColor, text) => {
    let message = document.createElement("div");
    message.classList.add("message");

    let messageContent = document.createElement("div");
    messageContent.classList.add("message-content");
    message.appendChild(messageContent);

    messageContent.innerHTML = `${sign}<p>${text}</p>`;
    message.innerHTML += `<div class="message-line" style="background-color: ${lineColor};"></div>`;

    messages.appendChild(message); // Append the message to the existing messages container

    setTimeout(() => {
        message.remove();
    }, 4000);
};
