const core = require('@actions/core')
const github = require('@actions/github')

const https = require('https')


try {
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('ntx-url');
    console.log(`CURL to ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("status", time);

    const options = {
        hostname: 'https://reqbin.com',
        path: '/echo/get/json',
        method: 'GET'
      }

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`)
      
        res.on('data', d => {
          process.stdout.write(d)
        })
      })
      
    req.on('error', error => {
        console.error(error)
    })

    req.end();



    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }