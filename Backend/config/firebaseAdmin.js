const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

let initialized = false;

function init() {
    if (initialized) return admin;
    // SERVICE_ACCOUNT_PATH env variable should point to the JSON key file
    const keyPath = process.env.SERVICE_ACCOUNT_PATH || path.join(__dirname, '..', 'serviceAccountKey.json');
    if (!fs.existsSync(keyPath)) {
        console.warn('Firebase service account key not found at', keyPath, ' — Firebase admin not initialized.');
        // return null to indicate admin is not configured
        return null;
    }
    const serviceAccount = require(keyPath);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    initialized = true;
    console.log('Firebase Admin initialized');
    return admin;
}

module.exports = init();
