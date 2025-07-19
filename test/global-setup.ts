import { getAppInstance } from './app-setup';
import { initModels, cleanDb } from '../src/db/db-models.provider';
import mongoose from 'mongoose';
import testData from './data/test-data.util';

export default async function globalSetup(): Promise<void> {
    await getAppInstance();
    initModels(mongoose);
    await cleanDb();
    testData.reset();
}
