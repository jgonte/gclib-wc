import { Fragment, h, VirtualNode } from 'gclib-vdom';
import { config } from '../config';
import CustomElement from '../../core/CustomElement';
import { Icon } from '../../components/icon/Icon';
import SizableMixin from '../mixins/sizable/SizableMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';
//@ts-ignore
export class Alert extends SizableMixin(ContainerMixin(CustomElement)) {
    render() {
        return (h(Fragment, { class: this.getCSSClass() },
            this.renderIcon(),
            this.renderMessage(),
            this.renderCloseButton()));
    }
    renderIcon() {
        const { showIcon, icon } = this.props;
        if (showIcon !== true) {
            return null;
        }
        return icon !== undefined ?
            { icon } :
            (h("gcl-icon", { name: this.getDefaultIcon(), variant: this.getVariant() }));
    }
    renderMessage() {
        const { message } = this.props;
        if (message === undefined) {
            return null;
        }
        if (message.isVirtualText) {
            return (h("gcl-text", { variant: this.getVariant() }, message));
        }
        else { // VirtualNode
            return message;
        }
    }
    getDefaultIcon() {
        const { type } = this.props;
        switch (type) {
            case "info": return "info-circle-fill";
            case "success": return "check-circle-fill";
            case "warning": return "exclamation-circle-fill";
            default: return "exclamation-circle-fill";
        }
    }
    getVariant() {
        const { type } = this.props;
        switch (type) {
            case "info": return "primary";
            case "success": return "success";
            case "warning": return "warning";
            default: return "danger";
        }
    }
    renderCloseButton() {
        const { closable, close } = this.props;
        if (closable !== true) {
            return null;
        }
        return (h("span", { class: "close-button", onClick: () => close === null || close === void 0 ? void 0 : close() },
            h("gcl-text", { variant: this.getVariant() }, "\u00D7")));
    }
    getCSSClass() {
        let cssClass;
        if (super.getCSSClass) {
            cssClass = super.getCSSClass();
        }
        const { type } = this.props;
        return Object.assign(Object.assign({}, cssClass), { 'alert': true, [type]: true });
    }
}
Alert.component = {
    styleUrls: [
        `${config.assetsFolder}/alert/Alert.css`
    ]
};
Alert.properties = {
    /**
     * The type of the alert
     */
    type: {
        type: String,
        value: 'info',
        options: ['info', 'success', 'warning', 'error']
    },
    /**
     * The icon of the alert
     */
    icon: {
        type: Icon
    },
    /**
     * Whether to show the icon
     */
    showIcon: {
        type: Boolean,
        value: true
    },
    /**
     * The message of the alert
     */
    message: {
        type: VirtualNode
    },
    /**
     * Whether the alert has a close button
     */
    closable: {
        type: Boolean,
        value: true
    },
    /**
     * What action to execute when the alert has been closed
     */
    close: {
        type: Function
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-alert`, Alert);
