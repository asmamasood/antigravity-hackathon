const admin = require('firebase-admin');
const { FIREBASE } = require('../config/environment');
const logger = require('../utils/logger');

class FirebaseService {
  constructor() {
    this.db = null;
    this.isInitialized = false;

    if (FIREBASE.PROJECT_ID && FIREBASE.CLIENT_EMAIL && FIREBASE.PRIVATE_KEY) {
      try {
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: FIREBASE.PROJECT_ID,
            clientEmail: FIREBASE.CLIENT_EMAIL,
            privateKey: FIREBASE.PRIVATE_KEY,
          })
        });
        this.db = admin.firestore();
        this.isInitialized = true;
        logger.info("Firebase Firestore Initialized");
      } catch (error) {
        logger.error(`Firebase Initialization Error: ${error.message}`);
      }
    } else {
      logger.warn("Firebase credentials missing. Running in Mock Mode.");
    }
  }

  async save(collection, data) {
    if (!this.isInitialized) {
      logger.info(`[MOCK DB] Saved to ${collection}: ${JSON.stringify(data).substring(0, 50)}...`);
      return { id: 'mock-' + Date.now() };
    }

    try {
      const docRef = await this.db.collection(collection).add({
        ...data,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      return { id: docRef.id };
    } catch (error) {
      logger.error(`Firestore Save Error: ${error.message}`);
      throw error;
    }
  }

  async getLatest(collection, limit = 10) {
    if (!this.isInitialized) return [];
    try {
      const snapshot = await this.db.collection(collection)
        .orderBy('createdAt', 'desc')
        .limit(limit)
        .get();
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      logger.error(`Firestore Fetch Error: ${error.message}`);
      return [];
    }
  }
}

module.exports = new FirebaseService();
