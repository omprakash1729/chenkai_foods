import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export function InitialLoader() {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(15);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Rule 1: Video must run completely at least 1 time
  const [videoPlayedOnce, setVideoPlayedOnce] = useState(false);
  // Rule 2: Entire site and GLB file must be 100% loaded
  const [siteLoaded, setSiteLoaded] = useState(false);

  useEffect(() => {
    let windowReady = typeof document !== "undefined" && document.readyState === "complete";
    let glbReady = typeof window !== "undefined" && Boolean((window as any).__CHENKAI_GLB_LOADED__);

    const checkSiteReady = () => {
      if (windowReady && glbReady) {
        setSiteLoaded(true);
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

    // 3. Custom GLTF jar event from JarScene
    const handleGlbLoaded = () => {
      glbReady = true;
      checkSiteReady();
    };
    window.addEventListener("chenkai-glb-loaded", handleGlbLoaded);

    // Initial check
    checkSiteReady();

    // Smooth visual progress ticker while waiting (gradually climbs to 90% while downloading assets)
    const ticker = setInterval(() => {
      setProgress((prev) => {
        if (prev < 50) return prev + 2.5;
        if (prev < 80) return prev + 1.2;
        if (prev < 90) return prev + 0.4;
        return 90; // Stays at 90% until BOTH video has played once AND site is fully loaded!
      });
    }, 150);

    return () => {
      clearInterval(ticker);
      window.removeEventListener("load", handleWindowLoad);
      window.removeEventListener("chenkai-glb-loaded", handleGlbLoaded);
    };
  }, []);

  // When BOTH video has played through at least once AND the site is fully loaded:
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (videoPlayedOnce && siteLoaded) {
      setProgress(100);
      timer = setTimeout(() => {
        setFading(true);
        setTimeout(() => {
          setVisible(false);
        }, 500);
      }, 350);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [videoPlayedOnce, siteLoaded]);

  // Video playback tracking:
  // Detects when the video completes at least 1 full playthrough:
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      // If current time reached within 0.3s of video end or duration
      if (videoRef.current.currentTime >= videoRef.current.duration - 0.3) {
        setVideoPlayedOnce(true);
      }
    }
  };

  const handleEnded = () => {
    setVideoPlayedOnce(true);
    // If the site is still not ready, the video repeats, repeats, and repeats!
    if (!siteLoaded && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
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
          src="/LOADINGANIMATION.mp4"
          autoPlay
          muted
          playsInline
          loop={!siteLoaded} // Keep repeating and looping until site is completely loaded!
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className="w-full h-auto object-cover"
          style={{
            WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 72%)",
            maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 72%)",
          }}
        />
      </div>

      {/* Real progress bar and indicator */}
      <div className="mt-3 w-52 sm:w-64 flex flex-col items-center">
        <div className="h-1.5 w-full overflow-hidden bg-black/10 rounded-full shadow-inner">
          <div
            className="h-full bg-primary transition-all duration-200 ease-out rounded-full shadow-[0_0_12px_rgba(220,38,38,0.7)]"
            style={{ width: `${Math.round(progress)}%` }}
          />
        </div>
        <div className="mt-3 flex items-center justify-between w-full text-[11px] font-mono tracking-widest text-foreground/60 uppercase font-semibold">
          <span>{progress >= 100 ? "READY" : (!siteLoaded ? "LOADING 3D SHOWCASE" : "COMPLETING INTRO")}</span>
          <span className="font-bold text-primary">{Math.round(progress)}%</span>
        </div>
      </div>
    </div>
  );
}


