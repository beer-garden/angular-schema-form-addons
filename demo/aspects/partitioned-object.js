
var partitionedObject = {
  schema: {
    'partitionedObject': {
      type: 'object',
      partition: '!optional',
      properties: {
        'required1': {
          title: 'Required 1',
          type: 'string',
          default: 'Required Field',
          required: true,
          optional: false
        },
        'optional1': {
          title: 'Optional 1',
          type: 'string',
          optional: true
        },
        'optional2': {
          title: 'Optional 2',
          type: 'string',
          optional: true
        }
      }
    }
  },
  form: [
    {
      key: 'partitionedObject',
      description: 'A Partitioned Model',
      accordionHeading: 'Optional Fields'
    }
  ]
};

export { partitionedObject as default };
