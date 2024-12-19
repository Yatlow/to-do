"use strict";

const task_details_box=document.getElementById("task_details_box");
const task_date_box=document.getElementById("task_date_box");
const task_time_box=document.getElementById("task_time_box");
let notes=[];
let idCount=0;
initializeNotes();

function initializeNotes(){
    notes=JSON.parse(localStorage.getItem("notes"));
    if (notes){
        for (let note of notes){
            idCount=note.ID>=idCount?note.ID+1:idCount;
        }
        appendNotes();
    }else{
        notes=[];
    }
}


function AddNote(){
    AddNoteData();
    clearForm();
    appendNotes();
};

function AddNoteData(){
    const alert_box=document.getElementById("alertBox");
    const alert_box_text=document.getElementById("alertBoxText");
    const details=task_details_box.value;
    const date= new Date(task_date_box.value).toLocaleDateString();
    const time= task_time_box.value;
    if (!details){
        alert_box.classList.remove("hiddenAllert");
        alert_box_text.innerHTML="you must add details for your task!";
        return;
    }
    if (!task_date_box.value){
        alert_box.classList.remove("hiddenAllert");
        alert_box_text.innerHTML="you must add a Date for your task!";
        return;
    }
    if (!task_time_box.value){
        alert_box.classList.remove("hiddenAllert");
        alert_box_text.innerHTML="you must add a time for your task!";
        return;
    }
    const note={idCount,details,date,time,}
    idCount++;
    notes.push(note);
    updateData();
}

function updateData(){
    const strigfyied_notes =JSON.stringify(notes)
    localStorage.setItem("notes",strigfyied_notes)
};

function clearForm(){
    task_details_box.value="";
    task_date_box.value="";
    task_time_box.value="";
}

function closeAllert(){
    const alertBox=document.getElementById("alertBox");
    alertBox.classList.add("hiddenAllert");
    alertBox.innerHTML=`<span id="alertBoxText"></span>
    <button id="alertBoxBtn" onclick="closeAllert()">Ok</button>`;
}

function appendNotes(){
    const notesBox=document.getElementById("notesBox");
    notesBox.innerHTML="";
    for (let i = notes.length - 1; i >= 0; i--) {//THIS MAKES SURE THE NEWEST TASK IS ADDED FROM LTR
        let note = notes[i];
        notesBox.innerHTML+=`
        <div class="Note" id="note${note.idCount}">
            <div class="thumbBox">
                <img src="assets/pictures/thumb.png" class="thumb">
                <button onclick="deleteNote(${note.idCount})" class="hiddenBtn"><span class="bi bi-x-circle-fill" aria-hidden="true"></span></button>
            </div>
            <div class="TDetails">
                <span class="AppedTDetails">${note.details}</span>
            </div>
            <div class="TFooter">
                <span>${note.date}</span>
                <span>${note.time}</span>
            </div>
        </div>
        `;
    }
}

function deleteNote(ID){
    const alertBox=document.getElementById("alertBox");
    for (let i=0; i<=notes.length; i++){
        if (notes[i].ID===ID){
            alertBox.classList.remove("hiddenAllert");
            alertBox.innerHTML=`<span id="alertBoxText">are you sure you want to delete the task ${notes[i].details}?</span>
            <button id="alertBoxBtn" onclick="
            closeAllert();
            notes.splice(${i},1);
            updateData();
            appendNotes();">ok</button>
            <button id="alertBoxBtn2" onclick="closeAllert()">cancel</button>`;
            
            break;
        }
    }
}