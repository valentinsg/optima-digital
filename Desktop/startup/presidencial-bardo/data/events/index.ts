/**
 * PRESIDENCIAL BARDO - Índice de Eventos
 * Este archivo centraliza la importación y exportación de todos los eventos
 * políticos del juego para facilitar su manejo.
 */

import type { PoliticalEvent } from "@/types/political";
import * as eventChains from "../eventChains";
import * as consequence from "./consequenceEvents";
import * as healthAndTech from "./healthAndTechEvents";
import * as moreArgentine from "./moreArgentineEvents";
import * as morePolitical from "./morePoliticalEvents";
import { ALL_POLITICAL_EVENTS } from "./politicalEvents";

const isEvent = (value: unknown): value is PoliticalEvent => {
  return typeof value === 'object' && value !== null && 'id' in value && 'title' in value;
}

// 1. Recolectar todos los eventos de los archivos
const morePoliticalModuleEvents = Object.values(morePolitical).filter(isEvent);
const moreArgentineModuleEvents = Object.values(moreArgentine).filter(isEvent);
const eventChainsModuleEvents = Object.values(eventChains).filter(isEvent);
const healthAndTechModuleEvents = Object.values(healthAndTech).filter(isEvent);
const consequenceModuleEvents = Object.values(consequence).filter(isEvent);

const allEventsRaw: PoliticalEvent[] = [
  ...ALL_POLITICAL_EVENTS,
  ...morePoliticalModuleEvents,
  ...moreArgentineModuleEvents,
  ...eventChainsModuleEvents,
  ...healthAndTechModuleEvents,
  ...consequenceModuleEvents,
];

// 2. Eliminar duplicados usando un Map por ID
const uniqueEventsMap = new Map<string, PoliticalEvent>();
allEventsRaw.forEach(event => {
  if (!uniqueEventsMap.has(event.id)) {
    uniqueEventsMap.set(event.id, event);
  }
});

export const ALL_EVENTS: PoliticalEvent[] = Array.from(uniqueEventsMap.values());

// 3. Clasificar eventos en "simples" y "en cadena"
const chainedEventIds = new Set<string>();

// Identificar todas las conexiones
ALL_EVENTS.forEach(event => {
  let isChained = false;

  if (event.choices.some(c => c.triggeredEvents && c.triggeredEvents.length > 0)) {
    isChained = true;
    event.choices.forEach(c => {
      c.triggeredEvents?.forEach(id => chainedEventIds.add(id));
    });
  }

  if (event.trigger.requiredChoices && event.trigger.requiredChoices.length > 0) {
    isChained = true;
    event.trigger.requiredChoices.forEach(req => chainedEventIds.add(req.eventId));
  }

  if (event.trigger.completedEvents && event.trigger.completedEvents.length > 0) {
    isChained = true;
    event.trigger.completedEvents.forEach(id => chainedEventIds.add(id));
  }

  if (isChained) {
    chainedEventIds.add(event.id);
  }
});

export const CHAINED_EVENTS = ALL_EVENTS.filter(event => chainedEventIds.has(event.id));
export const SIMPLE_EVENTS = ALL_EVENTS.filter(event => !chainedEventIds.has(event.id));

// 4. Eventos sin los políticos clásicos (solo eventos conectados y en cadenas)
const advancedEventsRaw: PoliticalEvent[] = [
  ...morePoliticalModuleEvents,
  ...moreArgentineModuleEvents,
  ...eventChainsModuleEvents,
  ...healthAndTechModuleEvents,
  ...consequenceModuleEvents,
];

// Eliminar duplicados de eventos avanzados
const uniqueAdvancedEventsMap = new Map<string, PoliticalEvent>();
advancedEventsRaw.forEach(event => {
  if (!uniqueAdvancedEventsMap.has(event.id)) {
    uniqueAdvancedEventsMap.set(event.id, event);
  }
});

export const ADVANCED_EVENTS: PoliticalEvent[] = Array.from(uniqueAdvancedEventsMap.values());

export { CONSEQUENCE_EVENTS } from './consequenceEvents';
export { morePoliticalEvents } from './morePoliticalEvents';
export { ALL_POLITICAL_EVENTS } from './politicalEvents';
export { PROVINCE_EVENTS } from './provinceEvents';

