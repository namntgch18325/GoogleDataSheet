var express = require('express')
var router = express.Router()
// const AuthController = require('../Http/Controller/AuthController.js');
const SheetController = require('../Http/Controller/SheetController.js');

express.application.prefix = express.Router.prefix = function(path, configure) {
    configure(router);
    this.use(path, router);
    return router;
}

router.prefix('/sheet', async function (sheet) {
  //  auth.route('/login').post(AuthController.login);
    //sheet.route('/create').post(SheetController.Create);
    sheet.route('/row/new').post(SheetController.NewRow);
});

// router.prefix('sheet',async function(sheet){
//     sheet.route('/create').post(SheetController.Create);
// });

module.exports = router;