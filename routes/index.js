const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

router.post('/devices/save', (req, res) => {
  const deviceId = hexStringToBytes(req.body.deviceId);

  models.device
    .create({ device_id: deviceId })
    .then(data => res.send(data)).end()
    .catch(err => res.status(500).send('Something broke!'));
});

router.get('/boats/:boat_id/device', (req, res) => {
  const boatId = req.params.boat_id;

  const finder = {
    include: [{ model: models.device }],
    where: { 'boat_id': boatId }
  };

  models.device_boat.findAll(finder)
    .then(data => res.send(data))
    .catch(err => res.status(500).send('Something broke!'));
});

router.post('/boats/:boat_id/device/save', (req, res) => {
  const deviceId = req.body.deviceId;
  const boatId = req.params.boat_id;

  let findDevice = models.device.findOne({ where: { 'device_id': deviceId } });
  let findBoat = models.boat.findById(boatId);

  Promise.all([findDevice, findBoat]).then(
    resArray => {
      if (!isListHasNull(resArray)) {
        const deviceId = resArray[0].dataValues.id;

        models.device_boat.findOne({ where: { 'boat_id': boatId, 'device_id': deviceId } }).then(
          deviceBoatRelation => {
            if (!deviceBoatRelation) {
              models.device_boat
                .create({ 'boat_id': boatId, 'device_id': deviceId })
                .then(data => res.status(200).send(data))
                .catch(err => res.status(500).send(err.name))
            } else {
              res.status(500).send('The device is already connected to boat');
            }}
        ).catch(err => res.status(500).send(err));

      } else {
        res.status(500).send('Boatid or deviceid does not exist');
      }
    }
  )
});

function isListHasNull(list) {
  return list.some(elem => elem === null)
}

function hexStringToBytes(str) {
  return Buffer.from(str).toString('hex');
}

module.exports = router;
