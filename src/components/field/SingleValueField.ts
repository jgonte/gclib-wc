import { Field } from "./Field";

//@ts-ignore
export abstract class SingleValueField extends Field {

    static properties = {

        value: {
            type: String,
            mutable: true,
            reflect: true
        }
    };

    constructor() {

        super();

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {

        const {
            name
        } = this.props;

        // Retrieve the new value
        const value = event.target.value;

        this.setValue(value); // Update the current value

        this.dispatchEvent(new CustomEvent('valueChanged', {
            detail: {
                name,
                value
            },
            bubbles: true,
            composed: true
        }));
    }
}