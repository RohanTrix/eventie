import {Client, Account, Databases} from 'node-appwrite';

export default function(config) {
    const {PORT, ENDPOINT, PROJECT, API_KEY} = config;
    const client = new Client();
    client
        .setEndpoint(ENDPOINT)
        .setProject(PROJECT)
        .setKey(API_KEY);
    const account = new Account(client);
    const databases = new Databases(client);

    return {client, account, databases};
}
