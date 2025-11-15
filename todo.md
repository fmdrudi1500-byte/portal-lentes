# Portal de Lentes - TODO

## Funcionalidades Principais

### Estrutura Base
- [x] Configurar tema e cores do aplicativo
- [x] Configurar logo e identidade visual
- [x] Criar layout principal com navegação

### Catálogo de Lentes
- [x] Criar página inicial com grid de lentes
- [x] Implementar cards visuais para cada lente
- [x] Adicionar filtros por tipo/fabricante
- [x] Implementar busca rápida

### Páginas Detalhadas
- [x] Criar template de página detalhada
- [x] Implementar 9 páginas individuais (uma para cada lente)
- [x] Adicionar seções: especificações, tecnologia, dados clínicos, vantagens
- [ ] Incluir gráficos e visualizações
- [x] Adicionar referências científicas

### Comparador de Lentes
- [x] Criar página de comparação
- [x] Implementar seleção de 2-3 lentes
- [x] Criar tabela comparativa lado a lado
- [ ] Adicionar gráficos comparativos

### Calculadora de LIO
- [x] Criar interface da calculadora
- [x] Implementar fórmulas de cálculo (SRK/T, Holladay, Barrett)
- [x] Adicionar campos de entrada (K1, K2, AXL, ACD)
- [x] Exibir resultados e recomendações

### Recursos Adicionais
- [ ] Criar seção de materiais educacionais
- [ ] Adicionar informações de contato/suporte
- [x] Implementar responsividade mobile

### Finalização
- [ ] Testar todas as funcionalidades
- [ ] Otimizar imagens
- [ ] Verificar responsividade
- [ ] Criar checkpoint final


### Integração de Apresentações em Slides
- [x] Criar apresentação em slides para Hanita FullRange
- [x] Implementar componente visualizador de slides no app
- [x] Integrar apresentação na página de detalhes da Hanita FullRange
- [x] Adicionar botão "Ver Apresentação" na página
- [x] Testar visualização em tela cheia
- [ ] Validar estrutura com usuário antes de replicar para outras lentes


### Simplificação do Aplicativo para Validação
- [x] Remover 8 lentes do catálogo (manter apenas Hanita Intensity)
- [x] Atualizar arquivo lenses_data.json
- [x] Criar apresentação completa para Hanita Intensity (18 slides)
- [x] Integrar apresentação Intensity no aplicativo
- [x] Testar estrutura completa simplificada


### Otimização Mobile do Visualizador de Apresentações
- [x] Implementar suporte a gestos touch (swipe left/right)
- [x] Aumentar área de toque dos botões de navegação
- [x] Ajustar layout dos controles para telas pequenas
- [x] Melhorar posicionamento dos indicadores de slides
- [x] Otimizar tamanho de fonte e espaçamento para mobile
- [x] Testar apresentação em visualização mobile do navegador
- [x] Garantir que slides sejam legíveis em telas pequenas


### Correção de Imagens e Melhoria Estética
- [x] Diagnosticar problema de carregamento de imagens
- [x] Verificar caminhos das imagens no código
- [x] Corrigir referências de imagens
- [x] Melhorar design do header/navegação
- [x] Aprimorar cards de lentes no catálogo
- [x] Redesenhar página de detalhes da lente
- [x] Melhorar tipografia e espaçamentos
- [x] Adicionar gradientes e efeitos visuais modernos
- [x] Testar carregamento de imagens
- [x] Validar melhorias estéticas


### Conversão de Slides para Carrossel de Imagens
- [x] Converter slides HTML da Hanita Intensity em imagens PNG de alta qualidade
- [x] Otimizar imagens para diferentes tamanhos de tela (mobile, tablet, desktop)
- [x] Criar componente de carrossel moderno e responsivo
- [x] Implementar navegação por swipe para mobile
- [x] Adicionar funcionalidade de zoom nas imagens
- [x] Integrar carrossel no lugar do PresentationViewer
- [x] Testar legibilidade em dispositivos móveis
- [x] Validar experiência do usuário no carrossel


### Correção de Carregamento e Otimização Tela Cheia Mobile
- [x] Diagnosticar por que as imagens PNG não estão carregando no carrossel (imagens muito pesadas - 8MB cada)
- [x] Corrigir caminhos das imagens dos slides
- [ ] Gerar slides otimizados em formato vertical (portrait) para mobile (1080x1920)
- [x] Implementar visualização em tela cheia verdadeira (sem barras de navegação)
- [x] Adaptar carrossel para formato vertical
- [x] Otimizar tamanho das imagens para carregamento rápido (reduzido de 8MB para 60-110KB - 99% menor)
- [x] Testar carregamento e visualização em mobile


