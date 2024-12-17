"use strict";

const TDetailsBox=document.getElementById("TDetails");
const TDateBox=document.getElementById("TDate");
const TTimeBox=document.getElementById("TTime");
let notes=[];
let IdCount=0;
initializeNotes();

function initializeNotes(){
    notes=JSON.parse(localStorage.getItem("notes"));
    if (notes){
        for (let note of notes){
            IdCount=note.ID>=IdCount?note.ID+1:IdCount;
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
    const NoteDate= new Date(TDateBox.value).toLocaleDateString();
    const alertBox=document.getElementById("alertBox");
    const alertBoxText=document.getElementById("alertBoxText");
    const NoteTime= TTimeBox.value;
    if (!TDetailsBox.value){
        alertBox.classList.remove("hiddenAllert");
        alertBoxText.innerHTML="you must add details for your task!";
        return;
    }
    if (!TDateBox.value){
        alertBox.classList.remove("hiddenAllert");
        alertBoxText.innerHTML="you must add a Date for your task!";
        return;
    }
    if (!TTimeBox.value){
        alertBox.classList.remove("hiddenAllert");
        alertBoxText.innerHTML="you must add a time for your task!";
        return;
    }
    const note={
        ID:IdCount,
        details:TDetailsBox.value,
        Date: NoteDate,
        Time:NoteTime,
    }
    IdCount++;
    notes.push(note);
    updateData();
}

function updateData(){
    const StrigfyiedNotes =JSON.stringify(notes)
    localStorage.setItem("notes",StrigfyiedNotes)
};

function clearForm(){
    TDetailsBox.value="";
    TDateBox.value="";
    TTimeBox.value="";
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
        <div class="Note" id="note${note.ID}">
            <div class="thumbBox">
                <img src="assets/pictures/thumb.png" class="thumb">
                <button onclick="deleteNote(${note.ID})" class="hiddenBtn"><span class="bi bi-x-circle-fill" aria-hidden="true"></span></button>
            </div>
            <div class="TDetails">
                <span class="AppedTDetails">${note.details}</span>
            </div>
            <div class="TFooter">
                <span>${note.Date}</span>
                <span>${note.Time}</span>
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