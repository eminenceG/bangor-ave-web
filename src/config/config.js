import axios from 'axios'

// loading feature currently is not working. will fix it later.
export let loading = false;


axios.interceptors.request.use(function(config){
    loading = true;
    // console.log( loading)
    return config;
});

axios.interceptors.response.use(function(config){
    loading = false;
    // console.log( loading)
    return config;
});