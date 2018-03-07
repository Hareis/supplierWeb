'use strict';
const ServiceHandle = require('./ServiceHandle');

class ServiceFactory {

    constructor() {

    }

    static getHandle(serviceName, controller, action, ver) {

        let url = null;
        let timeout = 60 * 1000;

        url =
            appConfig.envConfig.service[serviceName].urlPrefix
            + "/" + controller + "/" + action + "/" + ver;


        let result = new ServiceHandle();
        result.serviceName = serviceName;
        result.action = action;
        result.controller = controller;
        result.url = url;
        result.timeout = timeout;
        return result;

    }

    static getHandle_net(serviceName, controller, action) {

        let url = null;
        let timeout = 60 * 1000;

        //#region get url

        if (serviceName == "orderDBWrapperService") {
            url =
                appConfig.envConfig.service[serviceName + "-net"].urlPrefix
                + "/" + controller + "/" + action + ".do";
        }
        else if (serviceName == "authenticationService") {
            url =
                appConfig.envConfig.service[serviceName + "-net"].urlPrefix
                + "/" + controller + "/" + action + ".do";
        }
        else if (serviceName == "orderService") {
            url =
                appConfig.envConfig.service[serviceName + "-net"].urlPrefix
                + "/" + controller + "/" + action + ".do";
        }

        if (!url) {
            throw new NotImplementedException(serviceName + "," + controller + "," + action + " not found");
        }

        //#endregion

        let result = new ServiceHandle();
        result.serviceName = serviceName;
        result.action = action;
        result.controller = controller;
        result.url = url;
        result.timeout = timeout;
        return result;

    }

}

module.exports = ServiceFactory;