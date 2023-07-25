let theInput = document.querySelector(".add-task input"),
    theAddButton = document.querySelector(".add-task .plus"),
    tasksContainer = document.querySelector(".tasks-content"),
    noTasksMsg = document.querySelector(".no-tasks-message"),
    tasksCount = document.querySelector(".tasks-count span"),
    tasksCompleted = document.querySelector(".tasks-completed span");
window.onload = function() {
    if (localStorage.getItem("name")) { document.querySelector(".the-name").innerHTML = localStorage.getItem("name") } else {
        swal({
            text: 'What is Your Name?',
            content: "input",
            button: {
                text: "Okey",
            },
        }).then(name => {
            if (!name) throw null, document.querySelector(".name").innerHTML = "Anonymous person", localStorage.setItem("name", "Anonymous person");
            else console.log(name), document.querySelector(".the-name").innerHTML = name, localStorage.setItem("name", name);
        });
    }


    theInput.focus();
    calcTasks();
    if (localStorage.getItem("data")) {

    } else {
        createNoTasks();
    }

};
document.querySelector(".edit").onclick = function() {
    swal({
        text: 'What is Your Name?',
        content: "input",
        button: {
            text: "Okey",
        },
    }).then(name => {
        if (!name) throw null, document.querySelector(".the-name").innerHTML = localStorage.getItem("name");
        else console.log(name), document.querySelector(".the-name").innerHTML = name, localStorage.setItem("name", name), document.querySelector(".name").innerHTML = "Hello";
    });
}
theAddButton.onclick = function() {
    for (const element of tasksContainer.children) {
        let check = theInput.value === element.firstChild.textContent;

        if (check === true) {
            swal("Hey!", "there is a same one");

            console.log("there is a same one");
            theInput.value = "";

        };
        calcTasks();
    };
    if (theInput.value === '' || theInput.value === ' ') {
        console.log("no value");
        calcTasks();
        swal("Hey!", "there is a same one or there is a same one");

    } else {

        noTasksMsg = document.querySelector(".no-tasks-message");
        if (document.body.contains(document.querySelector(".no-tasks-message"))) {
            noTasksMsg.remove();
        }
        let mainSpan = document.createElement("span");
        let deleteElement = document.createElement("span");
        let text = document.createTextNode(theInput.value);
        let deleteText = document.createTextNode("delete");
        mainSpan.appendChild(text);
        mainSpan.className = 'task-box';
        deleteElement.appendChild(deleteText);
        deleteElement.className = 'delete';
        mainSpan.appendChild(deleteElement);
        tasksContainer.appendChild(mainSpan);
        theInput.value = "";
        theInput.focus();
        console.log("success");
        calcTasks();
        swal({
            title: "The Task added!",
            text: "let's Finfish it !",
            icon: "success",
            button: "okey",
        });
    }
    saveData();
};

document.addEventListener('click', function(e) {
    if (e.target.className == 'delete') {


        swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this imaginary file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    e.target.parentNode.remove();
                    calcTasks();
                    if (tasksContainer.childElementCount === 0) {
                        createNoTasks()
                    };
                    saveData();
                    swal("Poof! Your task has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your task is safe!");
                }
            });

    };
    if (e.target.classList.contains('task-box')) {
        e.target.classList.toggle("finished");
        calcTasks();
        saveData();
    };
});
let e = document.querySelector(".delete-all");
// e.onclick = function() {
//     for (let i = 0; i <= tasksContainer.children.length; i++) {
//         tasksContainer.removeChild(tasksContainer.children[i]);
//     };
//     calcTasks();
//     if (tasksContainer.childElementCount === 0) {
//         createNoTasks();
//         calcTasks();
//     };
//     calcTasks();
// };
// e.onclick = function() {
//         for (const element of tasksContainer.children) {
//             element.remove()
//         }

//     }
// e.addEventListener('click', function() {
//     e.forEach(el => {

//         tasksContainer.children.remove();

//     });
// })
e.onclick = function() {
    if (document.querySelectorAll('.tasks-content .task-box').length == 0) {
        swal("you didn't write any task !");
    } else {
        // swal("Are you sure?", {
        //         buttons: {
        //             cancel: "no",

        //             yes: true,
        //         },
        //     })
        //     .then((value) => {
        //         switch (value) {
        //             case "yes":
        //                 swal("Deleted!", "all tasks deleted", "success");
        //                 document.querySelector(".tasks-content").innerHTML = "";
        //                 if (tasksContainer.childElementCount === 0) {
        //                     createNoTasks();
        //                     calcTasks();
        //                 };
        //                 calcTasks();
        //                 saveData();
        //                 break;
        //         }
        //     });



        swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this task!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
                if (willDelete) {
                    document.querySelector(".tasks-content").innerHTML = "";
                    if (tasksContainer.childElementCount === 0) {
                        createNoTasks();
                        calcTasks();
                    };
                    calcTasks();
                    saveData();
                } else {
                    swal("Your task is safe!");
                }
            });
    }

}

let el = document.querySelector(".finish-all");
el.onclick = function() {
    if (document.querySelectorAll('.tasks-content .task-box').length == 0) {
        swal("there is no tasks to finish !");
    } else {
        for (const element of tasksContainer.children) {
            element.classList.toggle("finished");
            if (element.classList.contains("finished")) {
                swal({
                    title: "Good job!",
                    text: "You Finished all tasks!",
                    icon: "success",
                    button: "Awesome !",
                });
                console.log("gh")
            }
        };


    }

    calcTasks();
    saveData();
}

function createNoTasks() {
    let msgSpan = document.createElement("span"),
        msgText = document.createTextNode("No tasks to show");
    msgSpan.appendChild(msgText);
    msgSpan.className = 'no-tasks-message';
    tasksContainer.appendChild(msgSpan);
    calcTasks()
}

function calcTasks() {
    tasksCount.innerHTML = document.querySelectorAll('.tasks-content .task-box').length;
    tasksCompleted.innerHTML = document.querySelectorAll('.tasks-content .finished').length;


}

function saveData() {
    localStorage.setItem("data", tasksContainer.innerHTML);
}

function showTask() {
    tasksContainer.innerHTML = localStorage.getItem("data");

}
showTask();