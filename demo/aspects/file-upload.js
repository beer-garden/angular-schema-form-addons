
var fileUpload = {
  schema: {
    'image': {
      title: 'Image file',
      type: 'file',
      format: 'base64',
      maxSize: '5242880'
    },
    'images': {
      type: 'array',
      maxItems: 2,
      items: {
        type: 'file',
        format: 'base64',
        maxSize: '5242880',
        title: 'Image file'
      }
    },
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
      key: 'images',
      title: 'Images upload',
      description: 'what',
      placeholder: 'Click here or drop files to upload'
    },
    {
      key: 'image',
      title: 'Image upload',
      description: 'Upload a file',
      placeholder: 'Click here or drop files to upload'
    },
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
