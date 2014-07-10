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

Google Chart data can be in several forms, for a line graph:
https://google-developers.appspot.com/chart/interactive/docs/gallery/linechart

It also can be a plain "excell like export"
https://google-developers.appspot.com/chart/interactive/docs/reference#dataparam

We go with teh 1st arry, like form:

var data = google.visualization.arrayToDataTable([
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ]);

        [
        [x,y1,y2],
        [x,y1,y2]
        ]
**/

var Adapter = (function (moment) {
    "use strict";
    var m = moment;
    var adapter = {};
    
    /**
    
    WikimetricsDataset is an array with [ruwiki, rowiki]
    data for exmample
    
    Datasets must span IDENTICAL time boundaries
    i.e. every data point is present in both datasets
    
    **/
    adapter.adapt = function(wikimetricsDataset){
       
        for (var i = 0; i < wikimetricsDataset.length; i++) {
            var serie = wikimetricsDataset[i];
            // array of values
            // hash map like 
            // data[date] = [valueSerie1, valueSerie2]
            var data = {};
            var dates = [];
            for (var p in serie){
                if (serie.hasOwnProperty(p) && p.match(/\d\d\d\d-\d\d/) ) {
                    
                    // p is a date, looks like we need to convert it to 
                    // a number
                    
                    var date = m(p,"YYYY-MM-DD").valueOf();
                    var metric = serie[p].Sum.newly_registered;
                    if (!data[date]) {
                        // have not seen this date before, add it
                        data[date] = [];
                        dates.push(date);
                    }
                    data[date].push(metric);
                }
                
            }
           
            //Let's sort our date array (they are unix timestamps)
            dates.sort();
            
            console.log(dates);
            
            // now build the dataset we are planning on using
            // by looking at the dates sorted array before
            var dataForViz = [];
            
            dataForViz.push(["date","registrations"]);
            
            for (var i = 0; i<dates.length; i++) {
                var record = [];
                var date = dates[i];
                record.push(date,data[date][0]);
                dataForViz.push(record);
            }
            
            return dataForViz;
        }
        
        
    };
    
    return adapter;
})(moment);
