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

  let response;
  if (
    !req.variables['APPWRITE_FUNCTION_ENDPOINT'] ||
    !req.variables['APPWRITE_FUNCTION_API_KEY']
  ) {
    console.warn("Environment variables are not set. Function cannot use Appwrite SDK.");
    response = { message: "Environment variables are not set. Function cannot use Appwrite SDK.", success: false };
  } else {
    const endpoint = req.variables['APPWRITE_FUNCTION_ENDPOINT'];
    const projectId = req.variables['APPWRITE_FUNCTION_PROJECT_ID'];
    client
      .setEndpoint(endpoint)
      .setProject(projectId)
      .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
      .setSelfSigned(true);
    const eventData = JSON.parse(req.variables['APPWRITE_FUNCTION_EVENT_DATA']);
    const bucketId = req.variables['APPWRITE_IMAGE_BUCKET_ID'];
    const imageUrl = new URL(`/v1/storage/buckets/${bucketId}/files/${eventData.$id}/preview?project=${projectId}`, endpoint).href;
    const document = await database.updateDocument(
      eventData.$databaseId,
      eventData.$collectionId,
      eventData.$id,
      {
        imageUrl
      }
    );
    response = { message: `Image URL set successfully to ${imageUrl}`, success: true, document };
  }
  res.json(response);

  // res.json({
  //   areDevelopersAwesome: true,
  // });
};
