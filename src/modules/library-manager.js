'use strict';

import {addDays,format,parse,parseISO,
    isWithinInterval} from 'date-fns';
import { populateData } from './populateData';


function libraryManager() {

    const appendToProject = (index, project) => {
        const task = storage().getLibrary()[index];
        task.append = project.title;
        localStorage.setItem(`${index}`, JSON.stringify(task));
    }
    
    const filterProjects = (index) => {
        const projectName = storage().getLibrary()[index].title;
        const allTasks = storage().getLibrary().filter(el => el.type === 'task');
        const filter = allTasks.filter(el => el.append === `${projectName}`);
        return filter;
    }





    const getTasks = () => {
        const filter = storage().getLibrary().filter(el => el.type === 'task');
        return filter;
    }

    const updatePriority = (index) => {
        const task = storage().getLibrary()[index];
        if (task.priority === 'important') {
            task.priority = '';
        } else {
            task.priority = 'important';
        }
        localStorage.setItem(`${index}`, JSON.stringify(task));
    }

    const updateObject = (index, object) => {
        const task = storage().getLibrary()[index];
        task.title = object.title;
        task.description = object.description;
        task.dueDate = object.dueDate;
        const priority = object.priority;
        const prioritySplit = priority.split(' ');
        for (let split of prioritySplit) {
            if (split === 'important') {
                task.priority = 'important';
            } else {
                task.priority = '';
            }
        }
        localStorage.setItem(`${index}`, JSON.stringify(task));
    }


    return { appendToProject, filterProjects, getTasks, updateObject, updatePriority };
}

const storage = () => {

    const getLibrary = () => {
        const library = [];
        for (let i = 0; i < localStorage.length; i++) {
            const value = JSON.parse(localStorage[i])
            const object = { i , value}
            library.push(object);
        }
        return library;
    }
            
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

        let library = [];

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

    const getProjects = () => {
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
    

    const push = (object) => {
        localStorage.setItem(`${localStorage.length}`, JSON.stringify(object));
        return;
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

    return {allTasks, filterWeek, filterImportant, getLibrary, getProjects, remove, push};
    
}





export {libraryManager, storage};
