"use strict"

/**
 * A utility static class which handles reading and writing files
 */
export class Manager {
    constructor(){

    }
    
    /**
     * Returns current absolute path
     * @returns String absolute path
     */
    static getPath(){
        return process.cwd();
    }

    static updateCredential(param){
        //console.info(param);
    }

    /**
     * Get the saved credentials from storage
     * @returns Object[] credentials
     */
    static getCredentialsList(){
        return [{uuid: "8731f5c5-270f-465a-86fa-a450296db92a",service:"local",id:"root",pwd:"root"},{uuid: "f47ce36e-15d2-4a39-b4a4-1d23127ddd6c", service:"faketaxi account",id:"ewww@ph.com",pwd:"kalifa"}];
    }
}