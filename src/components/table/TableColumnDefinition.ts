export default interface TableColumnDefinition {

    /**
     * Name of the field in the data to be mapped to the column
     */
    name: string;

    /**
     * The title of the column to show in the table
     */
    title: string;

    /**
     * A function to custom render the header of that column
     */
    renderLabel: () => any;

    /**
     * A function to custom render the value of that column
     */
    render: (record: any) => any;
}