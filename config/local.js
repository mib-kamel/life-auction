module.exports = {

     /***************************************************************************
     * The `port` setting determines which TCP port your app will be           *
     * deployed on.                                                            *
     *                                                                         *
     * Ports are a transport-layer concept designed to allow many different    *
     * networking applications run at the same time on a single computer.      *
     * More about ports:                                                       *
     * http://en.wikipedia.org/wiki/Port_(computer_networking)                 *
     *                                                                         *
     * By default, if it's set, Sails uses the `PORT` environment variable.    *
     * Otherwise it falls back to port 1337.                                   *
     *                                                                         *
     * In env/production.js, you'll probably want to change this setting       *
     * to 80 (http://) or 443 (https://) if you have an SSL certificate        *
     ***************************************************************************/
  
    port: process.env.PORT || 2018,
  
  };