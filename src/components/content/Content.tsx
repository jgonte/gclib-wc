import { h, Fragment } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../../components/config';
import { resourceLoader, Route, Router } from 'gclib-utils';

//@ts-ignore
export class Content extends CustomElement {

    static component = {

        shadow: false // Do not create a shadow DOM for this component!
    };

    static properties = {

        /**
         * The source to set the content from
         */
        source: {
            type: String,
            mutable: true,
            reflect: true
        },

        /**
         * The source to load when the route does not exist
         */
        notFound: {
            attribute: 'not-found',
            type: String
        }
    };

    constructor() {

        super();

        this.onRouteChanged = this.onRouteChanged.bind(this);
    }

    render() {

        return (<Fragment></Fragment>);
    }

    async attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {

        super.attributeChangedCallback?.(attributeName, oldValue, newValue);

        if (attributeName === 'source' && oldValue !== newValue) {

            const content = await resourceLoader.get(newValue);

            const parser = new DOMParser();

            // Even though it is a fragment, it creates a full HTML document
            const body = parser.parseFromString(content, "text/html").body;

            // Clear any previous content
            while (this.document.firstChild) {

                this.document.firstChild.remove();
            }

            const scripts = [];

            Array.from(body.children).forEach(child => {

                if (child.tagName === 'SCRIPT') {

                    scripts.push(child);
                }
                else { // Add it to this component

                    this.document.appendChild(child);
                }
            });

            // Remove any scripts with the data-view attributes set
            document.body.querySelectorAll('[data-view]').forEach(script => script.remove());

            // At this point all the children were added. Execute the scripts if any
            scripts.forEach(oldScript => {

                const newScript = document.createElement("script");

                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute((attr as any).name, (attr as any).value));

                newScript.setAttribute('data-view', newValue); // Set the view attribute so we can remove it when other views are selected

                newScript.appendChild(document.createTextNode(oldScript.innerHTML));

                document.body.appendChild(newScript);
            });
        }
    }

    onRouteChanged(route: Route, router: Router) {

        if (route === undefined) {

            const {
                notFound
            } = this.props;

            this.setSource(notFound);
        }
        else {

            this.setSource(route.view);
        }
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-content`, Content);