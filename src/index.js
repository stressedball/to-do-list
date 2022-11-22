'use strict';

import './style.css';
import {makeElement} from './modules/make-element';
import {dummyDisplay} from './modules/dummy';
import {libraryManager} from './modules/library-manager';
import { populateData } from './modules/populateData';


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
    const startButton = makeElement('img', 'main-button', '.forms');
    startButton.setAttribute('src', '/src/assets/icons/add-plus-svgrepo-com.svg')
    //SHOULD CONTAIN FORMS TO GET INPUTS FOR NEW TASKS / PROJECTS
    const tasksContainer = makeElement('div', 'tasks-container', '.main'); 

    const allTasks = makeElement('h3', 'all-tasks', '.upper-menu'); //ALL TASKS
    const weekTasks = makeElement('h3', 'week-tasks', '.upper-menu'); //WEEK TASKS
    const important = makeElement('h3', 'important', '.upper-menu'); //IMPORTANT TASKS
        
    allTasks.textContent = 'All Tasks';
    weekTasks.textContent = 'This week\'s tasks';
    important.textContent = 'Important tasks';
 
    dummyDisplay(); //GET EXAMPLES TO DISPLAY ON PAGE

    //DISPLAY PROJECTS SHORTCUTS
    const projects = libraryManager().getProjects();
    populateData(projects);
    const projectsElements = document.querySelectorAll('.project-tile');

    ///////EVENT LISTENER FOR EVERY PROJECT / MAIN CATEGORY///////////////////////////
    ///////FUNCTION POPULATES MAIN CONTAINER WITH APPROPRIATE/////////////////////////
    ///////RETURN VALUES FROM libraryManager/////////////////////////////////////////
    for (let project of projectsElements) {
        project.addEventListener('click', () => {
            populateData(libraryManager().filterProjects(project));
        });
    }

    allTasks.addEventListener('click', () => {
        populateData(libraryManager().getTasks());
    });

    weekTasks.addEventListener('click', () => {
        populateData(libraryManager().filterWeek());
    });

    important.addEventListener('click', () => {
        populateData(libraryManager().filterImportant());
    });

    document.querySelector('.important').click(); //why not
}








