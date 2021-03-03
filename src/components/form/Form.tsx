import { DataRecord } from 'gclib-utils';
import { DataFieldDescriptor } from 'gclib-utils/dist/types/data/record/Interfaces';
import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import ContainerMixin from '../../core/mixins/ContainerMixin';
import { config } from '../config';
import { Field } from '../field/Field';
import AsyncDataSubmitableMixin from '../mixins/data/AsyncDataSubmitableMixin';

//@ts-ignore
export class Form extends
    AsyncDataSubmitableMixin(
        ContainerMixin(
            CustomElement
        )
    ) {

    private _record: DataRecord = new DataRecord();

    static component = {

        styleUrls: [
            `${config.assetsFolder}/form/Form.css`
        ]
    };

    static properties = {

        /** The validators of the form */
        validators: {
            type: Array,
            mutable: true,
            value: []
        }
    };

    constructor() {

        super();

        this.reset = this.reset.bind(this);
    }

    render() {

        return (
            <form>
                {/* {this.renderErrors()} */}
                <slot />
                {this.renderButtons()}
            </form>
        );
    }

    renderButtons() {

        return (
            <div>
                <gcl-button onClick={this.reset} variant="secondary">
                    Reset
                </gcl-button>
                <gcl-button onClick={this.submit} variant="primary">
                    Submit
                </gcl-button>
            </div>
        );
    }

    submit() {

        if (this.validate()) {

            super.submit();
        }
    }

    validate(): boolean {

        const {
            children,
            validators
        } = this.props;

        let valid = true;

        const context = {

            errors: [],
            warnings: []
        };

        validators.forEach(validator => {

        });

        children.forEach((child: Field) => {

            if (!child.validate()) {

                valid = false;
            }
        });

        return valid;
    }

    reset() {

        this._record.reset();
    }

    onChildAdded(child: Field) {

        child.dataField = this._record.addField(child.props as DataFieldDescriptor);
    }

    onChildRemoved(child: Field) {

        this._record.removeField(child.props as DataFieldDescriptor);

        child.dataField = undefined;
    }

    connectedCallback() {

        super.connectedCallback?.();

        // Pass the properties to the data record

    }

}

//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);