import { ja } from 'date-fns/locale';
import { clickManager } from './click-manager';
import { libraryManager } from './library-manager';
import { makeElement } from './make-element';
import {removeElement} from './remove-element';

function populateData() {
    
    const library = getHandle();
    
    const tasksLength = document.querySelectorAll('.task-tile').length;
    for (let i = 0; i < tasksLength; i++) {
        removeElement('.task-tile');
    }
    
    const projectsLength = document.querySelectorAll('.projects-container .project-tile').length;
    for (let i = 0; i < projectsLength; i++) {
        removeElement('.project-tile');
    }
   
    for (let object of library) {
        if (object.type === 'task') {
            const taskTileAdress = `.task-tile[data-index = "${object.index}"]`;

            const taskTile = makeElement('div', 'task-tile', '.tasks-container');
            taskTile.setAttribute('data-index', `${object.index}`);

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

            // const taskDescription = makeElement('button', 'task-details', taskTileAdress);
            // taskDescription.textContent = 'Details';
        
            const taskOptions = makeElement('div', 'task-options', taskTileAdress);
            const taskExpand = makeElement('img', 'expand-button', taskTileAdress + ' .task-options');
            taskExpand.setAttribute('src', '/src/assets/icons/expand-svgrepo-com.svg');
            
            const taskEdit = makeElement('img', 'task-edit-button', taskTileAdress + ' .task-options');
            taskEdit.setAttribute('src', '/src/assets/icons/edit-svgrepo-com.svg');

            const taskDel = makeElement('img', 'task-remove', taskTileAdress + ' .task-options');
            taskDel.setAttribute('src', '/src/assets/icons/remove-svgrepo-com.svg')

        } 
    }

    const projects = libraryManager().getProjects();
    for (let project of projects) {
        const projectElement = makeElement('div', 'project-tile', '.projects-container');
        projectElement.setAttribute('data-index', `${project.index}`);
        projectElement.textContent = project.title;
    }

    underline();
    clickManager();
}

function getHandle() {

    //KEEP TASKS CONTAINER POINTING TO THE SELECTED ITEM
    //FOR EX IF TASK CONTAINER WAS DISAPLAYING A PROJECT
    //THIS WILL PREVENT FROM LOADING ALL OTHER TASKS
    let local = [] 
    const handle = document.querySelector('.main').dataset.handle;
    if (handle === 'all-tasks') {
        local = libraryManager().getLibrary();
        return local;
    }
    if (handle === 'important') {
        local = libraryManager().filterImportant();
        return local;
    }
    if (handle === 'week-tasks') {
        local = libraryManager().filterWeek();
        return local;
    } else {
        const handleSplit = handle.split(' ');
        const index = handleSplit[1];
        local = libraryManager().filterProjects(index);
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