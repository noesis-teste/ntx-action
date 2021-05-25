const core = require('@actions/core')
const github = require('@actions/github')

const axios = require('axios');

(async () => {
  try {
    // `who-to-greet` input defined in action metadata file
    const ntxURL = core.getInput('ntx-url');
    console.log(`Web request to ${ntxURL}`);
    const time = (new Date()).toTimeString();
    core.setOutput("status", time);



      try {
        const response = await axios.get('https://reqbin.com/echo/get/json')
        console.log("ntx-url: " + response.data);
        console.log("sucess: " + response.data.success);
      } catch (error) {
        console.log(error.response.body);
      }



    console.log('End of web request');

    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
})();