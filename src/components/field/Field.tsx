import { VirtualNode, Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../config';
import ChildMixin from '../../core/mixins/ChildMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VisibleMixin, { renderWhenVisible } from '../mixins/visible/VisibleMixin';
import { DataFieldModel, RequiredValidator } from 'gclib-utils';
import { ValidationFailedHandler } from 'gclib-utils/dist/types/data/validation/Interfaces';

export const renderField = Symbol('renderField');

//@ts-ignore
export abstract class Field extends
    VisibleMixin(
        SizableMixin(
            ChildMixin(
                CustomElement
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

    [renderWhenVisible]() {

        return (
            <Fragment class={this.getCSSClass()}>
                <div class="field">
                    {this.renderLabel()}
                    {(this as any)[renderField]()}
                </div>
                {this.renderError()}
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

    renderError() {

        const {
            error
        } = this.props;

        if (error === undefined) {

            return null;
        }

        if (error.isVirtualText || typeof error === 'string') {

            return (
                <gcl-alert type="error" message={error} closable={false} />
            );
        }
        else { // VirtualNode

            return error;
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

    onValidationFailed(error: string): void {

        this.setError(error);
    }

    connectedCallback() {

        super.connectedCallback?.();

        let {
            validationFailedHandler
        } = this.props;

        if (validationFailedHandler === undefined) {

            this.setValidationFailedHandler(this);
        }
    }

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
}