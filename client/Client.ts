import Contact from "./Contact.js";
import Address from "./Address.js";

export default class Client {
    constructor (
       public readonly name: string,
       public readonly active: boolean,
       public readonly dateOfBirth: Date,
       public readonly address: Address[],
       public readonly contacts: Contact[],
    ) {}
}