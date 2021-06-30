export default interface DataFieldDefinition {

    /**
     * Name of the field in the data to extract the value from
     */
    name: string;

    /**
     * The type of the field
     */
    type: "string" | "date";

    /**
     * The name of the field to display
     */
    display: string;

    /**
     * The width of the field in css units
     */
    width: string;
}