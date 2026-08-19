#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(process.argv[2] || ".");
const port = Number(process.argv[3] || 4173);
const types = { ".html":"text/html", ".js":"text/javascript", ".css":"text/css", ".json":"application/json", ".svg":"image/svg+xml", ".png":"image/png", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".webp":"image/webp", ".ico":"image/x-icon" };
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,"http://localhost").pathname);
  if (pathname === "/docs" || pathname === "/demo") { res.writeHead(301,{Location:`${pathname}/`}); return res.end(); }
  let requestPath = pathname;
  if(requestPath.endsWith("/")) requestPath += "index.html";
  let file=path.resolve(root,"."+requestPath);
  if(!file.startsWith(root)){res.writeHead(403);return res.end("Forbidden");}
  fs.readFile(file,(err,data)=>{
    if(!err){res.writeHead(200,{"Content-Type":types[path.extname(file)]||"application/octet-stream"});return res.end(data);}
    const first=pathname.split("/").filter(Boolean)[0];
    const entry=first==="docs"?"/docs/index.html":first==="demo"?"/demo/index.html":"/index.html";
    const entryFile=path.resolve(root,"."+entry);
    if(entryFile.startsWith(root)) fs.readFile(entryFile,(entryErr,entryData)=>{
      if(!entryErr){res.writeHead(200,{"Content-Type":"text/html"});return res.end(entryData);}
      res.writeHead(404);res.end("Not found");
    }); else {res.writeHead(403);res.end("Forbidden");}
  });
});
server.listen(port,()=>console.log(`Marsdove server: http://localhost:${port}`));
