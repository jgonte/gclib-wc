import { h } from "gclib-vdom";
import CustomElement from '../src/core/CustomElement';
export class MyCounter extends CustomElement {
    constructor() {
        super();
        this.increment = this.increment.bind(this);
    }
    increment() {
        let { count } = this.props;
        this.setCount(++count);
    }
    render() {
        return (h("div", null,
            h("h4", null, "Counter"),
            this.props.count,
            h("gcl-button", { click: this.increment }, "Increment")));
    }
}
MyCounter.properties = {
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
//@ts-ignore
customElements.define('my-counter', MyCounter);
