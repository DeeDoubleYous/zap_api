# zap_api
[![NodeJS with Webpack](https://github.com/DeeDoubleYous/zap_api/actions/workflows/webpack.yml/badge.svg)](https://github.com/DeeDoubleYous/zap_api/actions/workflows/webpack.yml)

The api for accessing the zap store of found pangolin data. 

>Pangolins are the world’s most trafficked mammal and are threatened solely by human
impacts. In addition to tracking and poaching, many pangolins in Africa face the risk of being
killed on roads and by electric fences.

This is the api for uploading new findings of pangolins and for retreving the list of the stored pangolin sightings. The endpoint of the live api is https://dw470.brighton.domains/zapp_app. The app devloped along side this api is located at https://dw470.brighton.domains/ci609/zap-app. 

## End points

### GET dw470.brighton.domains/zap_api


Parameters
| Parameters | Type | Note |
|------------|------|------|
| id         | int  | The id of the pangolin record. |

Returns
| Value | Type | Note|
|-------|------|-----|
| id    | int  | The id of the record. |
| time  | dateTime| The time the record was entered. |
| imageUrl | string | The url the image can be found at. |
| isDead | boolean | Weather the pangolin was found alive or dead. |
| location | [int, int] | The location the pangolin was found at. *Currently returned as Json object will be changed to LatLng array* |
