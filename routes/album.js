const express = require("express");
const router = express.Router();
const albumService = require("../services/album");

router.get("/", async function (req, res, next) {
    try {
      var type = req.query.type;
      if(type){
        var id = req.query.id;
        if(id){
          switch(type){
            default:
            case 'album': 
                    res.json(await albumService.getAlbum(id));
                  break;
            case 'photo':
                  var albumId = req.query.album;
                  if(albumId){
                    res.json(await albumService.getPhoto(albumId,id));
                  }else{
                    res.send('album not specified');
                  }
                  break;
          }
        }else{ 
          res.send('id not specified'); 
        }
        
      }else{
        res.send('type not specified.')
      }
    } catch (err) {
      console.error(`Error while getting test data `, err.message);
      next(err);
    }
});
module.exports = router;