import { Field } from "./Field";
export const valueChanged = 'valueChanged';
//@ts-ignore
export class SingleValueField extends Field {
    constructor() {
        super();
        this.onInput = this.onInput.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onInput(event) {
        // Retrieve the new value
        const input = event.target;
        const value = this.getNewValue(input);
        this.setValue(value); // Update the current value
        this.validate(); // Validate the field on change
    }
    onChange(event) {
        const { name } = this.props;
        // Retrieve the new value
        const input = event.target;
        const value = this.getNewValue(input);
        this.setValue(value); // Update the current value
        this.validate(); // Validate the field on change
        this.dispatchEvent(new CustomEvent(valueChanged, {
            detail: {
                name,
                value
            },
            bubbles: true,
            composed: true
        }));
    }
    getNewValue(input) {
        let value;
        switch (input.type) {
            case 'file':
                {
                    if (input.multiple === true) {
                        value = input.files;
                    }
                    else {
                        value = input.files[0];
                    }
                }
                break;
            default:
                {
                    value = input.value;
                }
                break;
        }
        return value;
    }
}
SingleValueField.properties = {
    value: {
        type: String,
        mutable: true,
        reflect: true
    }
};
