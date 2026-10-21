import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import loadingVideo from "@/assets/LOADINGANIMATION.mp4";

export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(10);
  const videoRef = useRef<HTMLVideoElement>(null);

  const videoCompletedFirstRunRef = useRef(false);
  const siteLoadedRef = useRef(false);
  const finishedRef = useRef(false);
  const cycleHandledRef = useRef(false);

  const finishLoader = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    setProgress(100);
    setTimeout(() => {
      setFading(true);
      if (typeof window !== "undefined") {
        (window as any).__CHENKAI_LOADER_FINISHED__ = true;
        window.dispatchEvent(new CustomEvent("chenkai-loader-finished"));
      }
      setTimeout(() => {
        setVisible(false);
      }, 500);
    }, 250);
  };

  const handleCycleEnd = () => {
    videoCompletedFirstRunRef.current = true;

    if (siteLoadedRef.current) {
      finishLoader();
    } else {
      // Entire page not yet loaded: restart video seamlessly for another cycle
      if (videoRef.current) {
        cycleHandledRef.current = false;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  useEffect(() => {
    let windowReady = typeof document !== "undefined" && document.readyState === "complete";
    let glbReady = typeof window !== "undefined" && Boolean((window as any).__CHENKAI_GLB_LOADED__);

    const checkSiteReady = () => {
      if (windowReady && glbReady) {
        siteLoadedRef.current = true;
      }
    };

    // 1. Browser window & DOM assets load event
    const handleWindowLoad = () => {
      windowReady = true;
      checkSiteReady();
    };
    if (!windowReady) {
      window.addEventListener("load", handleWindowLoad);
    }

    // 2. Three.js default loading manager
    const originalOnLoad = THREE.DefaultLoadingManager.onLoad;
    THREE.DefaultLoadingManager.onLoad = () => {
      glbReady = true;
      checkSiteReady();
      if (originalOnLoad) originalOnLoad();
    };

    // 3. Custom GLTF jar loaded event from JarScene
    const handleGlbLoaded = () => {
      glbReady = true;
      checkSiteReady();
    };
    window.addEventListener("chenkai-glb-loaded", handleGlbLoaded);

    // Initial check
    checkSiteReady();

    // High safety fallback timer (25s) strictly as an edge-case guard if video playback is blocked
    const fallbackTimer = setTimeout(() => {
      siteLoadedRef.current = true;
      videoCompletedFirstRunRef.current = true;
      finishLoader();
    }, 25000);

    return () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("load", handleWindowLoad);
      window.removeEventListener("chenkai-glb-loaded", handleGlbLoaded);
    };
  }, []);

  // Video playback tracking
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;

    const cur = v.currentTime;
    const dur = v.duration;

    // Smoothly advance progress bar during the first run
    if (!videoCompletedFirstRunRef.current && dur > 0) {
      const pct = Math.min(95, Math.round((cur / dur) * 95));
      setProgress((prev) => Math.max(prev, pct));
    }

    // Detect cycle completion right before video ends
    if (dur > 0 && cur >= dur - 0.25) {
      if (!cycleHandledRef.current) {
        cycleHandledRef.current = true;
        handleCycleEnd();
      }
    } else if (cur < 1.0) {
      // Reset cycle trigger once video wraps to beginning
      cycleHandledRef.current = false;
    }
  };

  const handleEnded = () => {
    if (!cycleHandledRef.current) {
      cycleHandledRef.current = true;
      handleCycleEnd();
    }
  };

  const handleError = () => {
    // If video fails completely (e.g. unsupported codec or ultra-restricted power mode)
    videoCompletedFirstRunRef.current = true;
    siteLoadedRef.current = true;
    finishLoader();
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ease-out select-none ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(circle at center, #ffffff 0%, #f4f5f7 60%, #e5e7eb 100%)",
      }}
    >
      {/* Seamless feathered video centered */}
      <div className="relative w-80 sm:w-[460px] flex items-center justify-center">
        <video
          ref={videoRef}
          src={loadingVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onError={handleError}
          className="w-full h-auto object-cover"
          style={{
            WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 72%)",
            maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 72%)",
          }}
        />
      </div>

      {/* Progress bar and single, clean loading tagline */}
      <div className="mt-4 w-72 sm:w-96 max-w-[90vw] flex flex-col items-center px-4">
        <div className="h-1.5 w-full overflow-hidden bg-black/10 rounded-full shadow-inner">
          <div
            className="h-full bg-primary transition-all duration-200 ease-out rounded-full shadow-[0_0_12px_rgba(220,38,38,0.7)]"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <p className="mt-4 text-center text-xs sm:text-sm font-semibold tracking-wider text-foreground/85 font-display uppercase">
          From the Soul of the Sea to the Heart of Your Home
        </p>
      </div>
    </div>
  );
}
