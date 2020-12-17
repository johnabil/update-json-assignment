const express = require('express');
const router = express.Router();

router.post('/api/update/:key', function (Request, Response) {
  const fs = require('fs');

  const key = Request.params.key;
  const value = Request.body.value;
  let playerData = require('../player-data.json');

  if (playerData.hasOwnProperty(key))
    playerData[key] = value;

  let data = JSON.stringify(playerData);
  fs.writeFileSync(`${Request.app.get('root')}/player-data.json`, data);
  return Response.status(200).json(playerData);
});

module.exports = router;
