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

### Clone and Install
```bash
# Clone the repository
git clone https://github.com/beer-garden/angular-schema-form-addons.git
cd angular-schema-form-addons

# Install dependencies
npm install
```

### Demo Application

```
npm run serve
```

This will start a webpack development server on port 8078. Webpack will watch the `src` directory for changes, and when triggered it will rebuild and cause any browsers viewing the demo application to reload.

Webpack only binds to localhost so view the demo at http://localhost:8078/.

### Building
Build the production artifacts:
```bash
npm run build
```

This puts the generated files in the `dist` directory.

### Linking / Watching
You can use `npm link` to quickly incorporate changes into an external application that is using ASF Addons:

```bash
# Mark this application as linkable
npm link

# Watch the 'src' directory, rebuilding the dist artifacts on changes
npm run watch

# IN ANOTHER SHELL

# Navigate to the external application and use the package link
cd 'path/to/my/other/project'
npm link @beer-garden/addons
```

At this point 'path/to/my/other/project/node_modules/@beer-garden/addons' will be a symbolic link referencing the build output of the ASF addons.
