import { h, Fragment } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import { resourceLoader } from 'gclib-utils';

//@ts-ignore
export class Content extends CustomElement {

    static component = {

        shadow: false // Do not create a shadow DOM for this component!
    };

    static properties = {

        /**
         * The source to set the content from
         */
        source: {
            type: String
        }
    };

    render() {

        return (<Fragment></Fragment>);
    }

    async attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {

        super.attributeChangedCallback?.(attributeName, oldValue, newValue);

        if (attributeName === 'source' && oldValue !== newValue) {

            const content = await resourceLoader.get(newValue);

            this.document.innerHTML = content;
        }
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-content`, Content);