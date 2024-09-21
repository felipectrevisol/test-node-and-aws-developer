import ClientRepository from "./client/ClientRepository";

function connection(): ClientRepository {
    return new ClientRepository();
}

export default connection();