import { h } from 'gclib-vdom';
import CustomElement from "../../core/CustomElement";
import { config } from '../config';
import AsyncDataSubmitableMixin from '../mixins/data/AsyncDataSubmitableMixin';

export class Form extends
    AsyncDataSubmitableMixin(CustomElement) {

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

    reset() {
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-form`, Form);