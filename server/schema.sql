-- Infinity Green Energy Supabase/PostgreSQL Production-Ready Schema (Improved)

-- Enable UUID extension (standard for Supabase)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Enums for Role & Statuses
CREATE TYPE public.user_role AS ENUM ('admin', 'employee', 'producer', 'consumer');
CREATE TYPE public.user_status AS ENUM ('Active', 'Inactive', 'Pending');
CREATE TYPE public.lead_status AS ENUM ('Pending Assignment', 'Assigned', 'In Contact', 'Proposal Sourced', 'Closed');
CREATE TYPE public.proposal_status AS ENUM ('Draft', 'Sent', 'Negotiation', 'Accepted', 'Rejected');
CREATE TYPE public.document_owner_type AS ENUM ('producer', 'consumer', 'employee');

-- 2. Profiles Table (Linked directly to Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    role public.user_role NOT NULL DEFAULT 'consumer',
    status public.user_status NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Employees Table
CREATE TABLE IF NOT EXISTS public.employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    manager_id UUID REFERENCES public.employees(id) ON DELETE SET NULL, -- Self-referential FK
    joining_date DATE NOT NULL DEFAULT CURRENT_DATE,
    status public.user_status NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Producers Table
CREATE TABLE IF NOT EXISTS public.producers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
    company_name VARCHAR(255) UNIQUE NOT NULL,
    technology VARCHAR(150) NOT NULL,
    capacity_mw NUMERIC(12,2) NOT NULL, -- Sizing in Megawatts
    state VARCHAR(100) NOT NULL,
    description TEXT,
    status public.user_status NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Consumers Table
CREATE TABLE IF NOT EXISTS public.consumers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
    company_name VARCHAR(255) UNIQUE NOT NULL,
    industry VARCHAR(150) NOT NULL,
    location VARCHAR(100) NOT NULL, -- State or City
    required_capacity_mw NUMERIC(12,2) NOT NULL, -- Capacity demand in Megawatts
    requirement_type VARCHAR(100) NOT NULL, -- e.g. "Open Access Grid PPA", "Onsite OPEX Solar"
    status public.user_status NOT NULL DEFAULT 'Active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    consumer_id UUID REFERENCES public.consumers(id) ON DELETE CASCADE,
    assigned_employee UUID REFERENCES public.employees(id) ON DELETE SET NULL,
    contact_person VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    monthly_bill NUMERIC(15,2) NOT NULL, -- Monthly electricity spend
    state VARCHAR(100) NOT NULL,
    industry VARCHAR(150) NOT NULL,
    status public.lead_status NOT NULL DEFAULT 'Pending Assignment',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Proposals Table
CREATE TABLE IF NOT EXISTS public.proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    producer_id UUID REFERENCES public.producers(id) ON DELETE CASCADE,
    consumer_id UUID REFERENCES public.consumers(id) ON DELETE CASCADE,
    assigned_employee UUID REFERENCES public.employees(id) ON DELETE SET NULL,
    price_per_unit NUMERIC(8,2) NOT NULL, -- Price per kWh / unit in PPA
    estimated_savings NUMERIC(15,2) NOT NULL, -- Estimated savings over contract
    contract_years INT NOT NULL, -- PPA lock-in period
    remarks TEXT,
    status public.proposal_status NOT NULL DEFAULT 'Draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Articles Table
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    published_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Documents Table
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    file_name VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    owner_type public.document_owner_type NOT NULL,
    producer_id UUID REFERENCES public.producers(id) ON DELETE CASCADE,
    consumer_id UUID REFERENCES public.consumers(id) ON DELETE CASCADE,
    employee_id UUID REFERENCES public.employees(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    CONSTRAINT chk_document_owner CHECK (
        (owner_type = 'producer' AND producer_id IS NOT NULL AND consumer_id IS NULL AND employee_id IS NULL) OR
        (owner_type = 'consumer' AND consumer_id IS NOT NULL AND producer_id IS NULL AND employee_id IS NULL) OR
        (owner_type = 'employee' AND employee_id IS NOT NULL AND producer_id IS NULL AND consumer_id IS NULL)
    )
);

-- 10. Activity Logs Table (Audit Tracking)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action VARCHAR(255) NOT NULL,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    ip_address VARCHAR(45), -- Supports IPv4 & IPv6
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. Add Proper Indexes
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_employees_profile_id ON public.employees(profile_id);
CREATE INDEX IF NOT EXISTS idx_employees_manager_id ON public.employees(manager_id);
CREATE INDEX IF NOT EXISTS idx_producers_profile_id ON public.producers(profile_id);
CREATE INDEX IF NOT EXISTS idx_consumers_profile_id ON public.consumers(profile_id);
CREATE INDEX IF NOT EXISTS idx_leads_consumer_id ON public.leads(consumer_id);
CREATE INDEX IF NOT EXISTS idx_leads_assigned_employee ON public.leads(assigned_employee);
CREATE INDEX IF NOT EXISTS idx_proposals_assigned_employee ON public.proposals(assigned_employee);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_documents_owner ON public.documents(owner_type);
CREATE INDEX IF NOT EXISTS idx_activity_logs_profile_id ON public.activity_logs(profile_id);

-- 12. Helper Trigger to Automatically Update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_employees_updated_at BEFORE UPDATE ON public.employees FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_producers_updated_at BEFORE UPDATE ON public.producers FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_consumers_updated_at BEFORE UPDATE ON public.consumers FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON public.articles FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();

-- 13. Supabase Trigger to Auto-Populate Profiles on Auth Sign Up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, role, status)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'consumer'),
        'Active'
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
