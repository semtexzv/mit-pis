if exist "deploy\dist" rmdir deploy\dist /S /Q;
SET NODE_ENV=production;
webpack -p --config=webpack.config.prod.js
SET NODE_ENV=dev;
