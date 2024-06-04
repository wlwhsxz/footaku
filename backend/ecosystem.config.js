module.exports = {
  apps : [{
    name: 'footaku-dev',	  
    script: 'cd src && nodemon index.js',
    instances: 1,
    watch: 'false',
    env: {
        NODE_ENV: 'development',
    },
  }, {
    name: 'footaku-production',
    script: 'node src/index.js',
    instances: -1,
    autorestart: false,
    watch: false,
    env_production: {
        NODE_ENV: 'production',
        PORT: 8000,
    },
  }],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
