import { h } from 'gclib-vdom';
import CustomElement from '../src/core/customElement/CustomElement';

export class MyTable extends CustomElement {

    render() {

        return (
            <gcl-table
                caption={
                    <caption>
                        <gcl-text intl-key="goodMorning" lang="fr" variant="secondary"></gcl-text>
                    </caption>
                }
                columns={[
                    {
                        name: 'company',
                        title: 'Company',
                        renderLabel: () => (
                            <gcl-text intl-key="goodMorning" lang="de" variant="primary"></gcl-text>
                        )
                    },
                    {
                        name: 'contact',
                        title: 'Contact'
                    },
                    {
                        name: 'country',
                        title: 'Country',
                        render: record => (
                            <span style="color: green;">{record.country}</span>
                        )
                    }
                ]}
                data={[
                    {
                        company: 'Alfreds Futterkiste',
                        contact: 'Maria Anders',
                        country: 'Germany'
                    },
                    {
                        company: 'Centro comercial Moctezuma',
                        contact: 'Francisco Chang',
                        country: 'Mexico'
                    },
                    {
                        company: 'Ernst Handel',
                        contact: 'Roland Mendel',
                        country: 'Austria'
                    }
                ]}
                //rowClick={(record, i) => alert(`Row clicked! at row index: ${i} and record: ${JSON.stringify(record)}`)} // onXXX is only used for stantard HTML events
                rowDoubleClick={(record, i) => alert(`Row double clicked! at row index: ${i} and record: ${JSON.stringify(record)}`)} // onXXX is only used for stantard HTML events
                //cellClick={(record, i, j) => alert(`Cell clicked! at row index: ${i}, column index: ${j} and record: ${JSON.stringify(record)}`)} // onXXX is only used for stantard HTML events
                // header={
                //     <thead>
                //         <tr>
                //             <th>Company</th>
                //             <th>Contact</th>
                //             <th>Country</th>
                //         </tr>
                //     </thead>
                // }
                // body={
                //     <tbody>
                //         <tr>
                //             <td>Alfreds Futterkiste</td>
                //             <td>Maria Anders</td>
                //             <td>Germany</td>
                //         </tr>
                //         <tr>
                //             <td>Centro comercial Moctezuma</td>
                //             <td>Francisco Chang</td>
                //             <td>Mexico</td>
                //         </tr>
                //         <tr>
                //             <td>Ernst Handel</td>
                //             <td>Roland Mendel</td>
                //             <td>Austria</td>
                //         </tr>
                //         <tr>
                //             <td>Island Trading</td>
                //             <td>Helen Bennett</td>
                //             <td>UK</td>
                //         </tr>
                //         <tr>
                //             <td>Laughing Bacchus Winecellars</td>
                //             <td>Yoshi Tannamuri</td>
                //             <td>Canada</td>
                //         </tr>
                //         <tr>
                //             <td>Magazzini Alimentari Riuniti</td>
                //             <td>Giovanni Rovelli</td>
                //             <td>Italy</td>
                //         </tr>
                //     </tbody>
                // }
                footer={
                    <tfoot>
                        <tr>
                            <td>Sum</td>
                            <td>$180</td>
                        </tr>
                    </tfoot>
                }
            />

        );

    }
}

//@ts-ignore
customElements.define('my-table', MyTable);