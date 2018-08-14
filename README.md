# BangorAveWeb


To run locally, in backend project folder, ```./server.js```, replace the following line:

```
// const FRONTEND_URL = 'http://localhost:3000';
const FRONTEND_URL = 'https://bangor-ave-web.herokuapp.com';
```

to

```
const FRONTEND_URL = 'http://localhost:3000';
// const FRONTEND_URL = 'https://bangor-ave-web.herokuapp.com';
```

In frontend project folder, ```./src/constants/index.js```, replace the following line:
```
// export const HOST = 'http://localhost:9093';
export const HOST = 'https://webdev-2018-team6-backend.herokuapp.com';
```

to

```
export const HOST = 'http://localhost:9093';
// export const HOST = 'https://webdev-2018-team6-backend.herokuapp.com';
```

To run the server, first have your local mongodb on, then ```nodemon ./server.js```.

To set up your local database, please create a database called ```team6```, then create the following collections:  
```applications```  
```chats```  
```company```  
```friendships```  
```jobs```  
```users```  

Special thanks to USAJOBS, NewsAPI and Google Maps for sharing their high quality APIs!

-Team 6 

