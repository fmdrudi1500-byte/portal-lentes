# Questionário de Indicação de Lentes - Planejamento

## Objetivo
Criar um questionário validado clinicamente que ajude pacientes a identificar as lentes intraoculares mais adequadas para suas necessidades visuais e estilo de vida.

## Estrutura das Perguntas

### 1. Principal Necessidade Visual
**Pergunta:** "Qual é sua principal necessidade visual após a cirurgia?"
- Opção A: Ver bem de longe (dirigir, TV, paisagens) → +3 Monofocal
- Opção B: Ver bem de perto (leitura, celular) → +2 Multifocal/Trifocal
- Opção C: Ver bem no computador (distância intermediária) → +3 EDOF
- Opção D: Ver bem em todas as distâncias → +5 Multifocal/Trifocal

### 2. Uso de Computador/Leitura
**Pergunta:** "Com que frequência você trabalha com computador ou faz leituras prolongadas?"
- Opção A: Muito (mais de 6h/dia) → +4 EDOF, +2 Multifocal
- Opção B: Moderado (2-6h/dia) → +3 EDOF, +3 Multifocal
- Opção C: Pouco (menos de 2h/dia) → +2 Monofocal

### 3. Direção Noturna
**Pergunta:** "Você dirige à noite com frequência?"
- Opção A: Sim, frequentemente → +5 Monofocal Asférica, +3 EDOF, -2 Multifocal
- Opção B: Ocasionalmente → +2 EDOF, +1 Monofocal Asférica
- Opção C: Não dirijo ou raramente → +3 Multifocal/Trifocal

### 4. Astigmatismo
**Pergunta:** "Você tem astigmatismo? (seu médico informou ou você usa óculos para astigmatismo)"
- Opção A: Sim → FLAG: Recomendar lentes TÓRICAS
- Opção B: Não → Lentes normais
- Opção C: Não sei → Sugerir avaliação + lentes normais

### 5. Prioridade Principal
**Pergunta:** "Qual é sua maior prioridade?"
- Opção A: Independência total de óculos → +5 Multifocal/Trifocal
- Opção B: Melhor qualidade visual possível → +5 Monofocal Asférica, +3 EDOF
- Opção C: Equilíbrio entre qualidade e independência → +4 EDOF
- Opção D: Custo-benefício → +3 Monofocal

### 6. Sensibilidade a Halos/Glare
**Pergunta:** "Você se incomoda facilmente com halos ou brilhos ao redor de luzes à noite?"
- Opção A: Sim, muito sensível → +5 Monofocal Asférica, +2 EDOF, -3 Multifocal
- Opção B: Um pouco → +3 EDOF, +1 Monofocal
- Opção C: Não me incomoda → +3 Multifocal/Trifocal

### 7. Estilo de Vida
**Pergunta:** "Como você descreveria seu estilo de vida?"
- Opção A: Muito ativo (esportes, viagens, atividades variadas) → +4 Multifocal/Trifocal
- Opção B: Moderadamente ativo → +3 EDOF, +2 Multifocal
- Opção C: Mais caseiro/rotina tranquila → +2 Monofocal, +2 EDOF

## Algoritmo de Recomendação

### Sistema de Pontuação por Categoria

**Categorias de Lentes:**
1. **Monofocal Asférica** (TECNIS Asférica, BVI ISOPURE)
2. **Monofocal Tórica** (TECNIS Toric ZCT) - se astigmatismo
3. **EDOF** (Alcon Vivity, TECNIS PureSee, BIOTECH XTENSE)
4. **Multifocal** (Hanita FullRange)
5. **Trifocal** (Hanita Intensity)

### Lógica de Recomendação

**Passo 1: Verificar Astigmatismo**
- Se SIM → Priorizar lentes TÓRICAS (TECNIS Toric ZCT)
- Se NÃO/NÃO SEI → Continuar com lentes normais

**Passo 2: Calcular Pontuação por Categoria**
- Somar pontos de cada pergunta para cada categoria
- Categorias com pontuação negativa são penalizadas

**Passo 3: Selecionar Top 3 Lentes**
- Ordenar categorias por pontuação (maior → menor)
- Selecionar 1-2 lentes de cada categoria top
- Máximo 3 lentes recomendadas

**Passo 4: Personalizar Mensagem**
- Explicar POR QUE cada lente foi recomendada
- Destacar características que atendem às respostas do paciente

## Perfis de Pacientes (Exemplos)

### Perfil 1: Motorista Noturno
- Dirige à noite: Sim
- Prioridade: Qualidade visual
- Sensível a halos: Sim
→ **Recomendação:** TECNIS Asférica, BVI ISOPURE

### Perfil 2: Profissional de Escritório
- Computador: Muito
- Direção noturna: Ocasional
- Prioridade: Equilíbrio
→ **Recomendação:** Alcon Vivity, TECNIS PureSee, BIOTECH XTENSE

### Perfil 3: Independência Total
- Necessidade: Todas as distâncias
- Prioridade: Independência de óculos
- Direção noturna: Não
→ **Recomendação:** Hanita Intensity, Hanita FullRange

### Perfil 4: Com Astigmatismo
- Astigmatismo: Sim
- Qualquer outro critério
→ **Recomendação:** TECNIS Toric ZCT + outras lentes tóricas

## Interface do Questionário

### Tela Inicial
- Título: "Encontre a Lente Ideal para Você"
- Subtítulo: "Responda 7 perguntas rápidas para receber recomendações personalizadas"
- Botão: "Iniciar Questionário"
- Link: "Pular e ver catálogo completo"

### Durante o Questionário
- Barra de progresso (1/7, 2/7, etc.)
- Pergunta clara e objetiva
- Opções em cards clicáveis
- Botão "Voltar" para revisar respostas
- Design limpo e profissional

### Tela de Resultados
- Título: "Suas Lentes Recomendadas"
- 2-3 cards de lentes com:
  - Imagem da capa
  - Nome da lente
  - Por que foi recomendada (personalizado)
  - Botão "Ver Detalhes"
- Botão: "Ver Catálogo Completo"
- Botão: "Refazer Questionário"

## Validação Clínica

**Critérios baseados em:**
- Guidelines de seleção de LIO da ASCRS (American Society of Cataract and Refractive Surgery)
- Estudos sobre satisfação de pacientes com diferentes tipos de lentes
- Indicações dos fabricantes
- Consenso de oftalmologistas sobre perfis de pacientes

**Disclaimer:**
"Este questionário é apenas uma ferramenta educacional. A escolha final da lente deve ser feita em consulta com seu oftalmologista, considerando exames clínicos completos."
