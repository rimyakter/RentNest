
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    
import E from"express";import{PrismaPg as x}from"@prisma/adapter-pg";import"process";import*as o from"path";import{fileURLToPath as c}from"url";import"@prisma/client/runtime/client";import*as i from"@prisma/client/runtime/client";var n={previewFeatures:[],clientVersion:"7.9.1",engineVersion:"e922089b7d7502aff4249d5da3420f6fa55fc6ad",activeProvider:"postgresql",inlineSchema:`model car {
  id    String @id @default(cuid())
  make  String
  model String
  year  Int
}

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Get a free hosted Postgres database in seconds: \`npx create-db\`

generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}
`,runtimeDataModel:{models:{},enums:{},types:{}},parameterizationSchema:{strings:[],graph:""}};n.runtimeDataModel=JSON.parse('{"models":{"car":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"make","kind":"scalar","type":"String"},{"name":"model","kind":"scalar","type":"String"},{"name":"year","kind":"scalar","type":"Int"}],"dbName":null}},"enums":{},"types":{}}');n.parameterizationSchema={strings:JSON.parse('["where","car.findUnique","car.findUniqueOrThrow","orderBy","cursor","car.findFirst","car.findFirstOrThrow","car.findMany","data","car.createOne","car.createMany","car.createManyAndReturn","car.updateOne","car.updateMany","car.updateManyAndReturn","create","update","car.upsertOne","car.deleteOne","car.deleteMany","having","_count","_avg","_sum","_min","_max","car.groupBy","car.aggregate","AND","OR","NOT","id","make","model","year","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","set","increment","decrement","multiply","divide"]'),graph:"KwsQBxwAACIAMB0AAAQAEB4AACIAMB8BAAAAASABACMAISEBACMAISICACQAIQEAAAABACABAAAAAQAgBxwAACIAMB0AAAQAEB4AACIAMB8BACMAISABACMAISEBACMAISICACQAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAEHwEAAAABIAEAAAABIQEAAAABIgIAAAABAQgAAAkAIAQfAQAAAAEgAQAAAAEhAQAAAAEiAgAAAAEBCAAACwAwAQgAAAsAMAQfAQAqACEgAQAqACEhAQAqACEiAgArACECAAAAAQAgCAAADgAgBB8BACoAISABACoAISEBACoAISICACsAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBRUAACUAIBYAACYAIBcAACkAIBgAACgAIBkAACcAIAccAAAaADAdAAAXABAeAAAaADAfAQAbACEgAQAbACEhAQAbACEiAgAcACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAccAAAaADAdAAAXABAeAAAaADAfAQAbACEgAQAbACEhAQAbACEiAgAcACEOFQAAHgAgGAAAIQAgGQAAIQAgIwEAAAABJAEAAAAEJQEAAAAEJgEAAAABJwEAAAABKAEAAAABKQEAAAABKgEAIAAhKwEAAAABLAEAAAABLQEAAAABDRUAAB4AIBYAAB8AIBcAAB4AIBgAAB4AIBkAAB4AICMCAAAAASQCAAAABCUCAAAABCYCAAAAAScCAAAAASgCAAAAASkCAAAAASoCAB0AIQ0VAAAeACAWAAAfACAXAAAeACAYAAAeACAZAAAeACAjAgAAAAEkAgAAAAQlAgAAAAQmAgAAAAEnAgAAAAEoAgAAAAEpAgAAAAEqAgAdACEIIwIAAAABJAIAAAAEJQIAAAAEJgIAAAABJwIAAAABKAIAAAABKQIAAAABKgIAHgAhCCMIAAAAASQIAAAABCUIAAAABCYIAAAAAScIAAAAASgIAAAAASkIAAAAASoIAB8AIQ4VAAAeACAYAAAhACAZAAAhACAjAQAAAAEkAQAAAAQlAQAAAAQmAQAAAAEnAQAAAAEoAQAAAAEpAQAAAAEqAQAgACErAQAAAAEsAQAAAAEtAQAAAAELIwEAAAABJAEAAAAEJQEAAAAEJgEAAAABJwEAAAABKAEAAAABKQEAAAABKgEAIQAhKwEAAAABLAEAAAABLQEAAAABBxwAACIAMB0AAAQAEB4AACIAMB8BACMAISABACMAISEBACMAISICACQAIQsjAQAAAAEkAQAAAAQlAQAAAAQmAQAAAAEnAQAAAAEoAQAAAAEpAQAAAAEqAQAhACErAQAAAAEsAQAAAAEtAQAAAAEIIwIAAAABJAIAAAAEJQIAAAAEJgIAAAABJwIAAAABKAIAAAABKQIAAAABKgIAHgAhAAAAAAABLgEAAAABBS4CAAAAAS8CAAAAATACAAAAATECAAAAATICAAAAAQAAAAAFFQAGFgAHFwAIGAAJGQAKAAAAAAAFFQAGFgAHFwAIGAAJGQAKAQIBAgMBBQYBBgcBBwgBCQoBCgwCCw0DDA8BDRECDhIEERMBEhQBExUCGhgFGxkL"};async function y(t){let{Buffer:r}=await import("buffer"),A=r.from(t,"base64");return new WebAssembly.Module(A)}n.compilerWasm={getRuntime:async()=>await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs"),getQueryCompilerWasmModule:async()=>{let{wasm:t}=await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");return await y(t)},importName:"./query_compiler_fast_bg.js"};function a(){return i.getPrismaClient(n)}import*as e from"@prisma/client/runtime/client";var O=e.Extensions.getExtensionContext;var f={DbNull:e.NullTypes.DbNull,JsonNull:e.NullTypes.JsonNull,AnyNull:e.NullTypes.AnyNull};var I=e.makeStrictEnum({ReadUncommitted:"ReadUncommitted",ReadCommitted:"ReadCommitted",RepeatableRead:"RepeatableRead",Serializable:"Serializable"});var B=e.Extensions.defineExtension;globalThis.__dirname=o.dirname(c(import.meta.url));var p=a();var g=new x({connectionString:process.env.DATABASE_URL}),P=new p({adapter:g}),l=P;import{configDotenv as T}from"dotenv";T();var h={NODE_ENV:process.env.NODE_ENV,PORT:process.env.PORT,DATABASE_URL:process.env.DATABASE_URL};var s=E();s.get("/",(t,r)=>{r.send("Server is Running Noman!")});s.get("/cars",async(t,r)=>{let A=await l.car.findMany();r.json(A)});var m=s;process.env.NODE_ENV!=="production"&&m.listen(3e3,()=>{console.log("Server is running on http://localhost:3000")});
