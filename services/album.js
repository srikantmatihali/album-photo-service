const db = require("./db");
const config = require("../config");
const helper = require("../helper");

async function getAlbum(id) {
  const rows = await db.query(
    `SELECT id_api,title,userId FROM album where id_api=${id}`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  };
}

async function getPhoto(albumId,id) {
  const rows = await db.query(
    `SELECT albumId,photoId as Id,title,url,thumbnailUrl FROM photo where albumId=${albumId} AND photoId=${id}`
  );
  const data = helper.emptyOrRows(rows);
  return {
    data
  };
}

module.exports = {
  getAlbum,
  getPhoto,
};
