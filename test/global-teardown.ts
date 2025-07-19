import { closeApp } from './app-setup';
import testData from './data/test-data.util';

export default async function globalTeardown(): Promise<void> {
    await closeApp();
    testData.reset();
}
