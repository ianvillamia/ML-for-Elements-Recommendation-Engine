import * as functions from 'firebase-functions';

import { google } from 'googleapis';
const ml = google.ml('v1')

export const predictHappiness = functions.https.onRequest(async (request, response) => {

    const instances = request.body.instances;
    const model = request.body.model;
    try {
        const { credential } = await google.auth.getApplicationDefault();
        const modelName = `projects/final-elements/models/${model}`;

        const preds = await ml.projects.predict({
            auth: credential,
            name: modelName,
            requestBody: {
                instances
            }
        } as any);

        response.send(JSON.stringify(preds.data));

    } catch (e) {
        response.send(e);
        console.log(e);
    }

});
