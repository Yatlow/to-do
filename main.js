"use strict";

const TaskDetailsBox = document.getElementById("taskDetailsBox");
const TaskDateBox = document.getElementById("taskDateBox");
const TaskTimeBox = document.getElementById("taskTimeBox");
const notes = JSON.parse(localStorage.getItem("notes"))||[];
let idCounter = 0;
initializePage();


function initializePage(){
    for (let note of notes){
        idCounter = note.idCounter >= idCounter ? note.idCounter+1 : idCounter;
    };
    appendNotes();
}

function addNote(){
    addNoteData();
    appendNotes();
}

function addNoteData(){   
    const details = TaskDetailsBox.value;
    let date = new Date(TaskDateBox.value);
    const time = TaskTimeBox.value;
    if (!details){
        openAlert("you must add details for your task!",TaskDetailsBox);
        return;
    }
    if (!TaskDateBox.value){
        openAlert("you must add a Date for your task!",TaskDateBox);
        return;
    }else{
        date= date.toISOString();
    }
    if (!TaskTimeBox.value){
        openAlert("you must add a Time for your task!",TaskTimeBox);
        return;
    }
    const note = {idCounter, details, date, time,};
    idCounter++;
    notes.push(note);
    updateData();
    clearForm();
}

function updateData(){
    const stringified = JSON.stringify(notes);
    localStorage.setItem("notes",stringified);
}

function appendNotes(){
    const houseOfCards = document.getElementById("houseOfCards");
    houseOfCards.innerHTML = "";
    const now = new Date();
    let string = "";
    for (let i = notes.length - 1; i >= 0; i--) {
// this makes sure the newest task is added on the top left
// if i misunderstood the task requirements, and the newest task should be appended first (bottom right)>>:
// i would run the loop this way: for (let i = 0; i <notes.length; i++) {
        const note = notes[i];
        const noteDate = new Date(note.date);
        let dateClass = '';
        let dateString = '';
        if (now > noteDate){
            dateClass = 'overdo'
            dateString = 'Date has passed:(';
        }
        string += `
        <div class="note" id="note${note.idCounter}">
            <div class="thumbBox">
                <img src="assets/pictures/thumb.png" class="thumb">
                <button onclick="deleteNote(${note.idCounter})" class="hiddenBtn"><span class="bi bi-x-circle-fill" aria-hidden="true"></span></button>
            </div>
            <div class="taskDetails">
                <span class="AppendedTaskDetails">${note.details}</span>
            </div>
            <div class="TaskFooter">
                <span class="${dateClass}">${noteDate.toLocaleDateString()}  ${dateString}</span>
                <span>${note.time}</span>
            </div>
        </div>
        `;
    }
    houseOfCards.innerHTML = string;
}

function clearForm(){
    TaskDetailsBox.value = "";
    TaskDateBox.value = "";
    TaskTimeBox.value = "";
}

function deleteNote(uid){
    const alertBox = document.getElementById("alertBox");
    const alertBoxText = document.getElementById("alertBoxText");
    const alertBoxBtn = document.getElementById("alertBoxBtn");
    const alertBoxConfirmBtn = document.getElementById("alertBoxConfirmBtn");
    for (let i = 0; i < notes.length; i++){
        if (notes[i].idCounter === uid){
            alertBoxText.innerHTML = "are you sure you want to delete the task"
            alertBox.classList.remove("hiddenAlert");
            alertBoxConfirmBtn.classList.remove("hiddenConfirmBtn")
            alertBoxBtn.innerHTML = "cancel";
            alertBoxBtn.addEventListener('click',function(){
                closeAlert();
            },{once:true});
            alertBoxConfirmBtn.addEventListener('click',function(){
                closeAlert();
                notes.splice(i,1);
                updateData();
                appendNotes();
            },{once:true});
            break;
        }
    }
}

function closeAlert(inputToFocus){
    const alertBox = document.getElementById("alertBox");
    alertBox.classList.add("hiddenAlert");
    if (inputToFocus){
        inputToFocus.focus();
    }
}

function openAlert(alertString,inputToFocus){
    const alertBox = document.getElementById("alertBox");
    const alertBoxText = document.getElementById("alertBoxText");
    const alertBoxBtn = document.getElementById("alertBoxBtn");
    const alertBoxConfirmBtn = document.getElementById("alertBoxConfirmBtn");
    alertBox.classList.remove("hiddenAlert");
    alertBoxText.innerHTML = alertString;
    alertBoxBtn.innerHTML="Ok";
    alertBoxBtn.addEventListener('click',function(){
        closeAlert(inputToFocus);
    },{once:true});
    alertBoxConfirmBtn.classList.add("hiddenConfirmBtn");
}
