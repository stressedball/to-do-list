'use strict';

import { clickManager } from './click-manager';
import { libraryManager, storage } from './library-manager';
import { makeElement } from './make-element';
import {removeElement} from './remove-element';

function populateData() {
    const tasksLength = document.querySelectorAll('.task-tile').length;
    for (let i = 0; i < tasksLength; i++) {
        removeElement('.task-tile');
    }
    
    const projectsLength = document.querySelectorAll('.projects-container .project-tile').length;
    for (let i = 0; i < projectsLength; i++) {
        removeElement('.project-tile');
    }
    
    const library = getHandle();
    populateTasks(library);
    populateProjects();
    underline();
    clickManager();
}

function populateTasks(library) {

    for (let element of library) {
        console.log(element)
        const index = element.i;
        const object = element.value;
        const taskTileAdress = `.task-tile[data-index = "${index}"]`;

        const taskTile = makeElement('div', 'task-tile', '.tasks-container');
        taskTile.setAttribute('data-index', `${index}`);

        const markAsComplete = makeElement('input', 'checkbox', taskTileAdress);
        markAsComplete.setAttribute('type', 'checkbox');

        const taskTitle = makeElement('div', 'title', taskTileAdress);
        taskTitle.textContent = object.title;

        //PRIORITY MANAGEMENT
        const taskPriority = makeElement('img', 'priority', taskTileAdress);
        taskPriority.classList.add('button');
        taskPriority.setAttribute('src', '/src/assets/icons/priority-svgrepo-com.svg');
        if (object.priority === 'important') {
            taskPriority.classList.add('important');
        }

        const taskDueDate = makeElement('div', 'due-date', taskTileAdress);
        taskDueDate.textContent = object.dueDate;
    
        const taskOptions = makeElement('div', 'task-options', taskTileAdress);
        const taskExpand = makeElement('img', 'expand-button', taskTileAdress + ' .task-options');
        taskExpand.setAttribute('src', '/src/assets/icons/expand-svgrepo-com.svg');
        
        const taskEdit = makeElement('img', 'task-edit-button', taskTileAdress + ' .task-options');
        taskEdit.setAttribute('src', '/src/assets/icons/edit-svgrepo-com.svg');

        const taskDel = makeElement('img', 'task-remove', taskTileAdress + ' .task-options');
        taskDel.setAttribute('src', '/src/assets/icons/remove-svgrepo-com.svg');
    }
}

function populateProjects() {
    const projects = storage().getProjects();
    for (let element of projects) {
        const index = element.i;
        const project = element.value;
        const projectElement = makeElement('div', 'project-tile', '.projects-container');
        projectElement.setAttribute('data-index', `${index}`);
        projectElement.textContent = project.title;
    }
}

function getHandle() {
    //KEEP TASKS CONTAINER POINTING TO THE SELECTED ITEM
    //FOR EX IF TASK CONTAINER WAS DISAPLAYING A PROJECT
    //THIS WILL PREVENT FROM LOADING ALL OTHER TASKS
    let local = [] 
    const handle = document.querySelector('.main').dataset.handle;
    if (handle === 'all-tasks') {
        local = storage().allTasks();
        return local;
    }
    if (handle === 'important') {
        local = storage().filterImportant(); //library manager handles filtering for main display
        return local;
    }
    if (handle === 'week-tasks') {
        local = storage().filterWeek();
        return local;
    } else {
        const handleSplit = handle.split(' ');
        const index = handleSplit[1];
        const ring = JSON.parse(localStorage.getItem(`${index}`));
        // local = libraryManager().filterProjects(index);
        return local;
    }
}

function underline() {
    const handle = document.querySelector('.main').dataset.handle;

    const handleLength = handle.split(' ');

    if (document.querySelector('.underlined')) {
        document.querySelector('.underlined').classList.remove('underlined');
    }

    if (handleLength.length > 1) {
        const index = handleLength[1];
        const tile = document.querySelector(`.project-tile[data-index = "${index}"]`);
        tile.classList.add('underlined');
    } else {
        document.querySelector(`.upper-menu .${handle}`).classList.add('underlined');
    }

}

export {populateData};