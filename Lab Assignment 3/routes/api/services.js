
const express = require("express");
const router = express.Router();
const validateService = require ("../../middlewares/validateService");
const auth = require ('../../middlewares/auth');
const admin = require ('../../middlewares/admin');
const {Service} = require("../../models/service");

//get method
router.get("/", async (req, res) => {
  console.log(req.user);
  try {
    let services = await Service.find();
    return res.send(services);
  } catch (err) {
    return res.status(400).send("Not Found");
  }
});

//get by ID
router.get("/:id", async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);
    if (!service) return res.status(400).send("ID not exist");
    return res.send(service);
  } catch (err) {
    return res.status(400).send("Invalid ID");
  }
});

//update or put
router.put("/:id",validateService, async (req, res) => {
  let service = await Service.findById(req.params.id);
  service.name = req.body.name;
  service.price = req.body.price;
  service.description = req.body.description;
  await service.save();
  return res.send(service);
});

//delete or put
router.delete("/:id",auth, admin, async (req, res) => {
  let service = await Service.findByIdAndDelete(req.params.id);
  return res.send(service);
});

router.post ('/',auth,validateService, async (req, res) => {
  try {
    let services = [];
    if (Array.isArray (req.body)) {
      // Loop through each entity in the request body
      for (const entity of req.body) {
        let service = new Service ();
        service.name = entity.name;
        service.price = entity.price;
        service.description = entity.description;
        await service.save ();
        services.push (service); // Add the service to the array
      }
    } else {
      // If the request body is not an array, treat it as a single entity
      let service = new Service ();
      service.name = req.body.name;
      service.price = req.body.price;
      service.description = req.body.description;
      await service.save ();
      services.push (service); // Add the service to the array
    }
    return res.send (services);
  } catch (error) {
    return res.status (500).send ({error: 'Internal Server Error'});
  }
});

module.exports = router;
