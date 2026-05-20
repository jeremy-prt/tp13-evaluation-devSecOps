const express = require('express');
const os = require('os');
const promClient = require('prom-client');

const app = express();

const port = process.env.PORT || 3000; // jamais de val sensible dans le fallback
const pet = process.env.PET || 'inconnu';

let compteur = 0;

promClient.collectDefaultMetrics();

app.get('/', (req, res) => {
  compteur++;
  res.json({
    hostname: os.hostname(),
    pet: pet,
    compteur: compteur,
  });
});

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

app.listen(port, () => {
  console.log(`API ${pet} demarree sur le port ${port}`);
});
