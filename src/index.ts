import { exec } from 'child_process';
import dotenv from 'dotenv';
dotenv.config({ path: './env/.env'});
const parallelValue= process.env.PARALLEL || '1';
const retryValue= process.env.RETRY || '0';

const common = `src/features/**/*.feature \
--require-module ts-node/register \
--require src/step-definitions/**/*.ts \
--require src/utils/cucumber-timeout.ts \
--format json:./cucumber-report/report.json \
-- parallel ${parallelValue} \
--retry ${retryValue} \
`;

interface ProfileCommands {
    [key: string]: string;
}

const profiles: ProfileCommands = {
    smoke: `${common} --tags "@smoke"`,
    regression: `${common} --tags "@regression"`,
    login: `${common} --tags "@login"`,
    contactUs: `${common} --tags "@contact-us"`,
};

const profile = process.argv[2];
let command = `npx cucumber-js ${profiles[profile as 'smoke' | 'regression' | 'login' | 'contact-us']}`;

exec(command, { encoding: 'utf-8' }, (error: Error | null, stdout: string, stderr: string) => {
    if (stdout) {
        console.log(stdout);
    }
    if (stderr) {
        console.error(stderr);
    }

    if (error) {
        console.log(`Error executing command: ${error.message}`);
        throw new Error('Some automation tests have failed');
    }
});
