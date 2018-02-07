const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/:user_id', (req, res) => {
  models.user
    .findById(req.params.user_id)
    .then(result => res.send(result))
    .catch(err => res.status(500).send('Something broke!', err));
});

router.get('/:user_id/boats', (req, res) => {
  const userId = req.params.user_id;
  const finder = {
    attributes: ['id', 'name'],
    include: [{
      model: models.device_boat,
      include: [{
        attributes: ['device_id'],
        model: models.device,
        required: false
      }],
      required: false

    }],
    required: false,
    where: { user_id: userId }
  };

  models.boat
    .findAll(finder)
    .then(data => res.send(joinDevicesByBoat(data)))
    .catch(err => res.status(500).send(err))
});


router.get('/:user_id/boats/:boat_id', (req, res) => {
  const userId = req.params.user_id;
  const boatId = req.params.boat_id;

  models.boat
    .find({ where: { user_id: userId, id: boatId } })
    .then(data => res.send(data))
    .catch(err => res.status(500).send('Something broke!'));
});

router.post('/:user_id/boat/save', (req, res) => {
  const boatName = req.body.name;
  const userId = req.params.user_id;

  models.boat
    .create({ user_id: userId, name: boatName })
    .then(result => res.status(200).send(result).end())
    .catch(err => {
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        res.status(500).send(`User with ${userId} id does not exist`)
      } else {
        res.status(500).send(err)
      }})
});

router.post('/:user_id/boat/update', (req, res) => {
  const boatName = req.body.name;
  const boatId = req.body.boatId;
  const userId = req.params.user_id;

  models.boat
    .update({ user_id: userId, name: boatName }, { where: { id: boatId } })
    .then(result => res.status(200).send(result).end())
    .catch(err => res.status(500).send(err));
});

router.get('/:user_id/devices', (req, res) => {
  const userId = req.params.user_id;
  const finder = {
    attributes: ['device_id', 'user_id'],
    include: [{
      model: models.device,
      attributes: ['device_id', 'id']
    }],
    where: { 'user_id': userId }
  };

  models.user_device
    .findAll(finder)
    .then(data => res.send(data))
    .catch(err => res.status(500).send('Something broke!'));
});

router.post('/:user_id/device/save', (req, res) => {
  const deviceId = hexStringToBytes(req.body.deviceId);
  const userId = req.params.user_id;

  models.device
    .create({ device_id: deviceId })
    .then(data => {
      models.user_device
        .create({ user_id: userId, device_id: data.id })
        .then(data => res.send(data))
        .end()
    }).catch(err => res.status(500).send(err))
});

router.get('/:user_id/devices/:device_id', (req, res) => {
  const userId = req.params.user_id;
  const deviceId = req.params.device_id;
  const finder = {
    attributes: ['device_id', 'user_id'],
    include: [{
      model: models.device,
      attributes: ['device_id', 'id'],
      where: { 'id': deviceId }
    }],
    where: { 'user_id': userId }
  };

  models.user_device.findAll(finder)
    .then(data => res.send(data))
    .catch(err => res.status(500).send('Something broke!'));
});

function hexStringToBytes(str) {
  return Buffer.from(str).toString('hex');
}

function joinDevicesByBoat(boatList) {
  let deviceBoatList = boatList.map(boat => getBoatDeviceModel(boat.id, boat.name, boat.device_boat));
  return deviceBoatList.reduce((prev, curr) => {
    return !prev.length ? [curr] : joinDeviceList(prev, curr);
  }, [])
}

function joinDeviceList(boatList, newBoat) {
  let matchBoatList = boatList.filter(boat => boat.id !== newBoat.id);
  let boatMatchedById = boatList.find(boat => boat.id === newBoat.id);

  boatMatchedById ? boatMatchedById.devices = [...boatMatchedById.devices, ...newBoat.devices] : boatMatchedById = newBoat;
  return [...matchBoatList, boatMatchedById];
}

function getBoatDeviceModel(id, name, deviceBoat) {
  return {
    id, name,
    devices: deviceBoat ? [deviceBoat.device.device_id] : deviceBoat
  }
}

module.exports = router;
