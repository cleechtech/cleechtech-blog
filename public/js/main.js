
var recentPosts = [
	{
		title: 'Adding React.js to Laravel 5.4 Web Applications with Laravel Mix',
		link: 'https://medium.com/@connorleech/adding-react-js-to-laravel-5-4-web-applications-with-laravel-mix-1c3e82950a20',
		posted: 'June 13, 2017'
	},
	{
		title: 'Testing Helpers in Laravel 5.4',
		link: 'https://medium.com/@connorleech/testing-helpers-in-laravel-5-4-363ac47a8504',
		posted: 'May 27, 2017'
	},
	{ 
		title: 'Build an online forum with Laravel — Give the User the ability to create Threads (Part 4)', 
		link: 'https://medium.com/@connorleech/build-an-online-forum-with-laravel-give-the-user-the-ability-to-create-threads-part-4-ccdb6badc618',
		posted: 'May 27, 2017' 
	},
	{ 
		title: 'Build an online forum with Laravel — Post and Show Replies to Threads (Part 3)', 
		link: 'https://medium.com/@connorleech/build-an-online-forum-with-laravel-analyzing-the-application-part-3-9317a0f893b4',
		posted: 'May 23, 2017'
	},
	{ 
		title: 'Launch a Website with a Custom URL using Github Pages and Google Domains', 
		link: 'https://medium.com/@connorleech/launch-a-website-with-a-custom-url-using-github-pages-and-google-domains-3dd8d90cc33b',
		posted: 'May 13, 2017' 
	},
	{ 
		title: 'Build an online forum with Laravel — Create routes, views, controllers. Generate auth. Write test (Part 2)', 
		link: 'https://medium.com/@connorleech/test-driven-development-tdd-in-laravel-b5a2bf9ab65b',
		posted: 'May 4, 2017'
	},
	{ 
		title: 'Build an online forum with Laravel — Initial Setup and Seeding (Part 1)', 
		link: 'https://medium.com/@connorleech/build-an-online-forum-with-laravel-initial-setup-and-seeding-part-1-a53138d1fffc',
		posted: 'Apr 30, 2017'
	},
	{ 
		title: 'Deploy Node.js Serverless Framework app with DynamoDB, S3 and Cognito in 10 Steps', 
		link: 'https://medium.com/@connorleech/deploy-node-js-serverless-framework-app-with-dynamodb-s3-and-cognito-in-10-steps-723d2f4ec08f',
		posted: 'Mar 12, 2017'
	},
	{ 
		title: 'Use Resource Controller, Artisan and Tinker to set up REST API in Laravel 5.3', 
		link: 'https://medium.com/@connorleech/create-a-database-model-and-controller-in-laravel-5-3-b3e15218f6ae',
		posted: 'Jan 2, 2017'
	},
	{ 
		title: 'What is DevOps? Cloud Automation for 2017 and beyond', 
		link: 'https://medium.com/@connorleech/what-is-devops-cloud-automation-for-2017-and-beyond-664649c08002',
		posted: 'Nov 27, 2016'
	}
];

var popularPosts = [
	{ 
		title: 'Laravel 5.3 Form Helpers and CRUD Controller Methods', 
		link: 'https://medium.com/@connorleech/create-and-edit-records-form-reuse-in-laravel-5-3-f70a4b1d5f9b',
		posted: 'Jan 8, 2017' 
	},
	{ 
		title: 'Ruby On Rails or Laravel, which do you use?', 
		link: 'https://medium.com/@connorleech/php-laravel-ruby-on-rails-and-web-frameworks-32c1e50cea2d',
		posted: 'Nov 13, 2016'
	},
	{ 
		title: 'Building a feature complete bookmarking app with Vue.js, Express and Sequelize ORM', 
		link: 'https://medium.com/@connorleech/building-a-feature-complete-bookmarking-app-with-vue-js-express-and-sequelize-orm-b36506ebcb4c',
		posted: 'Nov 2, 2016'
	},
	{ 
		title: 'Create a custom blog theme with Hexo.js', 
		link: 'https://m.dotdev.co/create-a-custom-blog-theme-with-hexo-js-b24c82eb9271',
		posted: 'Feb 25, 2016'
	},
	{ 
		title: 'Generate Authentication for a Laravel 5.3 Web Application', 
		link: 'https://m.dotdev.co/generate-authentication-for-a-laravel-5-3-web-app-384781a5529f',
		posted: 'Dec 27, 2016' 
	},
	{ 
		title: 'Build Google Maps Typeahead Functionality with Vue.js and Laravel 5.3', 
		link: 'https://m.dotdev.co/build-google-maps-typeahead-functionality-with-vue-js-and-laravel-5-3-b75986c77df1',
		posted: 'Dec 28, 2016'
	}
];


var app = new Vue({
  el: '#vueApp',
  data: {
    recentPosts: recentPosts,
    popularPosts: popularPosts,
    show: true,
  },
  computed: {
  	current: function(){
  		if (this.show){
  			return 'popular';
  		} else {
  			return 'recent';
  		}
  	}
  }
});