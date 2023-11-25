-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;
SELECT uuid_generate_v4();

-- Create Users Table
CREATE TABLE IF NOT EXISTS public.users
(
    user_id    UUID      DEFAULT uuid_generate_v4() PRIMARY KEY,
    username   VARCHAR(255) NOT NULL UNIQUE,
    email      VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Passwords Table
CREATE TABLE IF NOT EXISTS public.passwords
(
    user_id       UUID PRIMARY KEY,
    password_hash VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.users (user_id) ON DELETE CASCADE
);

-- Create Wallets Table
CREATE TABLE IF NOT EXISTS public.wallets
(
    wallet_id   UUID           DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id     UUID         NOT NULL,
    wallet_name VARCHAR(255) NOT NULL,
    balance     DECIMAL(10, 2) DEFAULT 0.0,
    created_at  TIMESTAMP      DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public.users (user_id) ON DELETE CASCADE
);

--Create transaction_type
CREATE TYPE public.transaction_type as ENUM ('income', 'expense');

-- Create Transactions Table
CREATE TABLE IF NOT EXISTS public.transactions
(
    transaction_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    wallet_id        UUID             NOT NULL,
    amount           DECIMAL(10, 2)   NOT NULL,
    transaction_type public.transaction_type NOT NULL,
    description      VARCHAR(255),
    transaction_date TIMESTAMP        DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES public.wallets (wallet_id) ON DELETE CASCADE
);

-- Create Budgets Table
CREATE TABLE IF NOT EXISTS public.budgets
(
    budget_id  UUID      DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id    UUID           NOT NULL,
    category   VARCHAR(255)   NOT NULL,
    amount     DECIMAL(10, 2) NOT NULL,
    start_date DATE           NOT NULL,
    end_date   DATE           NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES public.users (user_id) ON DELETE CASCADE
);
