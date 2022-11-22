import {addDays,format,parse,parseISO,
    isWithinInterval} from 'date-fns';

let library = [];

function libraryManager() {

    const push = (object) => {
        library.push(object);
        object.index = library.indexOf(object);
    };

    const getLibrary = () => {
        return library;
    };

    const getProjects = () => {
        const filter = library.filter(el => el.type === 'project');
        return filter;
    }

    const getTasks = () => {
        const filter = library.filter(el => el.type === 'task');
        return filter;
    }

    const filterProjects = (arg) => {
        const index = arg.dataset.index;
        const projectName = library[index].title;
        const allTasks = library.filter(el => el.type === 'task');
        const filter = allTasks.filter(el => el.append === `${projectName}`);
        return filter;
    }

    const filterImportant = () => {
        const tasks = library.filter(el => el.type === 'task');
        const important = tasks.filter(el => el.priority === 'important');
        return important;
    }

    const filterWeek = () => {

        let localLibrary = [];

        const today = format(new Date(), 'yyyy-MM-dd');
        const todaySplit = today.split('-');

        let inAWeek = addDays(new Date(todaySplit[0], todaySplit[1] - 1, todaySplit[2]), 7);
        inAWeek = format(new Date(inAWeek), 'yyyy-MM-dd');
        const inAWeekSplit = inAWeek.split('-');

        for (let object of library) {
            if (object.type === 'task') {
                const newDate = object.dueDate;
                const newDateSplit = newDate.split('-');

                const isInAWeek = isWithinInterval(new Date(newDateSplit[0], newDateSplit[1], newDateSplit[2]), {
                    start: new Date(todaySplit[0], todaySplit[1], todaySplit[2]),
                    end: new Date(inAWeekSplit[0], inAWeekSplit[1], inAWeekSplit[2])
                  })
                
                if (isInAWeek === true) {
                localLibrary.push(object);
                }
            }
        }
        return localLibrary;
    }

    return { push, getLibrary, filterProjects, filterImportant,
        filterWeek, getProjects, getTasks };
}

export {libraryManager};
