import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
//@ts-ignore
export class Content extends CustomElement {
    render() {
        const { source } = this.props;
        return (h("iframe", { src: source, onload: () => {
                const frame = this.document.children[0];
                const { scrollHeight, offsetHeight, clientHeight } = frame.contentDocument.body;
                const height = Math.max(scrollHeight, offsetHeight, clientHeight);
                frame.style.height = height;
            } }));
    }
}
Content.component = {
    styleUrls: [
        `${config.assetsFolder}/content/Content.css`
    ]
};
Content.properties = {
    source: {
        type: String
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-content`, Content);
