import { Fragment, h, VirtualNode } from 'gclib-vdom';
import { config } from '../config';
import CustomElement from '../../core/customElement/CustomElement';
import { Icon } from '../../components/icon/Icon';
import SizableMixin from '../mixins/sizable/SizableMixin';
import ContainerMixin from '../../core/mixins/ContainerMixin';

//@ts-ignore
export class Alert extends
    SizableMixin(
        ContainerMixin(
            CustomElement
        )
    ) {

    static component = {
        styleUrls: [
            `${config.assetsFolder}/alert/Alert.css`
        ]
    };

    static properties = {

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

    render() {

        const {
            type,
            size
        } =this.props;

        return (
            <Fragment class="alert" type={type} size={size}>
                {this.renderIcon()}
                {this.renderMessage()}
                {this.renderCloseButton()}
            </Fragment>
        );
    }

    renderIcon(): Icon {

        const {
            showIcon,
            icon,
            size
        } = this.props;

        if (showIcon !== true) {

            return null;
        }

        return icon !== undefined ?
            { icon } :
            (
                <gcl-icon name={this.getDefaultIcon()} variant={this.getVariant()} size={size}></gcl-icon>
            );
    }

    renderMessage() {

        const {
            message,
            size
        } = this.props;

        if (message === undefined) {

            return null;
        }

        if (message.isVirtualText) {

            return (
                <gcl-text variant={this.getVariant()} size={size} style="max-width: 80%;" >
                    {message}
                </gcl-text>
            );
        }
        else { // VirtualNode

            return message;
        }
    }

    getDefaultIcon() {

        const {
            type
        } = this.props;

        switch (type) {
            case "info": return "info-circle-fill";
            case "success": return "check-circle-fill";
            case "warning": return "exclamation-circle-fill";
            default: return "exclamation-circle-fill";
        }
    }

    getVariant() {

        const {
            type
        } = this.props;

        switch (type) {
            case "info": return "primary";
            case "success": return "success";
            case "warning": return "warning";
            default: return "danger";
        }
    }

    renderCloseButton() {

        const {
            closable,
            close,
            size
        } = this.props;

        if (closable !== true) {

            return null;
        }

        return (
            <span class="close-button"
                onClick={() => close?.()}
            >
                <gcl-text variant={this.getVariant()} size={size}>
                    &times;
                </gcl-text>

            </span>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-alert`, Alert);