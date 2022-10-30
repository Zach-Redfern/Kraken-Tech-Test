"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSiteOutages = exports.filterOutagesBefore2022 = void 0;
const axios_1 = __importDefault(require("axios"));
const apiKey = "EltgJ5G8m44IzwE6UN2Y4B4NjPW77Zk6FJK3lL23";
// remove outages that didn't begin in 2022
const filterOutagesBefore2022 = (outages) => {
    return outages.filter(element => new Date(element.begin).getTime() >= new Date('01/01/2022').getTime());
};
exports.filterOutagesBefore2022 = filterOutagesBefore2022;
// remove outages that didn't happen in norwich-pear-tree and add the name of the device if it did
const filterSiteOutages = (outages, siteInfo) => {
    let siteOutages = [];
    for (const outage of outages) {
        for (const device of siteInfo.devices) {
            if (device.id === outage.id) {
                siteOutages.push({ ...outage, name: device.name });
            }
        }
    }
    return siteOutages;
};
exports.filterSiteOutages = filterSiteOutages;
const main = async () => {
    const { data: outages } = await axios_1.default.get('https://api.krakenflex.systems/interview-tests-mock-api/v1/outages', {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    });
    const { data: siteInfo } = await axios_1.default.get('https://api.krakenflex.systems/interview-tests-mock-api/v1/site-info/norwich-pear-tree', {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    });
    const outagesAfter2022 = filterOutagesBefore2022(outages);
    const siteOutages = filterSiteOutages(outagesAfter2022, siteInfo);
    const res = await axios_1.default.post('https://api.krakenflex.systems/interview-tests-mock-api/v1/site-outages/norwich-pear-tree', siteOutages, {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        }
    });
};
main();
