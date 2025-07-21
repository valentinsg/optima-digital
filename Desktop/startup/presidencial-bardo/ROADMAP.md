# 🗺️ ROADMAP - Presidencial Bardo
## Simulador Político Distópico Argentino

> **Visión**: Crear un juego híbrido que combine combate con mecánicas políticas, donde cada decisión afecta el destino del país. Inspirado en Saints Row 4, buscamos una experiencia distópica donde el objetivo es sobrevivir políticamente el mayor tiempo posible, pudiendo llegar hasta una guerra con aliens.

---

## 🎯 FASE 1: FUNDAMENTOS POLÍTICOS (Semanas 1-2)

### 📊 **1.1 Sistema de Métricas Expandido**
**Objetivo**: Reemplazar las métricas actuales con un sistema político completo

**Métricas Principales**:
- **Popularidad** (0-100): Aprobación ciudadana
- **Economía** (0-100): Estado financiero del país
- **Seguridad** (0-100): Control del orden público
- **Relaciones Internacionales** (0-100): Diplomacia global
- **Corrupción** (0-100): Nivel de transparencia (inverso)
- **Control de Medios** (0-100): Influencia en la narrativa
- **Fanatismo Futbolístico** (0-100): Nivel de obsesión nacional con el fútbol

**Tareas Detalladas**:
- [ ] **Crear estructura de tipos políticos**
  - [ ] Definir interface `PoliticalMetrics` en `types/political.ts`
  - [ ] Crear enum `MetricType` con todos los tipos de métricas
  - [ ] Definir interface `MetricEffect` para cambios en métricas
  - [ ] Crear type `MetricThreshold` para niveles críticos
- [ ] **Actualizar GameState principal**
  - [ ] Modificar `types/game.ts` para incluir `PoliticalMetrics`
  - [ ] Actualizar `useGameState.ts` con nuevas métricas
  - [ ] Crear función `updatePoliticalMetrics()` en gameState
  - [ ] Implementar persistencia de métricas en localStorage
- [ ] **Crear sistema de efectos de métricas**
  - [ ] Crear `utils/metricEffects.ts` con funciones de cálculo
  - [ ] Implementar efectos en gameplay (spawn rate, enemy types)
  - [ ] Crear sistema de alertas por métricas críticas
  - [ ] Implementar game over conditions por métricas
- [ ] **Actualizar HUD con dashboard político**
  - [ ] Crear `components/PoliticalMetrics.tsx`
  - [ ] Implementar barras de progreso con colores temáticos
  - [ ] Agregar tooltips explicativos para cada métrica
  - [ ] Crear animaciones para cambios de métricas

### 🎭 **1.2 Sistema de Eventos Políticos**
**Objetivo**: Crear el motor de eventos que impulsa la narrativa

**Componentes**:
- **PoliticalEventManager**: Controlador principal de eventos
- **EventDatabase**: Base de datos de eventos argentinos
- **ConsequenceSystem**: Sistema de efectos y consecuencias

**Tareas Detalladas**:
- [ ] **Crear estructura de eventos políticos**
  - [ ] Definir interface `PoliticalEvent` en `types/political.ts`
  - [ ] Crear enum `EventType` (crisis, opportunity, decision, emergency)
  - [ ] Definir interface `EventChoice` con efectos múltiples
  - [ ] Crear type `EventTrigger` para condiciones de activación
- [ ] **Implementar PoliticalEventManager**
  - [ ] Crear `game/PoliticalEventManager.ts` con clase principal
  - [ ] Implementar método `triggerEvent()` con lógica de selección
  - [ ] Crear sistema de cooldowns para eventos
  - [ ] Implementar priorización de eventos por criticidad
- [ ] **Crear base de datos de eventos argentinos**
  - [ ] Crear `data/politicalEvents.ts` con eventos base
  - [ ] Implementar 5 eventos económicos (dólar, inflación, etc.)
  - [ ] Crear 5 eventos sociales (piquetes, protestas, etc.)
  - [ ] Diseñar 5 eventos internacionales (FMI, Brasil, etc.)
  - [ ] Agregar 5 eventos de humor negro (Chaco, Santiago, etc.)
