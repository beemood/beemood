-- Create the user with password
CREATE USER beemood WITH PASSWORD 'password';

-- Create the database (owned by postgres by default)
CREATE DATABASE beemood;

-- Revoke default public creation permissions on the database
REVOKE ALL ON DATABASE beemood FROM PUBLIC;

-- Allow 'beemood' user to connect to the database
GRANT CONNECT, TEMP ON DATABASE beemood TO beemood;
