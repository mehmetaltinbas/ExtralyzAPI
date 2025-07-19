import { TestDataKeys } from './test-data-keys.enum';
import { TestData } from './test-data.interface';
import fs from 'fs';

const testDataJsonFilePath = './test/data/test-data.json';
function readAndParseData(): TestData {
    const rawGlobalTestData = fs.readFileSync(testDataJsonFilePath).toString();
    const parsedGlobalTestData = JSON.parse(rawGlobalTestData) as TestData;
    return parsedGlobalTestData;
}

function read(key: TestDataKeys): TestData[TestDataKeys] {
    const testData = readAndParseData();
    return testData[key];
}

function write<K extends keyof TestData>(key: K, value: TestData[K]): void {
    const testData = readAndParseData();
    testData[key] = value;
    const stringifiedTestData = JSON.stringify(testData);
    fs.writeFileSync(testDataJsonFilePath, stringifiedTestData);
}

function reset(): void {
    let testData = readAndParseData();
    testData = {
        isUserSignedUp: false,
        jwt: '',
        isJwtReady: false,
    };
    const stringifiedTestData = JSON.stringify(testData);
    fs.writeFileSync(testDataJsonFilePath, stringifiedTestData);
}

export default {
    read,
    write,
    reset,
};
