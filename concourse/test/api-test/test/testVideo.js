var assert = require('assert');
var fs = require('fs');
var request = require('request');
var rp = require('request-promise');
var sleep = require('sleep');

var authHelper = require('./helpers/authHelper.js');
var videoHelper = require('./helpers/videoHelper.js');
var generator = require('./helpers/generators.js');

describe('Video', function () {

    this.timeout(60000);

    describe('Create Video', function () {

        it('Given I have a verified account, When I request to upload a video, Then I should be given the URl to upload it to', function () {
           return authHelper.getLoggedInUser()
                .then(function (user) {

                    return videoHelper.createVideo(user, "01291238_0160.MP4", ".MP4")
                        .then(function (result) {
                            assert(result.data.url);

                            let filepath = './test/testData/01291238_0160.MP4';

                            let stream = fs.createReadStream(filepath)
                            let stat = fs.statSync(filepath);

                            let options = {
                                method: 'PUT',
                                uri: result.data.url,
                                body: stream,
                                headers: {
                                    'content-type': 'text/plain;charset=UTF-8',
                                    'Content-Length': stat.size
                                }
                            };

                            return rp(options)
                                .then(function () {
                                    assert(true)
                                });

                        });

                });
        });
    });

    // describe('Get Videos', function () {
    //
    //     it('Given I have a verified account, When I havent uploaded any videos, Then It should recieve an empty list', function () {
    //        return authHelper.getLoggedInUser()
    //             .then(function (user) {
    //
    //                 return videoHelper.getVideos(user)
    //                     .then(function (result) {
    //                         assert.equal(result.data.videos.length, 0);
    //                     })
    //                     .catch(function (error) {
    //                         console.error(error)
    //                     })
    //
    //             });
    //     });

        // it('Given I have a verified account, When I request to upload a video, Then It should be listed', function () {
        //    return authHelper.getLoggedInUser()
        //         .then(function (user) {
        //
        //             return videoHelper.createVideo(user, "01291238_0160.MP4", ".MP4")
        //                 .then(function (result) {
        //                     assert(result.data.url);
        //
        //                     let filepath = './test/testData/01291238_0160.MP4';
        //
        //                     let stream = fs.createReadStream(filepath)
        //                     let stat = fs.statSync(filepath);
        //
        //                     let options = {
        //                         method: 'PUT',
        //                         uri: result.data.url,
        //                         body: stream,
        //                         headers: {
        //                             'content-type': 'text/plain;charset=UTF-8',
        //                             'Content-Length': stat.size
        //                         }
        //                     };
        //
        //                     return rp(options)
        //                         .then(function () {
        //
        //                             sleep.sleep(2)
        //
        //                             return videoHelper.getVideos(user)
        //                                 .then(function (result) {
        //                                     assert.equal(result.data.videos.length, 1);
        //                                 })
        //                         });
        //
        //                 });
        //
        //         });
        // });
    // });

});
