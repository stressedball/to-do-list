'use strict';

import {addDays,format,parse,parseISO,
    isWithinInterval} from 'date-fns';
import { populateData } from './populateData';


function storage() {
            
    const allTasks = () => {
        const library = [];
        for (let i = 0; i < localStorage.length; i++) {
            const value = JSON.parse(localStorage[i]);
            if (value.type === 'task') {
                const object = {i, value};
                library.push(object);
            }
        }
        return library;
    }

    const allProjects = () => {
        const library = [];
        for (let i = 0; i < localStorage.length; i++) {
            const value = JSON.parse(localStorage[i]); 
            if (value.type === 'project') {
                const object = { i , value}
                library.push(object);
            }     
        }
        return library;
    }

    const appendToProject = (indexes, projectTitle) => {
        const hotProject = () => {
            for (let i = 0; i < localStorage.length; i++) {
                const value = JSON.parse(localStorage[i]); 
                if (value.type === 'project') {
                    if (value.title === projectTitle) {
                        return value.title;
                    }
                }     
            }
        }

        for (let index of indexes) {
            const task = JSON.parse(localStorage.getItem(`${index}`));
            task.append = hotProject();
            localStorage.setItem(`${index}`, JSON.stringify(task));
        }
    }

    const displayProjectTasks = (index) => {
        const library = [];
        const project = localStorage.getItem(`${index}`);

        const projectName = JSON.parse(project).title;
        // const projectName = project.value.name
        for (let i = 0; i < localStorage.length; i++) {
            const value = JSON.parse(localStorage[i]); 
            if (value.append === projectName) {
                const object = { i , value}
                library.push(object);
            }     
        }
        return library;
    }

    const filterImportant = () => {
        const library = [];
        for (let i = 0; i < localStorage.length; i++) {
            const value = JSON.parse(localStorage[i]);
            if (value.type === 'task' && value.priority === 'important') {
                const object = {i, value};
                library.push(object);
            }
        }
        return library;
    }

    const filterWeek = () => {

        const library = [];

        const today = format(new Date(), 'yyyy-MM-dd');
        const todaySplit = today.split('-');

        let inAWeek = addDays(new Date(todaySplit[0], todaySplit[1] - 1, todaySplit[2]), 7);
        inAWeek = format(new Date(inAWeek), 'yyyy-MM-dd');
        const inAWeekSplit = inAWeek.split('-');


        for (let element of storage().allTasks()) {
            const value = element.value;
            const newDate = value.dueDate;
            const newDateSplit = newDate.split('-');

            const isInAWeek = isWithinInterval(new Date(newDateSplit[0], newDateSplit[1], newDateSplit[2]), {
                start: new Date(todaySplit[0], todaySplit[1], todaySplit[2]),
                end: new Date(inAWeekSplit[0], inAWeekSplit[1], inAWeekSplit[2])
              })
            
            if (isInAWeek === true) {
                const i = element.i
                const object = {i, value};
                library.push(object);
            }
        }
        return library;
    }

    const getTask = (index) => {
        const task = localStorage.getItem(`${index}`);
        return JSON.parse(task);
    }

    const push = (object) => {
        localStorage.setItem(`${localStorage.length}`, JSON.stringify(object));
        return;
    }

    const updatePriority = (index) => {
        
        const task = localStorage.getItem(`${index}`);
        const parseTask = JSON.parse(task);
        console.log(parseTask)
        let priority = parseTask.priority;
        if (priority === 'important') {
            parseTask.priority = '';
        } else {
            parseTask.priority = 'important';
        }
        localStorage.setItem(`${index}`, JSON.stringify(parseTask)); 
    }

    const updateObject = (index, object) => {
        const localTask = JSON.parse(localStorage.getItem(`${index}`));
        localTask.title = object.title;
        if (object.priority.split(' ').length > 1) {
            localTask.priority = 'important';
        } else {
            localTask.priority = '';
        }
        // localTask.priority = object.priority;
        localTask.dueDate = object.dueDate;
        localTask.description = object.description;
        // localTask.append = object.append;
        localStorage.setItem(`${index}`, JSON.stringify(localTask));
    }

    const remove = (index) => {
        localStorage.removeItem(`${Number(index)}`);

        const values = Object.values(localStorage);
        localStorage.clear();

        for (let value of values) {
            const object = JSON.parse(value);
            storage().push(object);
        }
        populateData();
    }

    return {allTasks, allProjects, appendToProject, filterWeek, filterImportant, displayProjectTasks, getTask, push,
        remove, updatePriority, updateObject};
    
}





export {storage};
