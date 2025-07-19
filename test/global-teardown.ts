import { closeApp } from './app-setup';

export default async function globalTeardown() {
    await closeApp();
}
