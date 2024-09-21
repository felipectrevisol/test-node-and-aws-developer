import Client from "../../client/Client";
import Address from "../../client/Address";
import Contact from "../../client/Contact";
import {describe, test, expect} from "@jest/globals"
import ClientRepository from "../../client/ClientRepository";

describe('Client Repository', () => {

    let bobClient: Client;
    let amyClient: Client;
    let joshClient: Client;
    let anotherAmyClient: Client;

    beforeAll(() => {
        joshClient = new Client(
            "Josh",
            false,
            new Date(),
            new Array<Address>(),
            new Array<Contact>()
        );

        amyClient = new Client(
            "Amy",
            false,
            new Date(),
            new Array<Address>(),
            new Array<Contact>()
        );

        anotherAmyClient = new Client(
            "Amy",
            false,
            new Date(),
            new Array<Address>(new Address("Rua da Oliveiras.")),
            new Array<Contact>()
        );

        bobClient = new Client(
            "Bob",
            false,
            new Date(),
            new Array<Address>(new Address("Rua da Oliveiras.")),
            new Array<Contact>()
        );
    })

    test('Add a Client', () => {
        const reposiroty: ClientRepository = new ClientRepository();
        {
            reposiroty.add(joshClient);
            reposiroty.add(joshClient);
            reposiroty.add(joshClient);
        }

        expect(reposiroty.clients.length).toBe(3);
    });

    test('Find a Client', () => {
        const reposiroty: ClientRepository = new ClientRepository();
        {
            reposiroty.add(joshClient);
            reposiroty.add(amyClient);
        }

        expect(reposiroty.bring(amyClient)?.name).toBe("Amy");
        expect(reposiroty.bring(bobClient)?.name).toBe(undefined);
    });

    test('Remove a Client', () => {
        const reposiroty: ClientRepository = new ClientRepository();
        {
            reposiroty.add(joshClient);
            reposiroty.add(amyClient);
            reposiroty.delete(amyClient);
        }

        expect(reposiroty.clients.length).toBe(1);
        expect(reposiroty.clients[0].name).toBe("Josh");
        expect(reposiroty.clients[1]?.name).toBe(undefined);
    });

    test('Alter a Client', () => {
        const reposiroty: ClientRepository = new ClientRepository();
        {
            reposiroty.add(amyClient);
            reposiroty.add(joshClient);
            reposiroty.alter(amyClient).toThisNewOne(anotherAmyClient);
        }

        expect(reposiroty.bring(anotherAmyClient)?.address[0]?.street).toBe("Rua da Oliveiras.");
    });
})