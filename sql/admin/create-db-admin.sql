CREATE USER sample_db_admin WITH PASSWORD 'password';

CREATE DATABASE sample_db;

ALTER DATABASE sample_db OWNER TO sample_db_admin;