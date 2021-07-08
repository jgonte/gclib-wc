import { Fragment, h, ElementNode } from 'gclib-vdom';
import { config } from '../config';
import CustomElement from '../../core/customElement/CustomElement';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DirectionMixin from '../mixins/direction/DirectionMixin';
//@ts-ignore
export class Panel extends SizableMixin(DirectionMixin(CustomElement)) {
    render() {
        return (h(Fragment, { class: "panel" },
            this.renderHeader(),
            this.renderBody(),
            this.renderFooter()));
    }
    renderHeader() {
        const { header, size, direction } = this.props;
        return header !== undefined ?
            header :
            (h("div", { part: "header", class: "header", size: size, direction: direction },
                h("slot", { name: "header" })));
    }
    renderBody() {
        const { body, size, direction } = this.props;
        return body !== undefined ?
            body :
            (h("div", { part: "body", class: "body", size: size, direction: direction },
                h("slot", { name: "body" })));
    }
    renderFooter() {
        const { footer, size, direction } = this.props;
        return footer !== undefined ?
            footer :
            (h("div", { part: "footer", class: "footer", size: size, direction: direction },
                h("slot", { name: "footer" })));
    }
}
Panel.component = {
    styleUrls: [
        `${config.assetsFolder}/Panel/Panel.css`
    ]
};
Panel.properties = {
    /**
     * The header of the panel
     */
    header: {
        type: ElementNode
    },
    /**
     * The body of the panel
     */
    body: {
        type: ElementNode
    },
    /**
     * The footer of the panel
     */
    footer: {
        type: ElementNode
    },
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-panel`, Panel);
