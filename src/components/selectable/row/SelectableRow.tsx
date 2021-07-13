import { ElementNode, Fragment, h } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
//import oneOf from '../../../core/helpers/oneOf';
import ChildMixin from '../../../core/mixins/ChildMixin';
import { config } from '../../config';
import HoverableMixin from '../../mixins/hoverable/HoverableMixin';
import SelectableMixin from '../../mixins/selectable/SelectableMixin';
import SizableMixin from '../../mixins/sizable/SizableMixin';

//@ts-ignore
export class SelectableRow extends
    SelectableMixin(
        HoverableMixin(
            SizableMixin(
                ChildMixin(CustomElement)
            )  
        )   
    ) {

    static component = {

        styleUrls: [
            `${config.assetsFolder}/selectable/row/SelectableRow.css`
        ]
    };

    static properties = {

        /**
         * The children nodes
         */
        children: {
            type: ElementNode,
            required: true
        }
    };

    render() {

        const {
            value,
            size,
            selected,
            hoverable,
            children
        } = this.props;

        return (
            <Fragment value={value} hoverable={hoverable} size={size} selected={selected}>
                {children}
            </Fragment>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-selectable-row`, SelectableRow);
