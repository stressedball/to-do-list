'use strict';

import {storage } from "./library-manager";
import { makeElement } from "./make-element";
import { populateData } from "./populateData";
import { removeElement } from "./remove-element";

function clickManager() {

    const expandButtons = document.querySelectorAll('.task-tile .expand-button');
    const editButtons = document.querySelectorAll('.task-tile .task-edit-button');
    const removeButtons = document.querySelectorAll('.task-tile .task-remove');
    const priorityButtons = document.querySelectorAll('.task-tile .priority.button');
    const projectOptions = document.querySelectorAll('.project-tile .options-div .options-logo');
    const projectsElements = document.querySelectorAll('.project-tile');

    for (let project of projectsElements) {
        project.addEventListener('click', () => {
            document.querySelector('.main').setAttribute('data-handle', `project-tile ${project.dataset.index}`);
            populateData();
        });
    }

    for (let option of projectOptions) {
        option.addEventListener('click', showOptions);
    }

    for (let expand of expandButtons) {
        expand.addEventListener('click', (e) => {
            const taskIndex = e.target.parentElement.parentElement.dataset.index;
            const task = storage().getTask(taskIndex);
            expandTask(task, 'div');
        });
    }
    
    for (let edit of editButtons) {
        edit.addEventListener('click', (e) => {
            const taskIndex = e.target.parentElement.parentElement.dataset.index;
            const task = storage().getTask(taskIndex);
            expandTask(task, 'input', taskIndex);
        });
    }
    
    for (let remove of removeButtons) {
        remove.addEventListener('click', (e) => {
            const index = e.target.parentElement.parentElement.dataset.index;
            removeElement(`.task-tile[data-index = "${index}"]`);
            storage().remove(index);
        });
    }
    
    for (let priority of priorityButtons) {
        priority.addEventListener('click', priorityUpdate);
    }
    
}

function expandTask(task, string, index) {
    const cover = makeElement('div', 'cover', '.main');

    const container = makeElement('div', 'expand', '.cover');
    
    const titleDiv = makeElement('div', 'task-title', '.expand');
    const titleLabel = makeElement('h4', 'label', '.task-title');
    titleLabel.textContent = 'Task';
    const title = makeElement(`${string}`, 'title', '.task-title');
    
    const descriptionDiv = makeElement('div', 'task-description', '.expand');
    const descriptionLabel = makeElement('h4', 'label', '.task-description');
    descriptionLabel.textContent = 'Description';
    
    const priorityDiv = makeElement('div', 'task-priority', '.expand');
    const priorityLogo = makeElement('img', 'priority', '.task-priority');
    priorityLogo.setAttribute('src', './assets/icons/priority-svgrepo-com.svg');
    if (task.priority === 'important') {
        priorityLogo.classList.add('important');
    }
    
    const dueDateDiv = makeElement('div', 'task-due-date', '.expand');
    const dueDateLabel = makeElement('h4', 'label', '.task-due-date');
    dueDateLabel.textContent = 'Due date';
    const dueDate = makeElement(`${string}`, 'due-date', '.task-due-date');
    
    
    if (string === 'div') {
        priorityLogo.classList.add('view-only');
        title.textContent = task.title;
        dueDate.textContent = task.dueDate;
        const description = makeElement(`${string}`, 'description', '.task-description');

        description.textContent = task.description;
        
        const buttonClose = makeElement('div', 'close', '.expand');
        buttonClose.textContent = 'Close details';
        buttonClose.addEventListener('click', () => {
            removeElement('.cover');
        });
    }
    
    if (string === 'input') {

        container.setAttribute('data-index', `${index}`);

        title.value = task.title;
        dueDate.value = task.dueDate;

        const description = makeElement('textarea', 'description', '.task-description');
        description.value = task.description;

        const buttonsContainer =  makeElement('div', 'edit-buttons', '.expand')
        const saveButton = makeElement('div', 'edit-save', '.edit-buttons');
        const cancelButton = makeElement('div', 'edit-cancel', '.edit-buttons');

        saveButton.textContent = 'Save changes';
        cancelButton.textContent = 'Cancel changes';

        priorityLogo.addEventListener('click', priorityUpdate);
        saveButton.addEventListener('click', updateLibrary);
        cancelButton.addEventListener('click', () => {
            removeElement('.cover');
            //EVENT LISTENERS KEPT MESSING UP SO HAD TO TAKE THEM AWAY
            priorityLogo.removeEventListener('click', priorityUpdate);
            saveButton.removeEventListener('click', updateLibrary); 
        });
    }
    
}

function showOptions(e) {
    const index = e.target.parentElement.parentElement.dataset.index;

    const hotProject = () => {
        for (let item of storage().allProjects()) {
            if (Number(item.i) === Number(index)) {
                const title = item.value.title;
                const description = item.value.description;
                const object = { title, description};
                return object;
            }
        }
    }

    makeElement('div', 'cover', '.main');
    makeElement('div', 'expand', '.cover');

    const projectTitle = makeElement('input', 'project-title', '.expand');
    projectTitle.value = hotProject().title;

    const projectDescription = makeElement('textarea', 'project-description', '.expand');
    projectDescription.value = hotProject().description;

    // makeElement('div', 'project-link-container', '.task-form');
    // const addLabel = makeElement('div', 'label', '.project-link-container');
    // addLabel.setAttribute('for', 'project-title');
    // addLabel.textContent = 'Link to project';
    // makeElement('select', 'select', '.project-link-container');
    // makeElement('option', 'default', '.project-link-container select');

    // const libraryProjects = storage().allProjects();
    // for (let item of libraryProjects) {
    //     const project = item.value;
    //     const option = makeElement('option', 'option', '.project-link-container select');
    //     option.setAttribute('value', `${project.title}`);
    //     option.textContent = project.title;
    // }


}

function priorityUpdate(e) {
    let taskIndex = null;
    if (e.target.parentElement.className === 'task-tile') {
        taskIndex = e.target.parentElement.dataset.index;
    } else {
        taskIndex = document.querySelector('.cover .expand').dataset.index;
    }

    if (e.target.classList.contains('important')) {
        e.target.classList.remove('important');
    } else {
        e.target.classList.add('important');
    }

    storage().updatePriority(taskIndex);
    populateData()
}

function updateLibrary() {
    const index = document.querySelector('.cover .expand').dataset.index;
    const object = {
        title : document.querySelector('.expand .task-title input').value,
        description : document.querySelector('.expand .task-description textarea').value,
        priority : document.querySelector('.expand .task-priority img').className,
        dueDate : document.querySelector('.expand .task-due-date input').value
    }

    storage().updateObject(index, object);
    removeElement('.cover');
    populateData();
}

export {clickManager};