import CustomElement from "../core/customElement/CustomElement";
import getAllChildren from "../core/helpers/getAllChildren";

// Manages hiding the content of the drop tools when clicked outside of the content of the drop tool
let _popupSrc: HTMLElement | CustomElement;

const popupManager = {

    updateTarget(target: HTMLElement | CustomElement): void {

        if ((target as any).isPopupSource &&
            _popupSrc === undefined) {

            _popupSrc = target;

            return;
        }

        if ((target as any).isPopupSource) {

            if (_popupSrc !== target
                && !getAllChildren(_popupSrc as any).includes(target as any)) { // Do not close nested popups

                (_popupSrc as any).hideContent();

                _popupSrc = target;
            }
            // else {
            //     // Do nothing
            // }
        }
        else { // Target is any other element, it might be outside of drop tool or inside the content the droptool shows

            // The global click object can pass any target
            if (_popupSrc !== undefined
                && !_popupSrc.contains(target)
                && (target as any).dropdown !== _popupSrc) { // handle combo boxes

                (_popupSrc as any).hideContent();

                _popupSrc = undefined;
            }

        }
    },

    reset() {

        _popupSrc = undefined;
    }
};

window.onclick = function (event: any) {

    popupManager.updateTarget(event.target);
}

export default popupManager;