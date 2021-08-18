import { ElementNode, Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import ChildMixin from '../../core/mixins/ChildMixin';
import ValidatableMixin from '../mixins/validatable/ValidatableMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VisibleMixin, { renderWhenVisible } from '../mixins/visible/VisibleMixin';
import { DataFieldModel, RequiredValidator } from 'gclib-utils';
import Validator from 'gclib-utils/dist/types/data/validation/validators/Validator';
import ValuedMixin from '../mixins/valued/ValuedMixin';
import { selectionChanged } from '../mixins/selectable/SelectableMixin';

export const renderField = Symbol('renderField');

//@ts-ignore
export abstract class Field extends
    VisibleMixin(
        ValidatableMixin(
            SizableMixin(
                ChildMixin(
                    ValuedMixin(
                        CustomElement
                    )
                )
            )
        )
    ) implements DataFieldModel {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/field/Field.css`
        ]
    };

    static properties = {

        label: {
            type: ElementNode
        },

        disabled: {
            type: Boolean,
            mutable: true,
            reflect: true
        },

        required: {
            type: Boolean,
            mutable: true,
            reflect: true
        },

        /**
         * Custom input handler
         */
        input: {
            type: Function
        },

        /**
         * Custom change handler
         */
        change: {
            type: Function
        }
    };

    constructor() {

        super();

        this.onBlur = this.onBlur.bind(this);

        this.onInput = this.onInput.bind(this);

        this.onChange = this.onChange.bind(this);
    }

    connectedCallback() {

        super.connectedCallback?.();

        this.addEventListener(selectionChanged, this.handleSelectionChanged);
    }

    disconnectedCallback() {

        super.disconnectedCallback?.();

        this.removeEventListener(selectionChanged, this.handleSelectionChanged);
    }

    handleSelectionChanged(event) {

        let {
            selection
        } = event.detail;

        selection = selection || [];

        switch (selection.length) {

            case 0: // No selection
                {
                    this.validate(undefined);
                }
                break;
            case 1: // Single selection
                {
                    this.validate(selection[0]);
                }
                break;
            default:
                {
                    this.validate(selection);
                }
        }
    }

    [renderWhenVisible]() {

        const {
            validationWarnings,
            validationErrors
        } = this.state;

        const {
            size
        } = this.props;

        return (
            <Fragment>
                <gcl-row>
                    <gcl-row>
                        <slot name="before-label" />
                        {this.renderLabel()}
                        <slot name="after-label" />
                    </gcl-row>
                    {(this as any)[renderField]()}
                </gcl-row>
                <gcl-validation-summary
                    size={size}
                    warnings={validationWarnings}
                    errors={validationErrors}
                />
            </Fragment>
        );
    }

    renderLabel() {

        const {
            label,
            name,
            size,
            required
        } = this.props;

        if (label === undefined) {

            return null;
        }

        if (label.isText) {

            return (
                <label for={name} size={size} required={required}>
                    {label}
                </label>
            );
        }
        else { // ElementNode

            return label;
        }
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

            if (newValue !== "false") { // Add a required validator

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

        //this.validate();
    }

    /**
     * Validates a field against a given value
     * @param value The value to validate
     * @returns true is the value is valid, false otherwise
     */
    validate(value: string): boolean {

        let {
            label
        } = this.props;

        const {
            name,
            validators
        } = this.props;

        // Extract the text of the label
        if (label === undefined) {

            label = name;
        }
        else if (label.isText) {

            label = label.text;
        }

        // Reset warnings and errors
        this.setValidationWarnings([]);

        this.setValidationErrors([]);

        const context = {
            errors: [],
            warnings: [],
            label,
            value
        };

        // Validate
        validators.forEach((validator: Validator) => validator.validate(context));

        // Show warnings and errors
        if (context.warnings.length > 0) {

            this.setValidationWarnings(context.warnings);
        }

        if (context.errors.length > 0) {

            this.setValidationErrors(context.errors);

            return false;
        }

        return true;
    }

    onInput(event) {

        // Retrieve the new value
        const target = event.target as HTMLInputElement;

        const value = this.getNewValue(target);

        //this.setValue(value); // Do not update the current value, since it can keep changing

        const valid = this.validate(value); // Validate the field on input

        if (!valid) {

            return;
        }

        const {
            input
        } = this.props;

        if (input !== undefined) {

            input(value);
        }
    }

    onChange(event) {

        const {
            change
        } = this.props;

        // Retrieve the new value
        const target = event.target as HTMLInputElement;

        const value = this.getNewValue(target);

        if (change !== undefined) {

            change(value);
        }
        else {

            this.updateValue(value);
        }
    }

    getNewValue(input: HTMLInputElement): any {

        let value: any;

        switch (input.type) {
            case 'file':
                {
                    const {
                        files
                    } = input;

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