Question
================

https://jsonplaceholder.typicode.com/albums
https://jsonplaceholder.typicode.com/photos?albumId={albumid}

Above are two urls from which fetching of albums and invidual photos needs to be done.

1. Cron Service to be built to pull albums and photos and save in local database.
2. Endpoints to be built to access the data.




===================
INSTRUCTIONS
===================

Tech Stack userd : nodejs (expressjs), mysql

1. Install nodejs and mysql on local machine. Postman can be handy.

2. Run below sql to create database and tables;

CREATE DATABASE srikantmatihali@gmail.com

CREATE TABLE album (
    id BIGINT NOT NULL AUTO_INCREMENT,
    id_api int,
    title varchar(255),
    userId int,
    PRIMARY KEY (id)
);

// INSERT INTO album(id_api,title,userId) values(1,'test',1);

CREATE TABLE photo (
    id BIGINT NOT NULL AUTO_INCREMENT,
    albumId int,
    photoId int,
    title varchar(255),
    url TEXT,
    thumbnailUrl TEXT,
    PRIMARY KEY (id)
);

//INSERT INTO photo(albumId,photoId,title,url,thumbnailUrl) values(1,1,'test','http://google.com','http://google.com');

2. >>cd /path/album-photo-db-service-interview;
   >>npm i;

3. Run script
   This runs concurrently, fetching data from json url and inserts data into database. 
   to help run 1st api for album fetch and insert data into DB and helps run 2nd api.
   >>node services/importer.js
   Note: Run it only once to avoid duplication.    

4.  Curl code to test search album and data:

    ```
    curl --location --request GET 'http://localhost:3000/search/?type=album&id=1'
    ```

5. Curl code to test search photo and data:
   ```
    curl --location --request GET 'http://localhost:3000/search/?type=photo&albumId=13&id=603'
   ```     
   