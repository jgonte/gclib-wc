import { formatDate } from 'gclib-utils';
import { h } from 'gclib-vdom';
import CustomElement from '../src/core/CustomElement';

/**
 * Shows a weather forecast list form a back end
 */
export class WeatherList extends CustomElement {

    render() {

        return (
            <gcl-list
                id="wheatherList"
                load-url="http://localhost:60314/weatherforecast"
                size="medium"
                selection='[2]'
                selectable
                selectionChanged={this.showSelection}
                renderData={record => {
                    const {
                        id,
                        date,
                        temperatureC,
                        temperatureF,
                        summary
                    } = record;

                    return (
                        <gcl-list-item value={id}>
                            {/* <gcl-icon name={iconName}></gcl-icon> */}
                            <gcl-text>{formatDate(date)}</gcl-text>
                            <gcl-text>{temperatureC} C</gcl-text>
                            <gcl-text>{temperatureF} F</gcl-text>
                            <gcl-text>{summary}</gcl-text>
                        </gcl-list-item>
                    );
                }}>

            </gcl-list>
        );
    }

    showSelection(selection) {

        alert('Selection: ' + JSON.stringify(selection));
    }
}

//@ts-ignore
customElements.define('weather-list', WeatherList);