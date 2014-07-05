/*$document*/
/*$d3*/
/*jshint undef:true */
/*jshint browser: true*/
/*jshint strict: false */
/*jshint devel: true */
/**
* Small javascript to fetch data files **
* input: data file url 
* Creates a script tag, upon downloading of the tag 
* data is available on global variable
* assumes data is json and can fetched with a script tag
* TODO common file for jshint rules
*/

/**
* Will be a singleton 
* **/


var Fetcher = (function (d3) {
    'use strict';
    var dataFiles = [];
    
    var dataFetcher =  {};
    
    /**
    No coors for now this only fetches from same domain
    Note that this is asynchronous
    **/
    dataFetcher.json = function (url, callback) {
                        if (dataFiles[url]) {
                            // TODO ahem ... urls
                            // should have the right cache headers
                            return dataFiles[url];
                            
                        }
        
                        d3.json(url, function(error, json){
                            
                            if (error) {
                                return console.warn(error);
                            }
                           
                            if (callback){
                                callback(json);
                            }
                        });
    
    };
    
    return dataFetcher;

}(d3));


