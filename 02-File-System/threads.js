// Number of threads in a machine is equal to number of CPU Cores of that system

const os = require("os");

console.log(os.cpus().length);
