import { Tool } from "../Tool";
import { config } from '../../config';
export const dropChanged = 'dropChanged';
//@ts-ignore
export class DropTool extends Tool {
    constructor() {
        super();
        this.iconName = () => {
            const { showing } = this.state;
            if (showing === undefined) {
                return 'chevron-down';
            }
            return showing === true ?
                'chevron-up' :
                'chevron-down';
        };
        this.click = () => {
            let { showing } = this.state;
            showing = !showing;
            this.updateShowing(showing);
        };
        this.updateShowing = this.updateShowing.bind(this);
    }
    hideContent() {
        this.updateShowing(false);
    }
    updateShowing(showing) {
        this.setShowing(showing);
        this.dispatchEvent(new CustomEvent(dropChanged, {
            detail: {
                showing,
                dropElement: this // To track the element in a container if needed
            },
            bubbles: true,
            composed: true
        }));
    }
}
DropTool.state = {
    showing: {}
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-drop-tool`, DropTool);
