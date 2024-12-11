const path = require('path');
const express= require('express');
const router = express.Router();
const mongoose = require("mongoose");
var datoE= mongoose.Schema({
  abrevNum: String,
  asignatura: String,
  carrera: String,
  facultad:String,
  nombre:String,
  tipo: String,
})
var materiasUp=mongoose.model("cruv", datoE);
module.exports = materiasUp