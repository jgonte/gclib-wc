import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
import { config } from '../../config';

/**
 * Layout component to encapsulate flexbox row functionality
 */
//@ts-ignore
export class Row extends CustomElement {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/layout/row/Row.css`
        ]
    };

    static properties = {

        /**
         * The type of the alert
         */
        justifyContent: {
            attribute: 'justify-content',
            type: String,
            value: 'space-between',
            options: ['start', 'center', 'space-around', 'space-between', 'space-evenly']
        }
    }

    render() {

        const {
            justifyContent
        } = this.props;

        return (
            <Fragment style={{ justifyContent }} >
                <slot />
            </Fragment>
        );
    }


}

//@ts-ignore
customElements.define(`${config.tagPrefix}-row`, Row);