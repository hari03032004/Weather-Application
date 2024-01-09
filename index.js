import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    
const d = new Date();
let day = days[d.getDay()]; 
console.log(day);
const dt = new Date();
const dat =dt.getDate();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const URL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "d8552f4c3d6e35f00e1ed99ce2c0fbdd";


app.get("/", async (req,res)=>{
  try {
    const result = await axios.get(URL,{
      params: {
        q:"chennai",
        units: "metric",
        apiKey: apiKey,
      },
    });
    res.render("index.ejs",{
      content :result.data,
      days : day,
      date : dat,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.get("/search", async (req,res)=>{
  const srch = req.query.search;
  console.log(srch);
  try {
    const result = await axios.get(URL,{
      params: {
        q:srch,
        units: "metric",
        apiKey: apiKey,
      },
    });
    res.render("index.ejs",{
      content :result.data,
      days : day,
      date : dat,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

app.listen(port ,() =>{
  console.log(`Port ${port} is active`);
});