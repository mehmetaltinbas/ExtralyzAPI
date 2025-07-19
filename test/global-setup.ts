import { getAppInstance } from './app-setup';
import { initModels, cleanDb } from '../src/db/db-models.provider';
import mongoose from 'mongoose';

export default async function globalSetup() {
    await getAppInstance();
    initModels(mongoose);
    await cleanDb();
}
