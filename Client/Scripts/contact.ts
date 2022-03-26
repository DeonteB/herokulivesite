namespace core
 {
   export class Contact
{
    //private instance members
    private m_fullName: string;
    private m_contactNumber: string;
    private m_emailAddress:string;

    // public properties (getters and setters)
    public get FullName(): string
    {
        return this.m_fullName;
    }

    public set FullName(full_name: string)
    {
        this.m_fullName = full_name;
    }

    public get ContactNumber():string
    {
        return this.m_contactNumber;
    }

    public set ContactNumber(contact_number: string)
    {
        this.m_contactNumber = contact_number;
    }

    public get EmailAddress():string
    {
        return this.m_emailAddress;
    }


    public set EmailAddress(emailAddress: string)
    {
        this.m_emailAddress = emailAddress;
    }
// constructor 
    constructor(fullName:string = "", contactNumber:string = "", emailAddress: string = "")
    {
        this.m_fullName = fullName;
        this.m_contactNumber = contactNumber;
        this.m_emailAddress = emailAddress;
    }
    //public utility methods

    /**
     *THis methed converts the objects properties to a comma
     *
     * @return {*}  {(string | null)}
     * @memberof Contact
     */
    serialize(): string | null
    {
        if(this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "")
        {
            return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
        }
        console.error("One or more properties of the Contact Object are missing or invalid");
        return null;
    }

    /**
     *This method separates the data string parameter into the objects properties.
     *
     * @param {string} data
     * @memberof Contact
     */
    deserialize(data: string) // assume that data is in a comma-separted format (string array of properties)
    {
        let propertyArray: string[] = data.split(",");
        this.FullName = propertyArray[0];
        this.ContactNumber = propertyArray[1];
        this.EmailAddress = propertyArray[2];
    }

    // public overide
    /**
     *This method overides the built in toString method an returns a string that contains the valrs of the objects.
     *
     * @return {*} 
     * @memberof Contact
     */
    toString()
    {
        return `Full Name     : ${this.FullName}\nContact Number: ${this.ContactNumber}\nEmail Address  : ${this.EmailAddress}`;
    }

}






}