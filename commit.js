const { exec } = require('child_process');

exec("git add .", (a, out)=> {console.log(out);exec("git commit -m \""+process.argv[1]+"\"", (a, out) => {console.log(out);exec("git push", (a, out)=>{console.log(out)})})})
