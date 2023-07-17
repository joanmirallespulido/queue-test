import axios from "axios";
import Webhook from "./models/Webhook"
import { WebhookConfig } from "./config";

function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export const webHookQueue = async () => {


    while (true) {
        console.log('bucle')
        const webhooks = await Webhook.find({ status: 'pending' });

        if (webhooks.length == 0) {
            await sleep(2000);
            continue;
        }

        // const webhook = webhooks[0];
        console.log('GO')
        webhooks.forEach(async (webhook: any) => {

            if (webhook.attempts >= 5) {
                webhook.status = 'error';
                await webhook.save();
            }
            try {

                if (webhook.nextAttempt < new Date()) {

                    const resp = await axios.post(webhook.endpoint, {
                        payload: webhook.payload
                    });
                    console.log(resp.data)
                    if (resp.data == true) {
                        webhook.status = 'success';
                        webhook.lastAttempt = new Date();
                        webhook.nextAttempt = new Date();
                        webhook.attempts = webhook.attempts + 1;
                        await webhook.save();
                    }

                }

            } catch (error: any) {
                // console.log(error)
                webhook.status = 'pending';
                webhook.lastAttempt = new Date();
                webhook.nextAttempt = new Date(new Date().getTime() + WebhookConfig.retry[webhook.attempts]);
                webhook.attempts = webhook.attempts + 1;
                await webhook.save();

            }

        });


        await sleep(3000);

    }
}