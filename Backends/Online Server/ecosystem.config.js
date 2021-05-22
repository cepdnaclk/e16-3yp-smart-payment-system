module.exports = {
    apps: [
      {
        name: 'NodeServer',
        exec_mode: 'cluster',
        instances: 'max', // Or a number of instances
        script: "./node_modules/.bin/nodemon src/index.js",
        args: 'start'
      }
    ]
}