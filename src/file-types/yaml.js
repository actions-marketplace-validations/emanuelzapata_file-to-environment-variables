import * as core from '@actions/core';

export async function YamlFile(fileContent, parentKey = '') {
  for (const [currentKey, currentValue] of Object.entries(fileContent)) {
    const envVarName = (parentKey ? parentKey + '_' : '') + currentKey.replace(/[- ]/g, '_').toUpperCase();

    if (Array.isArray(currentValue)) {
      currentValue.forEach((item, index) => {
        if (typeof item === 'object' && item !== null) {
          YamlFile(item, `${envVarName}_${index}`);
        } else {
          core.exportVariable(`${envVarName}_${index}`, item);
          console.log(`${envVarName}_${index}=${item}`);
        }
      });
    } else if (typeof currentValue === 'object' && currentValue !== null) {
      YamlFile(currentValue, envVarName);
    } else {
      core.exportVariable(envVarName, currentValue);
      console.log(`${envVarName}=${currentValue}`);
    }
  }
}