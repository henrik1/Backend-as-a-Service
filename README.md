
# MongoDB Realm Example

##This project contains:
- `./backend` | Backend/BaaS configuration
- `./frontend` | CRA Client App

## The client allows you to:
- Sign up and log in as an Email/Password user
- Write articles, comment on articles and like articles

## The stack:
- MongoDB Realm
- Apollo GraphQL
- React
- Material UI

## Setup & run the app

### Deploy & Run Backend (BaaS)

- Create your account on [MongoDB Realm](https://www.mongodb.com/realm)
- Fork this repo
- Add your APP_ID to `/frontend/realm.json` and `/backend/realm_config.json`
- Push to your own repository
- Setup deployment, see [guide](https://www.mongodb.com/docs/realm/manage-apps/deploy/automated/deploy-automatically-with-github/)

### Setup & Run client app locally:

```bash 
$ cd ./frontend 
$ yarn install
$ yarn start 
```


