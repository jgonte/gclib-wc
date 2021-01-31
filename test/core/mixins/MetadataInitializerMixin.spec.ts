import { VirtualNode } from "gclib-vdom";
import MetadataInitializerMixin from "../../../src/core/mixins/MetadataInitializerMixin";

class ElementWithMetadata1 extends MetadataInitializerMixin(HTMLElement) {

    static properties = {

        stringProp: {
            type: String,
            value: "type1" // Options: "type1" | "type2" | "type3"
        },

        functionProp: {
            type: Function
        },

        objectProp: {
            type: Object
        },

        arrayProp: {
            type: Array
        },

        virtualNodeProp: {
            type: VirtualNode
        }
    }
}

customElements.define("element-with-metadata-1", ElementWithMetadata1 as any);

describe("MetadataInitializerMixin", () => {

    it("defines observedAttributes for all custom property setters", () => {

        expect(ElementWithMetadata1.observedAttributes).toEqual([
            "stringProp",
            "functionProp",
            "objectProp",
            "arrayProp",
            "virtualNodeProp"
        ]);

        const el = document.createElement("element-with-metadata-1");

        el.setAttribute("stringProp", "Some string");

        expect((el as any).props.stringProp).toEqual("Some string");

    });
});

