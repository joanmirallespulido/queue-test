Webhook Queue built for Outder using Node.js and MongoDB.

After x amount of time the app retrieves those webhooks with a status of pending and if they are due, the app attempts to get a 200 response from the server it is addressed to.

If succeeds, it marks the webhook entry´s status as success. Otheerwise it increases the attempts counter and sets the new Date as last_attempted.

If it reaches the maximum amount of attempts it is marked as error and won´t be attempted again.

This project was built for a microservice so it ensure to notify the main server about the completion of a payment.

