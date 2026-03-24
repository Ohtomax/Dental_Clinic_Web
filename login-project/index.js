const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const serviceAccount = require('./dentalclinicproject-50c18-firebase-adminsdk-fbsvc-14abf22bd8.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount) // ✅ fix 1
});

const interactWithDb = admin.firestore();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, pass } = req.body;

    const userRecord = await admin.auth().createUser({
      email: email,        // ✅ fix 2
      password: pass,
      displayName: name
    });

    await interactWithDb.collection('users').doc(userRecord.uid).set({
      name: name,
      email: email,
      createdAt: admin.firestore.FieldValue.serverTimestamp() // ✅ fix 3
    });

    res.status(201).send({ message: 'Successfully Registered!', uid: userRecord.uid });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).send({ error: 'No token provided' });

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Invalid or expired token' });
  }
};

app.get('/api/profile', verifyToken, async (req, res) => {
  try {
    const userDoc = await interactWithDb.collection('users').doc(req.user.uid).get(); // ✅ fix 4
    res.send(userDoc.data());
  } catch (error) {
    console.log('FULL ERROR:', error);
    res.status(500).send({ error: error.message });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));