const fs = require('fs').promises;
const { spawn } = require('child_process');

const MAX_TIMEOUT = 50000;  // 50 seconds

const installDependencies = async fileName => {
    // Parse JSON file to get dependencies
    const dependenciesDataString = await fs.readFile(fileName);
    const dependenciesDataJSON = JSON.parse(dependenciesDataString);
    
    // Create dependency array with version
    const keys = Object.keys(dependenciesDataJSON.Dependencies);
    const allDepdendencies = [] ;
    if (dependenciesDataJSON.Dependencies && keys.length !== 0) {
        keys.forEach((key) => allDepdendencies.push(`${key}==${dependenciesDataJSON.Dependencies[key]}`));
    }
    
    // Create promise for each dependency
    const allPromises = allDepdendencies.map( dependency => {
        return new Promise((resolve, reject) => {
            const dependencyName = dependency.split("==")[0];
            console.log(`Installing ${dependency}.......`);
            
            // Set maximum timeout
            const timerId = setTimeout(() => {
                console.log(`Time exceeded for ${dependencyName}`);
                reject(dependencyName);
            }, MAX_TIMEOUT);

            // Create child process
            const child = spawn('python3', ['-m', 'pip', 'install', dependency]);
            child.on('close', (exitCode) => {
                if (exitCode == 0) {
                    console.log(`Installation of ${dependencyName} succeded`);
                    clearTimeout(timerId);
                    resolve();
                } 
                else if (exitCode == 1)  {
                    console.log(`Installation of ${dependencyName} failed`);
                    clearTimeout(timerId);
                    reject(dependencyName);
                }
                else{
                    console.log(`Installation of ${dependencyName} failed`);
                    reject(dependencyName);
                }
            });
        });
    })
    
    // Asynchronously run all promises in parallel
    const promiseResponses = await Promise.allSettled(allPromises);
    
    // Store all failed dependencies
    const failedDependencies = [];
    promiseResponses.forEach((response) => {
        if (response.status === 'rejected') {
            failedDependencies.push(response.reason);
        }
    })

    return failedDependencies;
}

const driver = async () => {
    // Get the filename from command line
    const fileName = process.argv[2];

    // Install and filter failed dependencies 
    let failedDependencies = await installDependencies(fileName);

    // Log the status
    if (failedDependencies.length) {
        console.log(`\nFailed to install: ${failedDependencies.join(', ')}`);
        process.exit(1);
    }
    else {
        console.log('\nSuccessfully installed all dependencies');
    }
}

driver();

