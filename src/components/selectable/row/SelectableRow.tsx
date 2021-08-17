import { ElementNode, Fragment, h } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
//import oneOf from '../../../core/helpers/oneOf';
import ChildMixin from '../../../core/mixins/ChildMixin';
import { config } from '../../config';
import HoverableMixin from '../../mixins/hoverable/HoverableMixin';
import SelectableOnClickMixin from '../../mixins/selectable/on-click/SelectableOnClickMixin';
import SizableMixin from '../../mixins/sizable/SizableMixin';

//@ts-ignore
export class SelectableRow extends
    SelectableOnClickMixin(
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
            //required: true - Not used by derived components, therefore false
        }
    };

    render() {

        const {
            value,
            size,
            selected,
            hoverable,
        } = this.props;

        const children = this.renderFields();

        return (
            <Fragment value={value} hoverable={hoverable} size={size} selected={selected}>
                {children}
            </Fragment>
        );
    }

    renderFields() {

        return this.props.children;
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-selectable-row`, SelectableRow);
