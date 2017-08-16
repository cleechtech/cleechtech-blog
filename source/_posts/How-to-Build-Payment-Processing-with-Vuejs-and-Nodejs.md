layout: post
title: How to Build Payment Processing with Vue.js and Node.js
date: 
category: 
lede: ""
author: Connor Leech
published: false
---

In this tutorial we are going to build a website that can accept payments and send emails. In order to do this we are going to utilize multiple technologies and services in conjunction with our Javascript code.

In terms of tech stack, we are going to build a static website on the frontend out of [Vue 2](https://vuejs.org/) and hosted on [Netlify](https://www.netlify.com/). We'll also build an express 4 Node.js server hosted on [Heroku](https://www.netlify.com/). 

The server will be responsible for handling payments to Stripe's server and sending emails using Mailgun.

First, let's setup the...

## Frontend Application

The frontend Vue.js app will send a request to Stripe and get a special token. This token contains information about the stripe order that we'll pass to the express server. We're going to style this app using [Bulma](http://bulma.io/), a Flexbox based CSS library.

The app is going to be selling sticks, like, pieces of wood. So it'll be named stickly.

![](https://cdn.scotch.io/2842/b7yhhuUPSGO1fEkMHD6P_sticks.jpeg)

Create the Vue.js static website app.

![](https://cdn.scotch.io/2842/148qsExHSYWj4TacDXgR_Screen%20Shot%202017-08-16%20at%2012.35.02%20PM.png)

We're going to get the Product Page from the open source [dansup/bulma-templates](https://github.com/dansup/bulma-templates)

![](https://cdn.scotch.io/2842/QVDxcSwcSJ2rv5yjhZqf_Screen%20Shot%202017-08-16%20at%2012.38.58%20PM.png)

**./src/components/Product.vue**

```
<template>
<div class="section">
    <div class="container">
        <div class="columns" style='min-height:800px;'>
            <div class="column is-6">
                <div class="image is-2by2">
                    <img src="http://via.placeholder.com/350x150" alt='Product Image'>
                </div>
            </div>
            <div class="column is-5 is-offset-1">
                <div class="title is-2">Sticks</div>
                <p class="title is-3 has-text-muted">$ 15</p>
                <hr>
                <br>
                <p>You can buy this bundle of sticks for decoration.</p>
                <br>
                <br>
                <br>
                <p class="">
                    <router-link to="/order" class="button is-primary">Order Now</router-link>
                </p>
                <br>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>
```

You'll notice we are using router-link from vue router so we have to add that. The Vue CLI takes care of the webpack build process and instantiates our Vue.js frontend application. It looks like this:

```
require('./bootstrap');
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/App.vue'
import Product from './components/Product.vue'
import Order from './components/Order.vue'
import Complete from './components/Complete.vue'

// Register components and services
Vue.use(VueRouter);

// Register routes
const routes = [
  { name: 'home', path: '/', component: Product },
  { name: 'order', path: '/order', component: Order },
  { name: 'order-complete', path: '/order-complete/:id', component: Complete }
];

const router = new VueRouter({
  routes
});

// instantiate everything to DOM
new Vue({
	router,
	el: '#app',
	data(){
		return {
			order_details: {}
		}
	},
	render: h => h(App)
});
```

We're going to have routing using the [vue-router](https://github.com/vuejs/vue-router) package so make sure to install it (`yarn add vue-router`). We're also going to create files for new pages where the customer can place their order and then view a confirmation page with their order details they can save.

From the Order component we will collect customer information including name, shipping address, credit card. Bootstrap.js brings in libraries and binds them to the global window object. 

```

window._ = require('lodash');
window.moment = require('moment');
window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

try {
    window.$ = window.jQuery = require('jquery');

    require('bootstrap-sass');
} catch (e) {}

// use appropriate endpoint
if (process.env.NODE_ENV === 'production') {
    window.endpoint = `http://YOUR_KEROKU_APP_NAME.herokuapp.com`;
} else {
    window.endpoint = 'http://localhost:3000';
}
```

If you are new to Heroku you can learn more about creating an app through their [CLI](https://devcenter.heroku.com/articles/creating-apps).

Then a lot of magic is going to happen in the Order component. That is the page that has all of the forms for collecting the information we're going to send to Stripe. Additionally, it contains the code for using [Stripe.js](https://stripe.com/docs/stripe.js?), Stripe's client side Javascript library to request a token that we can use to execute the payment on our server side (which we have not built yet).

Let's start with the HTML. 

**./src/components/Order.vue**

```
<template>
    <div class='container'>
        <div class='columns'>
            <div class='column is-3'>
                <img src="http://via.placeholder.com/350x150" alt="Product Image">
            </div>
            <div class='column is-4'>
                <br>
                <h2>Contact</h2>
                <br>
                <div class='field'>
                    <label>Name</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="First and Last" v-model='name'>
                        <span class="icon is-small is-left">
                          <i class="fa fa-user"></i>
                        </span>
                    </div>
                </div>
                <div class="field">
                    <label>Email</label>
                    <div class="control has-icons-left has-icons-right">
                        <input class="input" type="text" placeholder="Email address" v-model='email'>
                        <span class="icon is-small is-left">
                            <i class="fa fa-envelope"></i>
                        </span>
                    </div>
                </div>
                <br>
                <h2>Payment</h2>
                <br>
                <div class="field">
                    <label for="card_number">Card Number</label>
                    <div class="col-md-6">
                        <input id="card_number" v-model="card.number" type="text" :class="['is-danger' ? cardNumberError : '', 'input']" placeholder='4242424242424242'>
                        <span class="help is-danger" v-show="cardNumberError">
                            {{ cardNumberError }}
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label for="cvc">CVC</label>
                    <div class="col-md-6">
                        <input id="cvc" v-model="card.cvc" type="text" class="input" placeholder='123'>
                        <span class="help is-danger" v-show="cardCvcError">
                            {{ cardCvcError }}
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label for="exp_month">Expiry Month</label>
                    <div class="col-md-6">
                        <input id="exp_month" v-model="card.exp_month" type="text" :class="['is-danger' ? cardMonthError : '', 'input']" placeholder="MM">
                        <span class="help is-danger" v-show="cardMonthError">
                            {{ cardMonthError }}
                        </span>
                    </div>
                </div>

                <div class="field">
                    <label for="exp_month">Expiry Year</label>
                    <div class="col-md-6">
                        <input id="exp_year" v-model="card.exp_year" type="text" :class="['is-danger' ? cardYearError : '', 'input']" placeholder="YY">
                        <span class="help is-danger" v-show="cardYearError">
                            {{ cardYearError }}
                        </span>
                    </div>
                </div>
                
                <div class="help is-danger" v-if="cardCheckError">
                    <span>{{ cardCheckErrorMessage }}</span>
                </div> 
            </div>
            <div class='column is-5'>
                <br>
                <h2>Trophy Description</h2>
                <br>
                <label>Engraving Text</label>
                <textarea class="textarea" placeholder="Enter the information to put on your trophy" v-model='engravingText'></textarea>
                <br>
                <h2>Shipping</h2>
                <br>
                <label>Address</label>
                <input type='text' class='input' v-model='address.street' placeholder='123 Fake St #303'>
                <label>City</label>
                <input type='text' class='input' v-model='address.city' placeholder='San Francisco'>
                <label>State</label>
                <input type='text' class='input' v-model='address.state' placeholder='CA'>
                <label>Zip</label>
                <input type='text' class='input' v-model='address.zip' placeholder='94607'>
                <br>
                <br>
                <div class="field button-field" v-if="!tokenRetrieved">
                    <button type="submit" class="button is-primary is-large" @click.prevent="validate" :disabled="cardCheckSending">
                        <span v-if="cardCheckSending">
                            <i class="fa fa-btn fa-spinner fa-spin"></i> 
                            Ordering...
                        </span>
                        <span v-else>
                            Place Order
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>
<style>
h2 { text-decoration: underline; }
.column > img { margin-top: 60px; }
.button-field { display: flex; justify-content: center; }
</style>
```

The HTML defines the form fields with their appropriate Bulma CSS classes. You could also build this with [Bootstrap 3](http://getbootstrap.com/) if that is more familiar to you. I like the Bulma styling. The flexbox is a little different from how Bootstrap works but Bootstrap 4 is coming, and they're going use Flexbox also so might as well get started with it now.  Bulma is also popular and well developed within the [Vue community](https://github.com/vue-bulma). The Javascript for this component belongs in the same `.vue` file that contains the HTML and CSS. 

**./src/components/Order.vue (continued)**
```
<script>
import axios from 'axios';

export default {
    data(){
        return {
            stripeKey: 'pk_test_XXXXXXXXXXXXXXXXXXXXX',

            // v-model fields in form
            name: 'Connor Leech',
            email: 'connor@employbl.com',
            engravingText: 'This is the text for the trophy engraving',
            address: {
                street: '123 Something Lane',
                city: 'San Rafael',
                state: 'CA',
                zip: '94901'
            },

            card: {
                number: '4242424242424242',
                cvc: '123',
                exp_month: '01',
                exp_year: '19'
            },

            // validation
            cardNumberError: null,
            cardCvcError: null,
            cardMonthError: null,
            cardYearError: null,
            cardCheckSending: false,
            cardCheckError: false,
            cardCheckErrorMessage: '',
            tokenRetrieved: false
        }
    },
    methods: {
        validate(){
            this.clearCardErrors();
            let valid = true;
            if(!this.card.number){ valid = false; this.cardNumberError = "Card Number is Required"; }
            if(!this.card.cvc){ valid = false; this.cardCvcError = "CVC is Required"; }
            if(!this.card.exp_month){ valid = false; this.cardMonthError = "Month is Required"; }
            if(!this.card.exp_year){ valid = false; this.cardYearError = "Year is Required"; }
            if(valid){
                this.createToken();
            }
        },
        clearCardErrors(){
            this.cardNumberError = null;
            this.cardCvcError = null;
            this.cardMonthError = null;
            this.cardYearError = null;
        },
        createToken() {
            this.cardCheckError = false;
            window.Stripe.setPublishableKey(this.stripeKey);
            window.Stripe.createToken(this.card, $.proxy(this.stripeResponseHandler, this));
            this.cardCheckSending = true;
        },
        stripeResponseHandler(status, response) {
            this.cardCheckSending = false;
            if (response.error) {
                this.cardCheckErrorMessage = response.error.message;
                this.cardCheckError = true;

                console.error(response.error);
            } else {
                this.tokenRetrieved = true;
                this.$emit('paymentEntered', response.id);

                // token to create a charge on our server 
                var token_from_stripe = response.id;

                var request = {
                    name: this.name,
                    email: this.email,
                    engravingText: this.engravingText,
                    address: this.address,
                    card: this.card,
                    token_from_stripe: token_from_stripe
                };

                // Send to our server
                axios.post(`${window.endpoint}/linemansmilestones/charge`, request)
                    .then((res) => {
                        var error = res.data.error;
                        var charge = res.data.charge;
                        if (error){
                            console.error(error);
                        } else {
                            this.$router.push({ path: `order-complete/${charge.id}` })
                        }
                    });
            }
        }
    }
}
</script>
```

We also must modify **index.html** to add Stripe.js library and [Bulma](http://bulma.io/) for CSS styling. We're going to use the CDN links to these libraries so that they load faster and we have less overhead. You can also pull them in using npm/yarn and set the src to your `node_modules` directory.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Title for the entire website</title>

    <!-- Styles -->
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.5.1/css/bulma.css">
    <link rel="stylesheet" href="./css/main.css">

</head>
<body>
  <div class="hero is-fullheight is-dark">
    <div id='app'></div>
  </div>

  <!-- Scripts -->
  <script type="text/javascript" src="https://js.stripe.com/v2/"></script>
  <script src="/dist/build.js"></script>
</body>
</html>
```

And finally, we need an Order Complete page to show the customer after they successfully make a purchase with us.

```
<template>
	<div class='container content'>
		<br>
		<h3 style='color: white;'>Order complete!</h3>

		<p>Congratulations! Your order for Sticks will be shipped out within 1-2 business days.  <a href=''>support@stickly.com</a>. We sent you a confirmation email for your records. Thanks so much!</p>

		<div v-if='orderDetails'>
			<dl>
				<dt>Order Number</dt>
				<dd>{{ orderDetails.id }}</dd>
				<dt>Order Created</dt>
				<dd>{{ orderDetails.created | moment }}</dd>
				<dt>Payment Amount</dt>
				<dd>{{ orderDetails.amount | currency }}</dd>
				<dt>Shipping Address</dt>
				<dd>{{ orderDetails.shipping.address.line1 }}, {{ orderDetails.shipping.address.city }}, {{ orderDetails.shipping.address.state }} {{ orderDetails.shipping.address.postal_code }}</dd>
				<dt>Engraving Text</dt>
				<dd>{{ orderDetails.description }}</dd>
				<dt>Email</dt>
				<dd>{{ orderDetails.receipt_email }}</dd>
			</dl>
		</div>
	</div>

</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
	data(){
		return {
			orderDetails: false
		};
	},
	created(){
		var charge_id = this.$route.params.id;
		axios.get(`${window.endpoint}/charge/${charge_id}`)
			.then((res)=>{
				this.orderDetails = res.data.charge;
			});
	},
	filters: {
		moment(date) {
			return moment.unix(date).format('MMMM Do, YYYY - h:mm a');
		},
		currency(amount){
			return `$${(amount/100).toFixed( 2 )}`;
		}
	}
}

</script>
<style>
	dt { font-weight: bold; }
</style>
```

In this file we hit our backend again to grab the details for the order from the identification number in the URL. There are also some [output filters](https://vuejs.org/v2/guide/migration.html#Filters) within the Vue instance that makes the text pretty how we want it to look.












