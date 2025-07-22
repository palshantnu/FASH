const { exec } = require("child_process");

var config = require('../src/config')
var host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');        

var data = JSON.stringify({
    data: {
        token: "hxbhbvgvcfc2345vhvhv",
        new_password: "Test@1234"
    }
})

exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.accountsAPiEndPoint} --body '${data}'`, (error, stdout, stderr) => {
    if (error) {
        console.log(`EndPoint Returned Error: ${error}`);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});