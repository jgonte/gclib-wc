import CustomElement from "../core/customElement/CustomElement";
import getAllChildren from "../core/helpers/getAllChildren";

// The elements being shown
let _shownElements: (HTMLElement | CustomElement)[] = [];

// After the setShown method gets called, the global handler gets called with the same element as a target
// So to avoid extra processing we set this variable to test if set in the global handler
let _justShown: HTMLElement | CustomElement;

const popupManager = {

    /**
     * Called when a popup source is going to show its content so other popups need to be hidden
     * @param element The popup source that is going to be shown
     */
    setShown(element: HTMLElement | CustomElement) {

        let count = _shownElements.length;

        while (count > 0) {

            const shownElement = _shownElements[count - 1]; // Peek the last element

            if (shownElement !== element &&
                !getAllChildren(shownElement as any).includes(element as any)) { // Do not close nested popups

                (shownElement as any).hideContent(); // Hide the shown element (and this causes the element to call setHidden which pops the element as well)
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
    setHidden(element: HTMLElement | CustomElement) {

        while (_shownElements.length > 0) {

            const shownElement = _shownElements[_shownElements.length - 1]; // Peek the last element

            if (shownElement !== element) { // Hide any nested elements of the element

                (shownElement as any).hideContent(); // Hide the shown element

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
    handleGlobal(target: HTMLElement | CustomElement) {

        if (_justShown !== undefined) { // If the target was just requested to shown, do nothing

            _justShown = undefined;

            return;
        }

        let count = _shownElements.length;

        while (count > 0) {

            const shownElement = _shownElements[count - 1]; // Peek the last element

            if (!shownElement.contains(target)
                && (target as any).dropdown !== shownElement) { // handle combo boxes

                (shownElement as any).hideContent(); // Hide the shown element (and this causes the element to call setHidden which pops the element as well)
            }
            else {

                break; // Done when the above condition is not longer true
            }

            --count;
        }
    }
};

window.onclick = function (event: any) {

    popupManager.handleGlobal(event.target);
}

export default popupManager;