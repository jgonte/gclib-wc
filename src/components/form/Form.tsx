import { DataRecord, ValidationContext } from 'gclib-utils';
import { DataFieldDescriptor } from 'gclib-utils/dist/types/data/record/Interfaces';
import Validator from 'gclib-utils/dist/types/data/validation/validators/Validator';
import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import { config } from '../config';
import { Field } from '../field/Field';
import AsyncDataSubmitableMixin, { renderSubmitting } from '../mixins/data/AsyncDataSubmitableMixin';
import ValidatableMixin from '../mixins/validatable/ValidatableMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';
import { valueChanged } from '../field/SingleValueField';
import { renderDerived } from '../mixins/Internals';
import ErrorableMixin, { renderError } from '../mixins/errorable/ErrorableMixin';

//@ts-ignore
export class Form extends
    AsyncDataSubmitableMixin(
        ErrorableMixin(
            ValidatableMixin(
                ContainerMixin(
                    CustomElement
                )
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
            error,
            submitting
        } = this.state;

        if (error !== undefined) {

            return this[renderError as any]();
        }

        if (submitting === true) {

            return this[renderSubmitting as any]();
        }

        return this[renderDerived]();
    }

    [renderDerived]() {

        const {
            validationWarnings,
            validationErrors
        } = this.state;

        const {
            size
        } = this.props;

        return (
            <form>
                <slot />
                <gcl-validation-summary
                    size={size}
                    warnings={validationWarnings}
                    errors={validationErrors}
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

    /** Called to retrieve the data to send the server */
    getSubmitData() {

        const data = this._record.getData();

        console.log(JSON.stringify(data));

        return data;
    }

    connectedCallback() {

        super.connectedCallback?.();

        this.addEventListener(valueChanged, this.onValueChanged);

        // Pass the properties to the data record

    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        this.removeEventListener(valueChanged, this.onValueChanged);
    }

    onValueChanged(event: CustomEvent) {

        const {
            name,
            value
        } = event.detail;

        console.log('valueChanged: ' + JSON.stringify(event.detail));

        this._record.setData({
            [name]: value
        })

        event.stopPropagation();
    }

    handleSubmitResponse(data: any) {

        console.log(JSON.stringify(data));

        this._record.setData(data);
    }

}

//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);