import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';

//@ts-ignore
export class Content extends CustomElement {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/content/Content.css`
        ]
    };

    static properties = {

        source: {
            type: String
        }
    };

    render() {

        const {
            source
        } = this.props;

        return (
            <iframe src={source} onload={() => {

                const frame = this.document.children[0];
                
                const {
                    scrollHeight,
                    offsetHeight,
                    clientHeight
                } = frame.contentDocument.body;

                const height = Math.max(
                    scrollHeight,
                    offsetHeight,
                    clientHeight
                );

                frame.style.height = height;

            }}></iframe>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-content`, Content);