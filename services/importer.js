const _ = require('lodash');
const axios = require('axios');
var Promise = require('bluebird');
const mysql = require("mysql2/promise");
const config = require("../config");

async function bulkInsertAlbum(table, columns, values) {
    try {
        const sql = `INSERT INTO ${table}(${columns}) VALUES ?`;
        const connection = await mysql.createConnection(config.db);
        connection.query(sql, [values], function (err) {
            if (err) throw err;
            conn.end();
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

async function callApi(chunk) {
    var valuesArray = _.map(chunk, function (chunk) {
        return [chunk.userId, chunk.id, chunk.title];
    });
    bulkInsertAlbum('album', 'userId,id_api,title', valuesArray);

    const requests = chunk.map((chunk) =>
        axios.get("https://jsonplaceholder.typicode.com/photos?albumId=" + chunk.id)
    );

    try {
        const results = await Promise.all(requests);
        results.map((result) => {
            console.log('+++++++++++++PHOTO DATA+++++++++');
            var photoArray = _.map(result.data, function (obj) {
                console.log(obj.url);
                return [obj.albumId, obj.id, obj.title, obj.url, obj.thumbnailUrl];
            });
            bulkInsertAlbum('photo', 'albumId,photoId,title,url,thumbnailUrl', photoArray);
        });
    } catch (err) {
        console.log(err);
    }
    console.log('===============chunk================');
}

runscript = function () {
    try {
        console.log('================Album API Call ==================');
        axios.get(`https://jsonplaceholder.typicode.com/albums`).then(response => {
            const chunks = _.chunk(response.data, 10);
            const promises = chunks.map(callApi);
            Promise.all(promises);
            // .then(function (results) {
            //     console.log('===============SCRIPT EXECUTION ENDS============');
            //     process.exit(0);
            // });
        }).catch(error => console.log(
            'Error to fetch data\n'));

    } catch (err) {
        console.error(`Error while getting curl request `, err.message);
        next(err);
    }
}
runscript();

