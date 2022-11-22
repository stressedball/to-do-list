function makeElement(tag, className, parentElement){
    const newDiv = document.createElement(tag);
    newDiv.classList.add(className);
    document.querySelector(`${parentElement}`).appendChild(newDiv);
    return newDiv;
}

export {makeElement};