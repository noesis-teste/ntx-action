const core = require('@actions/core')
const github = require('@actions/github')

const axios = require('axios');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  try {
    // GET NTX URL from input
    const ntxURL = core.getInput('ntx-url');
    console.log(`Web request to dfgd`);
    //const time = (new Date()).toTimeString();
    //core.setOutput("status", time);

    
    const username = 'alho';
    const password = 'admin';
    var basicAuth = 'Basic ' + Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

    //http://localhost:8084/NTX/ntxWebService?LinkID=88&TypeID=1&MachineID=71&RepositoryID=3&ProjectID=10100&Version=10100&Cycle=PDT-2396&UserId=14&ServerURL=3&EnvironmentId=5

    // http://localhost:8084/NTX/ntxWebService?LinkID=89&TypeID=1&MachineID=71&RepositoryID=2&ProjectID=3dd5ff83-ecdc-465a-acea-fc7847ba5878&Version=3292&Cycle=3293&UserId=14&ServerURL=5&EnvironmentId=5&Collection=DefaultCollection&Token=3ztvxjlqiguamhcl7y4eo4tfvx2gtqiseqglwxhyowyuzcm3f32a

    // http://srvwp15.westeurope.cloudapp.azure.com:8084/
    // http://172.30.160.1:8084/NTX/ntxWebService

    // http://srvwp15.westeurope.cloudapp.azure.com:8084/NTX/ntxWebService?LinkID=178&TypeID=1&MachineID=132&RepositoryID=2&ProjectID=0bd5b276-08aa-4cd7-b6c1-0f18b7bcf951&Version=92&Cycle=93&UserId=46&ServerURL=18&EnvironmentId=8&Collection=DefaultCollection&Token=qafbanqku4ckwt4jnt7lcretgvfqpo4nthacvoixsvbhnryql2ua

  //  try {
      const response = await axios.get('http://srvwp15.westeurope.cloudapp.azure.com:8084/NTX/ntxWebService?LinkID=178&TypeID=1&MachineID=132&RepositoryID=2&ProjectID=0bd5b276-08aa-4cd7-b6c1-0f18b7bcf951&Version=92&Cycle=93&UserId=46&ServerURL=18&EnvironmentId=8&Collection=DefaultCollection&Token=qafbanqku4ckwt4jnt7lcretgvfqpo4nthacvoixsvbhnryql2ua', {
        auth: {
          username: 'alho',
          password: 'admin'
        }
      })


      console.log("Response: ", response.data);
      const { id } = response.data;

      if (id == -1){
        console.log("Error getting execution ID");
        core.setFailed("Error getting execution ID");
        return;
      }
      
/*
    } catch (error) {
      console.log(error.response.body);
      core.setFailed("Error getting execution ID");
      return;
    }
*/
    console.log("Success: " + id);

    let isComplete = false;
    //Start looping until response comes
    do{

      //Wait for X seconds
      console.log("Wait for 20 seconds");
      try{
        await sleep(10 * 1000);
      }catch{
        console.log("Ending wait");
      }
      
      //Ask for status of execution
      const response = await axios.get(`http://srvwp15.westeurope.cloudapp.azure.com:8084/NTX/ntxWebService?GetStatusId=${id}`, {
        auth: {
          username: 'alho',
          password: 'admin'
        }
      })
      
      console.log("Response: ", response.data);
      const code = response.data.status_code;

      console.log("Code: " + code);
      switch(code){

        case 1:
          isComplete = false;
          core.info("Execution created")
          break;

        case 2: 
          isComplete = false;
          core.info("Execution running")
          break;
        case 3:
          isComplete = true
          core.info("All tests passed")
          break;
        case 4 :
          isComplete = true;
          core.setFailed("Some tests have failed");
          break;
        case -2 :
          isComplete = true;
          core.setFailed("The execution ID is invalid");
          break;
        case -3 :
          isComplete = true;
          core.setFailed("The project, version or cycle doesn't exist");
          break;
        case -4 :
          isComplete = true;
          core.setFailed("Machine doesn't exist");
          break;
        case -5 :
          isComplete = true;
          core.setFailed("The cycle doesn´t have tests");
          break;
        case -6 :
          isComplete = true;
          core.setFailed("Unknown error");
          break;
        case -7 :
          isComplete = true;
          core.setFailed("Device doesn't exist");
          break;
        case -8 :
          isComplete = true;
          core.setFailed("Disconnected Machine");
          break;

        default:
          isComplete = true;
          core.setFailed("Unknown code status");
          break;

      }

      
      console.log("isComplete: " + isComplete);

    }while( !isComplete );

    console.log('End of action');

  } catch (error) {
    core.setFailed(error.message);
  }
})();