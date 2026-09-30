import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Play, PlayCircle, Pause } from 'lucide-react';
import SmartImage from './SmartImage.jsx';

/** Media gallery with main image, arrows, thumbnails and a video placeholder slide. */
export default function VehicleGallery({ images, thumbs, title, hasVideo }) {
  const slides = [...images.map((src, i) => ({ type: 'img', src, thumb: thumbs[i] })), ...(hasVideo ? [{ type: 'video' }] : [])];
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const current = slides[idx];

  useEffect(() => { setPlaying(false); setProgress(0); }, [idx]);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setProgress((p) => Math.min(100, p + 2)), 200);
    return () => clearInterval(t);
  }, [playing]);
  useEffect(() => { if (progress >= 100) setPlaying(false); }, [progress]);

  const go = (d) => setIdx((i) => (i + d + slides.length) % slides.length);

  return (
    <div>
      <div className="gallery-main">
        {current.type === 'img' ? (
          <SmartImage src={current.src} alt={`${title} — photo ${idx + 1}`} label={title} loading="eager" />
        ) : (
          <div className="video-placeholder">
            <div>
              <button className="play-btn" onClick={() => { if (progress >= 100) setProgress(0); setPlaying(!playing); }} aria-label={playing ? 'Pause video' : 'Play video'}>
                {playing ? <Pause size={34} fill="#fff" /> : <Play size={34} fill="#fff" style={{ marginLeft: 4 }} />}
              </button>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: 18 }}>Vehicle walkaround video</strong>
              <p style={{ color: 'rgba(255,255,255,.6)', fontSize: 14, marginTop: 4 }}>Video player placeholder — prototype</p>
            </div>
            <div className="video-bar">
              <span>{`0:${String(Math.round(progress * 0.9)).padStart(2, '0')}`}</span>
              <span className="track"><i style={{ width: `${progress}%` }} /></span>
              <span>1:30</span>
            </div>
          </div>
        )}
        {slides.length > 1 && (
          <>
            <button className="gallery-nav prev" onClick={() => go(-1)} aria-label="Previous"><ChevronLeft size={22} /></button>
            <button className="gallery-nav next" onClick={() => go(1)} aria-label="Next"><ChevronRight size={22} /></button>
          </>
        )}
        {current.type === 'img' && <span className="gallery-counter">{idx + 1} / {slides.length}</span>}
      </div>
      <div className="thumbs" role="tablist" aria-label="Gallery thumbnails">
        {slides.map((s, i) => (
          <button key={i} role="tab" aria-selected={i === idx} className={`thumb ${i === idx ? 'on' : ''} ${s.type === 'video' ? 'thumb-video' : ''}`} onClick={() => setIdx(i)}>
            {s.type === 'img' ? <SmartImage src={s.thumb} alt="" label=" " /> : <span><PlayCircle size={22} color="#F97316" />Video</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
