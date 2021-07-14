import { h } from 'gclib-vdom';
import { SelectableRow } from '../../selectable/row/SelectableRow';
import oneOf from '../../../core/helpers/oneOf';
import { config } from '../../config';

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
