<p align="center">
  <img alt="compass logo" src="https://user-images.githubusercontent.com/65569815/176964539-fe858838-0d07-418e-9220-b6d94461ecee.png" />
</p>

# Compass Tutor MicroService

Challenge of the **NodeJS Scholl Program from [Compass.uol](https://compass.uol/)**.

## Summary

- ### [How to initialize](#-How-to-initialize)
- ### [Endpoints](#-endpoints)
- ### [Schemas](#-schemas)

## Description

A client hired Compass to build a new microservice for its veterinary franchise. This microservice will be used by all the clinics they own for internal client and attendances management.

So, you have this new mission, to build the POC foundations of this brand new microservice, so the sales and management team can have the primary technical view of the needs that the client has.

## Technologies

<p>
  <img src="https://user-images.githubusercontent.com/65569815/182266557-f2d0c589-fe31-4d65-b867-cb40385066a0.svg" width="100">
  <img src="https://user-images.githubusercontent.com/65569815/182253645-6966537e-18ed-4c47-974b-22510cc3d834.png" width="100">
  <img src="https://github.com/Grupo6-Codeless/PB-nodechallenger03/assets/70348917/4336366a-175b-4f10-aa0b-d40fa80dd044" width="100">
</p>

## Requirements

Before starting, you will need to have Node.js installed on your machine. Additionally, make sure you have a MongoDB Atlas collection set up, and don't forget to create a .env and .env.test file based on the .env.example file.

## How to initialize

As described in the requirements above, first you need to install the [NodeJS](https://nodejs.org/en/)
<br/>
Then you will run the following commands:

```bash
# Clone this repository
$ git clone https://github.com/Grupo6-Codeless/PB-nodechallenger03.git
# Access the project folder
$ cd PB-nodechallenger03
# Install the dependencies
$ npm install
```

Create a ".env" and ".env.test" file based on the .env.example file.

```bash
# Start the application at localhost:5000
$ npm run dev
```

## Endpoints

### Swagger Documentation Endpoint

| Route       | Method | Description                  |
| ----------- | :----: | ---------------------------- |
| `/api-docs` |  GET   | Get Documentation in Swagger |

### Tutor Endpoints

| Route             | Method | Description                          |
| ----------------- | :----: | ------------------------------------ |
| `/tutors`         |  GET   | Retrieves all tutors                 |
| `/tutor`          |  POST  | Create a new tutor                   |
| `/tutor/:tutorId` |  PUT   | Updates a tutor, all fields required |
| `/tutor/:tutorId` | PATCH  | Updates a tutor                      |
| `/tutor/:tutorId` | DELETE | Deletes a tutor                      |

### Pet Endpoints

| Route                        | Method | Description                               |
| ---------------------------- | :----: | ----------------------------------------- |
| `/pet/:tutorId`              |  POST  | Creates a pet and adds it to a tutor      |
| `/pet/:petId/tutor/:tutorId` |  PUT   | updates a pet's info, all fields required |
| `/pet/:petId/tutor/:tutorId` | PATCH  | updates a pet's info                      |
| `/pet/:petId/tutor/:tutorId` | DELETE | deletes a pet from a tutor                |

## Schema

### Tutor Table

| FieldName       |    Type    | Required to Create | Unique |
| --------------- | :--------: | :----------------: | :----: |
| `_id`           |  ObjectId  |     forbidden      |  true  |
| `password`      |   String   |      required      | false  |
| `name`          |   String   |      required      | false  |
| `phone`         |   String   |      required      |  true  |
| `email`         |   String   |      required      |  true  |
| `date_of_birth` |    Date    |      required      | false  |
| `zip_code`      |   String   |      required      | false  |
| `pets`          | ObjectId[] |     forbidden      |  true  |

```bash
# Example Tutor .json
{
    name: "Jonas",
    phone: "85989323895",
    email: "jonas@paidepet.com",
    date_of_birth: "1993-12-12",
    zip_code: "61760000"
}
```

### Pet Table

| FieldName       |   Type   | Required to Create | Unique |
| --------------- | :------: | :----------------: | :----: |
| `_id`           | ObjectId |     forbidden      |  true  |
| `name`          |  String  |      required      | false  |
| `species`       |  String  |      required      | false  |
| `carry`         |  String  |      required      | false  |
| `weight`        |  Number  |      required      | false  |
| `date_of_birth` |   Date   |      required      | false  |

```bash
# Example Pet .json
{
    name: "Lilo",
    species: "dog",
    carry: "p",
    weight: 5,
    date_of_birth: "1993-12-12"
}
```

## Author

- <img src="https://avatars.githubusercontent.com/AntonioRdC" width=50><br>
  [Antonio Carvalho](https://github.com/AntonioRdC)

- <img src="https://avatars.githubusercontent.com/Guilgb" width=50><br>
  [Guilherme Bezerra](https://github.com/Guilgb)

- <img src="https://avatars.githubusercontent.com/Franc1scaGeovanna" width=50><br>
  [Franc1scaGeovanna](https://github.com/Franc1scaGeovanna)

- <img src="https://avatars.githubusercontent.com/tomazvinicius" width=50><br>
  [Vinicius Tomaz](https://github.com/tomazvinicius)
