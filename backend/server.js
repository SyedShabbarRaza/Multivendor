import app from "./app.js";
import dotenv from 'dotenv'
import db from "./db/mongo-connection.js"

if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
        path: "backend/config/.env"
    });
}


const server = app.listen(process.env.PORT, () => {
  console.log(`server is running on http//localhost:${process.env.PORT}`);
});


process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server for handling uncaught exception`);
});


//unhandeled promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});
