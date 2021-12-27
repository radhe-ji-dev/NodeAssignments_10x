const process = require("process");
function getNameFromCommandLine() {
    const argArray=process.argv;
    lenOfArr=argArray.length;
    return argArray[lenOfArr-1]
}

function getNameFromEnv() {
    const envVariable=process.env.name;
    return envVariable;
}

function getNameFromReadLine() {
    const readline=require("readline");
    const Interface=readline.createInterface(process.stdin,process.stdout);
    Interface.setPrompt("Taking input") 
    Interface.prompt()
    Interface.on("line",(input)=>{
        inputValue=input;
        Interface.close();
    }) 
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}