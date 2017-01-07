# internet-garage
Over winter break I decided to connect my garage door to the internet.  That way I would be able to open and close it from an app, or a website, or even using an Amazon Alexa.  While this project has been done before, I want to make it myself anyway using a Raspberry Pi and a few sensors.

The Rasberry Pi in the garage would be able to connect to the Wifi and talk to a server that would keep track of what garages were open or not and be able to signal each door to open or close when requested by the app/website.
So the client is the Raspberry Pi in the basement running a NodeJs program (see [client](client/)).  The server could run in a public cloud, on your laptop, or even the same Pi as the client.  There is some flexibility there, as long as the client and server applications are able to communicate through any firewall settings. There is a description of the server [here](/server/client.js);
