import { Tool } from "../Tool";
import { config } from '../../config';

export const dropChanged = 'dropChanged';

//@ts-ignore
export class DropTool extends Tool {

    static state = {

        showing: {}
    }

    constructor() {

        super();

        this.updateShowing = this.updateShowing.bind(this);
    }

    iconName = () => {

        const {
            showing
        } = this.state;

        if (showing === undefined) {

            return 'chevron-down';
        }

        return showing === true ?
            'chevron-up' :
            'chevron-down';
    }

    hideContent() {

        this.updateShowing(false);
    }

    updateShowing(showing: boolean) : void {

        this.setShowing(showing);

        this.dispatchEvent(new CustomEvent(dropChanged, {
            detail: {
                showing,
                dropElement: this // To track the element in a container/manager if needed
            },
            bubbles: true,
            composed: true
        }));
    }

    click = () => {

        let {
            showing
        } = this.state;

        showing = !showing;

        this.updateShowing(showing);
    };
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-drop-tool`, DropTool);