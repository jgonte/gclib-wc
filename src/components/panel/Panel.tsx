import { Fragment, h, ElementNode } from 'gclib-vdom';
import { config } from '../config';
import CustomElement from '../../core/customElement/CustomElement';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DirectionMixin from '../mixins/direction/DirectionMixin';

//@ts-ignore
export class Panel extends
    SizableMixin(
        DirectionMixin(
            CustomElement
        )
    ) {

    static component = {
        styleUrls: [
            `${config.assetsFolder}/Panel/Panel.css`
        ]
    };

    static properties = {

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

    render() {

        return (
            <Fragment class="panel">
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}
            </Fragment>
        );
    }

    renderHeader(): ElementNode | null {

        const {
            header,
            size,
            direction
        } = this.props;

        return header !== undefined ?
            header :
            (
                <div part="header" class="header" size={size} direction={direction}>
                    <slot name="header" />
                </div>
            );
    }

    renderBody(): ElementNode | null {

        const {
            body,
            size,
            direction
        } = this.props;

        return body !== undefined ?
            body :
            (
                <div part="body" class="body" size={size} direction={direction}>
                    <slot name="body" />
                </div>
            );
    }

    renderFooter(): ElementNode | null {

        const {
            footer,
            size,
            direction
        } = this.props;

        return footer !== undefined ?
            footer :
            (
                <div part="footer" class="footer" size={size} direction={direction}>
                    <slot name="footer" />
                </div>
            );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-panel`, Panel);