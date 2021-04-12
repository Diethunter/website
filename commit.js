const { exec } = require('child_process');

exec("git add .", ()=> exec("git commit -m \""+process.argv[1]+"\"", () => exec("git push", ()=>{})))
