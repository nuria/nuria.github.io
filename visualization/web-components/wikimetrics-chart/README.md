wikimetrics-chart is a web component that graphs of Wikipedia's editor activity. 

It wraps a google-chart web component. Data served by Wikimetrics.

To use:

1. Install bower
    npm install -g bower
2. Install wikimetrics component 



== Info ==
Prototype displays Newly Registered User data: 
https://meta.wikimedia.org/wiki/Research:Newly_registered_user

Data is included with prototype at this time. 
Data will be feched from wikimetrics once public
data is available on the production instance.

Wikimetrics main site:
https://metrics.wmflabs.org/

Public files:
(for now deployed only to staging area: 
 https://metrics-staging.wmflabs.org/static/public/datafiles/)

Wikimetrics main site:
https://metrics.wmflabs.org/

<wikimetrics-chart
  height='300px'
  width='400px'
  projects = ['enwiki', 'dewiki']
  metric = "NewlyRegister"
  options='{"title": ""Blah""}'
</wikimetrics-chart>

@element wikimetrics-chart
@status alpha
@homepage http://nuria.github.io/wiimetrics-chart
