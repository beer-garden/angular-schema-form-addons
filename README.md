ASF Addons
==========
This is a collection of angular-schema-form addons.

## Installation and Usage
### Install
The easiest way to install is to use `npm`:
```bash
npm install @beer-garden/addons
```

### Load
To use the package just load the javascript file:
```html
<script src="node_modules/@beer-garden/addons/dist/addons.js"></script>
```

Or import the package:
```javascript
import '@beer-garden/addons';
```

In either case make sure you load the addons package _after_ loading Angular Schema Form.

## Development
The following steps are the easiest way to get up and running from source.

### Prerequisites:
* Node.js (Stable, 6+)
* `yarn` installed globally

### Get Up and Running
```bash
# Clone the repository
git clone https://github.com/beer-garden/angular-schema-form-addons.git
cd angular-schema-form-addons

# Install node dependencies
yarn install

# Run the demo application
yarn serve
```

This will start a webpack development server on port 8081. Webpack will watch the `src` directory for changes, and when triggered it will rebuild and cause any browsers viewing the demo application to reload.

Webpack only binds to localhost so view the demo at http://localhost:8080/.

### Building
Build the production artifacts:
```bash
yarn build
```

This puts the generated files in the `dist` directory.

### Testing
Run the tests:
```bash
yarn test
```

### Extra Credit
You can use `yarn link` to quickly incorporate changes into an external application that is using ASF Addons:
```bash
# Mark this application as linkable
yarn link

# Watch the 'src' directory, rebuilding the dist artifacts on changes
yarn watch

# IN ANOTHER SHELL

# Navigate to the external application and use the package link
cd 'path/to/my/other/project'
yarn link @beer-garden/addons

# At this point 'path/to/my/other/project/node_modules/@beer-garden/addons'
# should be a symbolic link to this directory

# Run the external project's webpack development server
yarn serve
```

Now changes made to this project will trigger a rebuild, and the new dist artifacts will trigger a rebuild / reload in the external project.
