import { VirtualNode, Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../config';
import ChildMixin from '../../core/mixins/ChildMixin';
import ValidatableMixin from '../mixins/validatable/ValidatableMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VisibleMixin, { renderWhenVisible } from '../mixins/visible/VisibleMixin';
import { RequiredValidator } from 'gclib-utils';
export const renderField = Symbol('renderField');
//@ts-ignore
export class Field extends VisibleMixin(ValidatableMixin(SizableMixin(ChildMixin(CustomElement)))) {
    constructor() {
        super();
        this.onBlur = this.onBlur.bind(this);
    }
    [renderWhenVisible]() {
        const { validationWarnings, validationErrors } = this.state;
        const { size } = this.props;
        return (h(Fragment, null,
            h("div", { class: "field" },
                this.renderLabel(),
                this[renderField]()),
            h("gcl-validation-summary", { size: size, warnings: validationWarnings, errors: validationErrors })));
    }
    renderLabel() {
        const { label, name, size, required } = this.props;
        if (label === undefined) {
            return null;
        }
        if (label.isVirtualText) {
            return (h("label", { for: name, size: size, required: required }, label));
        }
        else { // VirtualNode
            return label;
        }
    }
    hasRequiredValidator() {
        const { validators = [] } = this.props;
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
    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (attributeName === 'required') {
            if (newValue === "true") { // Add a required validator
                if (!this.hasRequiredValidator()) {
                    const { validators = [] } = this.props;
                    this.setValidators([...validators, new RequiredValidator()]);
                }
            }
            else { // remove any existing required validator
                if (this.hasRequiredValidator()) {
                    const { validators } = this.props;
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
    validate() {
        let { label } = this.props;
        const { name, value, validators } = this.props;
        // Extract the text of the label
        if (label === undefined) {
            label = name;
        }
        else if (label.isVirtualText) {
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
        validators.forEach((validator) => validator.validate(context));
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
}
Field.component = {
    styleUrls: [
        `${config.assetsFolder}/Field/Field.css`
    ]
};
Field.properties = {
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
        type: Boolean,
        mutable: true,
        reflect: true
    },
    required: {
        type: Boolean,
        mutable: true,
        reflect: true
    }
};
