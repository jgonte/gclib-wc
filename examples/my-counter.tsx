import { h } from "gclib-vdom";
import CustomElement from '../src/core/CustomElement';

export class MyCounter extends CustomElement {


    constructor() {

        super();

        this.increment = this.increment.bind(this);
    }

    static properties = {

        /**
         * The initial count
         */
        count: {
            type: Number,
            value: 0,
            mutable: true,
            reflect: true
        }
    };

    increment(): void {

        let {
            count
        } = this.props;

        this.setCount(++count);
    }

    render(): any {

        return (
            <div>
                <h4>Counter</h4>
                {this.props.count}
                <gcl-button click={this.increment}>Increment</gcl-button>
            </div>
        );

    }

}

//@ts-ignore
customElements.define('my-counter', MyCounter);