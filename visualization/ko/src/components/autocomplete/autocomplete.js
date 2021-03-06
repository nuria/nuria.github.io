//note fetcher is part of a component installed via bower
//TODO try typeahead w/o jquery, swap by zepto
define(['knockout', 'text!./autocomplete.html','fetcher', 'typeahead'], function(ko, templateMarkup, Fetcher) {
  
  /** Represents an autocomplete option **/
  //TODO move option model to its own file
  function ProjectOption(data){
      // no need for these to be observables as they are fixed values
      this.name = data.name;
      this.languages = data.languages;
      this.description = data.description;
  }
  
  function LanguageOption(data){
      // no need for these to be observables as they are fixed values
      this.name = data.name;
      this.projects = data.projects;
      this.description = data.description;
  }
  
  function Autocomplete(params) {
    this.message = ko.observable(params.message);
    this.projectOptions = ko.observableArray([]);
    this.languageOptions = ko.observableArray([]);
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
            
            var projectOptions = bindingContext.$data.projectOptions();
            var languageOptions = bindingContext.$data.languageOptions();
        
            // to destroy typeaheads: $('.typeahead').typeahead('destroy');           
            if (projectOptions.length >0 && languageOptions.length>0) {
                
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
                var projectTemplate = {
                    header: " <h5> &nbsp; Available Projects</h5>",
                    suggestion: function (data) {
                            return "<span class=\"text-muted\">"+data.name+"<span class=\"footnote\"> "+data.description+"</span> </span>";
                     }
                 };
                 
                 //TODO need to use ko templates here
                 var languageTemplate = {
                     header: "<h5> &nbsp; Available Languages </h5>",
                     suggestion: function (data) {
                             return "<span class=\"text-muted\">"+data.name+"<span class=\"footnote\"> "+data.description+"</span> </span>";
                      }
                  };
                 
                $('.typeahead').typeahead({
                    hint: false,
                    highlight: true,
                    minLength: 1
                    },
                    {
                      name: 'projects',
                      displayKey: 'value',
                      templates: projectTemplate,
                      source: substringMatcher(projectOptions)      
                    },
                    {
                      name: 'language',
                      displayKey: 'language',
                      templates: languageTemplate,
                      source: substringMatcher(languageOptions)      
                    }
                
                ).bind('typeahead:selected', self.displaySecondLevel.bind(self));
            } //end update 
        } // end projectAutocomplete
    }
  } //end constructor
  
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
      window.Fetcher.json('../../config/autocompleteOptionsByProject.json', function(json) {
          this.projectOptions(ko.utils.arrayMap(json, function (data) { return new ProjectOption(data); }));
      
      }.bind(this));
      
      window.Fetcher.json('../../config/autocompleteOptionsByLanguage.json', function(json) {
          this.languageOptions(ko.utils.arrayMap(json, function (data) { return new LanguageOption(data); }));
      
      }.bind(this));
  }
  
  Autocomplete.prototype.displaySecondLevel = function(event, suggestion, datasetName){
     
      this.displaySuboptions(true);
      this.selectedOption(suggestion.name);
      var suboptions = [];
      
      if (datasetName === "projects") {
          var languages = suggestion.languages;
          for (var p in languages) {
              if(languages.hasOwnProperty(p)){
                  suboptions.push({option:p});
              }
          }
      } else {
          var projects = suggestion.projects;
          for (var p in projects) {
              if(projects.hasOwnProperty(p)){
                  suboptions.push({option:p});
              }
          }
      }
      this.suboptions(suboptions);
  }
  
  Autocomplete.prototype.hideSecondLevel = function(data,event){
      this.displaySuboptions(false);
      this.selectedOption();
      this.suboptions([]);
        
  }
  
  
  // This runs when the component is torn down. Put here any logic necessary to clean up,
  // for example cancelling setTimeouts or disposing Knockout subscriptions/computeds.
  Autocomplete.prototype.dispose = function() { };
  
  return { viewModel: Autocomplete, template: templateMarkup };

});
