
var letters = [
  {value: 'A', category: 'vowel'}, {value: 'B', category: 'consonant'}, {value: 'C', category: 'consonant'},
  {value: 'D', category: 'consonant'}, {value: 'E', category: 'vowel'}, {value: 'F', category: 'consonant'},
  {value: 'G', category: 'consonant'}, {value: 'H', category: 'consonant'}, {value: 'I', category: 'vowel'},
  {value: 'J', category: 'consonant'}, {value: 'K', category: 'consonant'}, {value: 'L', category: 'consonant'},
  {value: 'M', category: 'consonant'}, {value: 'N', category: 'consonant'}, {value: 'O', category: 'vowel'},
  {value: 'P', category: 'consonant'}, {value: 'Q', category: 'consonant'}, {value: 'R', category: 'consonant'},
  {value: 'S', category: 'consonant'}, {value: 'T', category: 'consonant'}, {value: 'U', category: 'vowel'},
  {value: 'V', category: 'consonant'}, {value: 'W', category: 'consonant'}, {value: 'X', category: 'consonant'},
  {value: 'Y', category: 'consonant'}, {value: 'Z', category: 'consonant'}
];

var ints = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var floats = [-1.2, -0.3, 0, 0.4, 1, 2.6, 11.9];

// Be careful here - trying to use Object.keys(days) won't work. Object attributes are strings, so the result of that
// would be ['week', 'weekend', 'null'], and the null correction doesn't match a string 'null'
var day_types = ['week', 'weekend', null];
var days = {
  week: ['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday'],
  weekend: ['Saturday', 'Sunday'],
  null: ['Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
};

var states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Flordia', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
  'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

var renamed = [
  {value: 'Red', text: 'Green'}, {value: 'Yellow', text: 'Purple'}, {value: 'Blue', text: 'Orange'}
]

var getStates = function() {
  return states;
};

var getStatesAsync = function() {
  var promise = new Promise(function(resolve, reject) {
    window.setTimeout(function() {
      resolve(states);
    }, 1000);
  });
  return promise;
};

var getStatesFirstLetter = function(firstLetter) {
  if(firstLetter === undefined || firstLetter === '') {
    return [];
  }

  var filtered = [];
  for(var i=0; i<states.length; i++) {
    if(states[i].startsWith(firstLetter)) {
      filtered.push(states[i]);
    }
  }
  return filtered;
};

var dynamicChoices = {
  schema: {
    'category_selector': {
      type: 'string',
      title: 'Category',
      description: 'The category',
      enum: ['consonant', 'vowel']
    },
    'category_depends': {
      type: 'string',
      title: 'Choices with Category',
      description: 'Example of using model category'
    },
    'renamed_select': {
      type: 'string',
      title: 'Select',
      description: 'Check the model!'
    },
    'renamed_typeahead': {
      type: 'string',
      title: 'Typeahead',
      description: 'Check the model!'
    },
    'letters': {
      type: 'string',
      title: 'Pick a Letter',
      description: 'Used as the argument in subsequent fields'
    },
    'static_strict_dynamic': {
      type: 'string',
      title: 'Choices with Dependency',
      description: 'Uses "Pick a Letter" value as input to populate choices'
    },
    'static_strict_constant': {
      type: 'string',
      title: 'Choices without Dependency',
      description: 'Ignores "Pick a Letter" and always uses "M"'
    },
    'day_types': {
      type: ['string', 'null'],
      default: null,
      title: 'Pick a Day Type',
      description: 'Used as the key to the days object in the next field'
    },
    'object': {
      type: 'string',
      title: 'Object with Key',
      description: 'Uses a field as the key to an object in scope'
    },
    'sync': {
      type: 'string',
      title: 'Synchronous Callback',
      description: 'Example of a synchronous callback'
    },
    'async': {
      type: 'string',
      title: 'Asynchronous Callback',
      description: 'Example of an asynchronous callback'
    },
    'int_typeahead': {
      type: ['integer', 'null']
    },
    'float_typeahead': {
      type: ['number', 'null']
    },
    'httpGet': {
      type: 'string',
      title: 'Http Get',
      description: 'Example of an HTTP GET'
    },
    'httpGetFail': {
      type: 'string',
      title: 'Http Get Fail',
      description: 'Example of a failed HTTP GET'
    },
    'unpopulatable': {
      type: 'string',
      title: 'Unpopulatable',
      description: 'Example of an unpopulatable typeahead (no form.options)'
    }
  },
  form: [
    {
      type: 'fieldset',
      title: 'Categories',
      items: [
        {
          key: 'category_selector'
        },
        {
          key: 'category_depends',
          type: 'select',
          choices: {
            updateOn: 'category_selector',
            titleMap: letters,
            transforms: [
              {
                categoryField: 'category_selector'
              }
            ]
          }
        }
      ]
    },
    {
      type: 'fieldset',
      title: 'Different Text',
      items: [
        {
          key: 'renamed_select',
          type: 'select',
          choices: {titleMap: renamed}
        },
        {
          key: 'renamed_typeahead',
          type: 'typeahead',
          choices: {titleMap: renamed}
        }
      ]
    },
    {
      type: 'fieldset',
      title: 'Transforms',
      items: [
        {
          key: 'day_types',
          type: 'select',
          choices: {
            titleMap: day_types,
            transforms: [
              'fixNull'
            ]
          }
        },
        {
          key: 'object',
          type: 'select',
          choices: {
            updateOn: 'day_types',
            titleMap: days,
            transforms: [
              {
                lookupField: 'day_types'
              }
            ]
          }
        },
      ]
    },
    {
      type: 'fieldset',
      title: 'Callbacks',
      items: [
        {
          type: 'select',
          key: 'letters',
          choices: {
            titleMap: letters
          }
        },
        {
          key: 'static_strict_dynamic',
          type: 'select',
          required: true,
          placeholder: 'I depend on "Pick a Letter"',
          choices: {
            updateOn: ['letters'],
            callback: {
              function: getStatesFirstLetter,
              argumentFields: ['letters']
            }
          }
        },
        {
          key: 'static_strict_constant',
          type: 'select',
          required: true,
          placeholder: "I don't!",
          choices: {
            callback: {
              function: getStatesFirstLetter,
              arguments: 'M'
            }
          }
        },
        {
          key: 'sync',
          type: 'typeahead',
          choices: {
            callback: { function: getStates }
          }
        },
        {
          key: 'async',
          type: 'typeahead',
          choices: {
            callback: { function: getStatesAsync }
          }
        },
      ]
    },
    {
      type: 'fieldset',
      title: 'Numbers',
      items: [
        {
          key: 'int_typeahead',
          type: 'typeahead',
          required: true,
          strict: true,
          choices: {titleMap: ints}
        },
        {
          key: 'float_typeahead',
          type: 'typeahead',
          required: true,
          strict: true,
          choices: {titleMap: floats}
        }
      ]
    },
    {
      type: 'fieldset',
      title: 'HTTP',
      items: [
        {
          key: 'httpGet',
          type: 'typeahead',
          choices: {
            updateOn: ['static'],
            httpGet: {
              url: 'testdata.json',
              queryParameters: {
                unused: 'parameter'
              },
              queryParameterFields: {
                another: 'static'
              }
            }
          }
        }
      ]
    },
    {
      type: 'fieldset',
      title: 'Errors',
      items: [
        {
          key:'httpGetFail',
          type: 'typeahead',
          choices: {
            httpGet: {url: 'http://not/a/real/url'}
          }
        },
        {
          key: 'unpopulatable',
          type: 'typeahead'
        }
      ]
    }
  ]
};

export { dynamicChoices as default };
