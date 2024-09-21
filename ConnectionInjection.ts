import Repository from "./client/repository/Repository";

function connection(): Repository {
    return new Repository();
}

export default connection();