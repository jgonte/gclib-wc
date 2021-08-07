import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import { appCtrl } from 'gclib-utils';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VariantMixin from '../mixins/variant/VariantMixin';
//@ts-ignore
export class Text extends SizableMixin(VariantMixin(CustomElement)) {
    render() {
        const { intlKey, lang, size, variant, } = this.props;
        // let {
        //     value
        // } = this.props;
        let value;
        if (intlKey !== undefined) {
            value = appCtrl.intlProvider.getTranslation(lang, intlKey);
        }
        return (h(Fragment, { size: size, variant: variant }, value !== undefined ? value : (h("slot", null))));
    }
    nodeDidConnect(node) {
        var _a;
        if (node.tagName === 'STYLE') {
            return;
        }
        const { intlKey } = this.props;
        if (intlKey !== undefined) {
            appCtrl.intlProvider.subscribe(this);
            // const value = appCtrl.intlProvider.getTranslation(this.lang, intlKey);
            // this.setValue(value);
        }
        (_a = super.nodeDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
    }
    nodeWillDisconnect(node) {
        if (node.tagName === 'STYLE') {
            return;
        }
        const { intlKey } = this.props;
        if (intlKey) {
            appCtrl.intlProvider.unsubscribe(this);
        }
    }
    onLanguageChanged(provider) {
        this.setValue(provider.getTranslation(this.lang, this.intlKey));
    }
}
Text.component = {
    //shadow: false,
    styleUrls: [
        `${config.assetsFolder}/text/Text.css`
    ]
};
Text.properties = {
    /**
     * The key to retrieve a localized value from an i18n provider
     */
    intlKey: {
        attribute: 'intl-key',
        type: String
    },
    /**
     * The language to translate to
     */
    lang: {
        type: String,
        mutable: true,
        reflect: true
    },
    // /** 
    //  * The value of the text
    //  */
    // value: {
    //     type: String,
    //     mutable: true,
    //     reflect: true
    // }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-text`, Text);
