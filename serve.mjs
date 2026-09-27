import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('dist');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.ics':'text/calendar; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
  try{let route=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(route.endsWith('/'))route+='index.html';const file=path.resolve(root,'.'+route);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return}const data=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(data)}catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found')}
});
server.listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