- [ ] **Sistema de consecuencias**
  - [ ] Crear `game/ConsequenceSystem.ts`
  - [ ] Implementar efectos inmediatos vs. efectos a largo plazo
  - [ ] Crear sistema de consecuencias encadenadas
  - [ ] Implementar tracking de decisiones previas

### 🎮 **1.3 UI para Decisiones Políticas**
**Objetivo**: Interfaz intuitiva para tomar decisiones rápidas

**Componentes**:
- **DecisionModal**: Modal para decisiones críticas
- **EventNotification**: Notificaciones estilo breaking news
- **MetricsDashboard**: Panel de métricas en tiempo real
- **TimerComponent**: Countdown para decisiones urgentes

**Tareas Detalladas**:
- [ ] **Crear DecisionModal component**
  - [ ] Diseñar `components/DecisionModal.tsx` con layout responsivo
  - [ ] Implementar animaciones de entrada/salida
  - [ ] Crear botones de decisión con hover effects
  - [ ] Agregar preview de consecuencias por choice
- [ ] **Implementar sistema de notificaciones**
  - [ ] Crear `components/EventNotification.tsx` estilo breaking news
  - [ ] Implementar queue de notificaciones múltiples
  - [ ] Agregar sonidos para notificaciones críticas
  - [ ] Crear diferentes tipos de notificación (info, warning, critical)
- [ ] **Diseñar PoliticalHUD principal**
  - [ ] Crear `components/PoliticalHUD.tsx` con layout de sala de situación
  - [ ] Implementar colores violeta Saints Row + elementos argentinos
  - [ ] Agregar mini-mapa de Argentina con provincias
  - [ ] Crear panel de métricas con gráficos en tiempo real
- [ ] **Crear sistema de timers**
  - [ ] Implementar `components/DecisionTimer.tsx` con countdown
  - [ ] Agregar efectos visuales para urgencia (parpadeo, color rojo)
  - [ ] Crear sonidos de alerta para tiempo crítico
  - [ ] Implementar auto-decisión si se acaba el tiempo

### 🗺️ **1.4 Sistema de Provincias Argentinas**
**Objetivo**: Mapa interactivo de Argentina con reacciones provinciales

**Componentes**:
- **ProvinceMap**: Mapa interactivo de Argentina
- **ProvinceManager**: Gestor de estados provinciales
- **ProvinceEvents**: Eventos específicos por provincia
- **RegionalEffects**: Efectos regionales en gameplay

**Tareas Detalladas**:
- [ ] **Crear estructura de provincias**
  - [ ] Definir interface `Province` en `types/political.ts`
  - [ ] Crear enum `ProvinceId` con las 24 provincias
  - [ ] Definir interface `ProvinceState` con métricas locales
  - [ ] Crear type `RegionalEffect` para efectos provinciales
- [ ] **Implementar mapa interactivo**
  - [ ] Crear `components/ProvinceMap.tsx` con SVG de Argentina
  - [ ] Implementar hover effects para cada provincia
  - [ ] Crear sistema de colores por nivel de descontento
  - [ ] Agregar tooltips con información provincial
- [ ] **Crear sistema de descontento regional**
  - [ ] Implementar `game/ProvinceManager.ts`
  - [ ] Crear función `updateProvinceOpinion()` basada en decisiones
  - [ ] Implementar propagación de efectos entre provincias
  - [ ] Crear sistema de crisis provinciales
- [ ] **Eventos específicos por provincia**
  - [ ] Crear eventos para Chaco (humor negro, pobreza extrema)
  - [ ] Implementar eventos de Córdoba (universidad, industria)
  - [ ] Diseñar eventos de Mendoza (vino, turismo)
  - [ ] Agregar eventos de Tierra del Fuego (fin del mundo, aliens)
  - [ ] Crear eventos de CABA vs. Provincia de Buenos Aires
- [ ] **Efectos regionales en gameplay**
  - [ ] Implementar spawn de enemigos por provincia descontenta
  - [ ] Crear power-ups regionales (empanadas, mate, vino)
  - [ ] Implementar eventos de migración interna
  - [ ] Agregar efectos de recursos naturales por provincia

