//jshint esversion:6

const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/inventory",{useNewUrlParser:true});

const userSchema = new mongoose.Schema({
  supplier_no:String,
  stock_number:String,
  stock_name:String,
  Category:String,
  Purchasing_price:Number,
  selling_Price:Number,
  Notes:String,
  Quantity:Number,
  Date_added:Date,
  Added_by:String,
  Date_updated:Date,
  Updated_by:String
});

const stocks = mongoose.model("Stock",userSchema);

const stock = new stocks({
  supplier_no:"supplier1",
  stock_number:"stock1",
  stock_name:"hard disk",
  Category:"KKM",
  Purchasing_price:12345,
  selling_Price:123456,
  Notes:"test",
  Quantity:3,
  Date_added:"",
  Added_by:"admin",
  Date_updated:"",
  Updated_by:"tres"
});

stock.save()
console.log("done");
