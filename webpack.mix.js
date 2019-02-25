const mix = require('laravel-mix');
const generator = require("@muntrue/generateimports");
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

generator.vue({
    folders: ["resources/vue-components"],
    output:  "resources/js/vuegen.js"
});

mix.js('resources/js/vuegen.js', 'public/js');