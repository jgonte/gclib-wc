import { h } from 'gclib-vdom';
import CustomElement from '../../../src/core/customElement/CustomElement';
export class ParentLifecycle extends CustomElement {
    connectedCallback() {
        var _a;
        (_a = super.connectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        console.log('Called parent connectedCallback');
    }
    elementWillConnect() {
        var _a;
        (_a = super.elementWillConnect) === null || _a === void 0 ? void 0 : _a.call(this);
        console.log('Called parent elementWillConnect');
    }
    elementDidConnect(node) {
        var _a;
        (_a = super.elementDidConnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        console.log('Called parent elementDidConnect');
    }
    elementDidUpdate(node, nodeChanges) {
        var _a;
        (_a = super.elementDidUpdate) === null || _a === void 0 ? void 0 : _a.call(this, node);
        console.log('Called parent elementDidUpdate');
    }
    elementWillDisconnect(node) {
        var _a;
        (_a = super.elementWillDisconnect) === null || _a === void 0 ? void 0 : _a.call(this, node);
        console.log('Called parent elementWillDisconnect');
    }
    disconnectedCallback() {
        var _a;
        (_a = super.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this);
        console.log('Called parent disconnectedCallback');
    }
    render() {
        console.log('Called parent render');
        return (h("div", null,
            h("slot", null)));
    }
}
customElements.define(`gcl-test-parent-lifecycle`, ParentLifecycle);
