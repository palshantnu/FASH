const { exec } = require("child_process");
var config = require('../src/config')
var host = require('../../../framework/src/config').baseURL.replace("http://", '').replace("https://", '');

var data = JSON.stringify({
    data: {
        title: 'title',
        description: 'description',
        account_id: 0,
        anonymous: false,
    }
})

exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.getReviewsAPiEndPoint} --body '${data}'`, (error, stdout, stderr) => {
    if (error) {
        console.log(`EndPoint Failed`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});


exec(`cd ../../../.. && node endPointTest.js --host ${host} --path ${config.getReviewsAPiEndPoint} --method GET`, (error, stdout, stderr) => {
    if (error) {
        console.log(`EndPoint Failed`);
        process.exit(-1);
    }
    
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});