### Criação de Slides em Formato Vertical para Mobile
- [ ] Planejar estrutura de conteúdo dos slides verticais (1080x1920)
- [ ] Gerar slides em formato portrait otimizados para celular
- [ ] Criar imagens ultra-leves (menos de 200KB cada)
- [ ] Redesenhar conteúdo para leitura vertical com texto maior
- [ ] Implementar visualizador de slides verticais no aplicativo
- [ ] Garantir ocupação de 100% da tela sem espaços vazios
- [ ] Testar carregamento e legibilidade em celular real
- [ ] Validar navegação por swipe em mobile


### Adição de Novas Lentes: Vivity e Puresse
- [x] Coletar informações técnicas sobre Alcon Vivity
- [x] Criar 12 slides verticais da Vivity em português brasileiro
- [x] Adicionar Vivity ao catálogo (lenses_data.json)
- [x] Configurar visualizador para suportar Vivity
- [x] Testar apresentação da Vivity no navegador
- [x] Coletar informações técnicas sobre Puresse
- [x] Criar 12 slides verticais da Puresse em português brasileiro
- [x] Adicionar Puresse ao catálogo (lenses_data.json)
- [x] Configurar visualizador para suportar Puresse
- [x] Testar apresentação da Puresse no navegador


### Capas Uniformizadas para Lentes
- [x] Gerar capa padronizada para Hanita Intensity
- [x] Gerar capa padronizada para Hanita FullRange
- [x] Gerar capa padronizada para Alcon Vivity
- [x] Gerar capa padronizada para TECNIS PureSee
- [x] Atualizar referências das imagens no lenses_data.json
- [x] Testar carregamento das capas no navegador


### Adição de Novas Lentes: EDOF Biotech e Monofocal Plus BVI
- [x] Coletar informações técnicas sobre EDOF Biotech
- [x] Criar 12 slides verticais da EDOF Biotech em português brasileiro
- [x] Gerar capa padronizada para EDOF Biotech
- [x] Adicionar EDOF Biotech ao catálogo (lenses_data.json)
- [x] Configurar visualizador para suportar EDOF Biotech
- [x] Testar apresentação da EDOF Biotech no navegador
- [x] Coletar informações técnicas sobre Monofocal Plus BVI
- [x] Criar 12 slides verticais da Monofocal Plus BVI em português brasileiro
- [x] Gerar capa padronizada para Monofocal Plus BVI
- [x] Adicionar Monofocal Plus BVI ao catálogo (lenses_data.json)
- [x] Configurar visualizador para suportar Monofocal Plus BVI
- [x] Testar apresentação da Monofocal Plus BVI no navegador


### Correção de Bug: Lentes não aparecendo no catálogo
- [ ] Investigar por que nem todas as lentes aparecem no catálogo
- [ ] Verificar arquivo lenses_data.json para erros de sintaxe
- [ ] Corrigir problema identificado
- [ ] Validar que todas as 6 lentes aparecem corretamente


### Bug Crítico: Apenas 1 lente aparece na versão publicada
- [x] Verificar arquivo lenses_data.json para erros de sintaxe JSON
- [x] Validar que todas as 6 lentes estão no arquivo
- [ ] Corrigir erros de sintaxe (vírgulas, aspas, chaves)
- [x] Testar localmente após correção
- [x] Criar novo checkpoint para publicação


### Adição de 3 Lentes Monofocais TECNIS (Johnson & Johnson)
- [x] Coletar informações técnicas sobre TECNIS Toric ZCT
- [x] Coletar informações técnicas sobre TECNIS Asférica
- [x] Coletar informações técnicas sobre TECNIS Esférica AR40e
- [x] Criar 12 slides verticais da TECNIS Toric ZCT em português
- [x] Gerar capa padronizada para TECNIS Toric ZCT
- [x] Adicionar TECNIS Toric ZCT ao catálogo
- [x] Configurar visualizador para TECNIS Toric ZCT
- [x] Testar apresentação da TECNIS Toric ZCT
- [ ] Criar 12 slides verticais da TECNIS Asférica em português
- [ ] Gerar capa padronizada para TECNIS Asférica
- [ ] Adicionar TECNIS Asférica ao catálogo
- [ ] Configurar visualizador para TECNIS Asférica
- [ ] Testar apresentação da TECNIS Asférica
- [ ] Criar 12 slides verticais da TECNIS Esférica AR40e em português
- [ ] Gerar capa padronizada para TECNIS Esférica AR40e
- [ ] Adicionar TECNIS Esférica AR40e ao catálogo
- [ ] Configurar visualizador para TECNIS Esférica AR40e
- [ ] Testar apresentação da TECNIS Esférica AR40e
- [x] Criar 12 slides verticais da TECNIS Asférica em português
- [x] Gerar capa padronizada para TECNIS Asférica
- [x] Adicionar TECNIS Asférica ao catálogo
- [x] Configurar visualizador para TECNIS Asférica
- [x] Testar apresentação da TECNIS Asférica

