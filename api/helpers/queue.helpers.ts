

const axios = require('axios');

const MAX_RETRIES = 10;
const WAIT_TIME = 2000; // Customizable time between requests in milliseconds

export class RequestQueue {

    queue: never[];
    done: boolean;

    constructor() {
        this.queue = [];
        this.done = false;
    }

    enqueue(endpoint: any, data: any) {
        this.queue.push({ endpoint, data } as never);
    }

    async process() {
        while (this.queue.length > 0 && !this.done) {
            const { endpoint, data }: any = this.queue.shift(); // Dequeue the request
            console.log('Processing request:', endpoint, data)
            let retries = 0;
            while (retries < MAX_RETRIES) {
                try {
                    const response = await this.makeRequest(endpoint, data); // Make the request

                    if (response.status === 200) {
                        console.log('Request succeeded:', response.data);
                        this.done = true;
                        break;
                    }

                    retries++;
                } catch (error: any) {
                    console.log('Request failed. Retrying in', WAIT_TIME / 1000, 'seconds...');
                    await this.sleep(WAIT_TIME);
                    console.log('An error occurred:', error.message);
                    retries++;
                }
            }

            if (retries === MAX_RETRIES) {
                console.log('Max retries exceeded. Request failed');
            }
        }
    }

    makeRequest(endpoint: any, data: any) {
        const options = {
            method: 'GET',
            url: endpoint,
            data,
        };

        return axios(options);
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
