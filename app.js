const express = require("express");
const app = express();
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const useRouter = require("./routes/users")
const homeRouter = require("./routes/home")
require("dotenv").config();
const debug = require("debug")(process.env.DEBUG);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

app.set("view engine", "ejs");
app.set("views", "./views");

debug(process.env.ADMIN_NODEJS);
// console.log("NODE_ENV:",process.env.NODE_ENV)
// console.log(app.get("env"))
console.log("Aplication Name:", config.get("name"));
console.log("Version:", config.get("version"));
if (app.get("env") === "development") {
  // console.log("morgan is on")
  app.use(morgan("tiny"));
}

// app.use((req,res,next)=>{
//   console.log(req.body)
//   next()
// })


app.use("/api/users",useRouter)
app.use("/",homeRouter)
const port = process.env.PORT || 1000;
app.listen(port, () => {
  console.log(`listen on port ${port}`);
});
