import type { Emitter, EventType } from 'mitt';
import mitt from 'mitt';

export const $event: Emitter<Record<EventType, unknown>> = mitt();
