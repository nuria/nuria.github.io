/*$document*/
/*$d3*/
/*jshint undef:true */
/*jshint browser: true*/
/*jshint strict: false */
/*jshint devel: true */
/**
Adapter from wikimetrics format to epoch format 

Wikimetrics:
{
    "label": "ruwiki",

    "2013-08-18 00:00:00": {
        "Sum": {
            "newly_registered": 34.0
        }
    }, 
    "2014-06-30 00:00:00": {
        "Sum": {
            "newly_registered": 38.0
        }
    }, 
    "2013-08-27 00:00:00": {
        "Sum": {
            "newly_registered": 39.0
        }
    }, 
}

Epoch:
Line graph of epoch is of this form:

var lineChartData = [
  // The first series
  {
    label: "Series 1",
    values: [ {x: 0, y: 100}, {x: 20, y: 1000}, ... ]
  },

  // The second series
  {
    label: "Series 2",
    values: [ {x: 20, y: 78}, {x: 30, y: 98}, ... ]
  },

  ...
];

**/

var Adapter = (function (moment) {
    "use strict";
    var m = moment;
    var adapter = {};
    
    /**
    WikimetricsDataset is an array
    **/
    adapter.adapt = function(wikimetricsDataset){
        
        var lineCharData = [];
       
        for (var i = 0; i < wikimetricsDataset.length; i++) {
            var serie = wikimetricsDataset[i];
            var values = [];
            for (var p in serie){
                if (serie.hasOwnProperty(p) && p.match(/\d\d\d\d-\d\d/) ) {

                    var value = {};
                    // p is a date, looks like we need to convert it to 
                    // a number
                    
                    var date = m(p,"YYYY-MM-DD").valueOf();
                    value.x = date;
                    value.y = serie[p].Sum.newly_registered;
                    values.push(value);
                }
            }
           
            //Let's sort values 
            values.sort(function(a,b){
                return a.x - b.x;
            });
            
            //serie processed, i think this is expected to be ordered on time
            var epochSerie = {
                label: serie.label, 
                values: values
            };
            lineCharData.push(epochSerie);
        }
        
        return lineCharData;
    };
    
    return adapter;
})(moment);
