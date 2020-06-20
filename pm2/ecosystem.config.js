process.env.NODE_CONFIG_STRICT_MODE = true;

const path = require('path');
const pkg  = require('../package.json');
require('dotenv').config({ path: process.env.ENV_PATH || path.resolve(process.cwd(), '.env') });

module.exports = {
    apps : [{
        name: pkg.name,
        script: path.join(__dirname, '../server.js'),
        cwd: path.join(__dirname, '../'),
        exec_mode: 'cluster',
        instances: 0,
        max_memory_restart: '1G',
        pid_file: path.join(__dirname, 'server.pid'),
        source_map_support: true,
        wait_ready: false, // wait for `process.send('ready')` in application
        listen_timeout: 5000,
        kill_timeout: 2000, // ms
        watch: false,
        autorestart: true,
        min_uptime: 1000, // ms
        max_restarts: 4, // Number of times a script is restarted when it exits in less than min_uptime

        instance_var: 'INSTANCE_ID', // For example, if you want to run a cronjob only on one cluster, you can check: if process.env.NODE_APP_INSTANCE === 0
        // env: {},
        // increment_var : 'PORT',
        env_production: {
            // PORT: Number(process.env.PORT),
            NODE_ENV: 'production',
        },
        merge_logs: true, // merge logs in cluster mode
        log_type: 'json',
        output: (process.env.LOGS_PATH ? path.join(process.env.LOGS_PATH, 'pm2.out.log') : path.join(__dirname, '../logs/pm2.out.log')), // is only standard output (console.log)
        error: (process.env.LOGS_PATH ? path.join(process.env.LOGS_PATH, 'pm2.error.log') : path.join(__dirname, '../logs/pm2.error.log')), // is only error output (console.error)
        // log: './logs/pm2.combined.outerr.log', // combines output and error, disabled by default
    }],
    deploy: {
        development: {},
        staging: {},
        production: {
            env: {
                NODE_ENV: 'production'
            },
            // SSH key path, default to $HOME/.ssh
            // key: '/path/to/some.pem',
            // SSH user
            user: 'admin',
            // SSH host
            host: ['109.68.213.78'],
            // SSH options with no command-line flag, see 'man ssh'
            // can be either a single string or an array of strings
            ssh_options: ['StrictHostKeyChecking=no'/*, 'PasswordAuthentication=no'*/],
            // GIT remote/branch
            ref: 'origin/master',
            // GIT remote
            repo: 'https://github.com/koalex/vki-ngu-node.git',
            // path in the server
            path: '/home/admin/www',
            // Pre-setup command or path to a script on your local machine
            // 'pre-setup': 'apt-get install git ; ls -la',
            // Post-setup commands or path to a script on the host machine
            // eg: placing configurations in the shared dir etc
            'post-setup': 'npm install',
            // pre-deploy action
            // 'pre-deploy-local': 'echo \'This is a local executed command\'',
            // post-deploy action
            'post-deploy': 'pm2 startOrReload pm2/ecosystem.config.js --env production'
        }
    }
};
