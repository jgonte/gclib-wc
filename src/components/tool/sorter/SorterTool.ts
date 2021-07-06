import { Tool } from "../Tool";
import { config } from '../../config';

export const sorterChanged = 'sorterChanged';

//@ts-ignore
export class SorterTool extends Tool {

    static properties = {

        /**
         * The name of the field to sort
         */
        field: {
            type: String,
            required: true
        }
    };

    static state = {

        ascending: {}
    }

    iconName = () => {

        const {
            ascending
        } = this.state;

        if (ascending === undefined) {

            return 'arrow-down-up';
        }

        return ascending === true ?
            'arrow-up' :
            'arrow-down';
    }

    click = () => {

        let {
            ascending
        } = this.state;

        ascending = !ascending;

        this.setAscending(ascending);

        const {
            field
        } = this.props;

        this.dispatchEvent(new CustomEvent(sorterChanged, {
            detail: {
                field,
                ascending,
                sorterElement: this // Send this element to track the current sorter
            },
            bubbles: true,
            composed: true
        }));

    };
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-sorter-tool`, SorterTool);