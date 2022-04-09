import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContactSchema =new Schema 
({
    FullName: String,
    ContactNumber: String,
    EmailAdress: String
},
{
    collection: "contacts"
});

const Model = mongoose.model("contact", ContactSchema);
export default Model;