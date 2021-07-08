import { ElementNode } from "gclib-vdom";
import MetadataInitializerMixin from "../../../src/core/mixins/MetadataInitializerMixin";

class ElementWithMetadata1 extends MetadataInitializerMixin(HTMLElement) {

    static properties = {

        stringProp: {
            type: String,
            value: 'type1',
            options: ['type1', 'type2', 'type3']
        },

        requiredStringProp: {
            type: String,
            required: true
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
            type: ElementNode
        }
    }
}

customElements.define("element-with-metadata-1", ElementWithMetadata1 as any);

describe("MetadataInitializerMixin", () => {

    it("defines observedAttributes for all custom property setters", () => {

        expect(ElementWithMetadata1.observedAttributes).toEqual([
            "stringProp",
            "requiredStringProp",
            "functionProp",
            "objectProp",
            "arrayProp",
            "virtualNodeProp"
        ]);
    });

    it("populate the properties with the default values", () => {

        const el = document.createElement("element-with-metadata-1");

        //el.setAttribute("stringProp", "type1"); Attribute not set

        expect((el as any).props.stringProp).toEqual("type1");
    });

    it("throws an error when the attribute set is not in the options", () => {

        const el = document.createElement("element-with-metadata-1");

        let err;

        try {

            el.setAttribute("stringProp", "type4");
        }
        catch (error) {

            err = error;
        }

        expect(err).toEqual("type1");

    });

    it("throws an error when the attribute is required but not set by the time the element is connected", () => {

        const el = document.createElement("element-with-metadata-1");

        let err;

        try {

            const parentEl = document.createElement("div");

            parentEl.append(el);
        }
        catch (error) {

            err = error;
        }

        expect(err).toEqual("type1");

    });
});

