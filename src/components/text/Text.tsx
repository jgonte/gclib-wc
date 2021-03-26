import { Fragment, h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import { appCtrl } from 'gclib-utils';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VariantMixin from '../mixins/variant/VariantMixin';

//@ts-ignore
export class Text extends
    SizableMixin(
        VariantMixin(
            CustomElement
        )
    ) {

    static component = {

        //shadow: false,

        styleUrls: [
            `${config.assetsFolder}/text/Text.css`
        ]
    };

    static properties = {

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

    render() {

        const { 
            value,
            size,
            variant
        } = this.props;

        return (
            <Fragment size={size} variant={variant}>
                {value !== undefined ? value : (<slot />)}
            </Fragment>
        );
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

//@ts-ignore
customElements.define(`${config.tagPrefix}-text`, Text);