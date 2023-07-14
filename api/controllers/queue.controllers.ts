import { Request, Response } from "express";
import { RequestQueue } from "../helpers/queue.helpers";



export const createQueue = async (req: Request, res: Response) => {
    const queue = new RequestQueue();
    queue.enqueue('http://localhost:4001/webhook-mock', { key: 'value' });

    queue.process().then(() => {
        console.log('Queue processing completed');
    }).catch((error: any) => {
        console.error('An error occurred while processing the queue:', error);
    });

    console.log('LALALA im living my lifffe')

    return res.send('Queue created');
}