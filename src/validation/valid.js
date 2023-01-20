const mongoose = require("mongoose");

// ----------------Name Validation-------------------------->>
const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z ]+$/;
    return nameRegex.test(name);
};
//<<----------------Validation for Phone No. ---------------->>
const isValidPhone = function (phone) {
    return /^([+]\d{2})?\d{10}$/.test(phone);
};

//<<----------------Validation for Email --------------------->>
const isValidEmail = function (email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};


//-------------------Value Validation--------------------------->>
const isEmpty = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
}

//--------------------ObjectId----------------------------------->>
const isValidObjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId);
};

//--------------------validation for street----------------------->>

const street = function (street) {
    const streetRegex = /^[a-z \, A-Z \d]+$/;
    return streetRegex.test(street);
};

//--------------------validation for city--------------------------->>

const city = function (city) {
    const cityRegex = /^[a-z A-Z]+$/;
    return cityRegex.test(city);
};
//----------------------validation for pin code-------------------->>

const pincode = function (pincode) {
    const pinRegex = /^[\d]{6}$/;
    return pinRegex.test(pincode);
};
//--------------------------validation for web url------------------->>>

const isValidwebsiteurl = function (isValidwebsiteurl) {
    let validurllink = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/
    return validurllink.test(isValidwebsiteurl)
};
module.exports = {
    isEmpty,
    isValidPhone,
    isValidObjectId,
    isValidName,
    isValidObjectId,
    isValidwebsiteurl

};
