# Sistema de Eventos Políticos Mejorado - Presidencial Bardo

## 🎯 Mejoras Implementadas

### 1. Perfiles de Personajes Renovados

Los personajes ahora tienen descripciones más divertidas y argentinas:

- **📱 Gaspar "El Streamer"**: Ganó por sorteo de TikTok, no sabe nada de política
- **💙 Benito Paz "El Corazón"**: Síndrome de Down, puro corazón, el pueblo lo ama
- **🪦 La Señora K "La Medium"**: Gobierna según órdenes de Evita en sus sueños
- **🎤 La Chola Arias "La Cumbiambera"**: Estrella de cumbia ancestral, cobra en dólares
- **⚽ Chiquito Tapón "El Barra"**: Ex presidente de club, maneja el país como vestuario

### 2. Sistema de Cadenas de Eventos

Creamos eventos conectados que forman narrativas complejas:

#### 🔗 Cadena del Dólar
- **Dólar Sube Loco** → **Hiperinflación** → **Guerra de Dólares**
- Decisiones en un evento afectan qué eventos siguientes aparecen

#### 🔗 Cadena de Piquetes
- **Piquete Masivo** → **Dependencia de Planes Sociales** → **Colapso del Sistema**
- Cada decisión tiene consecuencias a largo plazo

#### 🔗 Cadena del Fútbol
- **Crisis del Fútbol** → **Fútbol Estatal** → **Politización Deportiva**
- Las barras bravas se vuelven factor político clave

#### 🔗 Cadena Provincial
- **Rebelión Provincial** → **Efecto Dominó** → **Argentina Confederada**
- Las provincias pueden declarar independencia

### 3. Eventos Cotidianos Argentinos

Agregamos eventos que reflejan la realidad argentina:

- **💡 Corte de Luz Masivo**: Crisis energética en verano
- **🥩 Escasez de Carne**: No hay asado, drama nacional
- **📚 Paro Docente Eterno**: Educación paralizada
- **🦫 Invasión de Carpinchos**: Los carpinchos toman Nordelta
- **✈️ Falta de Dólares para Turismo**: Argentinos atrapados
- **🚇 Quilombo en el Subte**: Transporte porteño colapsado
- **💎 Escándalo de Funcionario de Lujo**: Champagne mientras el país se cae
- **💊 Crisis de Medicamentos**: Falta insulina y medicamentos
- **🚛 Paro de Camioneros**: Moyano paraliza el país

### 4. Sistema de Efectos Graduales

Los eventos ahora tienen efectos más realistas:

- **Efectos Lentos**: Se aplican durante 45 segundos
- **Efectos Medios**: Se aplican durante 20 segundos
- **Efectos Rápidos**: Se aplican durante 8 segundos
- **Efectos Mixtos**: Combinan diferentes velocidades

### 5. Dependencias Complejas

Los eventos pueden tener:

- **Eventos Prerequisito**: Necesitas haber pasado por ciertos eventos
- **Eventos Bloqueantes**: Algunos eventos impiden que aparezcan otros
- **Decisiones Específicas**: Ciertas elecciones desbloquean eventos únicos
- **Métricas Requeridas**: Eventos que solo aparecen con ciertas condiciones

## 🎮 Cómo Funciona el Sistema

### Triggers de Eventos

```typescript
trigger: {
    requiredMetrics: {
        [MetricType.ECONOMIA]: { max: 40 }  // Solo si economía < 40
    },
    requiredChoices: [
        { eventId: "evento-anterior", choiceId: "decision-especifica" }
    ],
    blockingEvents: ["evento-que-impide"],
    probability: 0.7  // 70% de chance
}
```

### Efectos en Cadena

```typescript
triggeredEvents: ["evento-siguiente"]  // Activa automáticamente otro evento
```

### Efectos por Facción

```typescript
factionEffects: [
    {
        factionId: FactionId.BARRAS_BRAVAS,
        supportChange: 30,
        description: "Las barras te aman"
    }
]
```

## 🇦🇷 Humor y Referencias Argentinas

### Elementos Culturales
- **Memes**: Referencias a "Argentina momento"
- **Jerga**: Uso de lunfardo y expresiones típicas
- **Situaciones**: Escenarios reconocibles para argentinos
- **Personajes**: Arquetipos de la política argentina

### Crítica Social
- **Corrupción**: Escándalos típicos del país
- **Ineficiencia**: Problemas estructurales crónicos
- **Populismo**: Medidas demagógicas recurrentes
- **Creatividad**: Soluciones "argentinas" a problemas complejos

## 🎯 Estrategia de Juego

### Planificación a Largo Plazo
- Las decisiones tempranas afectan eventos futuros
- Algunas cadenas son inevitables una vez iniciadas
- Mantener equilibrio entre facciones es clave

### Gestión de Crisis
- Los eventos se intensifican con métricas bajas
- Crisis económicas desatan más eventos económicos
- Popularidad baja aumenta eventos sociales

### Factores Impredecibles
- Las barras bravas pueden ser aliadas o enemigas
- Eventos humorísticos pueden tener consecuencias serias
- La realidad argentina siempre supera la ficción

## 🔄 Actualizaciones Futuras

### Próximas Cadenas
- **Cadena Sindical**: Conflictos laborales escalados
- **Cadena Internacional**: Relaciones con países vecinos
- **Cadena Mediática**: Guerra de narrativas
- **Cadena Criminal**: Inseguridad y narcotráfico

### Nuevos Personajes
- Más arquetipos argentinos
- Personajes históricos reimaginados
- Influencers y figuras actuales

### Mecánicas Avanzadas
- Eventos estacionales
- Efectos de largo plazo (años)
- Interacciones entre provincias
- Sistema de reputación internacional

---

*"En Argentina, la realidad siempre supera a la ficción. Por eso nuestros eventos políticos son tan realistas que duelen."* - Los Desarrolladores
