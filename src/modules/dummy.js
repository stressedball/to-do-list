import { libraryManager } from "./library-manager";

const object1 = {
    type : 'task',
    title : 'Get things done',
    description : 'Putting the hours in it.',
    priority : 'important',
    dueDate :  '2022-11-25',
    append : ''
}

const object2 = {
    type : 'task',
    title : 'More things',
    description : 'Yeah ok, I just like to fill things up with serious-like words.',
    priority : '',
    dueDate : '2022-11-30',
    append : ''
}

const object3 = {
    type : 'task',
    title : 'Another task',
    description : 'Lorem Ipsum Lorem Ipsum Lorem Ipsum yall',
    priority : 'important',
    dueDate : '2022-12-25',
    append : ''
}

const project1_tasks = {
    type : 'task',
    title : 'learn CSS',
    description : 'grid, flex, box-shadow',
    priority : 'important',
    dueDate : '2023-01-10',
    append : 'Learn web dev'
}

const project1_tasks2 = {
    type : 'task',
    title : 'JS mastery',
    description : 'what is an object',
    priority : '',
    dueDate : '2022-12-10',
    append : 'Learn web dev'
}

const project2_tasks = {
    type : 'task',
    title : 'get practice',
    description : 'follow TOP projects',
    priority : 'important',
    dueDate : '2023-02-15',
    append : 'Make cool websites'
}

const project1 = {
    type : 'project',
    title : 'Learn web dev',
}

const project2 = {
    type : 'project',
    title : 'Make cool websites',
}

function dummyDisplay() {
    libraryManager().push(project1);
    libraryManager().push(project2);
    libraryManager().push(object1);
    libraryManager().push(object2);
    libraryManager().push(object3);
    libraryManager().push(project1_tasks);
    libraryManager().push(project1_tasks2);
    libraryManager().push(project2_tasks);
}

export {dummyDisplay};