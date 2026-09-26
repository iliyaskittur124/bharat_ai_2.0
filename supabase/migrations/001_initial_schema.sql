-- BHARAT AI Initial Schema

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- For geospatial data

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Geographies Table
CREATE TABLE geographies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- country, state, district, city, zone
    parent_id UUID REFERENCES geographies(id),
    geom GEOMETRY(Geometry, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Risk Events Table
CREATE TABLE risk_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    domain VARCHAR(100) NOT NULL, -- weather, water, mobility, etc.
    geography_id UUID REFERENCES geographies(id),
    severity VARCHAR(50) NOT NULL, -- normal, medium, high, critical
    confidence FLOAT,
    data_status VARCHAR(50) DEFAULT 'LIVE', -- LIVE, HISTORICAL, SEEDED, SIMULATED
    time_window_start TIMESTAMP WITH TIME ZONE,
    time_window_end TIMESTAMP WITH TIME ZONE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Scenarios Table
CREATE TABLE scenarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    base_geography_id UUID REFERENCES geographies(id),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Scenario Inputs Table
CREATE TABLE scenario_inputs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    scenario_id UUID REFERENCES scenarios(id),
    domain VARCHAR(100) NOT NULL,
    parameter VARCHAR(100) NOT NULL,
    baseline_value FLOAT,
    scenario_value FLOAT,
    unit VARCHAR(50)
);

-- Watchlists Table
CREATE TABLE watchlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    geography_id UUID REFERENCES geographies(id),
    domain VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Missions Table
CREATE TABLE missions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    points INT DEFAULT 0,
    type VARCHAR(100),
    geography_id UUID REFERENCES geographies(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data (Example)
INSERT INTO geographies (name, type) VALUES ('India', 'country') ON CONFLICT DO NOTHING;
-- ... more seed data can be added here ...

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE geographies ENABLE ROW LEVEL SECURITY;
ALTER TABLE risk_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." ON users FOR SELECT USING (true);
CREATE POLICY "Geographies are viewable by everyone." ON geographies FOR SELECT USING (true);
CREATE POLICY "Risk events are viewable by everyone." ON risk_events FOR SELECT USING (true);
CREATE POLICY "Scenarios are viewable by everyone." ON scenarios FOR SELECT USING (true);
CREATE POLICY "Users can manage their own watchlists." ON watchlists FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Missions are viewable by everyone." ON missions FOR SELECT USING (true);
