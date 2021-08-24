// Manages hiding the content of the drop tools when clicked outside of the content of the drop tool
let _popupSrc;
const popupManager = {
    updateTarget(target) {
        if (target.isPopupSource &&
            _popupSrc === undefined) {
            _popupSrc = target;
            return;
        }
        if (target.isPopupSource) {
            if (_popupSrc !== target) {
                _popupSrc.hideContent();
                _popupSrc = target;
            }
            // else {
            //     // Do nothing
            // }
        }
        else { // Target is any other element, it might be outside of drop tool or inside the content the droptool shows
            // The global click object can pass any target
            if (_popupSrc !== undefined
                && !_popupSrc.contains(target)) {
                _popupSrc.hideContent();
                _popupSrc = undefined;
            }
        }
    }
};
window.onclick = function (event) {
    popupManager.updateTarget(event.target);
};
export default popupManager;
