import GlobalTestDataEnum from '../data/global-test-data.enum';
import GlobalTestData from '../data/global-test-data.interface';
import fs from 'fs';

const globalTestDataJsonFilePath = './test/data/global-test-data.json';

export function readValueFromGlobalTestDataFile(key: GlobalTestDataEnum) {
    const rawGlobalTestData = fs.readFileSync(globalTestDataJsonFilePath).toString();
    const parsedGlobalTestData = JSON.parse(rawGlobalTestData) as GlobalTestData;
    return parsedGlobalTestData[key];
}

export function writeValueToGlobalTestDataFile<K extends keyof GlobalTestData>(
    key: K,
    value: GlobalTestData[K]
): void {
    const rawGlobalTestData = fs.readFileSync(globalTestDataJsonFilePath).toString();
    const parsedGlobalTestData = JSON.parse(rawGlobalTestData) as GlobalTestData;
    parsedGlobalTestData[key] = value;
    const stringifiedGlobalTestData = JSON.stringify(parsedGlobalTestData);
    fs.writeFileSync(globalTestDataJsonFilePath, stringifiedGlobalTestData);
}
