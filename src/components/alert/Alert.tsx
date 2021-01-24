import { Fragment, h, VirtualNode } from "gclib-vdom";
import { config } from "../config";
import CustomElement from "../../core/CustomElement";
import { Icon } from "../../components/icon/Icon";

export class Alert extends CustomElement {

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
            value: 'info' // options: "info" | "success" | "warning" | "error"
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
        }
    };

    static state = {

        visible: {
            value: true
        }
    };

    render() {

        const {
            showIcon,
            message
        } = this.props;

        const {
            visible
        } = this.state;

        if (visible === false) {

            return null;
        }

        return (
            <Fragment class={this.getCSSClass()}>

                {
                    showIcon &&
                    <span class="icon">
                        {this.getIcon()}
                    </span>
                }

                <span class="message">
                    {message || '[Missing message]'}
                </span>

                <span class="close-button"
                    onClick={() => {
                        this.setVisible(false);
                    }}
                >
                    &times;
                </span>
            </Fragment>
        );
    }

    getIcon(): Icon {

        const {
            type,
            icon
        } = this.props;

        if (icon) {

            return icon; // Return the configured icon
        }

        switch (type) {

            case "info": return (
                <gcl-icon name="info-circle-fill" variant="primary"></gcl-icon>
            );
            case "success": return (
                <gcl-icon name="check-circle-fill" variant="success"></gcl-icon>
            );
            case "warning": return (
                <gcl-icon name="exclamation-circle-fill" variant="warning"></gcl-icon>
            );
            default: return (
                <gcl-icon name="exclamation-circle-fill" variant="danger"></gcl-icon>
            );
        }
    }

    getCSSClass() {

        const {
            type
        } = this.props;

        const {
            visible
        } = this.state;

        return {
            //...super.getCSSClass(),
            'alert': true,
            'hidden': !visible,
            [type]: true
        };
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-alert`, Alert);