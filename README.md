# User Service

User service for expose HTTP API functionality(CRUD operations).


## Starting App

**Without Migrations**

**In development environment**

```
npm install
npm run start
```

**In test environment**

```
npm install
npm run test
```

**In production environment**

```
npm install --production
npm run production
```

**Set specific environment variables for development or test in `.env` file, or in specific prod server for production for e.g**

```
DB_NAME=sensarmarine
DB_USERNAME=root
DB_PASSWORD=root
DB_PORT=3306
DB_HOST=127.0.0.1
```

**With Migrations**

**Specify environment `development`, `test` or `production`**
```
npm install
npm run migration production
npm run production
```

This will start the application and create an mysql database connection in your app dir.

## Running Tests

We have added some [Mocha](https://mochajs.org) based test. You can run them by `npm test`

**API**

## User info

GET `user/{userId}`
```json
{
    "id": 1,
    "name": "Pål"
}
```

## Boat list for specific user

GET `user/{userId}/boats`
```json
[
    {
        "id": 1,
        "name": "Titanic II",
        "devices": [
            "304646314345",
            "46413131",
            "42454546"
        ]
    },
    {
        "id": 2,
        "name": "Penultimate II",
        "devices": null
    },
    {
        "id": 5,
        "name": "ELITA2",
        "devices": null
    }
]
```

## Specific boat for specific user

GET `user/{userId}/boats/{boatId}`

```json
{
    "id": 1,
    "name": "Titanic II",
    "user_id": 1
}
```
## Create boat

POST `user/{userId}/boat/save`

`Content-Type` should be `application/json` or `application/x-www-form-urlencoded`

```
headers: { Content-Type: application/json}
body: { name: 'Marine'}
```

## Update boat

POST `user/{userId}/boat/update`

`Content-Type` should be `application/json` or `application/x-www-form-urlencoded`

```
headers: { Content-Type: application/json}
body: { name: 'Marine', boatId: 1 }
```

## Device list for specific user

GET `user/{userId}/devices`

```json
[
    {
        "device_id": 1,
        "user_id": 1,
        "device": {
            "device_id": "304646314345",
            "id": 1
        }
    }
]
```

## Create device for specific user

POST `user/{userId}/device/save`

`Content-Type` should be `application/json` or `application/x-www-form-urlencoded`

```
headers: { Content-Type: application/json}
body: { deviceId: 'Marine' }
```

## Device list for specific boat

GET `/boats/{boatId}/device`

```json
[
    {
        "boat_id": 1,
        "device_id": 1,
        "device": {
            "id": 1,
            "device_id": "304646314345"
        }
    }
]
```

## Create specific device for specific boat

POST `/boats/{boatId}/device/save`

`Content-Type` should be `application/json` or `application/x-www-form-urlencoded`


```
headers: { Content-Type: application/json}
body: {"deviceId":" d09f00d"}

```
