import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import SizableMixin from '../mixins/sizable/SizableMixin';
/**
 * Layout component to encapsulate flexbox functionality
 */
//@ts-ignore
export class Row extends SizableMixin(CustomElement) {
    // static properties = {
    //     /**
    //      * The key to retrieve a localized value from an i18n provider
    //      */
    //     intlKey: {
    //         attribute: 'intl-key',
    //         type: String
    //     },
    //     /** 
    //      * The value of the text
    //      */
    //     value: {
    //         type: String,
    //         mutable: true,
    //         reflect: true
    //     }
    // };
    render() {
        const { size } = this.props;
        return (h(Fragment, { size: size },
            h("slot", null)));
    }
}
Row.component = {
    //shadow: false,
    styleUrls: [
        `${config.assetsFolder}/row/Row.css`
    ]
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-row`, Row);
