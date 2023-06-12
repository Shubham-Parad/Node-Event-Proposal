const express = require('express');
const mongoose = require("mongoose")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser");
const cors = require("cors")
const { requireLogin } = require('../middleware/auth.js');
const fs = require('fs');
const multer = require("multer")

const registerModel = require("../Schema/registerschema.js");
const registerUserModel = require('../Schema/userSchema/registeruser.js');
const proposalModel = require("../Schema/proposalSchema.js")

const router = express.Router();
router.use(cookieparser());
router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: true }))
// require("dotenv").config();

mongoose.set('strictQuery', false);
const selectedModel = require('../Schema/userSchema/selectedSchema.js')


const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

//register
router.post("/register", async (req, res) => {

    let { name, email, contact, password } = req.body;
    try {
        // console.log(req.body);
        const oldVender = await registerModel.findOne({ email })
        if (oldVender) {
            return res.send({ status: "error", error: "Vendor Exist" })
        }

        let securepass = await bcrypt.hash(password, 10)
        console.log(securepass);
        await registerModel.create({
            name: name,
            email: email,
            contact: contact,
            password: securepass,

        });

        res.send({ status: "ok" });
    }
    catch (error) {
        res.send({ status: "error" });
    }
})

//login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const vendor = await registerModel.findOne({ email });
        if (!vendor) {
            return res.json({ status: "error", error: "Vendor not found" })
        }
        if (await bcrypt.compare(password, vendor.password)) {
            const token = await jwt.sign({ _id: vendor._id, email: vendor.email, name: vendor.name }, "secret_key")
            if (res.status(201)) {
                res.cookie("Name", vendor.name)
                return res.json({ status: "ok", data: token, vendorName: vendor.name });
            } else {
                return res.json({ error: "error" });
            }
        }
        res.json({ status: "error", error: "Invalid Password" })
    } catch (err) {
        res.send(err)
    }
});

//register user
router.post("/user/register", async (req, res) => {
    let { name, email, contact, password } = req.body;
    try {
        // console.log(req.body);
        const oldUser = await registerUserModel.findOne({ email })
        if (oldUser) {
            return res.send({ status: "error", error: "Vendor Exist" })
        }

        let securepass = await bcrypt.hash(password, 10)
        console.log(securepass);
        await registerUserModel.create({
            name: name,
            email: email,
            contact: contact,
            password: securepass,

        });

        res.send({ status: "ok" });
    }
    catch (error) {
        res.send({ status: "error" });
    }
})

//login user
router.post("/user/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await registerUserModel.findOne({ email });
        if (!user) {
            return res.json({ status: "error", error: "User not found" })
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = await jwt.sign({ _id: user._id, email: user.email, name: user.name }, "secret_key")
            if (res.status(201)) {
                res.cookie("Name", user.name)
                return res.json({ status: "ok", data: token, userName: user.name });
            } else {
                return res.json({ error: "error" });
            }
        }
        res.json({ status: "error", error: "Invalid Password" })
    } catch (err) {
        res.send(err)
    }
})

//create a new proposal
router.post("/createproposal", upload.single("image"), async (req, res) => {
    let { eventName, placeOfEvent, proposalType, eventType, budget, fromDate, toDate, foodPreference, description, events, token, image } = req.body;

    try {
        const vendor = jwt.verify(token, "secret_key")
        const vendorEmail = vendor.email;
        const vendorId = vendor._id;
        const vendorName = vendor.name;
        // console.log(vendorEmail)
        let proposalData = await new proposalModel({
            eventName, placeOfEvent, proposalType, eventType, budget, fromDate, toDate, foodPreference, description, events, vendorEmail: vendorEmail, vendorId: vendorId, vendorName: vendorName, image
        });
        const data = await proposalData.save();
        res.send({ status: "ok" });
    } catch (error) {
        res.send({ status: "error" });
    }
});

//delete proposal
router.delete("/deleteproposal", async (req, res) => {
    let { id } = req.body;
    try {
        await proposalModel.findByIdAndDelete(id);
        const payload = await proposalModel.find();

        //    res.send({ status : "ok" });
        res.send(payload);
    } catch (error) {
        res.send({ status: "error" });
    }
});

//get proposals
router.get("/proposals", async (req, res) => {
    try {
        const proposals = await proposalModel.find();
        res.send(proposals);
    } catch (err) {
        console.log(err)
    }
});

//vendor data and proposal
router.post("/vendordataandproposal", async (req, res) => {
    const { token } = req.body;
    try {
        const vendor = jwt.verify(token, "secret_key")
        const vendoremail = vendor.email;
        registerModel.findOne({ email: vendoremail }).then((data) => {

            res.send({ status: "ok", data: data });
        }).catch((error) => {
            res.send({ status: "error", data: error })
        });
    } catch (error) {
        res.send({ status: "error" });
    }
})

//select proposal
router.post("/selectproposal", async (req, res) => {
    const { id } = req.body;
    try {
        const data = await proposalModel.findById(id)

        let selectedData = await new selectedModel({
            eventName: data.eventName, placeOfEvent: data.placeOfEvent, proposalType: data.proposalType, eventType: data.eventType, budget: data.budget, fromDate: data.fromDate, toDate: data.toDate, foodPreference: data.foodPreference, description: data.description, events: data.events, vendorEmail: data.vendorEmail, vendorId: data.vendorId, vendorName: data.vendorName, image: data.image

        });
        const data1 = await selectedData.save();

        res.send({ status: "ok", data: data1 });
    }
    catch (error) {
        res.send({ status: "error", data: error })
    }
});

//get selected proposal by id
router.get("/getselectedproposals/:id", async (req, res) => {
    const data = await selectedModel.findById(req.params.id)
    console.log(data)
    return res.json({ selectedproposal: data })
});

//get proposal by id
router.get("/getproposal/:id", async (req, res) => {
    // console.log(req.params.id)

    const data = await proposalModel.findById(req.params.id)
    console.log(data)
    return res.json({ proposal: data })

})

module.exports = router;
