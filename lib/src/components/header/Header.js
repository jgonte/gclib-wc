import { Fragment, h, VirtualNode } from 'gclib-vdom';
import CustomElement from '../../core/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';
//@ts-ignore
export class Header extends SizableMixin(CustomElement) {
    render() {
        return (h(Fragment, null,
            this.renderTitle(),
            this.renderTools()));
    }
    renderTitle() {
        const { title, size } = this.props;
        return title !== undefined ?
            title :
            (h("div", { part: "title", class: "title", size: size },
                h("slot", { name: "title" })));
    }
    renderTools() {
        const { tool, size } = this.props;
        return tool !== undefined ?
            tool :
            (h("div", { part: "tool", class: "tool", size: size },
                h("slot", { name: "tool" })));
    }
}
Header.component = {
    styleUrls: [
        `${config.assetsFolder}/header/Header.css`
    ]
};
Header.properties = {
    /**
     * The title of the header
     */
    title: {
        type: VirtualNode
    },
    /**
     * The tools of the header
     */
    tools: {
        type: VirtualNode
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-header`, Header);