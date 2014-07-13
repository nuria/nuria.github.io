/*$document*/
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
* Has no dependencies 
* **/
var Fetcher = (function (d3) {
    'use strict';
    var dataFiles = [];
    
    var dataFetcher =  {};
    
    /**
    No coors for now this only fetches from same domain
    Note that this is asynchronous, plain ajax
    **/
    dataFetcher.json = function (url, callback) {
                        if (dataFiles[url]) {
                            // TODO ahem ... urls
                            // should have the right cache headers
                            return dataFiles[url];
                            
                        }
        
                        Ajax.json(url, function(error, json){
                            
                            if (error) {
                                return console.warn(error);
                            }
                           
                            if (callback){
                                callback(json);
                            }
                        });
    
    };
    
    // Writing our won ajax code to fetch json only
    // does not support old versions of XMLHTtpRequest object
    // callback must be of the form:
    // function(json,error){}
    var Ajax = {};
    
    Ajax.json = function(url,callback) {
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    // retrieve response of result as json
                    callback(undefined, JSON.parse(xmlhttp.responseText));
                } else  {
                     callback( xmlhttp.status, undefined);
                }
           };
        };
     };
    
    return dataFetcher;

}());


