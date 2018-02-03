
var hiddenFields = {
  schema: {
    'visibleString1': {
      type: 'string'
    },
    'hiddenString1': {
      type: 'string'
    },
    'hiddenString2': {
      type: 'string',
      default: 'Default Value'
    }
  },
  form: [
    {
      key: 'visibleString1',
      description: 'A non-hidden string'
    },
    {
      type: 'accordion',
      title: 'Hidden Fields',
      items: [ 'hiddenString1', 'hiddenString2' ]
    }
  ]
};

export { hiddenFields as default };
