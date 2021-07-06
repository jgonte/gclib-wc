import { Tool } from "../Tool";
import { config } from '../../config';
export const sorterChanged = 'sorterChanged';
//@ts-ignore
export class SorterTool extends Tool {
    constructor() {
        super(...arguments);
        this.iconName = () => {
            const { ascending } = this.state;
            if (ascending === undefined) {
                return 'arrow-down-up';
            }
            return ascending === true ?
                'arrow-up' :
                'arrow-down';
        };
        this.click = () => {
            let { ascending } = this.state;
            ascending = !ascending;
            this.setAscending(ascending);
            const { field } = this.props;
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
}
SorterTool.properties = {
    /**
     * The name of the field to sort
     */
    field: {
        type: String,
        required: true
    }
};
SorterTool.state = {
    ascending: {}
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-sorter-tool`, SorterTool);
