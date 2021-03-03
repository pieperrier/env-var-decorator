# env-var-decorator

[![NPM version](https://img.shields.io/npm/v/env-var.svg?style=flat)](https://www.npmjs.com/package/env-var)
[![TypeScript](https://badgen.net/npm/types/env-var)](http://www.typescriptlang.org/)
[![License](https://badgen.net/npm/license/env-var)](https://opensource.org/licenses/MIT)
[![Travis CI](https://travis-ci.org/evanshortiss/env-var.svg?branch=master)](https://travis-ci.org/evanshortiss/env-var)
[![Coverage Status](https://coveralls.io/repos/github/evanshortiss/env-var/badge.svg?branch=master)](https://coveralls.io/github/evanshortiss/env-var?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/env-var.svg?style=flat)](https://www.npmjs.com/package/env-var)
[![Known Vulnerabilities](https://snyk.io//test/github/evanshortiss/env-var/badge.svg?targetFile=package.json)](https://snyk.io//test/github/evanshortiss/env-var?targetFile=package.json)

Helper that lets you use decorators for environment variable based configuration in TypeScript!

## Install

### npm

```shell
npm install env-var-decorator
```

## Getting started

First create your Configuration module :

```ts
import {EnvironmentConfiguration, EnvironmentVariable} from './helpers/configurationHelper';

class ConfigurationModule extends EnvironmentConfiguration {
    @EnvironmentVariable('ENVIRONMENT')
    env: string;

    @EnvironmentVariable('BDD_CONN')
    bddConnString: string;

    @EnvironmentVariable('RETRY_COUNT')
    retryCount: number;
}

const Configuration = new ConfigurationModule();
export default Configuration;
```

When starting your application you have to initialize the module, like this :

```ts
await Configuration.init();
```

Et voilà, that's all you have to do. You can use the fields of your module wherever you want :

```ts
import Configuration from '../Configuration';

const dataLayer = new SqlConnector(Configuration.bddConnString);
```
