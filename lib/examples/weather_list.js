import { formatDate } from 'gclib-utils';
import { h } from 'gclib-vdom';
import CustomElement from '../src/core/CustomElement';
/**
 * Shows a weather forecast list form a back end
 */
export class WeatherList extends CustomElement {
    render() {
        return (h("gcl-list", { id: "wheatherList", "load-url": "http://localhost:60314/weatherforecast", size: "medium", selection: '[2]', selectable: true, selectionChanged: this.showSelection, renderData: record => {
                const { id, date, temperatureC, temperatureF, summary } = record;
                return (h("gcl-list-item", { value: id },
                    h("gcl-text", null, formatDate(date)),
                    h("gcl-text", null,
                        temperatureC,
                        " C"),
                    h("gcl-text", null,
                        temperatureF,
                        " F"),
                    h("gcl-text", null, summary)));
            } }));
    }
    showSelection(selection) {
        alert('Selection: ' + JSON.stringify(selection));
    }
}
//@ts-ignore
customElements.define('weather-list', WeatherList);
