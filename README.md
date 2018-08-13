# final project

To run the server, first have your local mongodb on, then ```nodemon ./server.js```.

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





This is a prototype to test getting data from the API. We planned to use three external API sources in project 3:

| API        | Reference |
| ------------- |:-------------:| 
| USAJOBS      | https://developer.usajobs.gov |
| NewsAPI     | https://newsapi.org/docs      |  
| Google Maps | https://developers.google.com/maps/documentation/      |  

For this assignment we only focus on front end interface to interact with APIs. Several routes are implemented:

|route | Functions |
|----|:----:|
| ```/jobs```| Search jobs; Show top 10 results|
|```/job/detail/:jobId```| Show job detail, news related to the organization and map of job location |

Other features such as login, register, user profiles are not included in this release.

Special thanks to USAJOBS, NewsAPI and Google Maps for sharing their high quality APIs!

-Team 6 