---

## ⚡ FASE 2: GAMEPLAY HÍBRIDO (Semanas 3-4)

### 🎯 **2.1 Eventos Durante el Combate**
**Objetivo**: Integrar decisiones políticas mientras se lucha

**Mecánicas**:
- **Pausa Automática**: El juego se pausa para decisiones críticas
- **Decisiones en Tiempo Real**: Choices mientras esquivas enemigos
- **Quick Time Events**: Botones rápidos durante crisis
- **Multi-tasking**: Gestionar combate y política simultáneamente

**Tareas**:
- [ ] Implementar sistema de pausa automática
- [ ] Crear eventos que se activan durante oleadas
- [ ] Diseñar QTE system para crisis políticas
- [ ] Balancear timing entre combate y decisiones

### 🎪 **2.2 Mini-juegos Políticos**
**Objetivo**: Diversificar la gameplay con mecánicas únicas

**Mini-juegos**:
- **Negotiation**: Negociar con facciones (rock-paper-scissors político)
- **Press Conference**: Responder preguntas de periodistas
- **Budget Allocation**: Distribuir recursos del estado
- **Scandal Management**: Manejar crisis mediáticas

**Tareas**:
- [ ] Crear `components/mini-games/NegotiationGame.tsx`
- [ ] Implementar `components/mini-games/PressConference.tsx`
- [ ] Diseñar sistema de budget allocation
- [ ] Crear mini-juego de manejo de escándalos

### 🎭 **2.3 Sistema de Facciones**
**Objetivo**: Crear grupos de poder que reaccionan a tus decisiones

**Facciones**:
- **La Cámpora**: Juventud política
- **Los Empresarios**: Poder económico
- **Los Sindicalistas**: Poder gremial
- **Los Medios**: Control de información
- **Los Militares**: Poder de seguridad
- **Las Barras Bravas**: Poder de las canchas (nueva facción clave)
- **Los Aliens**: Amenaza extraterrestre

**Tareas Detalladas**:
- [ ] **Crear sistema base de facciones**
  - [ ] Implementar `game/FactionSystem.ts` con todas las facciones
  - [ ] Crear interface `Faction` con poder, lealtad, y recursos
  - [ ] Implementar sistema de relaciones entre facciones
  - [ ] Crear métrica de "influencia" por facción
- [ ] **Implementar mecánicas específicas de barras bravas**
  - [ ] Crear `game/BarraBravaSystem.ts` con lógica especial
  - [ ] Implementar sistema de "territorio" de barras por provincia
  - [ ] Crear eventos de violencia entre barras rivales
  - [ ] Implementar sistema de "protección" a cambio de favores
- [ ] **Crear eventos específicos por facción**
  - [ ] Diseñar 10 eventos de barras bravas (violencia, extorsión, apoyo)
  - [ ] Implementar eventos de empresarios (corrupción, sobornos)
  - [ ] Crear eventos de sindicalistas (paros, negociaciones)
  - [ ] Agregar eventos de medios (fake news, campañas)
- [ ] **Sistema de alianzas y enemistades**
  - [ ] Implementar matriz de relaciones entre facciones
  - [ ] Crear eventos de guerra entre facciones
  - [ ] Implementar sistema de mediación presidencial
  - [ ] Crear consecuencias por alianzas (apoyo vs. dependencia)


## 🇦🇷 FASE 3: BRANDING ARGENTINO-VIOLETA (Semanas 5-6)

### 🎨 **3.1 Identidad Visual Saints Row Argentina**
**Objetivo**: Fusionar estética Saints Row violeta con elementos argentinos

