import {storage } from "./library-manager";

const object1 = {
    type : 'task',
    title : 'Get things done',
    description : 'Putting the hours in it.',
    priority : 'important',
    dueDate :  '2022-11-25',
    append : '',
    isDummy : true
}

const object2 = {
    type : 'task',
    title : 'More things',
    description : 'Yeah ok, I just like to fill things up with serious-like words.',
    priority : '',
    dueDate : '2022-11-30',
    append : '',
    isDummy : true
}

const object3 = {
    type : 'task',
    title : 'Another task',
    description : 'Lorem Ipsum Lorem Ipsum Lorem Ipsum yall',
    priority : 'important',
    dueDate : '2022-12-25',
    append : '',
    isDummy : true
}

const project1_tasks = {
    type : 'task',
    title : 'learn CSS',
    description : 'grid, flex, box-shadow',
    priority : 'important',
    dueDate : '2023-01-10',
    append : 'Learn web dev',
    isDummy : true
}

const project1_tasks2 = {
    type : 'task',
    title : 'JS mastery',
    description : 'what is an object',
    priority : '',
    dueDate : '2022-12-10',
    append : 'Learn web dev',
    isDummy : true
}

const project2_tasks = {
    type : 'task',
    title : 'get practice',
    description : 'follow TOP projects',
    priority : 'important',
    dueDate : '2023-02-15',
    append : 'Make cool websites',
    isDummy : true
}

const project1 = {
    type : 'project',
    title : 'Learn web dev',
    isDummy : true
}

const project2 = {
    type : 'project',
    title : 'Make cool websites',
    isDummy : true 
}

function dummyDisplay() {
    const dummies = [project1, project1_tasks, project1_tasks2, project2, project2_tasks, object1, object2, object3];

    if (localStorage.length === 0) {
        for (let dummy of dummies) {
            storage().push(dummy);
        }
    }

}

export {dummyDisplay};