// This file is an entry point for angular tests
// Avoids some weird issues when using webpack + angular.
// import tv4 from 'tv4';
import "angular";
import "angular-mocks/angular-mocks";

// We load polyfill here because PhantomJS doesn't have methods
// like String.startswith  We should probably be doing this when
// we bundle our application anyway.
import "babel-polyfill";

const context = require.context(".", true, /\.js$/);

context.keys().forEach(context);
