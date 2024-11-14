import { argv } from 'process';
import * as actions from './functions.js';
import {ErrorModule}  from './errorModule.js';
import { DebugModule } from './debugModule.js';


const errorModule = ErrorModule();
const debugModule = DebugModule(argv.includes('-debug'));

// argv.forEach((val, index) => {
//   console.log(`${index}: ${val}`);
// });

let defaultkeyNames = ["nodeLocation", "exeLocation"];
let actionTypes = ['c','l', 'w', 'm'];


// list the arguments and respective values as k-v pairs
  // form of {
  //          "nodelocation": "...",
  //          "exelocation": "...",
  //          "fileName1.txt" : ["c", "l"],
  //          "fileName2.txt" : [],
  //          "fileName3.txt" : ["m"] 
  //         }
let createArgKeyValuePairs = (argKeyValuePairs) =>{

  if(argv.includes('-debug')){
    argKeyValuePairs["mode"] = "debug";
  }
  else{
    argKeyValuePairs["mode"] = "normal";
  }


  let actionList = [];
  let fileName = null;
  argv.forEach((val,index) =>{
    let syntaxStatus = false;
    if(val=='-debug'){
     return;   
    }

    if(index<2){
      
      argKeyValuePairs[defaultkeyNames[index]] = val;
      return; // to next index
    }  

    if(!val.endsWith("txt") && val.includes("-")){
      let actionChar = val.split('-')[1];
      
      if(!actionTypes.includes(actionChar)){
        // syntax error
        throw new Error(`createArgKeyValuePairs: No defined action for ${actionChar}`);
      }

      actionList.push(actionChar);
      syntaxStatus =  true;
      //console.log(actionChar);
    }

    if(val.endsWith("txt")){
      argKeyValuePairs[val] = actionList;
      actionList = [];

      syntaxStatus = true;
    }

    // Syntax check
    if(!syntaxStatus){
      // ERROR case, bad syntax
      throw new Error(`createArgKeyValuePairs: Incorrect Syntax, extension ${val} is not supported`);
    }
  })

  if(actionList.length!=0){
    // ERROR case, bad syntax
    throw new Error("Incorrect Syntax");
  }
}

let performActionBasedOnKVPairs = async (argKeyValuePairs) => {
  debugModule.debug('PerformActionBasedOnKVPairs start...');
  let outputArray = [];
  
  // Collecting all promises to be resolved
  let tasks = Object.entries(argKeyValuePairs).map(async ([key, value], index) => {
    let filePath = key;
    if (index < 3) {
      return;  // Skip first three entries
    }

    if (value.length == 0) {
      value = ["c", "l", "w"];
    }

    // Process each action value
    for (let actionVal of value) {
      let appendValue = null;
      switch (actionVal) {
        case "c":
          debugModule.debug('PerformActionBasedOnKVPairs appendValue: "c" actions call start');
          appendValue = await actions.countBytesInFile(filePath);
          break;

        case "l":
          appendValue = await actions.countLinesInFile(filePath);
          break;

        case "w":
          appendValue = await actions.countWordsInFile(filePath);
          break;

        case "m":
          appendValue = await actions.countCharactersInFile(filePath);
          break;

        default:
          break;
      }

      if (appendValue != null) {
        outputArray.push(appendValue);
      }
    }

    // Append the file name (key) to the output array
    outputArray.push(key);
  });

  // Wait for all tasks to complete
  await Promise.all(tasks);

  // Process the output array after all async tasks are finished
  let outputString = "";
  outputArray.forEach((val, index) => {
    if (typeof val === "string" && val.includes("txt")) {
      outputString += val + "\n";
    } else {
      outputString += val + " ";
    }
  });

  console.log(outputString);
};

// For each argument use a switch case
let main = async () =>{
  
  let argKeyValuePairs = {};
  debugModule.execute(()=>{
    debugModule.debug(`Debug: Print all argv values`)
    argv.forEach((value,index)=>{
      debugModule.debug(`index: ${index} value: ${value}`)
    })
  })

  try{
    createArgKeyValuePairs(argKeyValuePairs);

    debugModule.execute(()=> {
      debugModule.debug(`Debug: Print all ArgKeyValuePairs object`);
      Object.entries(argKeyValuePairs).forEach(([key, value], index) => {
        debugModule.debug(`Index: ${index}, Key: ${key}, Value: ${value}`);
      });
    })

    await performActionBasedOnKVPairs(argKeyValuePairs);
    // argKeyValuePairs.forEach((key,val,index) =>{
    //   console.log(index, " ", key, " : ", val);
    // })
  }
  catch(err){
    // Log error
    errorModule.handleError(err);
  }

}

main();