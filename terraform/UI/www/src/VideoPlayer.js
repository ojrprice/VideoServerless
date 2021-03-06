import React from 'react';
import ReactPlayer from 'react-player'
import './Video.css';
import 'whatwg-fetch'
var AWS = require('aws-sdk');
var apigClientFactory = require('aws-api-gateway-client')

AWS.config.region = 'eu-west-1'; // Region

var authUtils = require('./utils/auth.js');

////////////////
// Video Player //
////////////////

// Video Player Container

var VideoPlayer = React.createClass({

    getInitialState: function () {
        return {
            video: {},
            url: ""
        };
    },

    loadContent: function (videoId) {

        const _this = this;

        authUtils.runWithCredentials(function () {

            var config = {
                invokeUrl: 'https://0qomu2q3rb.execute-api.eu-west-1.amazonaws.com/Dev',
                accessKey: AWS.config.credentials.accessKeyId,
                secretKey: AWS.config.credentials.secretAccessKey,
                sessionToken: AWS.config.credentials.sessionToken,
                region: AWS.config.region
            }
            var apigClient = apigClientFactory.newClient(config);

            var params = {
                //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
                "videoId": videoId
            };

            // Template syntax follows url-template https://www.npmjs.com/package/url-template
            var pathTemplate = '/v1/video/{videoId}'
            var method = 'GET';
            var additionalParams = {
            };
            var body = {};

            apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
                .then(function (result) {
                    //This is where you would put a success callback
                    _this.setState({
                        video: result.data.video,
                        url: result.data.url
                    })
                }).catch(function (result) {
                //This is where you would put an error callback
            });
        });

    },

    componentDidUpdate: function () {
        if (this.props.videoId !== null && this.props.videoId !== this.state.video.Id) {
            this.loadContent(this.props.videoId);
        }
    },

    render: function () {
        if(this.state.url) {
            return <ReactPlayer url={this.state.url} playing controls/>
        }
        else {
            return (<p>Select video to play</p>)
        }
    }
});

export default VideoPlayer;
