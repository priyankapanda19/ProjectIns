const express = require("express")
const userContro = require("../controller/companyController")
const router = express.Router()




router.post("/companyCreate", userContro.createComp)
router.get("/getCompany/:Id", userContro.getCompany)
router.put("/updateCompany/:Id", userContro.updateCompany)
router.delete("/deleteCompany/:Id", userContro.deleteCompany)


//-----------------------API for wrong route-of-API--------------------------------->>>
router.all("/*", function (req, res) {
    return res.status(400).send({status: false,message: "Path Not Found"});
 });

 
module.exports = router