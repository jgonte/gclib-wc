import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../../components/config';
import { appCtrl } from 'gclib-utils';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VariantMixin from '../mixins/variant/VariantMixin';
//@ts-ignore
export class Text extends SizableMixin(VariantMixin(CustomElement)) {
    render() {
        const { value, size, variant } = this.props;
        return (h(Fragment, { size: size, variant: variant }, value !== undefined ? value : (h("slot", null))));
    }
    connectedCallback() {
        const { intlKey } = this.props;
        if (intlKey !== undefined) {
            appCtrl.intlProvider.subscribe(this);
            const value = appCtrl.intlProvider.getTranslation(this.lang, intlKey);
            this.setValue(value);
        }
        super.connectedCallback();
    }
    disconnectedCallback() {
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
     * The value of the text
     */
    value: {
        type: String,
        mutable: true,
        reflect: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-text`, Text);
