//note fetcher is part of a component installed via bower
//TODO try typeahead w/o jquery, swap by zepto
define(['knockout', 'text!./autocomplete.html','fetcher', 'typeahead'], function(ko, templateMarkup, Fetcher) {
  
  /** Represents an autocomplete option **/
  //TODO move option model to its own file
  function Option(data){
      // no need for these to be observables as they are fixed values
      this.name = data.name;
      this.languages = data.languages;
  }
  
  function Autocomplete(params) {
    this.message = ko.observable(params.message);
    this.options = ko.observableArray([]);
    this.testing = ko.observable(true);
    this.init();
    
    ko.bindingHandlers.projectAutocomplete = {
        
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            
            var data = bindingContext.$data.options();
        
            // note that typeaheads are inmutable 
            // so while ko can call this eveytime the array of options
            // would change (in theory)
            // typeahead only supports to be initialized once            
            if (data.length >0) {
                
                var substringMatcher = function(strs) {
                  return function findMatches(q, cb) {
                    var matches, substrRegex;
 
                    // an array that will be populated with substring matches
                    matches = [];
 
                    // regex used to determine if a string contains the substring `q`
                    substrRegex = new RegExp(q, 'i');
 
                    // iterate through the pool of strings and for any string that
                    // contains the substring `q`, add it to the `matches` array
                    $.each(strs, function(i, str) {
                      if (substrRegex.test(str)) {
                        // the typeahead jQuery plugin expects suggestions to a
                        // JavaScript object, refer to typeahead docs for more info
                        matches.push({ value: str });
                      }
                    });
 
                    cb(matches);
                  };
                };
                var projects = [];
                
                for (var i=0;i<data.length;i++) {
                    projects.push(data[i].name);
                }
                
                $('#search').typeahead({
                    hint: true,
                    highlight: true,
                    minLength: 1
                    },
                    {
                      name: 'example',
                      displayKey: 'value',
                      source: substringMatcher(projects)
                  
                });
            }
        }
    };
  
  }
  
  Autocomplete.prototype.init = function() {
      /**
      Autocomplete options are of this form:
      [
      {
     'name':'Wikipedia',
        'languages': {
                'Spanish': 'eswiki',
                'English': 'enwiki',
                'German': 'dewiki'
            }
        
        },
      
      Note that this is not a generic autocomplete but very taylored
      to our dashboard scenario
      **/
      //Fecher is getting loaded but the way module is written, fetcher
      //ends up on global scope.
      //TODO rewrite fetcher in a require_js friendly format
      window.Fetcher.json('../../config/autocompleteOptions.json', function(json) {
          this.options(ko.utils.arrayMap(json, function (data) { return new Option(data); }));
      
      }.bind(this));
  }
  
  
  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Autocomplete.prototype.dispose = function() { };
  
  return { viewModel: Autocomplete, template: templateMarkup };

});
