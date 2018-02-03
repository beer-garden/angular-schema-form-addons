
var raw = {
  schema: {
    'raw': {
      type: 'variant',
      required: true
    },
    'raws': {
      type: 'array',
      items: {
        type: ['variant', 'null']
      }
    }
  },
  form: [
    {
      key: 'raw',
      description: 'Raw Thing'
    },
    {
      key: 'raws',
      description: 'Raw Things',
      startEmpty: false,
      items: [
        {
          key: ['raws', ''],
          htmlClass: 'clear-right',
          notitle: true
        }
      ]
    }
  ]
};

export { raw as default };
