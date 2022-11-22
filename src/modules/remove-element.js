function removeElement(target) {
    const parentElement = document.querySelector(`${target}`).parentElement;
    parentElement.removeChild(document.querySelector(`${target}`));
}

export  {removeElement};