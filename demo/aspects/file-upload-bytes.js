
var fileUpload = {
  schema: {
    'bytes_key_optional': {
      title: 'Bytes Type Optional',
      type: 'file',
      format: 'bytes',
      maxSize: '5242880'
    },
    'bytes_key': {
      title: 'Bytes Type',
      type: 'file',
      format: 'bytes',
      maxSize: '5242880',
      required: true
    },
  },
  form: [
    {
      key: 'bytes_key_optional',
      title: 'Bytes type optional',
      description: 'Upload a file',
      placeholder: 'Click here or drop files to upload'
    },
    {
      key: 'bytes_key',
      title: 'Bytes type',
      description: 'Upload a file',
      placeholder: 'Click here or drop files to upload'
    },

  ]
};

var formatFileDisplay = function(value) {
  if (angular.isDefined(value)) {
    return value.split('file:')[1].split(';data:')[0];
  } else {
    return value;
  }
};

export { fileUpload as default };
