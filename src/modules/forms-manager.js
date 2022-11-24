'use strict';

import { makeElement } from "./make-element";
import { removeElement } from "./remove-element";
import {libraryManager, storage} from './library-manager';
import { populateData } from "./populateData";

function formManager() { 
    makeElement('div', 'make-choice', '.forms');
    makeElement('div', 'first-choice-container', '.make-choice')
    const createTask = makeElement('div', 'task-choice', '.first-choice-container');
    createTask.textContent = 'Add a new Task';
    
    makeElement('div', 'first-choice-container', '.make-choice');
    const createProject = makeElement('div', 'project-choice', '.first-choice-container:nth-of-type(2)');
    createProject.textContent = 'Create Project';
    
    createTask.addEventListener('click', taskForm);
    createProject.addEventListener('click', projectForm);
}

function taskForm() {
    makeElement('div', 'cover', '.main');
    makeElement('div', 'task-form', '.cover');
    makeElement('div', 'head-container', '.task-form')
    const titleInput = makeElement('input', 'title', '.task-form .head-container');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Title...');

    const descriptionInput = makeElement('textarea', 'description', '.task-form .head-container');
    descriptionInput.setAttribute('placeholder', 'Add a description (optional).');

    makeElement('div', 'priority-container', '.task-form');
    const priorityLabel = makeElement('div', 'label', '.task-form .priority-container');
    priorityLabel.textContent = 'Set as important';
    const priority = makeElement('img', 'priority', '.task-form .priority-container');
    priority.setAttribute('src', '/src/assets/icons/priority-svgrepo-com.svg');
    priority.addEventListener('click', (e) => {
        if (e.target.classList.contains('important')) {
            e.target.classList.remove('important');
        } else {
            e.target.classList.add('important');
        }
    })

    makeElement('div', 'due-date-container', '.task-form');
    const dueDateLabel = makeElement('div', 'label', '.task-form .due-date-container');
    dueDateLabel.textContent = 'Set a due date';
    const dueDate = makeElement('input', 'due-date', '.task-form .due-date-container');
    dueDate.setAttribute('type', 'date');

    //LINK TASK TO PROJECT DROPDOWN MENU
    makeElement('div', 'project-link-container', '.task-form');
    const addLabel = makeElement('div', 'label', '.project-link-container');
    addLabel.setAttribute('for', 'project-title');
    addLabel.textContent = 'Link to project';
    makeElement('select', 'select', '.project-link-container');
    makeElement('option', 'default', '.project-link-container select');

    const libraryProjects = storage().getProjects();
    for (let project of libraryProjects) {
        const option = makeElement('option', 'option', '.project-link-container select');
        option.setAttribute('value', `${project.title}`);
        option.textContent = project.title;
    }

    makeElement('div', 'choice-container', '.task-form');

    const confirmButton = makeElement('div', 'confirm', '.task-form .choice-container');
    confirmButton.textContent = 'Confirm';

    const cancelButton = makeElement('div', 'cancel', '.task-form .choice-container');
    cancelButton.textContent = 'Cancel';
    eventController('task')
}

function getTask() {
    const title = document.querySelector('.head-container .title').value;
    const description = document.querySelector('.head-container .description').value;
    let priority = document.querySelector('.task-form .priority-container .priority').className;
    const dueDate = document.querySelector('.task-form .due-date-container .due-date').value;
    const append = document.querySelector('.select').value;

    const prioritySplit = priority.split(' ');
    for (let i of prioritySplit) {
        if (i === 'important') {
            priority = 'important';
        }
    }

    const object = {
        type: 'task', title, description, priority, dueDate, append
    }

    storage().push(object);
    removeElement('.cover');
    populateData();
}

function projectForm() {
    makeElement('div', 'cover', '.main');
    makeElement('div', 'task-form', '.cover');
    makeElement('div', 'head-container', '.task-form')
    const titleInput = makeElement('input', 'title', '.task-form .head-container');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('placeholder', 'Title...');

    const descriptionInput = makeElement('textarea', 'description', '.task-form .head-container');
    descriptionInput.setAttribute('placeholder', 'Add a description (optional).');

    makeElement('div', 'append-container', '.task-form');

    const library = libraryManager().getTasks();
    const libraryFilter = library.filter(el => el.append === '');
    for (let task of libraryFilter) {
        const tile = makeElement('div', 'append-task', '.append-container');
        tile.setAttribute('data-index', `${task.index}`);
        const check = makeElement('input', 'to-append', `.append-task[data-index = '${task.index}']`);
        check.setAttribute('type', 'checkbox');
        const title = makeElement('div', 'title', `.append-task[data-index = '${task.index}']`);
        title.textContent = task.title;
    }

    makeElement('div', 'choice-container', '.task-form');

    const confirmButton = makeElement('div', 'confirm', '.task-form .choice-container');
    confirmButton.textContent = 'Confirm';

    const cancelButton = makeElement('div', 'cancel', '.task-form .choice-container');
    cancelButton.textContent = 'Cancel';
    eventController('project');
}

function getProject() {
    const title = document.querySelector('.task-form .head-container input.title').value;
    const description = document.querySelector('.head-container .description').value;
    const appends = document.querySelectorAll('.append-task input.to-append');

    const project = { type : 'project', title, description };

    for (let append of appends) {
        if (append.checked === true) {
            const parentElement = append.parentElement;
            const index = parentElement.dataset.index;
            libraryManager().appendToProject(index, project);
        }
    }

    storage().push(project);
    removeElement('.cover');
    populateData();

}

function eventController(string) {
    if (string === 'task') {
        document.querySelector('.task-form .choice-container .confirm').addEventListener('click', getTask);
    }

    if (string === 'project') {
        document.querySelector('.task-form .choice-container .confirm').addEventListener('click', getProject);
    }

    document.querySelector('.task-form .choice-container .cancel').addEventListener('click', () => {
        removeElement('.cover');
    });
}

export {formManager};