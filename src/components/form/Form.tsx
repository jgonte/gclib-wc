import { Fragment, h } from 'gclib-vdom';
import CustomElement from "../../core/customElement/CustomElement";
import { config } from '../config';
import { DataRecord, ValidationContext } from 'gclib-utils';
import { DataFieldDescriptor } from 'gclib-utils/dist/types/data/record/Interfaces';
import Validator from 'gclib-utils/dist/types/data/validation/validators/Validator';
import { Field } from '../field/Field';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DataSingleLoadableMixin from '../mixins/data/DataSingleLoadableMixin';
import SubmittableMixin from '../mixins/data/SubmittableMixin';
import ValidatableMixin from '../mixins/validatable/ValidatableMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';
import { valueChanged } from '../mixins/valued/ValuedMixin';

//@ts-ignore
export class Form extends
    SubmittableMixin(
        DataSingleLoadableMixin(
            ValidatableMixin(
                ContainerMixin(
                    SizableMixin(
                        CustomElement
                    )
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
            validationWarnings,
            validationErrors
        } = this.state;

        const {
            size
        } = this.props;

        return (
            <Fragment>
                {this.renderLoading()}
                {this.renderError()}
                {this.renderSubmitting()}
                <form size={size}>
                    <slot />
                    <gcl-validation-summary
                        size={size}
                        warnings={validationWarnings}
                        errors={validationErrors}
                    />
                    {this.renderButtons()}
                </form>
            </Fragment>

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

            const {
                value
            } = child.props;

            if (!child.validate(value)) {

                valid = false;
            }
        });

        return valid;
    }

    reset() {

        this._record.reset();

        const data = this._record.getData();

        this.populateFields(data);
    }

    acceptChild(child: Field) {

        return child instanceof Field; // Only accept fields
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

    onLoadData(data) {

        super.onLoadData(data);

        const {
            payload
        } = data;

        this._record.initialize(payload);

        this.populateFields(payload);
    }

    private populateFields(data: any) {

        const {
            children
        } = this.state;

        const fieldsMap: Map<string, Field> = new Map(children.map(child => [child.props.name, child]));

        for (const key in data) {

            if (data.hasOwnProperty(key)) {

                const field = fieldsMap.get(key);

                if (field !== undefined) { // There might not be a field configured for the loaded value

                    field.setValue(data[key], field.onValueSet);
                }               
            }
        }
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);