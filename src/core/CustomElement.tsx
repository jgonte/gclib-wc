import { FragmentNode, h } from "gclib-vdom";
import MetadataInitializerMixin from "./mixins/MetadataInitializerMixin";
import VirtualDomComponentMixin from "./mixins/VirtualDomComponentMixin";

export default abstract class CustomElement extends
    VirtualDomComponentMixin(
        MetadataInitializerMixin(
            HTMLElement
        )
    ) {

    private _isUpdating: boolean;

    constructor() {

        super();

        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

        console.log(`connectedCallback called for custom element: [${this.constructor.name}]`);

        this.requestUpdate();
    }

    requestUpdate() {

        console.log('Requesting update');

        if (this._isUpdating) {

            return;
        }

        requestAnimationFrame(() => {

            this._isUpdating = false;

            this.update();
        });

        this._isUpdating = true;
    }

    /** 
     * The DOM document in which this component is updated 
     */
    get document() {

        if (this.shadowRoot !== null) {

            return this.shadowRoot;
        }

        // Find the parent that has a shadow root
        let parent = this.parentElement;

        while (parent !== undefined) {

            if (parent.shadowRoot !== null) {

                return parent; // We are not returning the parent's shadow root!
            }

            parent = parent.parentElement;
        }

        return undefined;
    }

    applyStyles(vnode: FragmentNode, styleUrls: string[]) {

        for (let i = 0; i < styleUrls.length; ++i) {

            vnode.appendChildNode(
                <style>{`@import '${styleUrls[i]}'`}</style>
            );
        }
    }
}
