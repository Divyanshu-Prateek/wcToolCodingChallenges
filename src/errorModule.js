

export let ErrorModule = () =>{
    let errorModule = {handleError};
    return errorModule;
}

let handleError = (err) =>{
    console.debug(`ErrorModule.handleError: ${err}`);
    // switch cases of different types of error
    console.error(`Error occurred: ${err.stack}`)
}