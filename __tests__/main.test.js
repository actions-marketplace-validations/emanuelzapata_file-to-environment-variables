import fs from 'fs';
import path from 'path';
import { log, error } from 'console';

jest.mock('@actions/core', () => ({
  getInput: jest.fn(),
  setFailed: jest.fn(),
  exportVariable: jest.fn(),
}));
jest.mock('@actions/github');

// Import after mocking
import { run } from '../src/main.js';
import * as core from '@actions/core';
import yaml from 'js-yaml';
import dotenv from 'dotenv';
import { JsonFile } from '../src/file-types/json.js';
import { YamlFile } from '../src/file-types/yaml.js';
import { EnvFile } from '../src/file-types/env.js';

const mockFs = fs;
const mockCore = core;
const mockYaml = yaml;
const mockDotenv = dotenv;
const mockJsonFile = JsonFile;
const mockYamlFile = YamlFile;
const mockEnvFile = EnvFile;

describe('Invalid File Type', () => {
  test('should catch and ignore with .txt file', async () => {
    mockCore.getInput.mockImplementation(() => '../resources/test_invalid.txt');
    await run();
  });
  test('should catch and ignore with .csv file', async () => {
    mockCore.getInput.mockImplementation(() => '../resources/test_invalid.csv');
    await run();
  });
});

describe('Yaml File Type', () => {
  let exportVariableMock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    exportVariableMock = jest.spyOn(core, 'exportVariable').mockImplementation();
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('should run with yaml file', async () => {
    // Use the actual YAML file from resources folder
    const yamlFilePath = path.join(__dirname, '../resources/test_yaml.yaml');
    mockCore.getInput.mockReturnValue(yamlFilePath);
    await run();
    log('test logging');
    expect(exportVariableMock).toHaveBeenCalledWith('APIVERSION', '0.2.3');
    expect(exportVariableMock).toHaveBeenCalledWith('APP_NAME', 'my-application');
    // expect(exportVariableMock).toHaveBeenCalledWith('version', '1.0.0');
  });
});

describe('Json File Type', () => {
  let exportVariableMock;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    exportVariableMock = jest.spyOn(core, 'exportVariable').mockImplementation();
  });

  afterEach(() => {
    console.log.mockRestore();
  });

  test('should run with json file', async () => {
    // Use the actual JSON file from resources folder
    const jsonFilePath = path.join(__dirname, '../resources/test_json.json');
    mockCore.getInput.mockReturnValue(jsonFilePath);
    await run();
  });
});

describe('Env File Type', () => {
  test('should process ENV file', async () => {
    // Use the actual JSON file from resources folder
    const envFilePath = path.join(__dirname, '../resources/test_env.env');
    mockCore.getInput.mockReturnValue(envFilePath);
    await run();

    expect(mockCore.getInput).toHaveBeenCalledWith('file-path');
    // Test will use actual file processing instead of mocked behavior
  });
})