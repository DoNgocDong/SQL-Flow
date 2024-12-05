const axios = require('axios');
const config = require('../config');

const request = () => {
  const baseHeaders = {
    "accept": "application/json",
    "accept-language": "vi-VN,vi;q=0.9",
    "authorization": `Token ${String(config.token)}`,
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded;charset=UTF-8",
    "origin": "https://sqlflow.gudusoft.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://sqlflow.gudusoft.com/",
    "sec-ch-ua": '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
  }

  return axios.create({
    baseURL: 'https://api.gudusoft.com/gspLive_backend',
    headers: baseHeaders,
  });
}

module.exports = request;