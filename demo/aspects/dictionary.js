
var dictionary = {
  schema: {
    'dictionary': {
      type: ['dictionary', 'null'],
      format: 'raw',
      required: true
    },
    'dictionaries': {
      type: 'array',
      items: {
        type: ['dictionary', 'null'],
        format: 'raw'
      }
    }
  },
  form: [
    {
      key: 'dictionary',
      description: 'Dictionary'
    },
    {
      key: 'dictionaries',
      title: 'Dictionaries',
      description: 'Array of Dictionaries',
      startEmpty: false,
      items: [
        {
          key: ['dictionaries', ''],
          htmlClass: 'clear-right',
          notitle: true
        }
      ]
    }
  ]
};

export { dictionary as default };
