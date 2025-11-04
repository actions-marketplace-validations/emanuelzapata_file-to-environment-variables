import * as core from '@actions/core';

export async function EnvFile(fileContent) {
  for (const key in fileContent) {
    console.log(`${key}=${fileContent[key]}`);
    core.exportVariable(key, fileContent[key]);
  }
}