## Questionário de Indicação de Lentes
- [x] Planejar estrutura do questionário com perguntas validadas
- [x] Definir algoritmo de recomendação baseado em critérios clínicos
- [x] Criar componente Quiz.tsx com interface do questionário
- [x] Implementar lógica de pontuação e recomendação
- [x] Criar tela de resultados com lentes recomendadas
- [x] Integrar questionário como tela inicial (rota /)
- [x] Mover catálogo para rota /catalog
- [x] Adicionar botão "Pular Questionário" para acesso direto
- [x] BUG CORRIGIDO: Usar window.location.search em vez de location.split("?")[1] no QuizResults.tsx
- [x] Testar fluxo completo: questionário → resultados → catálogo
- [x] Validar recomendações para perfil de motorista noturno (monofocal asférica)

## Cenários Pré-Configurados e Sistema Médico
- [x] Definir 6 perfis de pacientes pré-configurados (Motorista, Cirurgião, Professor, Aposentado, Astigmatismo, Executivo)
- [x] Criar componente ProfileSelector com modal de seleção de perfis
- [x] Adicionar botão "Testar Perfil" na tela inicial do questionário
- [x] Implementar geração de código único de 6 dígitos após completar questionário
- [x] Criar sistema de armazenamento local (localStorage) para resultados
- [x] Exibir código único na tela de resultados com botão copiar
- [ ] Desenvolver página /medico para acesso aos resultados por código
- [ ] Criar interface de busca por código no painel médico
- [ ] Implementar visualização de resultados salvos
- [ ] Adicionar funcionalidade de exportação em PDF dos resultados
- [ ] Testar fluxo: perfil → questionário → código → painel médico


## Progressive Web App (PWA)
- [x] Criar manifest.json com metadados do aplicativo
- [x] Gerar ícones em múltiplos tamanhos (72x72 até 512x512)
- [x] Implementar service worker para cache offline
- [x] Criar página offline.html
- [x] Configurar estratégia de cache (Network First com fallback)
- [x] Criar hook usePWA para gerenciar instalação
- [x] Adicionar botão "Instalar App" na interface (componente InstallPWA)
- [x] Testar banner de instalação no navegador
- [x] Verificar registro do service worker
- [x] Corrigir warnings do manifest (screenshots, meta tags)


## Capacitor - App Nativo
- [x] Instalar @capacitor/core, @capacitor/cli, @capacitor/android, @capacitor/ios
- [x] Criar capacitor.config.ts com configurações de splash screen
- [x] Inicializar Capacitor no projeto (com.portallentes.app)
- [x] Adicionar plataforma Android
- [x] Fazer build de produção e sincronizar assets
- [x] Configurar AndroidManifest.xml (permissões: Internet, Câmera, Storage; orientação: portrait)
- [x] Gerar ícones adaptivos para Android (5 densidades: mdpi-xxxhdpi)
- [x] Configurar splash screen (portrait + landscape para todas as densidades)
- [x] Ajustar build do Vite para Capacitor
- [x] Sincronizar assets com npx cap sync
- [x] Preparar estrutura Android completa (ícones, splash, manifest)
- [x] Documentar processo de build do APK (ANDROID_BUILD.md)
- [x] Preparar estrutura iOS (código pronto, build requer Mac + Xcode)


## GitHub Actions - Build Automático
- [x] Criar diretório .github/workflows
- [x] Criar workflow android-build.yml completo
- [x] Configurar checkout do código
- [x] Configurar Node.js 22 e pnpm 10
- [x] Configurar Java 17 (Temurin)
- [x] Configurar Android SDK
- [x] Adicionar cache de dependências (Gradle, pnpm)
- [x] Build de produção do React
- [x] Sincronizar Capacitor
- [x] Gerar APK de debug
- [x] Upload do APK como artifact (retenção 30 dias)
- [x] Renomear APK com timestamp
- [x] Criar release automático em tags
- [x] Comentar em PRs com link do APK
- [x] Criar documentação de uso (GITHUB_ACTIONS.md) - Guia completo
