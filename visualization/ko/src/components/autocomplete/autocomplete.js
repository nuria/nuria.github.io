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
    this.displaySuboptions = ko.observable(false);
    this.selectedOption = ko.observable();
    this.suboptions = ko.observableArray([]);
    this.getBrowsingOptions();
    var self = this;
    /**
    Define custom bindings for autocomplete
    **/
    ko.bindingHandlers.projectAutocomplete = {
        
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            
            var data = bindingContext.$data.options();
        
            // to destroy typeaheads: $('.typeahead').typeahead('destroy');           
            if (data.length >0) {
                
                // Data is an array of option objects       
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
                        matches.push(item);
                      }
                    });
 
                    cb(matches);
                  };
                };
                
                //TODO need to use ko templates here
                var templates = {
                     suggestion: function (data) {
                            return "<span class=\"text-muted\">"+data.name+"<span class=\"footnote\"> "+data.description+"</span> </span>";
                     }
                 }
                $('.typeahead').typeahead({
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
                  
                }).bind('typeahead:selected', self.displaySecondLevel.bind(self));
            }
        }
    };
  
  }
  
  Autocomplete.prototype.getBrowsingOptions = function() {
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
      **/
      //Fecher is getting loaded but the way module is written, fetcher
      //ends up on global scope.
      //TODO rewrite fetcher in a require_js friendly format
      window.Fetcher.json('../../config/autocompleteOptions.json', function(json) {
          this.options(ko.utils.arrayMap(json, function (data) { return new Option(data); }));
      
      }.bind(this));
  }
  
  Autocomplete.prototype.displaySecondLevel = function(event, suggestion, datasetName){
      console.log('click');
      console.log('display suboptions');
      //this.displaySuboptions(true);
      this.displaySuboptions(true)
      console.log( this.displaySuboptions());
      this.selectedOption(suggestion.name);
      var languages = suggestion.languages;
      var suboptions = [];
      for (var p in languages) {
          if(languages.hasOwnProperty(p)){
              suboptions.push({option:p});
          }
      }
      this.suboptions(suboptions);
      
      //display pannel on top of 1st level so we can hide it if user wants to go back
      
  }
  
  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Autocomplete.prototype.dispose = function() { };
  
  return { viewModel: Autocomplete, template: templateMarkup };

});
