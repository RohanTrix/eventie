import { Account, Client, Databases } from 'appwrite';

export default function(config) {
    const {PORT, ENDPOINT, PROJECT} = config;
    const client = new Client();
    client
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT);
    const account = new Account(client);
    const databases = new Databases(client);

    return {client, account, databases};
}
