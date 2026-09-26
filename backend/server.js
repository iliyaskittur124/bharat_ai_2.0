require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase Client (if keys are available)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('Supabase client initialized');
}

// Basic Health Check Route
app.get('*/api/health', (req, res) => {
  res.json({ status: 'active', message: 'BHARAT AI Backend is running' });
});

// Simulation Route (What-If Engine Mock)
app.post('*/api/simulate', (req, res) => {
  const { rainfall, region } = req.body;
  
  // Deterministic Mock Logic based on prompt rules
  let floodRisk = 'NORMAL';
  let trafficDisruption = 'NORMAL';
  let infrastructureRisk = 'NORMAL';

  if (rainfall >= 150) {
    floodRisk = 'MEDIUM';
    trafficDisruption = 'MEDIUM';
    infrastructureRisk = 'LOW';
  }
  
  if (rainfall >= 200) {
    floodRisk = 'HIGH';
    trafficDisruption = 'HIGH';
    infrastructureRisk = 'MEDIUM';
  }

  res.json({
    scenario: {
      region: region || 'INDIA',
      baseline: 100,
      simulated: rainfall
    },
    impacts: {
      floodRisk,
      trafficDisruption,
      infrastructureRisk,
      emergencyAccess: floodRisk === 'HIGH' ? 'MEDIUM' : 'NORMAL'
    },
    confidence: 72,
    dataStatus: 'LIVE SERVER'
  });
});

// Get Active Risks
app.get('*/api/risks', async (req, res) => {
  // If we have supabase connected, we could fetch real data here
  // For now, we return the seeded data specified in the prompt
  res.json([
    { id: 1, title: 'Severe Heavy Rainfall', region: 'Maharashtra', severity: 'CRITICAL', confidence: 85 },
    { id: 2, title: 'Water Stress Warning', region: 'Karnataka', severity: 'HIGH', confidence: 78 },
    { id: 3, title: 'Infrastructure Vulnerability', region: 'Gujarat', severity: 'HIGH', confidence: 72 }
  ]);
});

app.listen(port, () => {
  console.log(`BHARAT AI Backend listening on port ${port}`);
});
