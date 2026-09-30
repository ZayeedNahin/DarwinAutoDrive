import { Check } from 'lucide-react';

export const DEFAULT_STEPS = ['Request Submitted', 'Under Review', 'Team Contact', 'Completed'];

/** Horizontal progress timeline. `current` is the index of the active step. */
export default function StatusTimeline({ steps = DEFAULT_STEPS, current = 1 }) {
  return (
    <ol className="timeline" style={{ listStyle: 'none', padding: 0 }}>
      {steps.map((s, i) => {
        const state = i < current ? 'done' : i === current ? 'current' : '';
        return (
          <li key={s} className={`tl-step ${state}`} aria-current={i === current ? 'step' : undefined}>
            <span className="tl-dot">{i < current ? <Check size={16} strokeWidth={3} /> : i + 1}</span>
            <span>{s}</span>
          </li>
        );
      })}
    </ol>
  );
}
