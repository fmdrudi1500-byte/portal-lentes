# 📱 Build do APK Android - Portal de Lentes

Este documento explica como gerar o APK do Portal de Lentes para instalação no Android.

---

## ✅ Capacitor Configurado

O projeto já está configurado com Capacitor e pronto para build:

- ✅ **App ID**: `com.portallentes.app`
- ✅ **Nome**: Portal de Lentes
- ✅ **Ícones**: Gerados para todas as densidades (mdpi-xxxhdpi)
- ✅ **Splash Screen**: Configurado para portrait e landscape
- ✅ **Permissões**: Internet, Câmera, Storage
- ✅ **Orientação**: Portrait (vertical)

---

## 🛠️ Requisitos

Para fazer o build do APK, você precisa:

1. **Android Studio** (versão 2023.1 ou superior)
2. **Java JDK 17** ou superior
3. **Android SDK** (API 34 recomendado)
4. **Gradle** (incluído no Android Studio)

---

## 📦 Opção 1: Build via Android Studio (Recomendado)

### Passo 1: Instalar Android Studio

1. Baixe em: https://developer.android.com/studio
2. Instale seguindo o assistente
3. Abra o SDK Manager e instale:
   - Android SDK Platform 34
   - Android SDK Build-Tools 34.0.0
   - Android SDK Command-line Tools

### Passo 2: Abrir Projeto

1. Abra Android Studio
2. Clique em **"Open"**
3. Navegue até `/home/ubuntu/portal-lentes/android`
4. Aguarde o Gradle Sync completar

### Passo 3: Gerar APK

**APK de Debug (para testes):**
```
Build → Build Bundle(s) / APK(s) → Build APK(s)
```

**APK de Release (para publicação):**
```
Build → Generate Signed Bundle / APK → APK
```

O APK estará em:
```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 💻 Opção 2: Build via Linha de Comando

### Passo 1: Configurar Variáveis de Ambiente

**Linux/Mac:**
```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/tools
```

**Windows:**
```cmd
set JAVA_HOME=C:\Program Files\Java\jdk-17
set ANDROID_HOME=C:\Users\%USERNAME%\AppData\Local\Android\Sdk
set PATH=%PATH%;%ANDROID_HOME%\platform-tools;%ANDROID_HOME%\tools
```

### Passo 2: Fazer Build

```bash
cd /home/ubuntu/portal-lentes

# Build de produção do React
pnpm build

# Sincronizar com Capacitor
npx cap sync android

# Gerar APK de debug
cd android
./gradlew assembleDebug

# Gerar APK de release (assinado)
./gradlew assembleRelease
```

### Passo 3: Localizar APK

```
android/app/build/outputs/apk/debug/app-debug.apk
android/app/build/outputs/apk/release/app-release-unsigned.apk
```

---

## 🔐 Assinar APK para Play Store

Para publicar na Play Store, você precisa assinar o APK:

### 1. Gerar Keystore

```bash
keytool -genkey -v -keystore portal-lentes.keystore \
  -alias portal-lentes -keyalg RSA -keysize 2048 -validity 10000
```

### 2. Configurar Gradle

Crie `android/key.properties`:
```properties
storePassword=SUA_SENHA
keyPassword=SUA_SENHA
keyAlias=portal-lentes
storeFile=../portal-lentes.keystore
```

### 3. Editar `android/app/build.gradle`

Adicione antes de `android {}`:
```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}
```

Dentro de `android {}`, adicione:
```gradle
signingConfigs {
    release {
        keyAlias keystoreProperties['keyAlias']
        keyPassword keystoreProperties['keyPassword']
        storeFile keystoreProperties['storeFile'] ? file(keystoreProperties['storeFile']) : null
        storePassword keystoreProperties['storePassword']
    }
}

buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### 4. Gerar APK Assinado

```bash
cd android
./gradlew assembleRelease
```

APK assinado em: `android/app/build/outputs/apk/release/app-release.apk`

---

## 🚀 Publicar na Play Store

1. Acesse: https://play.google.com/console
2. Crie um novo app
3. Preencha informações:
   - **Nome**: Portal de Lentes
   - **Categoria**: Medicina
   - **Classificação**: Livre
4. Upload do APK assinado
5. Configure screenshots, descrição e ícones
6. Envie para revisão

**Taxa única**: $25 USD para conta de desenvolvedor

---

## 📱 Instalar APK Manualmente

Para testar sem Play Store:

1. Transfira `app-debug.apk` para o celular
2. Abra o arquivo no celular
3. Permita "Instalar de fontes desconhecidas"
4. Instale o app

---

## 🐛 Troubleshooting

### Erro: "SDK location not found"

Crie `android/local.properties`:
```properties
sdk.dir=/home/SEU_USUARIO/Android/Sdk
```

### Erro: "Java 17 required"

```bash
sudo apt install openjdk-17-jdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

### Erro: "Gradle sync failed"

```bash
cd android
./gradlew clean
./gradlew --stop
./gradlew assembleDebug
```

---

## 📚 Recursos Adicionais

- [Documentação Capacitor](https://capacitorjs.com/docs/android)
- [Guia Android Studio](https://developer.android.com/studio/run)
- [Publicar na Play Store](https://support.google.com/googleplay/android-developer/answer/9859152)

---

## ✅ Checklist de Publicação

- [ ] Testar APK em múltiplos dispositivos Android
- [ ] Verificar permissões solicitadas
- [ ] Testar orientação portrait
- [ ] Validar splash screen
- [ ] Testar modo offline (PWA)
- [ ] Preparar screenshots para Play Store (5-8 imagens)
- [ ] Escrever descrição completa (4000 caracteres)
- [ ] Definir ícone de alta resolução (512x512)
- [ ] Configurar política de privacidade
- [ ] Assinar APK com keystore de produção
- [ ] Upload na Play Store Console
