"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
describe('testing index file', () => {
    test('Remove pre 2022 outages from data', () => {
        const outagesTestData = [
            {
                id: 'outage1',
                begin: '2022-01-01T00:00:00.000Z',
                end: '2022-02-01T00:00:00.000Z'
            },
            {
                id: 'outage2',
                begin: '2023-02-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z'
            },
            {
                id: 'outage3',
                begin: '2021-12-31T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z'
            },
            {
                id: 'outage4',
                begin: '2020-01-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z'
            },
            {
                id: 'outage5',
                begin: '2022-01-01T10:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z'
            }
        ];
        const outagesTestExpectedOutcome = [
            {
                id: 'outage1',
                begin: '2022-01-01T00:00:00.000Z',
                end: '2022-02-01T00:00:00.000Z'
            },
            {
                id: 'outage2',
                begin: '2023-02-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z'
            },
            {
                id: 'outage5',
                begin: '2022-01-01T10:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z'
            }
        ];
        expect((0, src_1.filterOutagesBefore2022)(outagesTestData)).toStrictEqual(outagesTestExpectedOutcome);
    });
    test('Return only outages that happended at a given site with the device name included', () => {
        const outagesTestData = [
            {
                id: '1234',
                begin: '2022-01-01T00:00:00.000Z',
                end: '2022-02-01T00:00:00.000Z'
            },
            {
                id: '2345',
                begin: '2023-02-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z'
            },
            {
                id: '3456',
                begin: '2022-01-01T10:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z'
            }
        ];
        const siteInfoTest = {
            id: 'testSite',
            name: 'Test Site',
            devices: [
                {
                    id: '1234',
                    name: 'device1'
                },
                {
                    id: '2345',
                    name: 'device2'
                }
            ]
        };
        const siteOutagesExpected = [
            {
                id: '1234',
                begin: '2022-01-01T00:00:00.000Z',
                end: '2022-02-01T00:00:00.000Z',
                name: 'device1'
            },
            {
                id: '2345',
                begin: '2023-02-01T00:00:00.000Z',
                end: '2023-01-01T00:00:00.000Z',
                name: 'device2'
            },
        ];
        expect((0, src_1.filterSiteOutages)(outagesTestData, siteInfoTest)).toStrictEqual(siteOutagesExpected);
    });
});
