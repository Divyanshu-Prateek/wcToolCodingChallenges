import {stat,readFile,createReadStream} from 'fs';
import * as readline from 'readline';


// -c
// Count number of bytes in the file
export let countBytesInFile = async (file) =>{
    return new Promise((resolve, reject) => {
        console.log("CountBytesInFile start:");
        stat(file,(err,stat) =>{
            if(!err){
                console.log("CountBytesInFile:stat: No error, now resolve");
                resolve(stat.size);
            }
            else{
                console.log("CountBytesInFile:stat: Error now,rejecting")
                console.log(`${file} ${err}`);
                reject(err);
            }
        })
        console.log("CountBytesInFile end:");
    })
} 

// -l
// Count the number of lines in the file
export let countLinesInFile = async (file) =>{
    const fileStream = createReadStream(file);
    const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
    });

    let lineCount = 0;
    for await (const line of rl) {
        lineCount++;
    }

    return lineCount;
} 

// -w
// Count the number of words in the file
export let countWordsInFile = async (file) =>{
    return new Promise((resolve, reject) => {
        readFile(file,'utf8',(err, data) =>{
            if(err){
                console.log(`${file} : ${err}`);
                reject(err);
            }

            let wordCount = data.split(/\s+/).filter(Boolean).length;
            resolve(wordCount);
        })
    })
}

// -m
// Count the number of characters in the file
export let countCharactersInFile = async (file) =>{
    return new Promise((resolve, reject) => {
        readFile(file,'utf8',(err, data) =>{
            if(err){
                console.log(`${file} : ${err}`);
                reject(err);
            }

            let charCount = data.length;
            resolve(charCount);
        })
    })
}
