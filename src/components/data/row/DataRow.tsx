import { h } from 'gclib-vdom';
import { SelectableRow } from '../../..';
//import CustomElement from '../../../core/customElement/CustomElement';
import oneOf from '../../../core/helpers/oneOf';
//import ChildMixin from '../../../core/mixins/ChildMixin';
import { config } from '../../config';
//import HoverableMixin from '../../mixins/hoverable/HoverableMixin';
//import SelectableMixin from '../../mixins/selectable/SelectableMixin';

//@ts-ignore
export class DataRow extends SelectableRow
{
    static component = {

        styleUrls: [
            `${config.assetsFolder}/data/row/DataRow.css`
        ]
    };

    static properties = {

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
        fields: {
            type: oneOf(Array, Function),
            required: true
        },

        /**
         * The name of the property that identifies the record id
         */
         recordId: {
            attribute: 'record-id',
            type: String,
            value: 'id'
        }
    };

    renderFields() {

        let {
            record,
            fields
        } = this.props;

        if (typeof record === 'function') {

            record = record();
        }

        if (fields === undefined) {

            return null;
        }

        if (typeof fields === 'function') {

            fields = fields();
        }

        return fields.map(field => {

            return (
                <gcl-data-cell style={{ width: field.width || '100px' }}
                    field={field}
                    record={record}
                >
                </gcl-data-cell>
            );
        });
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-data-row`, DataRow);
