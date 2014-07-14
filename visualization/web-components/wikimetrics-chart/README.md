Wikimetrics Chart
=================
wikimetrics-chart is a web component that graphs data about Wikipedia's editor activity. 

It uses google charts to graph . The data is served by [Wikimetrics](https://metrics.wmflabs.org/).

To use:

1. Install bower
    npm install -g bower
2. Install wikimetrics component 



Info
-----
Prototype displays [Newly Registered User](https://meta.wikimedia.org/wiki/Research:Newly_registered_user)
data.

Datafiles are included with prototype at this time. Data will be feched from wikimetrics once public
data is available on the production instance.

Public files are deployed (for now)
only to [Wikimetrics Staging] (https://metrics-staging.wmflabs.org/static/public/datafiles/)

Example Web Component usage:

    <html> 
    <head> 
        <title> Google Chart visualization of Newly Registered Users via Web Component</title>
        <script src="./bower_components/platform/platform.js"></script>
        <link rel="import" href="./wikimetrics-chart/wikimetrics-chart.html">
         
    </head>
    <body unresolved>
         <wikimetrics-chart
           type='line'
           height='300px'
           width='400px'
           metric ='["NewlyRegistered"]'
           data = '["rowiki","ruwiki"]'
         </wikimetrics-chart> 
    </body>

    </html>

