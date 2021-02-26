import { VirtualNode, Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../config';
import ChildMixin from '../../core/mixins/ChildMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VisibleMixin, { renderWhenVisible } from '../mixins/visible/VisibleMixin';
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
            [`size-${size}`]: true
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
        if (error.isVirtualText) {
            return (h("gcl-alert", { type: "error", message: error, closable: false }));
        }
        else { // VirtualNode
            return error;
        }
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
