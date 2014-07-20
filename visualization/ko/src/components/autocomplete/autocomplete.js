//note fetcher is part of a component installed via bower
//TODO try typeahead w/o jquery, swap by zepto
define(['knockout', 'text!./autocomplete.html','fetcher', 'typeahead'], function(ko, templateMarkup, Fetcher) {
  
  /** Represents an autocomplete option **/
  //TODO move option model to its own file
  function Option(data){
      // no need for these to be observables as they are fixed values
      this.name = data.name;
      this.languages = data.languages;
      this.description = data.description;
  }
  
  function Autocomplete(params) {
    this.message = ko.observable(params.message);
    this.options = ko.observableArray([]);
    this.testing = ko.observable(true);
    this.init();
    
    ko.bindingHandlers.projectAutocomplete = {
        
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            
            var data = bindingContext.$data.options();
        
            // to destroy typeaheads: $('.typeahead').typeahead('destroy');           
            if (data.length >0) {
                
                
                /**var T = {};
                    T.compile = function (template) {
                        var compile = Handlebars.compile(template),
                            render = {
                                render: function (ctx) {
                                    return compile(ctx);
                                }
                };**/
                
                /**
                * Data is an array of objects
                **/          
                var substringMatcher = function(data) {
                  return function findMatches(q, cb) {
                    var matches, substrRegex;
 
                    // an array that will be populated with substring matches
                    matches = [];
 
                    // regex used to determine if a string contains the substring `q`
                    substrRegex = new RegExp(q, 'i');
 
                    // iterate through the pool of strings and for any string that
                    // contains the substring `q`, add it to the `matches` array
                    $.each(data, function(i, item) {
                      if (substrRegex.test(item.name)) {
                        // the typeahead jQuery plugin expects suggestions to a
                        // JavaScript object, refer to typeahead docs for more info
                        matches.push({ name: item.name , description: item.description});
                      }
                    });
 
                    cb(matches);
                  };
                };
                var projects = [];
                
                for (var i=0;i<data.length;i++) {
                    projects.push(data[i].name);
                }
                
                //TODO need to use ko templates here
                var templates = {
                     suggestion: function (data) {
                            return "<span class=\"text-muted\">"+data.name+"<span class=\"footnote\"> "+data.description+"</span> </span>";
                     }
                 }
                 
                 
                 
                $('#search').typeahead({
                    hint: false,
                    highlight: true,
                    minLength: 2
                    },
                    {
                      name: 'projects',
                      displayKey: 'value',
                      valueKey:'name',
                      templates: templates,
                      source: substringMatcher(data)
                  
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
