namespace core
{
   export class User
    {
        
        private m_displayName:string;
        private m_emailAddress:string;
        private m_username:string;
        private m_password:string;
        // getters and setters
        public get DisplayName(): string
        {
            return this.m_displayName;
        }
        
        public set DisplayName(name: string)
        {
            this.m_displayName = name;
        }

        public get EmailAddress(): string
        {
            return this.m_emailAddress;
        }

        public set EmailAddress(email_address: string)
        {
            this.m_emailAddress = email_address;
        }

        public get Username(): string
        {
            return this.m_username;
        }

        public set Username(username: string)
        {
            this.m_username = username;
        }

        public get Password(): string
        {
            return this.m_password;
        }

        public set Password(password: string)
        {
            this.m_password = password;
        }
        //constructor 
        constructor(displayName: string = "", emailAdress:string="", username:string ="", password:string ="" )
        {
            this.m_displayName = displayName;
            this.m_emailAddress = emailAdress;
            this.m_username = username;
            this.m_password = password;
        }
        // Overriden methods
        
        toString()
        {
            return `Display Name : ${this.DisplayName}\nEmail Address : ${this.EmailAddress}\nUsername : ${this.Username}`;
        }
        //utility methods
        
        toJSON(): {DisplayName: string, EmailAddress: string, Username: string}
        {
            return{
                "DisplayName": this.DisplayName,
                "EmailAddress": this.EmailAddress,
                "Username": this.Username,
              
            }
        }

        fromJSON(data: User): void
        {
            this.DisplayName = data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username = data.Username;
            this.Password = data.Password;
        }

        
        serialize(): string | null
        {
            if(this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "")
            {
                return `${this.DisplayName},${this.EmailAddress},${this.Username}`;
            }
            console.error("One or more properties of the User Object are missing or invalid");
            return null;
        }
    
        deserialize(data: string) // assume that data is in a comma-separted format (string array of properties)
        {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress= propertyArray[1];
            this.Username = propertyArray[2];
        }
    }

}

