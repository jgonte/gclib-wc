import { Fragment, h } from 'gclib-vdom';
import { config } from '../../components/config';
import CustomElement from '../../core/CustomElement';
import VariantMixin from '../mixins/variant/VariantMixin';
import SizableMixin from '../mixins/sizable/SizableMixin';
import DirectionMixin from '../mixins/direction/DirectionMixin';

const {
    assetsFolder
} = config;

//The path to the icons svg file
const _iconsPath = `${assetsFolder}/icon/assets/bootstrap-icons.svg`;

//@ts-ignore
export class Icon extends
    SizableMixin(
        VariantMixin(
            DirectionMixin(
                CustomElement
            )
        )
    ) {

    static component = {

        //shadow:  false,

        styleUrls: [
            `${assetsFolder}/icon/Icon.css`,
            `${assetsFolder}/mixins/direction/Direction-Icon.css`
        ]
    };

    static properties = {

        /**
         * The name of the icon
         */
        name: {
            type: String,
            value: ''
        }
    };

    render() {

        const {
            name
        } = this.props;

        return (
            <Fragment class={this.getCSSClass()}>
                <svg role="img">
                    <use href={`${_iconsPath}#${name}`} />
                </svg>
            </Fragment>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-icon`, Icon);