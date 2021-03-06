const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true  });

requireDir('./src/models');

app.use('/api', require('./src/Routers'));
app.listen(process.env.PORT || 3001);

