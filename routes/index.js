const express = require('express');
const router = express.Router();

router.post('/api/update/:key', function (Request, Response) {
  const fs = require('fs');

  /*------validating api key--------*/
  if (Request.headers['x-api-key'] !== '49a4b590-db01-4558-b371-524b17dd5aa7')
    return Response.status(401).json('Unauthorized');

  /*-----reading the existing key to be updated with the new value----*/
  const key = Request.params.key;
  const value = Request.body.value;
  let playerData = require('../player-data.json');

  /*------updating player's progress----------*/
  if (playerData.hasOwnProperty(key))
    playerData[key] = value;

  /*----------writing the new progress in player's file----------*/
  let data = JSON.stringify(playerData);
  fs.writeFileSync(`${Request.app.get('root')}/player-data.json`, data);
  return Response.status(200).json(playerData);
});

module.exports = router;
