'use strict';

import './style.css';
import {makeElement} from './modules/make-element';
import {dummyDisplay} from './modules/dummy';
import { populateData } from './modules/populateData';
import { formManager } from './modules/forms-manager';

window.addEventListener('load', loadStructure);

function loadStructure() {
    /////////////////////////////////////////////////////////////////
    ///////////////////LOAD MAIN HTML STRUCTURE//////////////////////
    ////////////////////////////////////////////////////////////////
    const sidebar = makeElement('div', 'sidebar', '#structure'); //SIDEBAR
    const main = makeElement('div', 'main', '#structure'); //MAIN CONTAINER
    const sidebarUpperPart = makeElement('div', 'upper-menu', '.sidebar'); //SIDEBAR MAIN OPTIONS
       
    //SIDEBAR PROJECTS DISPLAY
    const projectsContainer = makeElement('div', 'projects-container', '.sidebar'); 
    const projectH3 = makeElement('h3', 'title', '.projects-container');
    projectH3.textContent = 'Projects';

    //MAIN BODY
    const formContainer = makeElement('div', 'forms', '.main'); 

    //CREATE TASK OR PROJECT
    formManager(); //HERE FOR ADD TASK/ADD PROJECT EVENT LISTENERS

    //CONTAINER TO DISPLAY SELECTED TASKS
    const tasksContainer = makeElement('div', 'tasks-container', '.main'); 

    const allTasks = makeElement('h3', 'all-tasks', '.upper-menu'); //ALL TASKS
    const weekTasks = makeElement('h3', 'week-tasks', '.upper-menu'); //WEEK TASKS
    const important = makeElement('h3', 'important', '.upper-menu'); //IMPORTANT TASKS
        
    allTasks.textContent = 'All Tasks';
    weekTasks.textContent = 'This week\'s tasks';
    important.textContent = 'Important tasks';
 
    dummyDisplay(); //GET EXAMPLES TO DISPLAY ON PAGE
    
    ///////EVENT LISTENER FOR EVERY PROJECT / MAIN CATEGORY///////////////////////////
    ///////FUNCTION POPULATES MAIN CONTAINER WITH APPROPRIATE/////////////////////////
    ///////RETURN VALUES FROM libraryManager/////////////////////////////////////////


    allTasks.addEventListener('click', () => {
        document.querySelector('.main').setAttribute('data-handle', 'all-tasks')
        populateData();
    });

    weekTasks.addEventListener('click', () => {
        document.querySelector('.main').setAttribute('data-handle', 'week-tasks')
        populateData();
    });

    important.addEventListener('click', () => {
        document.querySelector('.main').setAttribute('data-handle', 'important')
        populateData();
    });


    document.querySelector('.all-tasks').click(); //why not
    //gets tasks container to display important tasks
}








