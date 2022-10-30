# Running the program

Node.js is required to run this program - download node here if required https://nodejs.org/en/download/

* In the command line navigate to the directory `Kraken-Tech-Test`
* To install all dependencies run command:  `npm install`
* To transpile the typescript code to javascript run command: `tsc`
* Naviagte to src directory: `cd src`
* Run the index.js file with node: `node index.js`
* Run the unit tests with the command: `npm test`


# Description of the program
This program is written to GET data from a couple of api endpoints then modify the retrieved data and POST it back to a different endpoint 

Axios is used to retrieve all the outages from the outages endpoint as well as the site info for 'norwich-pear-tree' from the site-info endpoint

Then all the outages that began before 01/01/2022 are filtered out of the outages data array.

Then the data is reduced to only include outages at devices at 'norwich-pear-tree' 

For these the device name is added to outage data


# N.B.
This was my first experience with typescript so I apologise for any strange uses (or lack thereof) of types
Similarly, I have not done unit testing before so this is what I think is appropirate from what I have read online
