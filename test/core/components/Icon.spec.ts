import { Icon } from '../../../src/components/icon/Icon';
import { config } from '../../../src/components/config';

describe("Icon tests", () => {

    const TAG = `${config.tagPrefix}-icon`;

    it('should display an icon', () => {

        const icon = document.createElement(TAG) as typeof Icon;

        //const icon = new Icon();

        expect(icon.tagName).toEqual(TAG.toUpperCase());

        const html = document.body.getElementsByTagName(TAG)[0].shadowRoot.innerHTML;

        expect(html).toEqual('');
    });
});