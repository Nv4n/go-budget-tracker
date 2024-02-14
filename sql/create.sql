-- Enable UUID extension (if not already enabled)
set search_path = extensions;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
SELECT uuid_generate_v4();

SELECT gen_random_uuid ();

-- Create Users Table
CREATE TABLE IF NOT EXISTS public.users
(
    user_id    UUID      DEFAULT extensions.uuid_generate_v4(),
    username   VARCHAR(256) NOT NULL UNIQUE,
    email      VARCHAR(256) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id)
);

-- Create Passwords Table
CREATE TABLE IF NOT EXISTS public.passwords
(
    user_id       UUID,
    password_hash VARCHAR(256) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.users (user_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id)
);

-- Create Wallets Table
CREATE TABLE IF NOT EXISTS public.wallets
(
    wallet_id   UUID           DEFAULT extensions.uuid_generate_v4(),
    user_id     UUID         NOT NULL,
    wallet_name VARCHAR(256) NOT NULL,
    balance     DECIMAL(10, 2) DEFAULT 0.0,
    created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public.users (user_id) ON DELETE CASCADE,
    PRIMARY KEY (wallet_id)
);

--Create transaction_type
CREATE TYPE public.transaction_type as ENUM ('income', 'expense');

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS public.transactions
(
    transaction_id   UUID      DEFAULT extensions.uuid_generate_v4(),
    wallet_id        UUID                    NOT NULL,
    amount           DECIMAL(10, 2)          NOT NULL,
    transaction_type public.transaction_type NOT NULL,
    category         VARCHAR(256)            NOT NULL,
    description      VARCHAR(256),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL ,
    FOREIGN KEY (wallet_id) REFERENCES public.wallets (wallet_id) ON DELETE CASCADE,
    PRIMARY KEY (transaction_id)
);

-- Create Budgets Table
CREATE TABLE IF NOT EXISTS public.budgets
(
    budget_id  UUID      DEFAULT extensions.uuid_generate_v4(),
    user_id    UUID           NOT NULL,
    category   VARCHAR(256)   NOT NULL,
    amount     DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public.users (user_id) ON DELETE CASCADE,
    PRIMARY KEY (budget_id),
    CONSTRAINT uq_uid_category UNIQUE (user_id, category)
);
