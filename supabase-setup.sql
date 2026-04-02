-- ============================================================
-- INSTITUTO GÊNESIS EDUCACIONAL — Supabase Setup SQL
-- Execute este arquivo no SQL Editor do Supabase:
-- Dashboard → SQL Editor → New Query → Cole e execute
-- ============================================================

-- 1. Cria a tabela de registros de transparência
CREATE TABLE IF NOT EXISTS transparency_records (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  proponente      text,
  parlamentar     text,
  modalidade      text,
  objeto          text,
  orgao_concedente text,
  num_instrumento  text,
  num_emenda       text,
  ano_emenda       text,
  valor            text,
  valor_emenda     text,
  prestacao_contas text,
  created_at       timestamptz DEFAULT now()
);

-- 2. Habilita RLS
ALTER TABLE transparency_records ENABLE ROW LEVEL SECURITY;

-- 3. Qualquer visitante pode LER (página pública)
DROP POLICY IF EXISTS "Public read transparency_records" ON transparency_records;
CREATE POLICY "Public read transparency_records"
  ON transparency_records FOR SELECT
  USING (true);

-- 4. Apenas usuários autenticados (admin) podem ESCREVER
DROP POLICY IF EXISTS "Authenticated write transparency_records" ON transparency_records;
CREATE POLICY "Authenticated write transparency_records"
  ON transparency_records FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
