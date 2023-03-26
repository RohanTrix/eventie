import { Client, Account, Storage } from "appwrite";

const config = {
    "ENDPOINT": "https://hackathon.eastus.cloudapp.azure.com/v1",
    "PROJECT": "641ebd55a0f1abf25dd5",
    "DATABASE_ID": "641ec72a1988d2e3ed68",
    "COLLECTION_ID": "641ecba3175b953c91c7",
    "EVENT_IMAGE_BUCKET_ID": "EventImages",
};


const client = new Client();
const account = new Account(client);
const storage = new Storage(client);
client.setEndpoint(config.ENDPOINT).setProject(config.PROJECT);

export { client, account, storage, config };
