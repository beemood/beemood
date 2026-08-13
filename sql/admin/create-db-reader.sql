CREATE USER sample_db_reader WITH PASSWORD 'password';

-- Grant CONNECT
GRANT CONNECT ON DATABASE sample_db TO sample_db_reader;

-- Grant USAGE
GRANT USAGE ON SCHEMA public TO sample_db_reader;

-- Grant SELECT
GRANT SELECT ON ALL TABLES IN SCHEMA public TO sample_db_reader;

-- Grant SELECT on specific tables
GRANT
SELECT ON public.table_1, public.table_2, public.table_3 TO sample_db_reader;

-- Grant INSERT
GRANT INSERT ON public.table_1,
public.table_2,
public.table_3 TO sample_db_reader;

-- Grant PERMISSION on SEQUENCES to autoincrement colums
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO beemood_app;

-- Grant INSERT, SELECT, UPDATE, DELETE
GRANT INSERT,
SELECT,
UPDATE, DELETE ON public.table_1, public.table_2, public.table_3 TO sample_db_reader;

-- Grant SELECT on all new tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT
SELECT ON ALL TABLES TO sample_db_reader;

-- Revoke CREATE
REVOKE CREATE ON SCHEMA public FROM sample_db_reader;

-- Allow USAGE on ALL existing schemas
GRANT USAGE ON ALL SCHEMAS IN SCHEMA sample_db TO sample_db_reader;

-- Allow SELECT on ALL tables in ALL existing schemas
GRANT
SELECT
    ON ALL TABLES IN ALL SCHEMAS IN SCHEMA sample_db TO sample_db_reader;