import { Field } from "./Field";
//@ts-ignore
export class SingleValueField extends Field {
    constructor() {
        super();
        this.onChange = this.onChange.bind(this);
    }
    onChange(event) {
        const { name } = this.props;
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
SingleValueField.properties = {
    value: {
        type: String,
        mutable: true,
        reflect: true
    }
};
