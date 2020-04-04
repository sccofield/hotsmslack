require('dotenv').config();

const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/*
 * Parse application/x-www-form-urlencoded && application/json
 * Use body-parser's `verify` callback to export a parsed raw body
 * that you need to use to verify the signature
 */

const rawBodyBuffer = (req, res, buf, encoding) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

const help = {
  "blocks": [
      {
          "type": "section",
          "text": {
              "type": "mrkdwn",
              "text": " `/name` Says your name"
          },
      },
      {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": " `/dob` Says your date of birth"
        },
    },
    {
      "type": "section",
      "text": {
          "type": "mrkdwn",
          "text": " `/year` Says the year"
      },
  },
  ]
}

app.get('/', (req, res) => {
  res.send('<h2>The slack welcome bots is running</h2>');
});

app.post('/hotsm', (req, res)=> {

  const { text } = req.body
  switch(text){
    case 'name':
      res.send('Your name is Michael');
      break;

    case 'dob':
      res.send('date of birth is aprilt');
      break;

    case 'year':
      res.send('the year is 2020')
      break;
    case 'help':
      res.send(help)
      break;

    default:
      res.send('how may we be of help')

  }

});


// const server = app.listen(process.env.PORT || 5000, () => {
//   console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
// });
module.exports.handler = serverless(app);

