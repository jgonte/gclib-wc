import { h } from 'gclib-vdom';
import { config } from '../../components/config';
import CustomElement from '../../core/customElement/CustomElement';
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

        styleUrls: [
            `${assetsFolder}/icon/Icon.css`
        ]
    };

    static properties = {

        /**
         * The name of the icon
         */
        name: {
            type: String,
            value: '',
            required: true
        }
    };

    render() {

        const {
            name,
            size,
            variant
        } = this.props;

        return (
            <svg role="img" size={size} variant={variant} dir={this.getDir()} >
                <use href={`${_iconsPath}#${name}`} />
            </svg>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-icon`, Icon);