**Elementos Visuales**:
- **Colores Principales**: Violeta Saints Row (#663399) + Celeste argentino (#74ACDF)
- **Paleta Secundaria**: Blanco, negro, dorado para acentos
- **Iconografía**: Escudo nacional con estilo cyberpunk, Casa Rosada futurista
- **Tipografía**: Fuentes bold estilo Saints Row + elementos oficiales
- **UI Elements**: Sala de situación presidencial con toques sci-fi

**Tareas Detalladas**:
- [ ] **Rediseñar sistema de colores**
  - [ ] Crear `styles/colors.css` con paleta violeta-argentina
  - [ ] Actualizar `tailwind.config.ts` con colores custom
  - [ ] Implementar gradientes violeta-celeste en componentes
  - [ ] Crear variantes de color para diferentes estados (crisis, éxito)
- [ ] **Crear assets argentinos con estilo Saints Row**
  - [ ] Diseñar sprites de poder argentinos (mate futurista, empanada dorada)
  - [ ] Crear iconos de provincias con estilo cyberpunk
  - [ ] Implementar escudo nacional con efectos de neón
  - [ ] Diseñar Casa Rosada como base de operaciones
- [ ] **Actualizar UI con nueva identidad**
  - [ ] Rediseñar HUD principal con estética violeta
  - [ ] Implementar efectos de neón en botones y menús
  - [ ] Crear animaciones de transición estilo Saints Row
  - [ ] Agregar efectos de glitch para momentos de crisis
- [ ] **Crear elementos de branding únicos**
  - [ ] Diseñar logo "Presidencial Bardo" con estilo Saints Row
  - [ ] Crear cursor personalizado (mano presidencial)
  - [ ] Implementar loading screens con humor argentino
  - [ ] Diseñar favicon con escudo argentino futurista

### 🗣️ **3.2 Contenido y Narrativa Argentina Sin Filtros**
**Objetivo**: Crear eventos y diálogos authentically argentinos con humor negro

**Contenido**:
- **Jerga Local**: Lunfardo y expresiones argentinas sin censura
- **Referencias Culturales**: Fútbol, tango, asado, política, memes
- **Eventos Históricos**: Parodias de eventos reales con humor negro
- **Personajes**: Arquetipos políticos argentinos exagerados
- **Humor No Apto**: Chistes sobre crisis, corrupción, inflación

**Tareas Detalladas**:
- [ ] **Crear database de eventos argentinos extremos**
  - [ ] Escribir 20 eventos de crisis económica con humor negro
  - [ ] Crear 15 eventos de corrupción con referencias reales
  - [ ] Implementar 10 eventos de fútbol que afectan la política
  - [ ] Diseñar 10 eventos de Chaco con humor extremo
  - [ ] Agregar 5 eventos de Santiago del Estero (memes clásicos)
- [ ] **Implementar diálogos con jerga argentina**
  - [ ] Crear diccionario de lunfardo para eventos
  - [ ] Implementar expresiones por región (che, boludo, etc.)
  - [ ] Agregar insultos políticos argentinos
  - [ ] Crear frases célebres de políticos argentinos
- [ ] **Crear personajes arquetípicos**
  - [ ] Diseñar "El Peronista" como NPC recurrente
  - [ ] Implementar "La Militante" con eventos específicos
  - [ ] Crear "El Empresario Amigo" con corrupción
  - [ ] Agregar "El Sindicalista" con eventos de paro
  - [ ] Diseñar "El Periodista Comprado" con fake news
  - [ ] Crear "El Capo de la Barra" con eventos de fútbol y violencia
- [ ] **Referencias culturales sin límites**
  - [ ] Implementar eventos de Boca vs. River que paran el país
  - [ ] Crear crisis por falta de carne para asado
  - [ ] Agregar eventos de tango en crisis económica
  - [ ] Implementar referencias a memes argentinos populares

### 🎵 **3.3 Audio y Efectos Argentinos**
**Objetivo**: Soundscape que refuerce la identidad argentina con estilo Saints Row

**Audio Elements**:
- **Efectos de Sonido**: Bombos, vuvuzelas, aplausos, bocinas
- **Música**: Tango distópico, cumbia política, rock nacional futurista
- **Voces**: Acentos argentinos, frases típicas, insultos políticos
- **Ambiente**: Sonidos de Buenos Aires con toques cyberpunk

**Tareas Detalladas**:
- [ ] **Crear efectos de sonido argentinos**
  - [ ] Implementar bombo de la 12 para eventos de fútbol y barras
  - [ ] Agregar canticos de barras bravas para eventos deportivos
  - [ ] Crear sonido de bengalas y pirotecnia para violencia de barras
  - [ ] Implementar sonido de mate siendo cebado
  - [ ] Crear efecto de vuvuzela para protestas
  - [ ] Implementar sonido de asado para eventos positivos
  - [ ] Agregar bocinas de colectivo para eventos urbanos
  - [ ] Crear sonidos de multitud gritando "Dale Boca/River"
  - [ ] Implementar himnos de clubes (La 12, River Plate, etc.)
  - [ ] Agregar sonidos de goles con locutor argentino épico
  - [ ] Crear efectos de silbidos y abucheos para decisiones impopulares
- [ ] **Implementar música temática por situación**
  - [ ] Crear tango distópico para momentos de crisis
  - [ ] Implementar cumbia política para eventos populares
  - [ ] Agregar rock nacional futurista para combate
  - [ ] Crear versión cyberpunk del himno nacional
  - [ ] Implementar música de ascensor para eventos burocráticos
  - [ ] Agregar himnos de clubes remixados para eventos deportivos
  - [ ] Crear versión épica del himno nacional para mundiales
- [ ] **Sistema de voces y frases**
  - [ ] Grabar frases típicas argentinas para eventos
  - [ ] Implementar insultos políticos para crisis
  - [ ] Agregar celebraciones argentinas para éxitos
  - [ ] Crear sistema de acentos por provincia
  - [ ] Implementar frases de políticos famosos
- [ ] **Crear ambiente sonoro porteño futurista**
  - [ ] Implementar sonidos de tráfico de Buenos Aires
  - [ ] Agregar sonidos de subte y colectivos
  - [ ] Crear ambiente de Plaza de Mayo con protestas
  - [ ] Implementar sonidos de Puerto Madero cyberpunk
  - [ ] Agregar efectos de sirenas para momentos de crisis

### 🎭 **3.4 Ejemplos de Eventos de Humor Negro**
**Objetivo**: Banco de ideas para eventos políticamente incorrectos

**Ejemplos de Eventos Chaco**:
- **"Crisis en Chaco"**: "Chaco se quedó sin luz... otra vez. ¿Mandas generadores o les decís que prendan velas?"
- **"El Intendente de Chaco"**: "El intendente de un pueblo de Chaco compró una Ferrari. Los medios preguntan cómo."
- **"Chaco Independiente"**: "Chaco amenaza con independizarse. Nadie se dio cuenta hasta ahora."

**Ejemplos de Eventos Santiago del Estero**:
- **"Familia Santiagueña"**: "Una familia de Santiago invita al presidente a un asado. El FBI recomienda no ir."
- **"El Árbol Genealógico"**: "En Santiago del Estero presentan el árbol genealógico más confuso del país."

**Ejemplos de Eventos Económicos**:
- **"Dólar Blue Espacial"**: "El dólar blue llegó a Marte. Los aliens piden explicaciones."
- **"Inflación Cuántica"**: "La inflación está tan alta que afecta otras dimensiones."
- **"Plan Platita Cósmico"**: "Proponen dar planes sociales a los aliens para que no invadan."

**Ejemplos de Eventos Fútbol y Clubes**:
- **"Boca vs. River Presidencial"**: "Boca y River juegan la final. El país se paraliza, incluso los aliens."
- **"Messi Presidente"**: "Proponen que Messi sea presidente. La economía se arregla automáticamente."
- **"VAR Político"**: "Instalan VAR en el Congreso. Ahora todos los votos son revisados."
- **"Descenso de Boca"**: "Boca desciende por primera vez. Se declara luto nacional por 3 días."
- **"River en la B"**: "River vuelve a descender. Los hinchas piden asilo político."
- **"Gallardo Ministro"**: "Proponen a Gallardo como Ministro del Interior. River fans aprueban."
- **"Riquelme Candidato"**: "Riquelme se postula a intendente de La Boca. Boca Juniors es el bunker de campaña."
- **"AFA Corrupta"**: "Escándalo en AFA salpica al gobierno. Piden que renuncies como los árbitros."

**Ejemplos de Eventos Selección Nacional**:
- **"Messi se Lesiona"**: "Messi se lesiona antes del Mundial. El país entra en depresión colectiva."
- **"Scaloni Renunciado"**: "Scaloni renuncia por presión. Debes elegir nuevo DT: ¿Simeone, Gallardo o Bielsa?"
- **"Mundial en Argentina"**: "FIFA ofrece organizar el Mundial. ¿Aceptás y fundís el país o rechazás y te odian?"
- **"Eliminación con Brasil"**: "Brasil nos elimina en penales. Se cortan relaciones diplomáticas automáticamente."
- **"Campeones Invictos"**: "Argentina gana todo. Tu popularidad llega al 100% pero la economía colapsa por los festejos."
- **"Convocatoria Polémica"**: "No convocan a Dybala. Córdoba amenaza con independizarse."

**Ejemplos de Eventos Barras Bravas**:
- **"La Barra Pide Reunión"**: "El capo de la 12 quiere hablar. Trae 500 barras armados como 'escolta'."
- **"Subsidio Deportivo"**: "Las barras piden subsidios para 'actividades culturales'. Sabés que es para armas."
- **"Protección Presidencial"**: "Te ofrecen protección contra un golpe. A cambio quieren el Ministerio de Deportes."
- **"Guerra de Barras"**: "La Barra de River y Boca se enfrentan. El ejército pide intervenir."
- **"Elecciones Deportivas"**: "Las barras prometen votos a cambio de liberar a sus capos presos."
- **"Mundial y Paz"**: "Durante el Mundial, las barras declaran tregua. Es el momento más pacífico del mandato."

---

## 🚀 FASE 4: ESCALADA DISTÓPICA (Semanas 7-8)

### 🌍 **4.1 Crisis Progresivas**
**Objetivo**: Escalada de dificultad política hasta el caos total

**Niveles de Crisis**:
1. **Crisis Económica**: Inflación, desempleo, pobreza
2. **Crisis Social**: Protestas, saqueos, violencia
3. **Crisis Institucional**: Golpe de estado, militarización
4. **Crisis Internacional**: Sanciones, aislamiento
5. **Crisis Existencial**: Invasión alien, guerra intergaláctica

**Tareas**:
- [ ] Crear sistema de escalada de crisis
- [ ] Implementar eventos de cada nivel
- [ ] Diseñar mecánicas específicas por crisis
- [ ] Crear condiciones de game over por crisis

### 👽 **4.2 Amenaza Extraterrestre**
**Objetivo**: Culminación distópica con guerra intergaláctica

**Elementos Alien**:
- **Primer Contacto**: Eventos de avistamientos
- **Negociación**: Diplomacia intergaláctica
- **Invasión**: Combate contra naves alien
- **Guerra Total**: Boss fight final épico

**Tareas**:
- [ ] Crear eventos de contacto alien
- [ ] Implementar enemigos extraterrestres
- [ ] Diseñar boss fight final
- [ ] Crear endings múltiples según decisiones

### 🏆 **4.3 Sistema de Logros y Finales**
**Objetivo**: Múltiples formas de "ganar" o "perder"

**Finales Posibles**:
- **Dictador Exitoso**: Máximo poder, mínima popularidad
- **Líder Popular**: Máxima popularidad, economía destruida
- **Héroe Galáctico**: Derrota a los aliens, salva la humanidad
- **Traidor Cósmico**: Se alía con aliens, domina la Tierra
- **Mártir Político**: Muere defendiendo la democracia

**Tareas**:
- [ ] Crear sistema de múltiples endings
- [ ] Implementar logros por decisiones
- [ ] Diseñar estadísticas finales
- [ ] Crear sistema de replay value

---

## 🔧 FASE 5: PULIMIENTO Y OPTIMIZACIÓN (Semanas 9-10)

### 🎮 **5.1 Balanceo de Gameplay**
**Objetivo**: Equilibrar todas las mecánicas para experiencia óptima

**Tareas**:
- [ ] Balancear efectos de decisiones políticas
- [ ] Ajustar dificultad de mini-juegos
- [ ] Optimizar timing de eventos
- [ ] Testear múltiples playthroughs

### 🐛 **5.2 Testing y Debug**
**Objetivo**: Eliminar bugs y mejorar performance

**Tareas**:
- [ ] Testing exhaustivo de todas las mecánicas
- [ ] Optimización de performance
- [ ] Fix de bugs críticos
- [ ] Testing en móviles

### 📱 **5.3 Deployment y Marketing**
**Objetivo**: Lanzar el juego al público

**Tareas**:
- [ ] Deploy en Vercel
- [ ] Crear trailer del juego
- [ ] Documentación para usuarios
- [ ] Plan de marketing en redes sociales

---

## 📋 MÉTRICAS DE ÉXITO

### 🎯 **KPIs del Proyecto**
- **Tiempo de Juego Promedio**: +15 minutos por sesión
- **Decisiones Tomadas**: +100 decisiones políticas diferentes
- **Rejugabilidad**: Al menos 5 finales diferentes alcanzables
- **Engagement**: 80% de jugadores completan al menos una crisis mayor

### 🏆 **Objetivos de Gameplay**
- **Duración Máxima**: Posibilidad de jugar +30 minutos sin repetir contenido
- **Variedad**: +200 eventos políticos únicos
- **Complejidad**: Sistema de consecuencias que afecte gameplay 10+ oleadas después
- **Inmersión**: Narrativa coherente desde crisis local hasta guerra galáctica

---

## 🛠️ HERRAMIENTAS Y TECNOLOGÍAS

### **Stack Técnico Actual**
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: TailwindCSS, tailwindcss-animate
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Deploy**: Vercel
- **Audio**: Web Audio API

### **Nuevas Herramientas Necesarias**
- **State Management**: Zustand para estado político complejo
- **Animations**: Framer Motion para transiciones políticas
- **Testing**: Jest + React Testing Library
- **Analytics**: Vercel Analytics + custom events

---

## 📅 CRONOGRAMA DETALLADO

```
Semana 1-2:  🏛️ Fundamentos Políticos
Semana 3-4:  ⚡ Gameplay Híbrido
Semana 5-6:  🇦🇷 Branding Argentino
Semana 7-8:  🚀 Escalada Distópica
Semana 9-10: 🔧 Pulimiento y Launch
```

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

### **Esta Semana (Días 1-3)**
1. **Crear `types/political.ts`** con todas las interfaces necesarias
2. **Implementar sistema básico de métricas** en `useGameState.ts`
3. **Crear primer evento político** de prueba (Crisis del Dólar)
4. **Actualizar HUD** con métricas políticas básicas y colores violeta

### **Resto de la Semana (Días 4-7)**
1. **Implementar `components/ProvinceMap.tsx`** con SVG básico de Argentina
2. **Crear `game/PoliticalEventManager.ts`** con lógica de eventos
3. **Diseñar primer evento de Chaco** con humor negro
4. **Actualizar colores** en `tailwind.config.ts` con paleta violeta-argentina

### **Siguiente Reunión - Objetivos**
- **Demo del sistema de métricas** funcionando en el HUD
- **Mostrar primer evento político** con choices y consecuencias
- **Preview del mapa de provincias** con hover effects
- **Decisión sobre el primer mini-juego** a implementar
- **Review del branding violeta** y ajustes necesarios
- **Planificación detallada de la Fase 2** con eventos durante combate

### **Criterios de Éxito para la Semana**
- [ ] Métricas políticas visibles en el HUD
- [ ] Al menos 1 evento político funcionando completamente
- [ ] Mapa de Argentina básico implementado
- [ ] Colores violeta-argentina aplicados en la UI
- [ ] Primer evento de humor negro (Chaco) creado

---

*"El poder no se toma, se construye decisión por decisión"* 🎭

**Fecha de Creación**: Enero 2025
**Última Actualización**: Enero 2025
**Estado**: En Desarrollo Activo
