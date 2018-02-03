
var regularObject = {
  schema: {
    'regularObject': {
      type: 'object',
      properties: {
        'prop1': {
          title: 'Prop 1',
          type: 'string',
          required: true
        }
      }
    },
    'regularObjects': {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          'prop2': {
            title: 'Prop 2',
            type: 'string'
          }
        }
      }
    }
  },
  form: [
    {
      key: 'regularObject',
      title: 'Non-raw (Regular) object',
      htmlClass: 'wrapper'
    },
    {
      key: 'regularObjects',
      title: 'Regular Objects',
      startEmpty: false,
      items: [
        {
          key: ['regularObjects', ''],
          notitle: true,
          items: [
            {
              key: ['regularObjects', '', 'prop2']
            }
          ]
        }
      ]
    }
  ]
};

export { regularObject as default };
