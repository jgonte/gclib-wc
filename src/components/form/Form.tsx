import { DataRecord, ValidationContext } from 'gclib-utils';
import { DataFieldDescriptor } from 'gclib-utils/dist/types/data/record/Interfaces';
import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import ContainerMixin from '../../core/mixins/ContainerMixin';
import { config } from '../config';
import { Field } from '../field/Field';
import AsyncDataSubmitableMixin from '../mixins/data/AsyncDataSubmitableMixin';

export class Form extends
    AsyncDataSubmitableMixin(
        ContainerMixin(
            CustomElement
        )
    ) {

    private _record: DataRecord = new DataRecord();

    static component = {

        styleUrls: [
            `${config.assetsFolder}/form/Form.css`
        ]
    };

    render() {

        return (
            <form>
                <slot />
                {this.renderButtons()}
            </form>
        );
    }

    renderButtons() {

        return (
            <div>
                <gcl-button onClick={this.reset} variant="secondary">
                    Reset
                </gcl-button>
                <gcl-button onClick={this.submit} variant="primary">
                    Submit
                </gcl-button>
            </div>
        );
    }

    submit() {

        const context: ValidationContext = {
            errors: [],
            stopWhenInvalid: true
        };

        if (this._record.validate(context)) {

            super.submit();
        }
    }

    reset() {
    }

    onChildAdded(child: Field) {

        this._record.addField(child.props as DataFieldDescriptor);
    }

    onChildRemoved(child: Field) {

        this._record.removeField(child.props as DataFieldDescriptor);
    }

    connectedCallback() {

        super.connectedCallback?.();

        // Pass the properties to the data record

    }

}

//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);