const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const fs = require('fs');
const {google} = require('googleapis');

class DataSheet {
    constructor(key_path,SCOPE)
    {
        console.log(key_path);
        this.KEY = JSON.parse(fs.readFileSync(key_path));
        this.SCOPE = SCOPE;
        this.client;
        if(this.KEY != null && this.KEY != undefined)
        {
            if(this.SCOPE != null && this.SCOPE != undefined)
            {
                this.client = new google.auth.JWT(
                    this.KEY.client_email,
                    null,
                    this.KEY.private_key,
                    this.SCOPE
                );
            }
        }
    }

    Authorize = () =>
    {
        this.client.authorize(function(err,tokens){
            if(err) {
                console.log('Can not authenticate');
                return false;
            }
            else console.log('Authenticate Successfully');
        });
    }

    Count = (SheetID,SheetName) =>
    {
        return new Promise((resolve,reject)=>{
            const sheets  = google.sheets({version: 'v4', auth: this.client});
            sheets.spreadsheets.values.get({
                    spreadsheetId: SheetID,
                    range: SheetName,
                },(err, res) => {
                    if(err) reject(err)
                    else {
                        let data  = res.data.values;
                        resolve(data.length);
                    }
                });
        });
    }

    NewRow = (SheetID,SheetName,StartCollumn,EndCollumn,Data) =>
    {
        return new Promise((resovle,reject) => {
            this.Count(SheetID,SheetName).then((length) => {
                let Range = SheetName + '!' + StartCollumn + (length + 1) + ':' + EndCollumn + (length + 1);
                let values = [Data];
                console.log(Data);
                const resource = { values };
                const sheets  = google.sheets({version: 'v4', auth: this.client});
                sheets.spreadsheets.values.append({
                    spreadsheetId:SheetID,
                    range: Range,
                    resource,
                    valueInputOption : 'USER_ENTERED'
                }, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resovle("Successfull");
                    }
                });
            }).catch(err => reject(err));
        });
    }
}

module.exports = DataSheet;