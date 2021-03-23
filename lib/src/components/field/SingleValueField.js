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
        //this.setValue(value); // Do not update the current value, since it can keep changing
        this.validate(value); // Validate the field on input
    }
    onChange(event) {
        const { name } = this.props;
        // Retrieve the new value
        const input = event.target;
        const value = this.getNewValue(input);
        this.setValue(value, this.onValueSet); // Update the current value
        //this.validate(value); // No need to validate again since this happens on input
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
                    const { files } = input;
                    if (files.length === 0) { // No files selected
                        return value;
                    }
                    if (input.multiple === true) {
                        value = Array.from(files).map(f => {
                            return {
                                name: f.name,
                                type: f.type,
                                size: f.size,
                                content: URL.createObjectURL(f)
                            };
                        });
                    }
                    else {
                        const f = files[0];
                        value = {
                            name: f.name,
                            type: f.type,
                            size: f.size,
                            content: URL.createObjectURL(f)
                        };
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
        type: Object,
        mutable: true,
        reflect: true
    }
};
