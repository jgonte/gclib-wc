import { h } from 'gclib-vdom';
import CustomElement from '../../core/customElement/CustomElement';
import { config } from '../config';
import TargetViewHolderMixin from '../mixins/target-view/TargetViewHolderMixin';

/**
 * Component to filter data requests of the target view
 */
export class FilterPanel extends
    TargetViewHolderMixin(CustomElement) {

    render() {

        return (
            <div>
                <slot/>
            </div>
        );
    }
}

//@ts-ignore
customElements.define(`${config.tagPrefix}-filter-panel`, FilterPanel);