
var complex = {
  schema: {
    'date': {
      type: ['integer', 'null'],
      format: 'datetime'
    },
    'datetime': {
      type: ['integer', 'null'],
      format: 'datetime'
    },
    'sideBySide': {
      type: ['integer', 'null'],
      format: 'datetime'
    }
  },
  form: [
    {
      key: 'date',
      options: {
        format: 'MM/DD/YYYY'
      }
    },
    {
      key: 'datetime'
    },
    {
      key: 'sideBySide',
      options: {
        sideBySide: true
      }
    }
  ]
};

export { complex as default };
