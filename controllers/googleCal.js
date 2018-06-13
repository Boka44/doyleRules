const {google} = require('googleapis');

// Each API may support multiple version. With this sample, we're getting
// v1 of the urlshortener API, and using an API key to authenticate.
const urlshortener = google.urlshortener({
  version: 'v1',
  auth: 'YOUR API KEY'
});

const params = {
  shortUrl: 'http://goo.gl/xKbRu3'
};

// get the long url of a shortened url
urlshortener.url.get(params, (err, res) => {
  if (err) {
    console.error(err);
    throw err;
  }
  console.log(`Long url is ${res.data.longUrl}`);
});

// Allow google permissions to work with different services (scopes)

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Google Calendar scope
const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes
});