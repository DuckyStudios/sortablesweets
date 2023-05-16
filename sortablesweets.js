/**
 *  ____  _____ _____ _____ __ __  (TM)
 * |    \|  |  |     |  |  |  |  |
 * |  |  |  |  |   --|    -|_   _|
 * |____/|_____|_____|__|__| |_|  
 * 
 * Sortablesweets is a lightweight JavaScript project designed to simplify 
 * the management of sortable lists with events. It provides an intuitive 
 * drag-and-drop interface for effortlessly rearranging items within lists.
 */

const sortablelists = document.querySelectorAll('[sortable]');
const eventToCall = document.createEvent('HTMLEvents');
eventToCall.initEvent("sortupdate", true, true);

for (let index = 0; index < sortablelists.length; index++) {
    const element = sortablelists[index];

    const dummy = document.createElement('li');
    dummy.setAttribute('dummy', true);

    element.appendChild(dummy);

    for (let index = 0; index < element.children.length; index++) {
        const child = element.children[index];

        child.setAttribute('draggable', true);
        child.classList.add('cursor-grab');

        child.addEventListener('dragstart', (event) => {
            _callDragStart(child);
        });

        child.addEventListener('dragend', (event) => {
            _callDragEnd(child);
        });

        child.addEventListener('dragover', (event) => {
            _callDragging(child);
        });
    }
}

function _callDragStart(element) {
    const dummy = _getDummyDisplay(_getList(element));
    dummy.classList.add('h-1', 'bg-indigo-600', 'rounded-full', 'w-full');

    element.classList.add('opacity-50');
}

function _callDragEnd(element) {
    const dummy = _getDummyDisplay(_getList(element));
    dummy.insertAdjacentElement('beforebegin', element);
    dummy.classList.remove('h-1', 'bg-indigo-600', 'rounded-full', 'w-full');

    element.classList.remove('opacity-50');

    eventToCall.list = _getList(element);
    eventToCall.children = _getList(element).children;

    const sortage = {};

    let skipper = 0;
    for (let index = 0; index < eventToCall.children.length; index++) {
        const child = eventToCall.children[index];

        if (child.hasAttribute('dummy')) {
            skipper++;
            continue;
        }

        sortage[index - skipper] = child.id;
    }

    eventToCall.sortage = sortage;

    element.dispatchEvent(eventToCall);
}

function _callDragging(element) {
    const list = _getList(element);
    const mouseY = event.clientY;

    const nearestElement = _getNearestListElement(list, mouseY);

    if (nearestElement === null) {
        return;
    }

    _placeDummyDisplay(nearestElement);
}

function _getNearestListElement(list, mouseY) {
    const listElements = list.children;

    let nearestElement = null;
    let distance = null;

    for (let index = 0; index < listElements.length; index++) {
        const element = listElements[index];

        if (element.hasAttribute('dummy')) {
            continue;
        }

        const elementDistance = Math.abs(_getDistance(mouseY, element));

        if (distance === null || elementDistance < distance) {
            distance = elementDistance;
            nearestElement = element;
        }
    }

    return nearestElement;
}

function _getDistance(mouseY, element) {
    const elemY = element.offsetTop + element.offsetHeight / 2;
    mouseY = mouseY - window.scrollY;

    return Math.abs((elemY - mouseY) / 10) * 10;
}

function _getTopOrBottom(mouseY, element) {
    const elemY = element.offsetTop + element.offsetHeight / 2;
    mouseY = mouseY - window.scrollY;

    return elemY > mouseY ? 'top' : 'bottom';
}

function _placeDummyDisplay(element) {
    const mouseY = event.clientY;
    const dummy = _getDummyDisplay(_getList(element));
    const topOrBottom = _getTopOrBottom(mouseY, element);

    if (dummy === null) {
        return;
    }

    if (topOrBottom === 'top') {
        element.parentNode.insertBefore(dummy, element);
    } else {
        element.parentNode.insertBefore(dummy, element.nextSibling);
    }
}

function _getList(element) {
    return element.parentNode;
}

function _getDummyDisplay(list) {
    const dummy = list.querySelector('[dummy]');

    if (dummy === null) {
        return;
    }

    return dummy;
}
