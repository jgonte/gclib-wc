import { Dropdown } from "./Dropdown";

// Manages hiding the dropdowns when clicked outside
let _shown: Dropdown;

const dropdownManager = {

    setShown(shown: Dropdown) {

        _shown = shown;
    },

    hideShown(target: Dropdown) {

        if (_shown === undefined ||
            _shown === target) {

            return;
        }

        if (target.dropdown !== undefined &&
            target.dropdown === _shown) {

            return;
        }

        if (Array.from(_shown.childNodes).includes(target)) { // TODO: Check for children recursively?

            return;
        }

        _shown.hide();
    }
};

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {

    dropdownManager.hideShown(event.target);
}

export default dropdownManager;