# 🚀 GitHub Actions - Build Automático do APK

Este documento explica como usar o GitHub Actions para gerar o APK do Portal de Lentes automaticamente na nuvem, sem precisar instalar nada no seu computador!

---

## ✅ O que foi configurado

O projeto já está 100% configurado com:

- ✅ **Workflow completo** (`.github/workflows/android-build.yml`)
- ✅ **Cache inteligente** (Gradle + pnpm para builds mais rápidos)
- ✅ **Build automático** a cada push no GitHub
- ✅ **APK disponível para download** por 30 dias
- ✅ **Releases automáticos** quando criar tags
- ✅ **Notificações** em Pull Requests

---

## 📦 Como funciona

1. Você faz **push** do código para o GitHub
2. GitHub Actions **detecta automaticamente**
3. Servidor na nuvem **compila o APK** (~5-10 minutos)
4. APK fica **disponível para download**

**Custo:** 100% GRATUITO (GitHub oferece 2000 minutos/mês grátis)

---

## 🎯 Como usar

### Primeira vez: Enviar código para GitHub

Se ainda não tem repositório no GitHub:

```bash
# 1. Criar repositório no GitHub (https://github.com/new)
# Nome sugerido: portal-lentes

# 2. No seu computador, dentro da pasta do projeto:
git init
git add .
git commit -m "Initial commit - Portal de Lentes"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/portal-lentes.git
git push -u origin main
```

### Toda vez que quiser gerar APK:

```bash
# Fazer alterações no código
git add .
git commit -m "Descrição das mudanças"
git push
```

**Pronto!** O GitHub Actions vai:
1. Detectar o push
2. Iniciar o build automaticamente
3. Gerar o APK em ~5-10 minutos

---

## 📥 Como baixar o APK

### Método 1: Via Actions (Mais comum)

1. Acesse seu repositório no GitHub
2. Clique na aba **"Actions"** (no topo)
3. Clique na **última execução** (workflow mais recente)
4. Role até a seção **"Artifacts"** (no final da página)
5. Clique em **"portal-lentes-apk"** para baixar
6. Descompacte o arquivo `.zip`
7. Dentro terá o APK: `PortalDeLentes-YYYYMMDD-HHMMSS.apk`

### Método 2: Via Releases (Para versões oficiais)

1. Crie uma **tag** no Git:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

2. GitHub Actions vai:
   - Gerar o APK
   - Criar um **Release** automático
   - Anexar o APK no Release

3. Acesse: `https://github.com/SEU_USUARIO/portal-lentes/releases`
4. Baixe o APK diretamente do Release

---

## 🔧 Configurações Avançadas

### Executar build manualmente

1. Vá em **Actions** → **Build Android APK**
2. Clique em **"Run workflow"** (botão azul)
3. Selecione a branch
4. Clique em **"Run workflow"**

### Alterar quando o build roda

Edite `.github/workflows/android-build.yml`:

```yaml
on:
  push:
    branches: [ main, master ]  # Branches que ativam o build
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:  # Permite execução manual
```

### Aumentar tempo de retenção do APK

Por padrão, o APK fica disponível por **30 dias**. Para alterar:

```yaml
- name: Upload APK
  uses: actions/upload-artifact@v4
  with:
    name: portal-lentes-apk
    path: apk-output/*.apk
    retention-days: 90  # Altere aqui (máximo: 90 dias)
```

### Build de Release (APK assinado)

Para gerar APK assinado para Play Store:

