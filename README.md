#GazeNet
NodeJS server for sharing gaze data and events over the net.
Includes an example of page constructed with [GazeTargets](https://github.com/lexasss/etudriver-web)

##Dependencies
*   [NodeJS](https://nodejs.org/)
*   [MongoDB](https://www.mongodb.org/): The project is configured to start  Mongo from C:\mongodb. If it is installed eslewhere, then set the proper path for `config.db.path` in "package.json".

##Optional dependencies
*   [nginx](http://nginx.org): Static jade pages could e compiled to HTML and [served with Nginx](http://www.sitepoint.com/configuring-nginx-ssl-node-js/). By default, the compilation by Grunt is enabled (views/static >> public/html).

##Config
There are two places with configuration values stored:

*   `config` entry in "package.json": it stores the values shared between modules
    -   accessible in the back-end scripts using `config = require('helpers/config')` (eg., `var port = config.web.port;`)
    -   accessible in the front-end scripts using injection of the form `[[[NAME]]]` (eg., `var port = [[[web.port]]];`)
*   the files in `config/` folder contain module, app or tool -dependent config files:
    -   `mongodb.cfg`: Mongo configuration
    -   `shim.js`: browserify shim configuration (not used in the current version)

##Install and run
Clone the package using git:

    git clone https://github.com/lexasss/gazeNet.git

Install depenencies:

    npm install

Build the package:

    grunt

Run the server:

    run

The last 2 steps can be executed at once (it also start watching changes in the files related to the fornt-end):

    npm start
