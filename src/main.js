import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import dotenv from 'dotenv';
import { JsonFile } from './file-types/json';
import { YamlFile } from './file-types/yaml';
import { EnvFile }  from './file-types/env';


export async function run() {
  const fileType = path.extname(core.getInput('file-path'));
  console.log(fileType);

  if (fileType === '.yaml' || fileType === '.yml') {
    YamlFile(yaml.load(fs.readFileSync(core.getInput('file-path'), 'utf8')));
  } else if (fileType === '.json') {
    JsonFile(JSON.parse(fs.readFileSync(core.getInput('file-path'), 'utf8')));
  } else if (fileType === '.env') {
    EnvFile(dotenv.parse(fs.readFileSync(core.getInput('file-path'))));
  } else {
    core.setFailed(`Unsupported file type: ${fileType}`);
  }
}