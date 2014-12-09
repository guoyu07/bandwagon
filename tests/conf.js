// conf.js
exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: [
  	'homepage.js', 
  	'signup.js',
  	'signin.js',
  	],
 /*
  multiCapabilities: [{
    browserName: 'firefox'
  }, {
    browserName: 'chrome'
  }]
  */
};