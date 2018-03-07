'use strict';
const axios=require("axios");

class ServiceHandle{

    constructor() {

        this.serviceName;
        this.controller;
        this.action;
        this.url;
        this.timeout;
    }

    async postAsync(data) {
        return axios.post(this.url, data)
    } 

    async getAsync() {
        return axios.get(this.url)
    } 
    
}

module.exports = ServiceHandle;