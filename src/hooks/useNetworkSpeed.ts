import { useState, useEffect, useRef } from 'react';

export type NetworkQuality = 'fast' | 'medium' | 'slow' | 'unknown';

interface NetworkInfo {
    quality: NetworkQuality;
    /** Estimated downlink in Mbps (may be null if unavailable) */
    estimatedMbps: number | null;
    /** Whether the detection has finished */
    ready: boolean;
}

/**
 * useNetworkSpeed — Intelligent network quality detector
 *
 * Strategy (in order of priority):
 * 1. Network Information API (`navigator.connection`) if available
 * 2. Speed probe: downloads a tiny asset and measures time → calculates real Mbps
 * 3. Fallback to 'medium' if both methods are unavailable
 *
 * Quality thresholds:
 * - 'fast'   → ≥5 Mbps  → load desktop WebP frames (full)
 * - 'medium' → 2-5 Mbps → load mobile WebP frames (540px)
 * - 'slow'   → <2 Mbps  → load mobile WebP frames + frame skipping (every 3rd)
 * - 'unknown'→ fallback  → treated as 'medium'
 */
export function useNetworkSpeed(): NetworkInfo {
    const [info, setInfo] = useState<NetworkInfo>({
        quality: 'unknown',
        estimatedMbps: null,
        ready: false,
    });

    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        async function detect() {
            // --- Method 1: Network Information API ---
            // Available in Chrome/Edge on Android and desktop
            const conn = (navigator as any).connection ||
                (navigator as any).mozConnection ||
                (navigator as any).webkitConnection;

            if (conn) {
                const effectiveType: string = conn.effectiveType || '';
                const downlink: number = conn.downlink || 0;

                // effectiveType: '4g' | '3g' | '2g' | 'slow-2g'
                // downlink: estimated bandwidth in Mbps
                if (effectiveType === '4g' && downlink >= 5) {
                    setInfo({ quality: 'fast', estimatedMbps: downlink, ready: true });
                    return;
                }
                if (effectiveType === '4g' || (downlink >= 2 && downlink < 5)) {
                    setInfo({ quality: 'medium', estimatedMbps: downlink, ready: true });
                    return;
                }
                if (effectiveType === '3g' || effectiveType === '2g' || effectiveType === 'slow-2g' || downlink < 2) {
                    setInfo({ quality: 'slow', estimatedMbps: downlink || null, ready: true });
                    return;
                }
            }

            // --- Method 2: Speed probe ---
            // We download a small known-size image and measure throughput
            // Using the frame_006.webp (if available) or a placeholder
            try {
                const probeUrl = `/iphone-sequence/frame_006.webp?probe=${Date.now()}`;
                const startTime = performance.now();
                const response = await fetch(probeUrl, { cache: 'no-store' });

                if (!response.ok) throw new Error('probe failed');

                const buffer = await response.arrayBuffer();
                const elapsed = (performance.now() - startTime) / 1000; // seconds
                const bytes = buffer.byteLength;
                const mbps = (bytes * 8) / (elapsed * 1_000_000);

                let quality: NetworkQuality;
                if (mbps >= 5) quality = 'fast';
                else if (mbps >= 2) quality = 'medium';
                else quality = 'slow';

                setInfo({ quality, estimatedMbps: parseFloat(mbps.toFixed(2)), ready: true });
                return;
            } catch {
                // Speed probe failed — fall through to fallback
            }

            // --- Fallback ---
            setInfo({ quality: 'unknown', estimatedMbps: null, ready: true });
        }

        detect();
    }, []);

    return info;
}
