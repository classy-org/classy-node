const path = require('path');
const fsDefault = require('fs');
const promisify = require('util').promisify;

import _ from 'lodash';
import stripIndent from 'strip-indent';
import { singular } from 'pluralize';

import resources from '../src/resources';
import basicMethods from '../src/basicMethods';
import ClassyResource from '../src/ClassyResource/main';
import Classy from '../src/Classy/main';

/* Promisify all methods on the fs utility so we can use them with async/await
============================================================================= */
const fs = Object.keys(fsDefault).reduce((accum, key) => {
  if (typeof fsDefault[key] === 'function') {
    return Object.assign(accum, {[key]: promisify(fsDefault[key]) });
  }
  return Object.assign(accum, {[key]: fsDefault[key] });
}, {});


/* RUN
========================================================= */
const methodPaths = [];
const previousClassyResource = _.cloneDeep(ClassyResource.prototype);
async function buildResourceDocs() {
  const filePath = path.join(__dirname, '../docs/resources.md');
  const file = await fs.open(filePath, 'w');
  await fs.writeFile(file, '# Resources\n');

  Object.keys(resources).forEach(async (resourceKey) => {
    overrideAddMethods(resourceKey, file);
    fs.appendFileSync(file, `\n## ${resourceKey}\n`);
    new ClassyResource({}, resources[resourceKey]);
  });

  ClassyResource.prototype = previousClassyResource;

  const classy = new Classy({ clientId: 'xxxx', clientSecret: 'yyy' });
  methodPaths.forEach(path => {
    console.log(path, typeof _.get(classy, path)); // eslint-disable-line no-console
    if (!_.get(classy, path)) {
      throw Error(path + ' is not defined!!');
    }
  });
}

buildResourceDocs();

/* UTILS
========================================================= */
function overrideAddMethods(resource, file) {

  ClassyResource.prototype._addBasicMethods = addBasicMethodsOverride(resource, file);
  ClassyResource.prototype._addCreateMethods = addCreateMethodsOverride(resource, file);
  ClassyResource.prototype._addListMethods = addListMethodsOverride(resource, file);
  ClassyResource.prototype._addCustomMethods = addCustomMethodsOverride(resource, file);
  ClassyResource.prototype._addRetrieveMethods = addRetrieveMethodsOverride(resource, file);
}

function addBasicMethodsOverride(resource, file) {
  const resourceName = _.camelCase(resource);
  const resourcePathName = _.kebabCase(resource);

  return function(methods) {
    fs.appendFileSync(file, '\n### Basics');
    methods.forEach(function(method) {
      const methodData = basicMethods[method];
      const args = ['create', 'update', 'list'].includes(method)
        ? 'id, data'
        : 'id';

      const methodPath = `${resourceName}.${method}`;
      methodPaths.push(methodPath);

      fs.appendFileSync(file, `\n#### ${methodData.method} /${resourcePathName}/:id\n`);
      fs.appendFileSync(file, createCodeBlock(`
        classy.${methodPath}(${args}).then(() => {
            // do something after ${method}
        })  
      `));

    }.bind(this));
  };
}

function addCreateMethodsOverride(resource, file) {
  const resourceName = _.camelCase(resource);
  const resourcePathName = _.kebabCase(resource);

  return function(methods) {
    fs.appendFileSync(file, '\n### Creates');
    methods.forEach(function(method) {
      const camelCaseMethod = _.camelCase(method);
      const uppercaseMethod = _.upperFirst(camelCaseMethod);
      const methodName = uppercaseMethod.substr(0, uppercaseMethod.length - 1);

      const methodPath = `${resourceName}.create${methodName}`;
      methodPaths.push(methodPath);

      fs.appendFileSync(file, `\n#### POST /${resourcePathName}/:id/${method}\n`);
      fs.appendFileSync(file, createCodeBlock(`
        classy.${methodPath}(${singular(resourceName)}Id, data).then(data => {
          // do something with created entity
        })
      `));

    }.bind(this));
  };
}

function addListMethodsOverride(resource, file) {
  const resourceName = _.camelCase(resource);
  const resourcePathName = _.kebabCase(resource);

  return function(methods) {
    fs.appendFileSync(file, '\n### Lists');
    methods.forEach(function(method) {
      const camelCaseMethod = _.camelCase(method);
      const uppercaseMethod = _.upperFirst(camelCaseMethod);

      const methodPath = `${resourceName}.list${uppercaseMethod}`;
      methodPaths.push(methodPath);

      fs.appendFileSync(file,`\n#### GET /${resourcePathName}/:id/${method}\n`);
      fs.appendFileSync(file, createCodeBlock(`
        classy.${methodPath}(${singular(resourceName)}Id, options).then(data => {
          // do something with list
        })
      `));

    }.bind(this));
  };
}

function addCustomMethodsOverride(resource, file) {
  const resourceName = _.camelCase(resource);
  const resourcePathName = _.kebabCase(resource);

  return function(methods) {
    const self = this;
    fs.appendFileSync(file, '\n### Custom');
    Object.keys(methods).forEach(function(customMethod) {
      const params = methods[customMethod];

      if (!params.path) return;
      const args = (params.path.match(/{(\w*)}/g) || []).map(arg => arg.replace(/[{}]/g, ''));

      const methodPath = `${resourceName}.${customMethod}`;
      methodPaths.push(methodPath);

      fs.appendFileSync(file,`\n#### ${params.method} /${resourcePathName}${params.path.replace(/{/g, ':').replace(/}/g, '')}\n`);
      fs.appendFileSync(file, stripIndent(createCodeBlock(`
        classy.${methodPath}(${args.join(', ')}).then(data => {
          // do something with custom response
        })
      `)));

    }.bind(self));
  };
}

function addRetrieveMethodsOverride(resource, file) {
  const resourceName = _.camelCase(resource);
  const resourcePathName = _.kebabCase(resource);

  return function(methods) {
    fs.appendFileSync(file, '\n### Retrieves');
    methods.forEach(function(method) {
      const camelCaseMethod = _.camelCase(method);
      const singularLowerCase = singular(camelCaseMethod);
      const uppercaseMethod = _.upperFirst(camelCaseMethod);
      const singularUppercase = singular(uppercaseMethod);

      const methodPath = `${resourceName}.retrieve${singularUppercase}`;
      methodPaths.push(methodPath);

      fs.appendFileSync(file,`\n#### GET /${resourcePathName}/:id/${method}\n`);
      fs.appendFileSync(file, createCodeBlock(`
        classy.${methodPath}(${singular(resourceName)}Id, ${singularLowerCase}Id).then(data => {
          // do something with list
        })
      `));

    }.bind(this));
  };
}

function createCodeBlock(code) {
  return stripIndent('```javascript\n' + stripIndent(code).trim() + '\n```\n');
}
