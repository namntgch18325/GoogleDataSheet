require('dotenv').config()
const DataSheet = require('../Provider/DataSheet.js');

exports.NewRow = (req,res) => {
    const Sheet = new DataSheet(process.env.AUTHENTICATION_CERTIFICATE,[process.env.SCOPE]);
    Sheet.Authorize(); //AUTHENTICATE
    Sheet.NewRow(process.env.SHEET_ID,'SheetName',process.env.START_COLLUMN,process.env.END_COLLUMN,req.body.data)    
    .then((result) => res.json({"message":"add 1 row to sheet"}))
    .catch((err) => res.json({"message":"Error"}));;
}