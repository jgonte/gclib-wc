import { h } from 'gclib-vdom';
import CustomElement from '../../../src/core/customElement/CustomElement';
export class ChildLifecycle extends CustomElement {
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        console.log('Called child connectedCallback');
    }
    elementWillConnect() {
        var _a;
        (_a = super.elementWillConnect) === null || _a === void 0 ? void 0 : _a.call(this);
        console.log('Called child elementWillConnect');
    }
    elementDidConnect(node) {
        var _a;
        (_a = super.elementDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        console.log('Called child elementDidConnect');
    }
    elementDidUpdate(node, nodeChanges) {
        var _a;
        (_a = super.elementDidUpdate) === null || _a === void 0 ? void 0 : _a.call(this, node);
        console.log('Called child elementDidUpdate');
    }
    elementWillDisconnect(node) {
        var _a;
        (_a = super.elementWillDisconnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        console.log('Called child elementWillDisconnect');
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        console.log('Called child disconnectedCallback');
    }
    render() {
        console.log('Called child render');
        return (h("span", null, "Child"));
    }
}
customElements.define(`gcl-test-child-lifecycle`, ChildLifecycle);
