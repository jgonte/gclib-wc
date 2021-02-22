import { VirtualNode, Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VisibleMixin, { renderWhenVisible } from '../mixins/visible/VisibleMixin';

export const renderField = Symbol('renderField');

//@ts-ignore
export abstract class Field extends
    VisibleMixin(
        SizableMixin(
            CustomElement
        )
    ) {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/Field/Field.css`
        ]
    };

    static properties = {

        name: {
            type: String
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
            [`size-${size}`]: true
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

        if (error.isVirtualText) {

            return (
                <gcl-alert type="error" message={error} closable={false} />
            );
        }
        else { // VirtualNode

            return error;
        }
    }

}