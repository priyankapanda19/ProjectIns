
const cmpModule = require("../module/cmpModule")
const validation = require("../validation/valid");

let { isEmpty,
    isValidPhone,
    isValidObjectId,
    isValidwebsiteurl } = validation


//----------------------------------Create Company----------------------------------//


const createComp = async function (req, res) {
    try {
        const comp = req.body
        if (Object.keys(comp).length == 0) {
            return res.status(400).send({ status: "false", message: "All fields are mandatory" });
        }

        let { companyname, headofficeaddress, contactnumber, websiteurl } = comp

        if (!isEmpty(companyname)) {
            return res.status(400).send({ status: false, message: "Company Name must be present " });
        }
        let existedCompany = await cmpModule.findOne({ companyname });
        if (existedCompany)
            return res.status(400).send({ status: false, message: "This Companny  is already registered" });

        if (!isEmpty(headofficeaddress)) {
            return res.status(400).send({ status: false, message: "Head Office adress is Missing or does not have a valid input" })
        }

        if (!contactnumber)
            return res.status(400).send({ status: false, message: "Please Enter Your phone Number" });
        if (!isValidPhone(contactnumber))
            return res.status(400).send({ status: false, message: "Please Enter 10 digit phone Number" });


        let existedphone = await cmpModule.findOne({ contactnumber });
        if (existedphone)
            return res.status(400).send({ status: false, message: "This Mobile No. is already registered" });



        if (!isEmpty(websiteurl)) {
            return res.status(400).send({ status: false, message: "websiteurl is compulsory" });
        }
        if (!isValidwebsiteurl(websiteurl)) {
            return res.status(400).send({ status: "false", message: "provide a valid websiteurl" });
        }



        const data = await cmpModule.create(comp)
        return res.status(201).send({ status: true, message: "Company created succefully", data: data })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }

}
//----------------------------------get Company profile--------------------------//


const getCompany = async function (req, res) {
    try {
        const comp = req.params.Id
        if (!comp)
            return res.status(404).send({ status: false, message: "No data found in query" })


        if (!isValidObjectId(comp))
            return res.status(400).send({ status: false, message: "please enter a valid company ID" })


        let getCompany = await cmpModule.findOne({ _id: comp, isDeleted: false })
        if (getCompany.length == 0)
            return res.status(404).send({ status: false, message: "no documents found with this query" })

        return res.status(200).send({ status: true, message: 'Company list', data: getCompany })

    }



    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }


}
//-----------------------------update  company profile---------------------------------//


const updateCompany = async function (req, res) {
    try {
        const comp = req.params.Id
        const data1 = req.body.companyname
        if (Object.keys(data1).length == 0) {
            return res.status(400).send({ status: "false", message: "Put some data to update" });
        }

        let { companyname,

            headofficeaddress,

            contactnumber,
            websiteurl,

        } = data1
        if (companyname) {
            if (!isEmpty(companyname)) {
                return res.status(400).send({ status: false, message: "Company Name must be present " });
            }

            let existedCompany = await cmpModule.findOne({ companyname });
            if (existedCompany)
                return res.status(400).send({ status: false, message: "This Companny  is already registered" });
        }
        if (headofficeaddress) {
            if (!isEmpty(headofficeaddress)) {
                return res.status(400).send({ status: false, message: "Head Office adress is Missing or does not have a valid input" })
            }
        }
        if (contactnumber) {
            if (!contactnumber)
                return res.status(400).send({ status: false, message: "Please Enter Your phone Number" });
            if (!isValidPhone(contactnumber))
                return res.status(400).send({ status: false, message: "Please Enter 10 digit phone Number" });


            let existedphone = await cmpModule.findOne({ contactnumber });
            if (existedphone)
                return res.status(400).send({ status: false, message: "This Mobile No. is already registered" });

        }


        if (websiteurl) {
            if (!isEmpty(websiteurl)) {
                return res.status(400).send({ status: false, message: "websiteurl is compulsory" });
            }
            if (!isValidwebsiteurl(websiteurl)) {
                return res.status(400).send({ status: "false", message: "provide a valid websiteurl" });
            }

        }

        const data = await cmpModule.findOneAndUpdate({ _id: comp }, { $set: { ...data1 } }, { new: true })
        return res.status(200).send({ status: true, message: "All data are update suiccessfully", data: data })

    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }


}
//----------------------------------Delete Company profile--------------------------//


const deleteCompany = async function (req, res) {
    try {
        const comp = req.params.Id
        let checkCompany = await cmpModule.findOneAndUpdate(comp)

        if (!checkCompany.isDeleted == false)
            return res.status(400).send({ status: false, message: "Company is already deleted" })





        const data = await cmpModule.findOneAndUpdate({ _id: comp }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        return res.status(200).send({ status: true, message: "deleted suiccessfully", data: data })


    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })

    }


}


module.exports.createComp = createComp
module.exports.getCompany = getCompany
module.exports.updateCompany = updateCompany
module.exports.deleteCompany = deleteCompany