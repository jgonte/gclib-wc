import { VirtualNode, Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../config';
import ChildMixin from '../../core/mixins/ChildMixin';
import ValidatableMixin from '../mixins/validatable/ValidatableMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VisibleMixin, { renderWhenVisible } from '../mixins/visible/VisibleMixin';
import { DataFieldModel, RequiredValidator } from 'gclib-utils';
import { ValidationFailedHandler } from 'gclib-utils/dist/types/data/validation/Interfaces';

export const renderField = Symbol('renderField');

//@ts-ignore
export abstract class Field extends
    VisibleMixin(
        ValidatableMixin(
            SizableMixin(
                ChildMixin(
                    CustomElement
                )
            )
        )
    ) implements DataFieldModel, ValidationFailedHandler {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/Field/Field.css`
        ]
    };

    static properties = {

        name: {
            type: String
        },

        isId: {
            type: Boolean,
            value: false
        },

        type: {
            type: Function
        },

        label: {
            type: VirtualNode
        },

        disabled: {
            type: Boolean
        },

        required: {
            type: Boolean
        },

        // validationFailedHandler: {
        //     type: Object,
        //     mutable: true
        // }
    };



    constructor() {

        super();

        this.onBlur = this.onBlur.bind(this);
    }

    [renderWhenVisible]() {

        return (
            <Fragment class={this.getCSSClass()}>
                <div class="field">
                    {this.renderLabel()}
                    {(this as any)[renderField]()}
                </div>
                {this.renderWarnings()}
                {this.renderErrors()}
            </Fragment>
        );
    }

    renderLabel() {

        const {
            label,
            name,
            size
        } = this.props;

        if (label === undefined) {

            return null;
        }

        const cssClass = {
            "field-label": true,
            [`size-${size}`]: true,
            "required": this.isRequired()
        };

        if (label.isVirtualText) {

            return (
                <label class={cssClass} for={name}>
                    {label}
                </label>
            );
        }
        else { // VirtualNode

            return label;
        }
    }

    isRequired(): boolean {

        const {
            required
        } = this.props;

        return required || this.hasRequiredValidator();
    }

    hasRequiredValidator(): boolean {

        const {
            validators = []
        } = this.props;

        return validators.filter(v => v instanceof RequiredValidator).length > 1;
    }

    // onValidationFailed(error: string): void {

    //     this.setError(error);
    // }

    // connectedCallback() {

    //     super.connectedCallback?.();

    //     let {
    //         validationFailedHandler
    //     } = this.props;

    //     if (validationFailedHandler === undefined) {

    //         this.setValidationFailedHandler(this);
    //     }
    // }

    attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {

        if (attributeName === 'required') {

            if (newValue === "true") { // Add a required validator

                if (!this.hasRequiredValidator()) {

                    const {
                        validators = []
                    } = this.props;

                    this.setValidators([...validators, new RequiredValidator()]);
                }
            }
            else { // remove any existing required validator

                if (this.hasRequiredValidator()) {

                    const {
                        validators
                    } = this.props;

                    const requiredValidator = validators.filter(v => v instanceof RequiredValidator)[0];

                    if (requiredValidator !== undefined) {

                        const index = validators.indexOf(requiredValidator);

                        validators.splice(index, 1);

                        this.setValidators([validators]);
                    }
                }
            }
        }

        super.attributeChangedCallback(attributeName, oldValue, newValue);
    }

    onBlur() {

        this.validate();
    }

    validate(): boolean {

        let {
            label
        } = this.props;

        const {
            name
        } = this.props;

        // Extract the text of the label
        if (label === undefined) {

            label = name;
        }
        else if (label.isVirtualText) {

            label = label.text;
        }

        const context = {
            errors: [],
            warnings: [],
            label
        };

        this.dataField.validate(context);

        if (context.warnings.length > 0) {

            this.setWarnings(context.warnings);
        }

        if (context.errors.length > 0) {

            this.setErrors(context.errors);

            return false;
        }

        return true;
    }
}