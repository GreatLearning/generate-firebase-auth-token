const express = require("express");
const { JWT } = require("google-auth-library");

const SCOPES = ["https://www.googleapis.com/auth/firebase.messaging"];

function getAccessToken() {
  return new Promise(function (resolve, reject) {
    const key = require("./greatlearning-984-firebase-adminsdk-z4y2y-24785a0e58.json");
    const jwtClient = new JWT(
      key.client_email,
      null,
      key.private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/status", (request, response) => {
  const status = {
    Status: "Running",
  };

  response.send(status);
});

app.get("/firebase-auth-token", async (request, response) => {
  const access_token = await getAccessToken();
  const status = {
    token: access_token,
  };

  response.send(status);
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT);
});
