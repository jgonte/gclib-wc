import { VirtualNode, Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../config';
import ChildMixin from '../../core/mixins/ChildMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VisibleMixin, { renderWhenVisible } from '../mixins/visible/VisibleMixin';
import { RequiredValidator } from 'gclib-utils';
export const renderField = Symbol('renderField');
//@ts-ignore
export class Field extends VisibleMixin(SizableMixin(ChildMixin(CustomElement))) {
    [renderWhenVisible]() {
        return (h(Fragment, { class: this.getCSSClass() },
            h("div", { class: "field" },
                this.renderLabel(),
                this[renderField]()),
            this.renderError()));
    }
    renderLabel() {
        const { label, name, size } = this.props;
        if (label === undefined) {
            return null;
        }
        const cssClass = {
            "field-label": true,
            [`size-${size}`]: true,
            "required": this.isRequired()
        };
        if (label.isVirtualText) {
            return (h("label", { class: cssClass, for: name }, label));
        }
        else { // VirtualNode
            return label;
        }
    }
    renderError() {
        const { error } = this.props;
        if (error === undefined) {
            return null;
        }
        if (error.isVirtualText || typeof error === 'string') {
            return (h("gcl-alert", { type: "error", message: error, closable: false }));
        }
        else { // VirtualNode
            return error;
        }
    }
    isRequired() {
        const { required } = this.props;
        return required || this.hasRequiredValidator();
    }
    hasRequiredValidator() {
        const { validators = [] } = this.props;
        return validators.filter(v => v instanceof RequiredValidator).length > 1;
    }
    onValidationFailed(error) {
        this.setError(error);
    }
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        let { validationFailedHandler } = this.props;
        if (validationFailedHandler === undefined) {
            this.setValidationFailedHandler(this);
        }
    }
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
    error: {
        type: VirtualNode,
        mutable: true
    },
    disabled: {
        type: Boolean
    },
    required: {
        type: Boolean
    },
    validators: {
        type: Array,
        mutable: true
    },
    validationFailedHandler: {
        type: Object,
        mutable: true
    }
};
