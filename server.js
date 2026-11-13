import express from 'express';import {fileURLToPath} from 'url';import path from 'path';
const d=path.join(path.dirname(fileURLToPath(import.meta.url)),'dist'),app=express();
app.use(express.static(d));app.get('/api/health',(_,r)=>r.json({ok:true}));app.get('*',(_,r)=>r.sendFile(path.join(d,'index.html')));
app.listen(process.env.PORT||3000,()=>console.log('C.g 2027 museum running'));
