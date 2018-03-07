'use strict';
const Enumerable = require('linq');
const glob = require("glob");
const ncp = require("ncp").ncp;
ncp.limit = 16;
const pjson = require('./package.json');
const path = require('path');
const homeDir = path.join(__dirname);
const clientDir = path.join(homeDir, "../../client");
const serverDir = path.join(homeDir, "../../server");
const distDir = path.join(homeDir, "../../dist");
const child_process = require('child_process');
const fs = require('fs');
const rimraf = require('rimraf');
const isWindows = (process.platform === "win32")

//#region args

let args = [];
process.argv.forEach(function (val, index, array) {
    if (val.startsWith('--')) {
        args.push(val);
    }
});

//#endregion

//#region env

let env =
    Enumerable
        .from(args)
        .where(v => v.startsWith('--env'))
        .take(1)
        .select(v => v.split('=')[1])
        .toArray()[0];

//#endregion

console.log(`env:${env}`);
console.log(`homeDir:${homeDir}`);
console.log(`clientDir:${clientDir}`);

run().then(d => { }).catch(e => {
    console.error(`run error: ${e}`);
});

async function run() {

    //runWebpack
    var runWebpackResult = await runWebpack();
    console.log("runWebpackResult", runWebpackResult);

    rimraf.sync(distDir, {});
    fs.mkdirSync(distDir);

    //copy client
    fs.mkdirSync(distDir + "/client");
    fs.mkdirSync(distDir + "/client/app");
    fs.mkdirSync(distDir + "/client/app/dist");

    let src = clientDir + "/app/dist";
    let dist = distDir + "/client/app/dist";
    await cpDir(src, dist);
    console.log(`${src} to ${dist}` + ' cpDir done!');

    //copy server
    fs.mkdirSync(distDir + "/server");
    src = serverDir;
    dist = distDir + "/server/";
    await cpDir(src, dist, (p) => {

        if (p.indexOf("node_modules") != -1) {
            return false;
        }
        else if (p.indexOf("appLog") != -1) {
            return false;
        }

        return true

    });
    console.log(`${src} to ${dist}` + ' cpDir done!');

    //copy files
    copyFileToDistSync('run-dev.sh')
    copyFileToDistSync('run-prd.sh')
    copyFileToDistSync('pm2-prd.yml')
    copyFileToDistSync('pm2-demo.yml')
  
    copyFileToDistSync('install-prd.sh')
    copyFileToDistSync('install-demo.sh')
    copyFileToDistSync('uninstall.sh')
    
}

function copyFileToDistSync(filename){
    let src = homeDir + "/"+filename;
    let dist = distDir + "/"+filename;
    fs.copyFileSync(src, dist);
    console.log(`${src} to ${dist}` + ' cpDir done!');
}

async function cpDir(src, dist, filter) {
    return new Promise((resovle, reject) => {

        ncp(src, dist, {

            filter: filter

        }, function (err) {
            if (err) {
                reject(err);
            }
            resovle();
        });

    });
}

async function runWebpack() {

    return new Promise((resovle, reject) => {

        let p = null;
        if (isWindows) {
            p = child_process.spawn("cmd", ['/c', 'cnpm install&&npm run webpack_' + env], {

                encoding: 'utf8',
                timeout: 60 * 1000,
                maxBuffer: 500 * 1024,
                killSignal: 'SIGTERM',
                cwd: clientDir,
                env: process.env


            });
        }
        else {
            p = child_process.spawn("sh", ['-c', 'cnpm install&&npm run webpack_' + env], {

                encoding: 'utf8',
                timeout: 60 * 1000,
                maxBuffer: 500 * 1024,
                killSignal: 'SIGTERM',
                cwd: clientDir,
                env: process.env

            });
        }

        p.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        p.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        p.on('close', (code) => {
            console.log(`runWebpack child process exited with code ${code}`);
            if (code == 0)
                resovle(code);
            else
                reject(code)
        });

    });

};
