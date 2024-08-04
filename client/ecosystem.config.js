module.exports = {
  apps: [
    {
      name: 'nextjs-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 5000',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
