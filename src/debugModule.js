

export let DebugModule = (isDebugMode) =>{
    let debug = (...args) =>{
        if(isDebugMode){
            console.log("Debug statement: ",...args);
        }
    }
    
    let execute = (callback) =>{
        if(isDebugMode){
            callback();
        }
    }

    let debugModule = {debug, execute};
    return debugModule;
}

