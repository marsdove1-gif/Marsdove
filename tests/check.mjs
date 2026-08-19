import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
const root=path.resolve("src");
const files=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,entry.name);if(entry.isDirectory())walk(p);else if(entry.name.endsWith(".js"))files.push(p);}}
walk(root);
let failed=0;
for(const file of files){try{execFileSync(process.execPath,["--check",file],{stdio:"ignore"});}catch{console.error("Syntax error:",file);failed++;}}
for(const file of files.filter(f=>f.includes(`${path.sep}components${path.sep}`)&&!f.includes(`${path.sep}components${path.sep}ui${path.sep}`))){if(/\b_\$\s*\(/.test(fs.readFileSync(file,"utf8"))){console.error("DOM boundary violation:",file);failed++;}}
if(failed)process.exit(1);
console.log(`Marsdove checks passed: ${files.length} JS files inspected.`);
