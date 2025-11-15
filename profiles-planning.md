# Planejamento: Perfis Pré-Configurados e Sistema Médico

## 1. Perfis Pré-Configurados

### Perfil 1: Motorista Profissional
- **Descrição**: Dirige longas distâncias, especialmente à noite
- **Respostas**:
  - Q1: Ver bem de longe (dirigir, TV, paisagens)
  - Q2: Pouco (menos de 2 horas por dia)
  - Q3: Sim, frequentemente
  - Q4: Não tenho astigmatismo
  - Q5: Melhor qualidade visual possível
  - Q6: Sim, sou muito sensível
  - Q7: Moderadamente ativo
- **Recomendação esperada**: TECNIS Asférica, BVI ISOPURE (monofocais asféricas)

### Perfil 2: Cirurgião/Dentista
- **Descrição**: Precisa de visão intermediária e de perto para procedimentos
- **Respostas**:
  - Q1: Ver bem no computador (distância intermediária)
  - Q2: Muito (mais de 6 horas por dia)
  - Q3: Ocasionalmente
  - Q4: Não tenho astigmatismo
  - Q5: Equilíbrio entre qualidade e independência
  - Q6: Um pouco sensível
  - Q7: Muito ativo
- **Recomendação esperada**: Alcon Vivity, TECNIS PureSee, BIOTECH XTENSE (EDOF)

### Perfil 3: Professor/Escritor
- **Descrição**: Trabalha muito com leitura e computador
- **Respostas**:
  - Q1: Ver bem de perto (leitura, celular)
  - Q2: Muito (mais de 6 horas por dia)
  - Q3: Não dirijo ou raramente à noite
  - Q4: Não tenho astigmatismo
  - Q5: Independência total de óculos
  - Q6: Não me incomoda
  - Q7: Moderadamente ativo
- **Recomendação esperada**: Hanita FullRange, Hanita Intensity (multifocal/trifocal)

### Perfil 4: Aposentado Ativo
- **Descrição**: Viaja, pratica esportes, quer independência total
- **Respostas**:
  - Q1: Ver bem em todas as distâncias
  - Q2: Moderado (2-6 horas por dia)
  - Q3: Ocasionalmente
  - Q4: Não tenho astigmatismo
  - Q5: Independência total de óculos
  - Q6: Não me incomoda
  - Q7: Muito ativo
- **Recomendação esperada**: Hanita Intensity, Hanita FullRange (trifocal/multifocal)

### Perfil 5: Paciente com Astigmatismo
- **Descrição**: Tem astigmatismo e precisa de correção
- **Respostas**:
  - Q1: Ver bem de longe (dirigir, TV, paisagens)
  - Q2: Moderado (2-6 horas por dia)
  - Q3: Sim, frequentemente
  - Q4: Sim, tenho astigmatismo
  - Q5: Melhor qualidade visual possível
  - Q6: Sim, sou muito sensível
  - Q7: Moderadamente ativo
- **Recomendação esperada**: TECNIS Toric ZCT (tórica)

### Perfil 6: Executivo/Empresário
- **Descrição**: Trabalha com computador, reuniões, viagens
- **Respostas**:
  - Q1: Ver bem no computador (distância intermediária)
  - Q2: Muito (mais de 6 horas por dia)
  - Q3: Ocasionalmente
  - Q4: Não tenho astigmatismo
  - Q5: Equilíbrio entre qualidade e independência
  - Q6: Um pouco sensível
  - Q7: Muito ativo
- **Recomendação esperada**: Alcon Vivity, TECNIS PureSee (EDOF)

---

## 2. Sistema de Armazenamento

### Estrutura de Dados (localStorage)

```typescript
interface QuizResult {
  id: string;              // Código único de 6 dígitos (ex: "A3K9M2")
  timestamp: number;       // Data/hora da conclusão
  profileName?: string;    // Nome do perfil (se foi pré-configurado)
  patientName?: string;    // Nome do paciente (opcional)
  answers: Record<number, QuizOption>;  // Respostas completas
  scores: QuizScores;      // Pontuações calculadas
  recommendations: LensRecommendation[];  // Top 3 lentes recomendadas
}

// Armazenamento no localStorage
const STORAGE_KEY = "quiz_results";
localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
```

### Geração de Código Único

- Formato: 6 caracteres alfanuméricos (ex: A3K9M2, B7H4N1)
- Evitar caracteres confusos: O/0, I/1, S/5
- Caracteres permitidos: A-Z (exceto O, I) + 2-9
- Total de combinações: ~10 milhões
- Verificar unicidade antes de gerar

### Funcionalidades do Painel Médico

1. **Busca por Código**
   - Input de 6 dígitos
   - Validação em tempo real
   - Busca no localStorage

2. **Visualização de Resultados**
   - Perfil do paciente
   - Respostas do questionário
   - Lentes recomendadas com justificativas
   - Data/hora da avaliação

3. **Lista de Resultados Salvos**
   - Histórico de todos os códigos
   - Ordenação por data (mais recente primeiro)
   - Filtros por perfil/data

4. **Exportação em PDF**
   - Cabeçalho com logo e informações
   - Respostas do questionário
   - Lentes recomendadas com imagens
   - Disclaimer médico
   - Código único para referência

---

## 3. Fluxo de Uso

### Fluxo do Paciente

1. Acessa o Portal (/)
2. Opções:
   - "Responder Questionário" → preenche 7 perguntas
   - "Testar Perfil" → seleciona perfil pré-configurado
3. Completa questionário
4. Vê resultados personalizados
5. Recebe código único (ex: A3K9M2)
6. Compartilha código com médico (WhatsApp, email, papel)

### Fluxo do Médico

1. Acessa /medico
2. Insere código do paciente (6 dígitos)
3. Visualiza resultados completos
4. Opções:
   - Exportar PDF para prontuário
   - Ver histórico de outros pacientes
   - Comparar perfis

---

## 4. Implementação Técnica

### Componentes a Criar

1. **ProfileSelector.tsx**
   - Modal com cards de perfis
   - Descrição e ícone para cada perfil
   - Botão "Selecionar" que preenche o questionário automaticamente

2. **QuizResults.tsx (atualizar)**
   - Adicionar geração de código único após calcular recomendações
   - Salvar resultado no localStorage
   - Exibir código em destaque para o paciente
   - Botão "Copiar Código" e "Compartilhar"

3. **DoctorPanel.tsx**
   - Página /medico
   - Input de busca por código
   - Lista de resultados salvos
   - Visualização detalhada

4. **ResultViewer.tsx**
   - Componente reutilizável para exibir resultados
   - Usado em QuizResults e DoctorPanel
   - Suporta modo "paciente" e "médico"

### Utilitários

1. **codeGenerator.ts**
   - Função para gerar código único
   - Validação de unicidade
   - Formato: LLNNLL (L=letra, N=número)

2. **storageManager.ts**
   - CRUD para localStorage
   - Salvar resultado
   - Buscar por código
   - Listar todos
   - Limpar histórico

3. **pdfExporter.ts**
   - Gerar PDF dos resultados
   - Layout profissional
   - Incluir imagens das lentes

---

## 5. Considerações de UX

- **Privacidade**: Dados armazenados localmente (localStorage)
- **Segurança**: Código único não contém informações pessoais
- **Acessibilidade**: Código fácil de digitar (6 caracteres)
- **Compartilhamento**: Múltiplas opções (copiar, WhatsApp, email)
- **Persistência**: Dados mantidos até limpeza manual do navegador
- **Backup**: Sugerir ao médico exportar PDF como backup
