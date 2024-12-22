"use strict";

const taskDetailsBox=document.getElementById("taskDetailsBox");
const taskDateBox=document.getElementById("taskDateBox");
const taskTimeBox=document.getElementById("taskTimeBox");
let notes=JSON.parse(localStorage.getItem("notes"))||[];
let idCounter=0;
initializePage();


function initializePage(){
    for (let note of notes){
        idCounter=note.idCounter>=idCounter?note.idCounter+1:idCounter;
    }
    appendNotes();
}

function addNote(){
    addNoteData();
    appendNotes();
};

function addNoteData(){   
    const details=taskDetailsBox.value;
    const date= new Date(taskDateBox.value).toISOString();
    const time= taskTimeBox.value;
    if (!details){
        openAllert("you must add details for your task!",taskDetailsBox);
        return;
    }
    if (!taskDateBox.value){
        openAllert("you must add a Date for your task!",taskDateBox);
        return;
    }
    if (!taskTimeBox.value){
        openAllert("you must add a Time for your task!",taskTimeBox);
        return;
    }
    const note={idCounter,details,date ,time,}
    idCounter++;
    notes.push(note);
    updateData();
    clearForm();
}

function updateData(){
    const stringified_notes =JSON.stringify(notes)
    localStorage.setItem("notes",stringified_notes)
};

function clearForm(){
    taskDetailsBox.value="";
    taskDateBox.value="";
    taskTimeBox.value="";
}

function closeAlert(input_to_focus){
    const alertBox=document.getElementById("alertBox");
    alertBox.classList.add("hiddenAllert");
    alertBox.innerHTML=`<span id="alertBoxText"></span>
    <button id="alertBoxBtn" onclick="closeAlert()">Ok</button>`;
    if (input_to_focus){
        input_to_focus.focus();
        document.getElementById("alertBoxBtn").addEventListener('click',function(){
            closeAlert()
        });
    }
}

function openAllert(alert_string,input_to_focus){
    const alert_box=document.getElementById("alertBox");
    const alert_box_text=document.getElementById("alertBoxText");
    alert_box.classList.remove("hiddenAllert");
    alert_box_text.innerHTML=alert_string;
    document.getElementById("alertBoxBtn").addEventListener('click',function(){
        closeAlert(input_to_focus)
    });
}

function appendNotes(){
    const houseOfCards=document.getElementById("houseOfCards");
    houseOfCards.innerHTML="";
    const now= new Date();
    for (let i = notes.length - 1; i >= 0; i--) {
// this makes sure the newest task is added on the top left
// if i misunderstood the task requirements, and the newest task should be appended first (bottom right)>>:
// i would run the loop this way: for (let i = 0; i <notes.length; i++) {
        let note = notes[i];
        const noteDate= new Date(note.date);
        let dateClass='';
        let dateString='';
        if (now>noteDate){
            dateClass='overdo'
            dateString='Date has passed:(';
        }
        houseOfCards.innerHTML+=`
        <div class="Note" id="note${note.idCounter}">
            <div class="thumbBox">
                <img src="assets/pictures/thumb.png" class="thumb">
                <button onclick="deleteNote(${note.idCounter})" class="hiddenBtn"><span class="bi bi-x-circle-fill" aria-hidden="true"></span></button>
            </div>
            <div class="TDetails">
                <span class="AppedTDetails">${note.details}</span>
            </div>
            <div class="TFooter">
                <span class="${dateClass}">${noteDate.toLocaleDateString()}  ${dateString}</span>
                <span>${note.time}</span>
            </div>
        </div>
        `;
    }
}

function deleteNote(uid){
    const alertBox=document.getElementById("alertBox");
    for (let i=0; i<notes.length; i++){
        if (notes[i].idCounter===uid){
            alertBox.classList.remove("hiddenAllert");
            alertBox.innerHTML=`<span id="alertBoxText">are you sure you want to delete the task ${notes[i].details}?</span>
            <button id="alertBoxBtn" onclick="
            closeAlert();
            notes.splice(${i},1);
            updateData();
            appendNotes();">ok</button>
            <button id="alertBoxBtn2" onclick="closeAlert()">cancel</button>`;
            break;
        }
    }
}