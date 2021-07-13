import { Fragment, h, markupToVDom } from 'gclib-vdom';
import CustomElement from '../../../core/customElement/CustomElement';
//import ChildMixin from '../../../core/mixins/ChildMixin';
import { config } from '../../config';
//import SelectableMixin from '../../mixins/selectable/SelectableMixin';
import oneOf from '../../../core/helpers/oneOf';
import SizableMixin from '../../mixins/sizable/SizableMixin';
//@ts-ignore
export class DataCell extends 
// SelectableMixin(
//     ChildMixin(
SizableMixin(CustomElement) {
    render() {
        let { field, record } = this.props;
        const { size } = this.props;
        if (typeof field == 'function') {
            field = field();
        }
        if (typeof record == 'function') {
            record = record();
        }
        const value = record[field.name];
        if (field.render !== undefined) {
            const cell = field.render.call(this, record, field);
            if (typeof cell === 'string') {
                return markupToVDom(cell.trim(), 'xml', { excludeTextWithWhiteSpacesOnly: true });
            }
            else {
                return cell;
            }
        }
        else {
            return (h(Fragment, { size: size }, value));
        }
    }
}
DataCell.component = {
    styleUrls: [
        `${config.assetsFolder}/data/cell/DataCell.css`
    ]
};
DataCell.properties = {
    /**
     * The record to render the row from
     */
    record: {
        type: oneOf(Object, Function),
        required: true
    },
    /**
     * The descriptor of the fields to render the row
     */
    field: {
        type: oneOf(Object, Function),
        required: true
    }
};
//@ts-ignore
customElements.define(`${config.tagPrefix}-data-cell`, DataCell);
