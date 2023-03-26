const sdk = require("node-appwrite");

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  const client = new sdk.Client();

  // You can remove services you don't use
  const account = new sdk.Account(client);
  const avatars = new sdk.Avatars(client);
  const database = new sdk.Databases(client);
  const functions = new sdk.Functions(client);
  const health = new sdk.Health(client);
  const locale = new sdk.Locale(client);
  const storage = new sdk.Storage(client);
  const teams = new sdk.Teams(client);
  const users = new sdk.Users(client);

  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
      .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
      .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);

      const data = JSON.parse(req.variables['APPWRITE_FUNCTION_EVENT_DATA']);
      const databaseId = data["$databaseId"];
      const collectionId = 'userEvents';
      const participants = data.participants;
      for(const participant of participants) {
        let existingData = null;
        try {
          existingData = await database.getDocument(databaseId, collectionId, participant)
        } catch (error) {
          if (error.code === 404) {
            console.log("Document not found");
            const data = {
              events: [data["$id"]]
            }
            const response = await database.createDocument(databaseId, collectionId, participant, data)
          } else {
            console.log("Error while fetching document");
            res.json({error});
            return;
          }
        }
        const data = {

        }
        const response = await database.updateDocument(databaseId, collectionId, participant, data)
      }
  }

  res.json({
    req
  });
};
