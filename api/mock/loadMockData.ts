import Webhook from "../models/Webhook";

export const loadMockData = async () => {
    let i = 0;

    // delete all entries
    await Webhook.deleteMany({});

    while (i < 10) {

        const webhook = new Webhook({
            endpoint: 'http://localhost:4001/webhook-mock',
            payload: 'payload',
            lastAttempt: new Date(),
            attempts: 0,
            status: 'pending',
            nextAttempt: new Date(),
            createdAt: new Date()
        });

        await webhook.save();
        i++;
    }
}