1. **Gerar keystore** (uma vez):
   ```bash
   keytool -genkey -v -keystore portal-lentes.keystore \
     -alias portal-lentes -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Adicionar secrets no GitHub**:
   - Vá em: Settings → Secrets and variables → Actions
   - Adicione:
     - `KEYSTORE_FILE`: Conteúdo do `.keystore` em base64
     - `KEYSTORE_PASSWORD`: Senha do keystore
     - `KEY_ALIAS`: portal-lentes
     - `KEY_PASSWORD`: Senha da chave

3. **Modificar workflow** para usar `assembleRelease`

---

## 📊 Monitorar builds

### Ver progresso em tempo real

1. Actions → Última execução
2. Clique no job **"Build APK"**
3. Veja cada step sendo executado

### Receber notificações

- **Email**: GitHub envia automaticamente se build falhar
- **Slack/Discord**: Configure webhooks no workflow
- **Mobile**: Use app GitHub Mobile

---

## 🐛 Troubleshooting

### Build falhou com "Gradle timeout"

**Solução:** Aumentar timeout no workflow:

```yaml
- name: Build APK
  run: |
    cd android
    ./gradlew assembleDebug --no-daemon --stacktrace
  timeout-minutes: 30  # Adicione esta linha
```

### Build falhou com "Out of memory"

**Solução:** Já configurado em `gradle.properties`:
```properties
org.gradle.jvmargs=-Xmx2048m -XX:MaxMetaspaceSize=512m
```

Se ainda falhar, aumente para `-Xmx4096m`.

### APK não aparece nos Artifacts

**Causas comuns:**
1. Build falhou (verifique logs)
2. Caminho do APK incorreto
3. Permissões do repositório

**Solução:** Verifique logs do step "Upload APK".

### Cache não está funcionando

**Solução:** Limpar cache:
1. Actions → Caches
2. Delete caches antigos
3. Próximo build vai recriar

---

## 📈 Otimizações

### Build está demorando muito?

**Dicas:**

1. **Use cache** (já configurado):
   - Gradle: ~2 min → ~30 seg
   - pnpm: ~1 min → ~10 seg

2. **Build incremental**:
   ```yaml
   - name: Build APK
     run: |
       cd android
       ./gradlew assembleDebug --build-cache
   ```

3. **Paralelização**:
   ```properties
   # gradle.properties
   org.gradle.parallel=true
   org.gradle.workers.max=4
   ```

### Reduzir tamanho do APK

1. **Habilitar minificação** (release):
   ```gradle
   buildTypes {
       release {
           minifyEnabled true
           shrinkResources true
       }
   }
   ```

2. **Split APKs** por arquitetura:
   ```gradle
   splits {
       abi {
           enable true
           reset()
           include 'armeabi-v7a', 'arm64-v8a'
       }
   }
   ```

---

## 🎓 Recursos Adicionais

- [Documentação GitHub Actions](https://docs.github.com/actions)
- [Capacitor Android Docs](https://capacitorjs.com/docs/android)
- [Gradle Build Cache](https://docs.gradle.org/current/userguide/build_cache.html)

---

## ✅ Checklist de Uso

- [ ] Código enviado para GitHub
- [ ] Workflow executou com sucesso
- [ ] APK baixado dos Artifacts
- [ ] APK testado em dispositivo Android
- [ ] (Opcional) Tag criada para release
- [ ] (Opcional) APK assinado para Play Store

---

## 💡 Dicas Profissionais

### 1. Versionamento automático

Adicione no `package.json`:
```json
{
  "version": "1.0.0"
}
```

Use no workflow:
```yaml
- name: Get version
  id: version
  run: echo "VERSION=$(node -p "require('./package.json').version")" >> $GITHUB_OUTPUT

- name: Rename APK
  run: |
    mv app-debug.apk PortalDeLentes-v${{ steps.version.outputs.VERSION }}.apk
```

### 2. Changelog automático

Use [Release Drafter](https://github.com/release-drafter/release-drafter) para gerar changelog automático.

### 3. Testes antes do build

Adicione antes do build:
```yaml
- name: Run tests
  run: pnpm test

- name: Lint code
  run: pnpm lint
```

### 4. Notificação no Slack

```yaml
- name: Notify Slack
  if: always()
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

---

## 🚀 Próximos Passos

1. ✅ **Testar workflow** fazendo um push
2. ✅ **Baixar APK** dos Artifacts
3. ✅ **Instalar no celular** e testar
4. 📱 **Publicar na Play Store** (quando pronto)
5. 🍎 **Configurar iOS** (requer Mac + Xcode)

---

**Dúvidas?** Abra uma issue no repositório ou consulte a documentação oficial do GitHub Actions!
