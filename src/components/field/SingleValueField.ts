import { Field } from "./Field";

export const valueChanged = 'valueChanged';

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
        const input = event.target as HTMLInputElement;

        let value: any;

        switch (input.type) {
            case 'file': {

                if (input.multiple === true) {

                    value = input.files;
                }
                else {

                    value= input.files[0];
                }              
            }
            break;
            default: {
                
                value = input.value;
            }
            break;
        }

        this.setValue(value); // Update the current value

        this.dispatchEvent(new CustomEvent(valueChanged, {
            detail: {
                name,
                value
            },
            bubbles: true,
            composed: true
        }));
    }
}