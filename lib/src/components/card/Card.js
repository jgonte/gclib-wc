import { Fragment, h, VirtualNode } from 'gclib-vdom';
import { config } from '../config';
import CustomElement from '../../core/CustomElement';
import SizableMixin from '../mixins/sizable/SizableMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';
//@ts-ignore
export class Card extends SizableMixin(ContainerMixin(CustomElement)) {
    render() {
        return (h(Fragment, null,
            this.renderHeader(),
            this.renderMessage(),
            this.renderCloseButton()));
    }
    renderHeader() {
        const { header } = this.props;
        return header !== undefined ?
            header :
            null;
    }
    renderMessage() {
        const { message, size } = this.props;
        if (message === undefined) {
            return null;
        }
        if (message.isVirtualText) {
            return (h("gcl-text", { variant: this.getVariant(), size: size }, message));
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
        const { closable, close, size } = this.props;
        if (closable !== true) {
            return null;
        }
        return (h("span", { class: "close-button", onClick: () => close === null || close === void 0 ? void 0 : close() },
            h("gcl-text", { variant: this.getVariant(), size: size }, "\u00D7")));
    }
    getCSSClass() {
        let cssClass;
        if (super.getCSSClass) {
            cssClass = super.getCSSClass();
        }
        const { type } = this.props;
        return Object.assign(Object.assign({}, cssClass), { 'Card': true, [type]: true });
    }
}
Card.component = {
    styleUrls: [
        `${config.assetsFolder}/card/Card.css`
    ]
};
Card.properties = {
    /**
     * The header of the card
     */
    header: {
        type: VirtualNode
    },
    /**
     * The body of the card
     */
    body: {
        type: VirtualNode
    },
    /**
     * The footer of the card
     */
    footer: {
        type: VirtualNode
    },
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-Card`, Card);
