import GlobalTestDataEnum from '../data/global-test-data.enum';
import GlobalTestData from '../data/global-test-data.interface';
import { readValueFromGlobalTestDataFile } from '../data/global-test-data.util';

export async function waitForSignUp(): Promise<void> {
    const checkInterval = 500;
    return new Promise((resolve) => {
        const wait = () => {
            const isUserSignedUp = readValueFromGlobalTestDataFile(
                GlobalTestDataEnum.IS_USER_SIGNED_UP
            );
            if (isUserSignedUp) {
                console.log('\nsignedUp\n');
                resolve();
            } else {
                console.log(`\nisUserSignedUp: ${isUserSignedUp}\n`);
                setTimeout(wait, checkInterval);
            }
        };
        wait();
    });
}
