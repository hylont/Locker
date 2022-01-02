const { ipcRenderer, contextBridge } = require("electron");
const { platform } = require("os");
// can be accessed through window.app 
contextBridge.exposeInMainWorld('locker', {
    platform: platform(), // create a property oj the app object for platform 
    doSomething: (args) => ipcRenderer.invoke("do-something", args),
});