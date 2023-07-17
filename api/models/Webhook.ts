import { Schema, model } from 'mongoose';


const WebhookSchema = new Schema({

    endpoint: {
        type: String,
        required: true
    },

    payload: {
        type: String,
        required: true
    },

    lastAttempt: {
        type: Date,
        required: true
    },

    attempts: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        required: true
    },

    nextAttempt: {
        type: Date,

    },

    createdAt: {
        type: Date,
        required: true
    },

});


export default model('Webhook', WebhookSchema);