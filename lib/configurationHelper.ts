// tslint:disable: ban-types
import 'reflect-metadata';

const CONFIGURATION_VARIABLES_KEY = Symbol('configuration-variable');

interface PropertyInfo {
    environmentVariable: string;
    type: Function;
}

const ConfigurationVariables = {
    get: (target: Object): Map<string, PropertyInfo> => {
        return Reflect.getMetadata(CONFIGURATION_VARIABLES_KEY, target) || new Map();
    },
    set: (target: Object, configurationVariables: Map<string, PropertyInfo>) => {
        Reflect.defineMetadata(CONFIGURATION_VARIABLES_KEY, configurationVariables, target);
    }
};

/**
 * Attribute decorator to specify the name of the environment variable
 * @param environmentVariable Environment variable to find
 */
export function EnvironmentVariable(environmentVariable: string) {
    return (target: Object, propertyName: string) => {
        const configurationVariables = ConfigurationVariables.get(target);
        const type = Reflect.getMetadata('design:type', target, propertyName);
        configurationVariables.set(propertyName, {
            environmentVariable,
            type
        });
        ConfigurationVariables.set(target, configurationVariables);
    };
}

/**
 * Abstract Configuration class
 * To use it, just derive this class and describe the configuration properties with the EnvironmentVariable decorator.
 * Yet, call the init() method once to load the configuration
 */
export abstract class EnvironmentConfiguration {
    async init() {
        return new Promise<void>((resolve, reject) => {
            const errors = new Array();

            const configurationVariables = ConfigurationVariables.get(this);
            for (const [property, info] of configurationVariables) {
                if (!process.env[info.environmentVariable]) {
                    errors.push(`Environment variable ${info.environmentVariable} is not properly defined`);
                } else {
                    const value = info.type(process.env[info.environmentVariable]); // Cast into correct type
                    if (isNaN(value) && info.type.name === 'Number') {
                        errors.push(`Unable to parse ${process.env[info.environmentVariable]} to number`);
                    } else {
                        this[property] = value;
                    }
                }
            }

            if (errors.length > 0) {
                reject(errors.join('\n'));
            } else {
                resolve();
            }
        });
    }
}
