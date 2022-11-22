import {libraryManager} from './library-manager';
import { makeElement } from './make-element';
import {removeElement} from './remove-element';

function populateData(library) {

    const tasksLength = document.querySelectorAll('.task-tile').length;
    for (let i = 0; i < tasksLength; i++) {
        removeElement('.task-tile');
    }

    const projectsLength = document.querySelectorAll('.project').length;
    for (let i = 0; i < projectsLength; i++) {
        removeElement('.project');
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

        } else if (object.type === 'project') {

            const project = makeElement('div', 'project-tile', '.projects-container');
            project.setAttribute('data-index', `${object.index}`);
            project.textContent = object.title;

        }
    }
}

export {populateData};