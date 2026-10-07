import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef, useCallback } from 'react';
import { HERO } from '../../config/hero';

export interface FrameSequenceHandle {
  setProgress: (progress: number) => void;
}

export interface FrameSequenceProps {
  progress?: number;
  activeScene?: number;
  className?: string;
}

const TARGET_WIDTH = 1920;
const TARGET_HEIGHT = 1080;
const TARGET_RATIO = TARGET_WIDTH / TARGET_HEIGHT;

export const FrameSequence = forwardRef<FrameSequenceHandle, FrameSequenceProps>(({
  progress: initialProgress = 0,
  activeScene = 1,
  className = '',
}, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Map<number | string, HTMLImageElement>>(new Map());
  const lastDrawnImageRef = useRef<HTMLImageElement | null>(null);
  const lastDrawnIndexRef = useRef<number | string>(-1);

  // Smooth lerp state
  const targetProgressRef = useRef(initialProgress);
  const currentProgressRef = useRef(initialProgress);
  const isRafRunningRef = useRef(false);
  const isTabVisibleRef = useRef(true);

  // Cached layout coordinates to eliminate calculation overhead in render loop
  const layoutRef = useRef({
    clientW: 0,
    clientH: 0,
    renderW: 0,
    renderH: 0,
    renderX: 0,
    renderY: 0,
    dpr: 1,
  });

  const [initialFrameReady, setInitialFrameReady] = useState(false);

  // Fast direct render of a specific progress point
  const drawAtProgress = useCallback((prog: number) => {
    if (!isTabVisibleRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const layout = layoutRef.current;
    if (layout.clientW === 0 || layout.clientH === 0) return;

    const clampedProg = Math.max(0, Math.min(1, prog));

    if (HERO.mode === 'frames' && HERO.frameCount > 0) {
      const total = HERO.frameCount;
      const targetFrame = Math.max(1, Math.min(total, Math.round(clampedProg * (total - 1)) + 1));

      // Skip redundant draws if already displaying this exact frame
      if (targetFrame === lastDrawnIndexRef.current && lastDrawnImageRef.current) {
        return;
      }

      let img = imagesRef.current.get(targetFrame);

      // Fast fallback: look for adjacent frames within +/- 20
      if (!img) {
        for (let offset = 1; offset <= 20; offset++) {
          const prev = targetFrame - offset;
          if (prev >= 1 && imagesRef.current.has(prev)) {
            img = imagesRef.current.get(prev);
            break;
          }
          const next = targetFrame + offset;
          if (next <= total && imagesRef.current.has(next)) {
            img = imagesRef.current.get(next);
            break;
          }
        }
      }

      if (!img) {
        img = lastDrawnImageRef.current || imagesRef.current.get(1) || imagesRef.current.get('poster');
      }

      if (img) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'medium';
        ctx.drawImage(img, layout.renderX, layout.renderY, layout.renderW, layout.renderH);
        lastDrawnImageRef.current = img;
        lastDrawnIndexRef.current = targetFrame;
      } else {
        ctx.fillStyle = '#2A1E18';
        ctx.fillRect(0, 0, layout.clientW, layout.clientH);
      }
    } else {
      // 3-Scene Cinematic Mode
      const img1 = imagesRef.current.get('scene1');
      const img2 = imagesRef.current.get('scene2');
      const img3 = imagesRef.current.get('scene3');

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';

      const scalePush = 1.0 + clampedProg * 0.05;
      const scaledW = layout.renderW * scalePush;
      const scaledH = layout.renderH * scalePush;
      const scaledX = layout.renderX - (scaledW - layout.renderW) / 2;
      const scaledY = layout.renderY - (scaledH - layout.renderH) / 2;

      if (clampedProg <= 0.35) {
        if (img1) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(img1, scaledX, scaledY, scaledW, scaledH);
        }
        if (clampedProg > 0.25 && img2) {
          const blend = (clampedProg - 0.25) / 0.1;
          ctx.globalAlpha = Math.min(1, Math.max(0, blend));
          ctx.drawImage(img2, scaledX, scaledY, scaledW, scaledH);
        }
      } else if (clampedProg <= 0.7) {
        if (img2) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(img2, scaledX, scaledY, scaledW, scaledH);
        }
        if (clampedProg > 0.6 && img3) {
          const blend = (clampedProg - 0.6) / 0.1;
          ctx.globalAlpha = Math.min(1, Math.max(0, blend));
          ctx.drawImage(img3, scaledX, scaledY, scaledW, scaledH);
        }
      } else {
        if (img3) {
          ctx.globalAlpha = 1.0;
          ctx.drawImage(img3, scaledX, scaledY, scaledW, scaledH);
        }
      }
      lastDrawnIndexRef.current = 'scene';
    }
  }, []);

  // Continuous buttery RAF loop with lerp interpolation
  const startRafLoop = useCallback(() => {
    if (isRafRunningRef.current) return;
    isRafRunningRef.current = true;

    const tick = () => {
      if (!isTabVisibleRef.current) {
        isRafRunningRef.current = false;
        return;
      }

      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const delta = target - current;

      // When delta is noticeable, lerp smoothly with spring damping
      if (Math.abs(delta) > 0.0003) {
        // 0.16 lerp factor gives snappy yet buttery 60/120fps fluid tracking
        currentProgressRef.current += delta * 0.16;
        drawAtProgress(currentProgressRef.current);
        requestAnimationFrame(tick);
      } else {
        // Settle on exact target
        currentProgressRef.current = target;
        drawAtProgress(target);
        isRafRunningRef.current = false;
      }
    };

    requestAnimationFrame(tick);
  }, [drawAtProgress]);

  // Imperative API for ScrollTrigger to push target progress directly
  useImperativeHandle(ref, () => ({
    setProgress: (p: number) => {
      const clamped = Math.max(0, Math.min(1, p));
      targetProgressRef.current = clamped;
      startRafLoop();
    },
  }), [startRafLoop]);

  // Recalculate dimensions & object-fit cover coordinates only on container resize
  const updateLayout = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const clientW = container.clientWidth;
    const clientH = container.clientHeight;
    if (clientW === 0 || clientH === 0) return;

    // Cap DPR at 1.5 for ultra-fast GPU fills without sacrificing 1080p sharpness
    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5);

    const bufferW = Math.round(clientW * dpr);
    const bufferH = Math.round(clientH * dpr);

    if (canvas.width !== bufferW || canvas.height !== bufferH) {
      canvas.width = bufferW;
      canvas.height = bufferH;
    }

    const containerRatio = clientW / clientH;
    let renderW: number;
    let renderH: number;
    let renderX: number;
    let renderY: number;

    if (containerRatio > TARGET_RATIO) {
      renderW = bufferW;
      renderH = bufferW / TARGET_RATIO;
      renderX = 0;
      renderY = (bufferH - renderH) / 2;
    } else {
      renderH = bufferH;
      renderW = bufferH * TARGET_RATIO;
      renderX = (bufferW - renderW) / 2;
      renderY = 0;
    }

    layoutRef.current = {
      clientW: bufferW,
      clientH: bufferH,
      renderW,
      renderH,
      renderX,
      renderY,
      dpr,
    };

    // Invalidate last drawn index to force redraw with new layout
    lastDrawnIndexRef.current = -1;
    drawAtProgress(currentProgressRef.current);
  }, [drawAtProgress]);

  // High-concurrency, fast frame preloader
  useEffect(() => {
    let isCancelled = false;

    const preloadAllFrames = async () => {
      const getFrameUrl = (idx: number) => {
        const numStr = String(idx).padStart(3, '0');
        return HERO.framePathPattern.replace('%03d', numStr);
      };

      const loadImg = (key: number | string, url: string): Promise<HTMLImageElement | null> => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => {
            if (isCancelled) return resolve(null);
            imagesRef.current.set(key, img);
            resolve(img);
          };
          img.onerror = () => resolve(null);
        });
      };

      if (HERO.mode === 'frames' && HERO.frameCount > 0) {
        const total = HERO.frameCount;

        // Step 0: Instantly kick off poster image load as background safety
        if (HERO.posterSrc) {
          loadImg('poster', HERO.posterSrc).then((poster) => {
            if (poster && !isCancelled && !lastDrawnImageRef.current) {
              lastDrawnImageRef.current = poster;
              setInitialFrameReady(true);
              updateLayout();
            }
          });
        }

        // Step 1: Immediately fetch Frame 1 so hero paints in milliseconds
        const f1 = await loadImg(1, getFrameUrl(1));
        if (f1 && !isCancelled) {
          lastDrawnImageRef.current = f1;
          setInitialFrameReady(true);
          updateLayout();
        }

        // Step 2: Concurrently load the first 40 frames for immediate buttery scrubbing
        const initialBatch: number[] = [];
        for (let i = 2; i <= Math.min(40, total); i++) {
          initialBatch.push(i);
        }
        await Promise.all(initialBatch.map((idx) => loadImg(idx, getFrameUrl(idx))));
        if (isCancelled) return;

        // Step 3: Stream all remaining frames (41 to 240) in fast concurrent pools of 12
        const remaining: number[] = [];
        for (let i = 41; i <= total; i++) {
          remaining.push(i);
        }

        const POOL_SIZE = 12;
        for (let i = 0; i < remaining.length; i += POOL_SIZE) {
          if (isCancelled) return;
          const pool = remaining.slice(i, i + POOL_SIZE);
          await Promise.all(pool.map((idx) => loadImg(idx, getFrameUrl(idx))));
        }
      } else {
        const scenes = [
          { key: 'scene1', src: HERO.scenes.garden },
          { key: 'scene2', src: HERO.scenes.mistyDawn },
          { key: 'scene3', src: HERO.scenes.goldenEvening },
        ];
        await Promise.all(scenes.map((s) => loadImg(s.key, s.src)));
        if (!isCancelled) {
          setInitialFrameReady(true);
          updateLayout();
        }
      }
    };

    preloadAllFrames();

    // Tab visibility handling
    const handleVisibility = () => {
      isTabVisibleRef.current = !document.hidden;
      if (isTabVisibleRef.current) {
        drawAtProgress(currentProgressRef.current);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isCancelled = true;
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [updateLayout, drawAtProgress]);

  // Setup ResizeObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    updateLayout();

    const observer = new ResizeObserver(() => {
      updateLayout();
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [updateLayout]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
});

FrameSequence.displayName = 'FrameSequence';
