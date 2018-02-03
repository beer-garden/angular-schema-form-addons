
var nullableObject = {
  schema: {
    'nullableObject': {
      type: 'object',
      format: 'nullable',
      partition: '!optional',
      accordionHeading: 'Optional Fields',
      properties: {
        'nested': {
          title: 'Nested Title',
          type: 'string',
          required: true,
          optional: false,
          default: 'Nested String'
        },
        'optional': {
          title: 'Nested Optional',
          type: 'string',
          optional: true
        }
      }
    }
  },
  form: [
    {
      key: 'nullableObject',
      description: 'A Nullable Model',
      accordionHeading: 'Optional Fields'
    }
  ]
};

export { nullableObject as default };
