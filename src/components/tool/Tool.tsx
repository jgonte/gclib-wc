import { h } from 'gclib-vdom';
//import { config } from '../config';
import CustomElement from '../../core/customElement/CustomElement';
import SizableMixin from '../mixins/sizable/SizableMixin';
import VariantMixin from '../mixins/variant/VariantMixin';

//@ts-ignore
export abstract class Tool extends
    SizableMixin(
        VariantMixin(
            CustomElement
        )
    ) {

    // static component = {

    //     styleUrls: [
    //         `${config.assetsFolder}/tool/Tool.css`
    //     ]
    // };

    iconName: string | Function;

    click: Function;

    render() {

        const {
            variant,
            size
        } = this.props;

        const {
            iconName,
            click
        } = this;

        const icon = typeof iconName === 'function' ?
            iconName() :
            iconName;

        return (
            <gcl-button variant={variant} size={size} click={click}>
                <gcl-icon name={icon}></gcl-icon>
            </gcl-button>
        );
    }
}