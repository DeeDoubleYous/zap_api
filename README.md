# zap_api

The api for accessing the zap store of found pangolin data. 

>Pangolins are the world’s most trafficked mammal and are threatened solely by human
impacts. In addition to tracking and poaching, many pangolins in Africa face the risk of being
killed on roads and by electric fences.

This is the api for uploading new findings of pangolins and for retreving the list of the stored pangolin sightings. The endpoint of the live api is https://dw470.brighton.domains/zapp_app. The app devloped along side this api is located at https://dw470.brighton.domains/ci609/zap-app. 

## End points

### GET dw470.brighton.domains/zap_api


Parameters
| Parameters | Type | Required | Note |
|------------|------|----------|------|
| id         | int  | Yes      |The id of the pangolin record. |

Returns returns a single record
| Value | Type | Note|
|-------|------|-----|
| id    | int  | The id of the record. |
| time  | dateTime| The time the record was entered. |
| imageUrl | string | The url the image can be found at. |
| isDead | boolean | Weather the pangolin was found alive or dead. |
| location | { lat: int, lon: int} | A JSON of lat of the latitude and longitude of the record |

### POST dw470.brighton.domains/zap_api

Parameters
| Parameters | Type | Required | Note |
|------------|------|----------|-------|
| time       | datetime| Yes | The date and time of the record upload |
| image      | Image| Yes | The Image that should be uploaded along with the rest of the record |
| isDead     | boolean | Yes | |
| location   | string | Yes | Should be the stringified JSON object with lat and lon entries |
| deathid?   | int | No | Optional, should only be uploaded if isDead is true and exist in the deathTypes list|
| note?       | string | No | Optional |

Returns a single record
| Value | Type | Note |
|-------|------|------|
| id | int | the id of the uploaded record |

### GET dw470.brighton.domains/zap_api/list

Parameters
| Parameter | Type | Required | Note |
|-----------|------|----------|------|
| limit     | int  | no       | Optional, limits the amount of records passed through |

Returns a list of records
| Value | Type | Note|
|-------|------|-----|
| id    | int  | The id of the record. |
| time  | dateTime| The time the record was entered. |
| imageUrl | string | The url the image can be found at. |
| isDead | boolean | Weather the pangolin was found alive or dead. |
| location | { lat: int, lon: int} | A JSON of lat of the latitude and longitude of the record |

### GET dw470.brighton.domains/zap_api/deathTypes

Returns as a list of records
| Value | Type | Note | 
|-------|------|------|
| deathId | int | The id you should use when posting new records |
| deathName | string | The display name for the input/output of records |

### GET dw470.brighton.domains/zap_api/public/images/:filename

Returns a single image

The path will come from the looked up record, will look like "public/images/:filename" with the filename being the name of the image. 

### POST dw470.brighton.domains/zap_api/update

Parameters
| Parameters | Type | Required | Note |
|------------|------|----------|-------|
| id         | int  | Yes      | The id of the record needed to be updated |
| time       | datetime| Yes | The date and time of the record upload |
| image      | Image| Yes | The Image that should be uploaded along with the rest of the record |
| isDead     | boolean | Yes | |
| location   | string | Yes | Should be the stringified JSON object with lat and lon entries |
| deathid?   | int | No | Optional, should only be uploaded if isDead is true and exist in the deathTypes list|
| note?       | string | No | Optional |


Returns a single record
| Value | Type | Note |
|-------|------|------|
| id | int | the id of the uploaded record |


### DELETE dw470.brighton.domains/zap_api

Parameters
| Parameters | Types | Note |
|------------|-------|------|
| id         | number |     |

##### This will not delete the image from the server! That can only be done from the server ftp!

## Running the zap_api yourself
After cloning the repository, you'll need to run `npm install` then you can build the app with `webpack`. You'll find the app file in dist as app.js. For the app to run propeliy you'll need to provide a credentials.json file which will look like this 
```
{
  "host": DATABASE_HOST
  "user": DATABASE_USER_USERNAME
  "password": DATABASE_USER_PASSWORD
  "database": DATABASE_NAME
}
```
Your database will have two tables with this design
![image](https://user-images.githubusercontent.com/7958479/145321135-5f5b82e6-eabb-400f-883e-6154b6fd4854.png)

with the deathTypes table populated with the desired deathtypes.
You won't be able to run this against the exising database as the images are stored locally to the server app and adding new records which point only to local files will cause issue.
