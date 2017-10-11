#! /usr/bin/env node --harmony
const generator = require('commander');
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');
const shell = require('shelljs');
const fs = require('fs');

const defaultJS = (name) => `const ${name} = (args) => {
};
    
export default ${name};
`;

const addFunction = (name, functionName) => [`\t'${name}': ${functionName},`];

const addNextImport = (content, functionName, fileName) => [`import ${functionName} from './functions/${fileName}.js';`, ...content];

const getNextCasePosition = (content) => {
    let lineNumber = 0;
    for(line of content) {
        if(line.indexOf(',') > 0) {
            return lineNumber+1;
        } else {
            lineNumber++;
        }
    }
    return -1;
};

const getNewContent = (content, name, functionName, fileName) => {
    let newContent = addNextImport(content, functionName, fileName);
    const nextBreak = getNextCasePosition(newContent);
    newContent.splice(nextBreak, 0, ...addFunction(name, functionName));
    return newContent;
};

generator
    .version('1.0.0')
    .arguments('<name>')
    .option('-p, --popup', 'Add a popup function')
    .option('-c, --commit', 'Commit the files')
    .option('-desc, --desc', 'Function description')
    .action((name) => {
        co(function *() {
            const fileName = yield prompt(chalk.yellow('Enter a file name [js]: '));
            const functionName = yield prompt(chalk.yellow('Enter a function name [js]: '));
            try {
                const type = generator.popup ? 'popup' : 'background';
                const filePath = `${process.cwd()}/src/${type}/functions/${fileName.toLowerCase()}.js`;
                fs.writeFile(filePath, defaultJS(functionName), (err) => {
                    if (err) console.log(err);
                    fs.readFile(`${process.cwd()}/src/${type}/index.js`, (err, data) => {
                        if (err) console.log(err);

                        const content = data.toString().split('\n');
                        const file = fs.openSync(`${process.cwd()}/src/${type}/index.js`,'r+');
                        const bufferedText = new Buffer(getNewContent(content, name, functionName, fileName.toLowerCase()).join('\n'));
                        fs.writeSync(file, bufferedText, 0, bufferedText.length, 0);
                        fs.close(file);

                        console.log("Created!");
                        if(generator.commit) {
                            shell.exec(`git add . && git commit -m 'Added ${name} function ${generator.desc ? 'to ' + generator.desc + '.': '.'}'`, (code) => process.exit(code));
                        }
                        process.exit();
                    });
                });
            } catch(error) {
                console.log('An error occured bruh');
                process.exit();
            }
        });
    })
    .parse(process.argv);