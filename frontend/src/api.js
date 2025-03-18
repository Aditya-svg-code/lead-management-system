import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leads';

export const createLead = (data) => axios.post(API_URL, data);
export const getLeads = () => axios.get(API_URL);
