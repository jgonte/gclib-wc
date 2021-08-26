import getAllChildren from "../core/helpers/getAllChildren";
// Manages hiding the content of the drop tools when clicked outside of the content of the drop tool
//let _popupSrc: HTMLElement | CustomElement;
// The elements being shown
let _shownElements = [];
// After the setShown method gets called, the global handler gets called with the same element as a target
// So to avoid extra processing we set this variable to test if set in the global handler
let _justShown;
const popupManager = {
    /**
     * Called when a popup source is going to show its content so other popups need to be hidden
     * @param element The popup source that is going to be shown
     */
    setShown(element) {
        let count = _shownElements.length;
        while (count > 0) {
            const shownElement = _shownElements[count - 1]; // Peek the last element
            if (shownElement !== element &&
                !getAllChildren(shownElement).includes(element)) { // Do not close nested popups
                shownElement.hideContent(); // Hide the shown element (and this causes the element to call setHidden which pops the element as well)
            }
            --count;
        }
        _shownElements.push(element);
        _justShown = element;
    },
    /**
     * Called when a popup source is going to hide its content so it can be removed from the shown items in the manager
     * @param element  The popup source that is going to be hidden
     */
    setHidden(element) {
        while (_shownElements.length > 0) {
            const shownElement = _shownElements[_shownElements.length - 1]; // Peek the last element
            if (shownElement !== element) { // Hide any nested elements of the element
                shownElement.hideContent(); // Hide the shown element
                _shownElements.pop(); // Remove the now hidden element
            }
            else { // Remove the element itself
                _shownElements.pop(); // Remove the now hidden element
                break; // Done
            }
        }
    },
    /**
     * Any target clicked and captured using the global click handler
     * @param target
     */
    handleGlobal(target) {
        if (_justShown !== undefined) { // If the target was just requested to shown, do nothing
            _justShown = undefined;
            return;
        }
        let count = _shownElements.length;
        while (count > 0) {
            const shownElement = _shownElements[count - 1]; // Peek the last element
            if (!shownElement.contains(target)
                && target.dropdown !== shownElement) { // handle combo boxes
                shownElement.hideContent(); // Hide the shown element (and this causes the element to call setHidden which pops the element as well)
            }
            else {
                break; // Done when the above condition is not longer true
            }
            --count;
        }
    }
};
window.onclick = function (event) {
    popupManager.handleGlobal(event.target);
};
export default popupManager;
