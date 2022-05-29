# ALBUM PHOTO SERVICE

License: MIT

Authors: Srikanth V Mattihalli [github](https://github.com/srikantmatihali) | [Linkedin](https://www.linkedin.com/in/srikanthvmattihalli/) | [Twitter](https://twitter.com/srikantmatihali/)


## Problem Statement

[json album api](https://jsonplaceholder.typicode.com/albums)

[json photo api](https://jsonplaceholder.typicode.com/photos?albumId={albumid})

Above are two urls from which fetching of albums and invidual photos needs to be done.

1. Cron Service to be built to pull albums and photos and save in local database.
2. Endpoints to be built to access the data.

## Endpoints

Search Album: {domain}/search/?type=album&id={albumid}

Search Photo: {domain}?type=photo&albumId=13&id={photo_id}

**_Note**: URL's are not made search friendly here.. It can be made using combination of htaccess or routing stratergy. It is open for changes in future commits_

## Project setup instructions

Tech Stack userd : nodejs (expressjs), mysql

1. Install nodejs and mysql on local machine. Postman can be handy.

2. Run below sql to create database and tables;
``` sql
CREATE DATABASE srikantmatihali@gmail.com

CREATE TABLE album (
    id BIGINT NOT NULL AUTO_INCREMENT,
    id_api int,
    title varchar(255),
    userId int,
    PRIMARY KEY (id)
);

/* INSERT INTO album(id_api,title,userId) values(1,'test',1); */
```
``` sql
CREATE TABLE photo (
    id BIGINT NOT NULL AUTO_INCREMENT,
    albumId int,
    photoId int,
    title varchar(255),
    url TEXT,
    thumbnailUrl TEXT,
    PRIMARY KEY (id)
);

/* INSERT INTO photo(albumId,photoId,title,url,thumbnailUrl) values(1,1,'test','http://google.com','http://google.com'); */
```

3. Go to Path of Project and load node modules.
  ```sh
   cd /path/album-photo-db-service-interview;
   npm i;
   ```

4. Run Importer script
   This runs concurrently, fetching data from json url and inserts data into database. 
   to help run 1st api for album fetch and insert data into DB and helps run 2nd api.
   ```sh
   node services/importer.js
   ```
   Note: Run it only once to avoid duplication.    

5.  Curl code to test search album and data:

    ```
    curl --location --request GET 'http://localhost:3000/search/?type=album&id=1'
    ```

6. Curl code to test search photo and data:
   ```
    curl --location --request GET 'http://localhost:3000/search/?type=photo&albumId=13&id=603'
   ```     
   
