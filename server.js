const app = require("express")();
const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const port = process.env.PORT || 3000;
require('dotenv').config({path:'./config.env'});
const { connectDb } = require('./backend/utils');
connectDb();


nextApp.prepare().then(() => {
  
  app.all('*', (req, res) => {
    return handle(req, res);
  });

  app.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});