-- Seed data for travel_db
-- Run this after starting the backend for the first time

USE travel_db;

-- Insert sample tour packages
INSERT INTO travel_package (name, duration, price) VALUES
('Beach Paradise', '5 Days / 4 Nights', 1299.99),
('Mountain Adventure', '7 Days / 6 Nights', 1899.99),
('Luxury City Tour', '10 Days / 9 Nights', 3499.99),
('Island Hopping', '6 Days / 5 Nights', 1599.99),
('Cultural Heritage', '8 Days / 7 Nights', 2199.99);
