# 🚀 Início Rápido - Portal de Lentes

Guia rápido para gerar o APK Android do Portal de Lentes.

---

## 📱 Opção 1: GitHub Actions (Recomendado)

**Vantagens:** Automático, na nuvem, sem instalar nada!

### Passos:

1. **Criar repositório no GitHub:**
   - Acesse: https://github.com/new
   - Nome: `portal-lentes`
   - Visibilidade: Privado ou Público

2. **Enviar código:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/portal-lentes.git
   git push -u origin main
   ```

3. **Aguardar build:**
   - GitHub Actions vai iniciar automaticamente
   - Tempo: ~5-10 minutos
   - Acompanhe em: Actions → Build Android APK

4. **Baixar APK:**
   - Actions → Última execução
   - Role até "Artifacts"
   - Baixe "portal-lentes-apk"
   - Descompacte o ZIP

5. **Instalar no celular:**
   - Transfira o APK para o celular
   - Abra o arquivo
   - Permita "Instalar de fontes desconhecidas"
   - Instale!

**📚 Documentação completa:** [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md)

---

## 💻 Opção 2: Build Local

**Requisitos:** Android Studio + Java 17

### Passos:

1. **Instalar Android Studio:**
   - Download: https://developer.android.com/studio
   - Instalar Android SDK Platform 34

2. **Abrir projeto:**
   - Android Studio → Open
   - Selecionar pasta `android/`
   - Aguardar Gradle Sync

3. **Gerar APK:**
   - Build → Build Bundle(s) / APK(s) → Build APK(s)
   - APK em: `android/app/build/outputs/apk/debug/app-debug.apk`

**📚 Documentação completa:** [ANDROID_BUILD.md](./ANDROID_BUILD.md)

---

## 🌐 Opção 3: PWA (Já funciona!)

**Vantagens:** Instalável agora, sem build!

### No Android:
1. Abra o site no Chrome
2. Clique no banner "Instalar Portal de Lentes"
3. Pronto!

### No iPhone:
1. Abra no Safari
2. Compartilhar → Adicionar à Tela de Início
3. Pronto!

---

## 📊 Comparação

| Característica | GitHub Actions | Build Local | PWA |
|---|---|---|---|
| **Facilidade** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Velocidade** | 5-10 min | 2-5 min | Instantâneo |
| **Requisitos** | Conta GitHub | Android Studio | Navegador |
| **Custo** | Grátis | Grátis | Grátis |
| **Play Store** | ✅ Sim | ✅ Sim | ❌ Não |
| **Automação** | ✅ Sim | ❌ Não | ✅ Sim |

---

## 🎯 Recomendação

- **Para testar:** Use PWA (Opção 3)
- **Para distribuir:** Use GitHub Actions (Opção 1)
- **Para desenvolvimento:** Use Build Local (Opção 2)

---

## 📞 Suporte

- **GitHub Actions:** Ver [GITHUB_ACTIONS.md](./GITHUB_ACTIONS.md)
- **Build Local:** Ver [ANDROID_BUILD.md](./ANDROID_BUILD.md)
- **Problemas:** Abra uma issue no GitHub

---

**Boa sorte! 🚀**
