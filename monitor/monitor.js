'use strict';

const fs = require('fs');
const Docker = require('dockerode');

const FILE_NAME = './test'; // config file to monitor
const SERVICE_NAME = 'app'; // docker-compose service name
const SVC_FILTER = `com.docker.compose.service=${SERVICE_NAME}`;
const DOCKER_SOCK = '/var/run/docker.sock';

const docker = new Docker({ socketPath : DOCKER_SOCK });

fs.watchFile(FILE_NAME, (curr, prev) => {
    // restart container of specified service name
    console.log('file modified');
    restartContainer();
});

function restartContainer() {
    docker.listContainers({
        filters : {
            // filter out docker compose service
            label : [ SVC_FILTER ]
        }
    }).then(results => results.map(container => {
        console.log(`[SERVICE=${SERVICE_NAME}] Restarting container ${container.Id}`);
        // restart container
        docker.getContainer(container.Id).restart();
    })).catch(err => console.error(err));
}
