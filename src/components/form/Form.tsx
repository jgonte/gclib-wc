import { DataRecord, ValidationContext } from 'gclib-utils';
import { DataFieldDescriptor } from 'gclib-utils/dist/types/data/record/Interfaces';
import Validator from 'gclib-utils/dist/types/data/validation/validators/Validator';
import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import { config } from '../config';
import { Field } from '../field/Field';
import AsyncDataSubmitableMixin from '../mixins/data/AsyncDataSubmitableMixin';
import ValidatableMixin from '../mixins/validatable/ValidatableMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';

//@ts-ignore
export class Form extends
    AsyncDataSubmitableMixin(
        ValidatableMixin(
            ContainerMixin(
                CustomElement
            )
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

        const {
            warnings,
            errors
        } = this.state;

        const {
            size
        } = this.props;

        return (
            <form>
                <slot />
                <gcl-validation-summary
                    size={size}
                    warnings={warnings}
                    errors={errors}
                />
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
            validators
        } = this.props;

        const {
            children
        } = this.state;

        let valid = true;

        const context: ValidationContext = {

            errors: [],
            warnings: []
        };

        validators.forEach((validator: Validator) => {

            if (!validator.validate(context)) {

            }
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