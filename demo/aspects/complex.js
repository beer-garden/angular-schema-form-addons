
var complex = {
  schema: {
    'thing': {
      type: "object",
      properties: {
        'my_string': { type: 'string' },
        'my_int': { type: 'integer' },
        'my_float': { type: 'number' },
        'my_bool': { type: 'boolean' },
        'my_nested_model': {
          type: 'object',
          properties: {
            'my_nested_string': { type: 'string' },
            'my_nested_int': { type: 'integer' }
          }
        },
        'my_list_of_unwrapped_strings': {
          type: 'array',
          items: {
            type: 'string',
            required: true
          }
        },
        'my_list_of_strings': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              'wrapped_string': {
                type: 'string',
                required: true
              }
            }
          }
        },
        'my_list_of_models': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              'wrapped_string': {
                type: 'string',
                required: true
              },
              'wrapped_int': {
                type: 'integer',
                required: true
              }
            }
          }
        },
        'my_list_of_models_with_array': {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              'wrapped_int': {
                type: 'integer',
                required: true
              },
              'my_list_of_strings': {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    'wrapped_string': {
                      type: 'string',
                      required: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  form: [
    {
      key: 'thing.my_list_of_unwrapped_strings',
      items: [
        {
          key: 'thing.my_list_of_unwrapped_strings[]',
          htmlClass: 'clear-right',
          notitle: true
        }
      ]
    },
    {
      key: 'thing.my_list_of_strings',
      items: [
        {
          key: 'thing.my_list_of_strings[].wrapped_string',
          htmlClass: 'clear-right',
          notitle: true
        }
      ]
    },
    {
      key: 'thing.my_list_of_models'
    },
    {
      key: 'thing.my_list_of_models_with_array',
      items: [
        'thing.my_list_of_models_with_array[].wrapped_int',
        {
          key: 'thing.my_list_of_models_with_array[].my_list_of_strings',
          items: [
            'thing.my_list_of_models_with_array[].my_list_of_strings[].wrapped_string'
          ]
        }
      ]
    }
  ]
};

export { complex as default };
