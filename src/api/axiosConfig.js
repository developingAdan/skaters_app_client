import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8080',
    headers: {"ngrok-skip-browser-warning": "true"}
});
// here ^ we are configuring & exporting the axios object used to make HTTP 
// requests to the relevant remote API through this code 