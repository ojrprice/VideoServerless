import React, {Component} from 'react';
import {CardForm} from 'react-payment';

class AddCard extends Component {

    onSubmit(card) {
        const {number, exp_month, exp_year, cvc, name, zip} = card;
        /* global Stripe:false */
        Stripe.card.createToken({
            number,
            exp_month,
            exp_year,
            cvc,
            name,
            address_zip: zip
        }, (status, response) => {
            if (response.error) {
                alert('Adding card failed with error: ' + response.error.message);
            } else {
                const cardToken = response.id;
                // send cardToken to server to be saved under the current user
                // show success message and navigate away from form
                console.log('Response: ' + JSON.stringify(response))
                console.log('Need to send card token to server: ' + cardToken)

                var params = {
                    //This is where any header, path, or querystring request params go. The key is the parameter named as defined in the API
                };
                // Template syntax follows url-template https://www.npmjs.com/package/url-template
                var pathTemplate = '/v1/subscription/addCard'
                var method = 'POST';
                var additionalParams = {};
                var body = {
                    token: cardToken
                };

                apigClient.invokeApi(params, pathTemplate, method, additionalParams, body)
                    .then(function (result) {
                        console.log('Card set for user')
                    }).catch(function (result) {
                    //This is where you would put an error callback
                        console.log('Card not set for user')
                });
            }
        });
    }

    render() {
        return (
            <CardForm
                onSubmit={this.onSubmit}
                getName={true}
            />
        );
    }
}


export default AddCard;
