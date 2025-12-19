-- Fix infinite RLS recursion in enterprise_members and enterprises tables

-- Step 1: Create SECURITY DEFINER function to check enterprise admin status
CREATE OR REPLACE FUNCTION public.is_enterprise_admin(_user_id uuid, _enterprise_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM enterprise_members
    WHERE enterprise_id = _enterprise_id
    AND user_id = _user_id
    AND role = 'admin'
  )
$$;

-- Step 2: Fix enterprise_members RLS policies
DROP POLICY IF EXISTS "Enterprise admins can manage members" ON enterprise_members;
DROP POLICY IF EXISTS "Enterprise members can view their membership" ON enterprise_members;

CREATE POLICY "Enterprise admins can manage members"
ON enterprise_members FOR ALL
USING (public.is_enterprise_admin(auth.uid(), enterprise_id));

CREATE POLICY "Enterprise members can view their membership"
ON enterprise_members FOR SELECT
USING (auth.uid() = user_id);

-- Step 3: Fix enterprises RLS policies
DROP POLICY IF EXISTS "Enterprise admins can view their enterprise" ON enterprises;
DROP POLICY IF EXISTS "Admins can manage enterprises" ON enterprises;

CREATE POLICY "Enterprise members can view their enterprise"
ON enterprises FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM enterprise_members
    WHERE enterprise_id = enterprises.id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Enterprise admins can manage their enterprise"
ON enterprises FOR ALL
USING (public.is_enterprise_admin(auth.uid(), id));

CREATE POLICY "System admins can manage all enterprises"
ON enterprises FOR ALL
USING (has_role(auth.uid(), 'admin'));