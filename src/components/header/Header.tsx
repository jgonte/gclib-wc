import { Fragment, h, VirtualNode } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import SizableMixin from '../mixins/sizable/SizableMixin';

//@ts-ignore
export class Header extends SizableMixin(CustomElement) {

    static component = {
        styleUrls: [
            `${config.assetsFolder}/header/Header.css`
        ]
    };

    static properties = {

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

    render() {

        return (
            <Fragment>
                {this.renderTitle()}
                {this.renderTools()}
            </Fragment>
        );
    }

    renderTitle(): VirtualNode | null {

        const {
            title,
            size
        } = this.props;

        return title !== undefined ?
            title :
            (
                <div part="title" class="title" size={size}>
                    <slot name="title" />
                </div>
            );
    }

    renderTools(): VirtualNode | null {

        const {
            tool,
            size
        } = this.props;

        return tool !== undefined ?
            tool :
            (
                <div part="tool" class="tool" size={size}>
                    <slot name="tool" />
                </div>
            );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-header`, Header);