/**
 * Hero Configuration (§8.2)
 * Supports 'placeholder' mode (high-fidelity 1920x1080 canvas scene rendering with cinematic zoom/pan),
 * 'frames' mode (/public/frames/frame_0001.webp...), and 'video' mode.
 */

export const HERO = {
  mode: "frames" as "frames" | "video" | "placeholder",
  frameCount: 240, 
  framePathPattern: "/frames/ezgif-frame-%03d.jpg",
  videoSrc: "",
  posterSrc: "/images/hero_greenhouse_garden_1791346366246.jpg",
  scenes: {
    garden: "/images/hero_greenhouse_garden_1791346366246.jpg",
    mistyDawn: "/images/hero_dawn_botanical_1791346388566.jpg",
    goldenEvening: "/images/indore_garden_courtyard_1791346424021.jpg",
  },
  // TODO(client): To enable frame sequence, run:
  // ffmpeg -i hero-video.mp4 -vf "fps=24,scale=1920:1080" -quality 80 public/frames/frame_%04d.webp
  // Then set HERO.frameCount = totalFrames and HERO.mode = "frames".
};
