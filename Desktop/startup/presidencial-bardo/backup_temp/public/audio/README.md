# 🎵 Directorio de Audio - Presidencial Bardo

Este directorio contiene todos los archivos de audio del juego.

## 📁 Estructura Recomendada

```
audio/
├── music/
│   ├── menu-theme.mp3           ← Música principal del menú
│   ├── menu-theme.ogg           ← Versión alternativa (mejor compatibilidad)
│   ├── game-background.mp3      ← Música durante el juego (opcional)
│   └── victory-theme.mp3        ← Música de victoria (opcional)
└── sfx/
    ├── hover.mp3               ← Efectos de botones (opcional)
    ├── select.mp3
    └── start.mp3
```

## 🎼 Configuración de Música del Menú

Para cambiar la música del menú principal:

1. **Coloca tu archivo de música** en `public/audio/music/` con el nombre `menu-theme.mp3`
2. **Edita el archivo** `hooks/useUISound.ts`
3. **Descomenta las líneas** marcadas con `TODO` para activar la música real
4. **Comenta el código** de música sintética si quieres usar solo archivos

### Ejemplo de implementación:

```typescript
// En hooks/useUISound.ts, dentro de startMenuMusic():

// Descomenta esto:
currentAudioElement = playAudioFile(
  '/audio/music/menu-theme.mp3',
  audioSettings.musicVolume ?? 0.5,
  true // loop
);

// Y comenta el sistema sintético actual si no lo necesitas
```

## 🔧 Formatos Recomendados

- **MP3**: Amplia compatibilidad, tamaño moderado
- **OGG**: Mejor calidad/tamaño, compatible con navegadores modernos
- **M4A**: Alternativa de calidad, compatible con Safari

## 🎚️ Consideraciones Técnicas

- **Volumen**: Los archivos se reproducen con el volumen configurado en settings
- **Loop**: La música del menú se reproduce en bucle automáticamente
- **Autoplay**: Requiere interacción del usuario (política de navegadores)
- **Tamaño**: Mantén los archivos bajo 5MB para carga rápida

## 🎮 Estado Actual

Actualmente el juego usa **Web Audio API** para generar música sintética. El código para usar archivos reales está preparado pero comentado en `hooks/useUISound.ts`.

Para activar música real, sigue las instrucciones en el archivo.
