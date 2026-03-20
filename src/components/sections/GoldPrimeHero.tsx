import { useEffect, useRef, useState, useCallback } from 'react'
import { ChevronsDown } from 'lucide-react'
import { useScroll, useSpring, motion, useTransform } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { AnimatedText } from '@/components/ui/animated-shiny-text'
import { useNetworkSpeed } from '@/hooks/useNetworkSpeed'

const FRAMES_PATH = '/iphone-sequence/'
const LAST_FRAME_INDEX = 225 // frame_225 is the final key frame

/**
 * Returns the list of frame indices to load based on network quality.
 *
 * - fast/unknown:  all 221 intermediate frames (006–224) + key frames 000, 225
 * - medium:        every 2nd intermediate frame → ~110 frames total
 * - slow:          every 3rd intermediate frame → ~74 frames total (frame skipping)
 */
function buildFrameList(quality: 'fast' | 'medium' | 'slow' | 'unknown'): number[] {
    const frames: number[] = [0] // always start with key frame 000

    const step = quality === 'slow' ? 3 : quality === 'medium' ? 2 : 1

    for (let i = 6; i <= 224; i += step) {
        frames.push(i)
    }

    frames.push(LAST_FRAME_INDEX) // always end with key frame 225
    return frames
}

/**
 * Returns the .webp filename for a given frame index.
 * Key frames (0, 225) always get the full-resolution desktop version.
 * Intermediate frames get the mobile version if isMobile is true.
 */
function getFrameSrc(frameIndex: number, useMobile: boolean): string {
    const num = frameIndex.toString().padStart(3, '0')
    const isKeyFrame = frameIndex === 0 || frameIndex === LAST_FRAME_INDEX
    if (!isKeyFrame && useMobile) {
        return `${FRAMES_PATH}frame_${num}-mobile.webp`
    }
    return `${FRAMES_PATH}frame_${num}.webp`
}

export default function GoldPrimeHero() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // imagesRef maps frameIndex → HTMLImageElement
    const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map())
    const frameListRef = useRef<number[]>([])

    const [firstFrameLoaded, setFirstFrameLoaded] = useState(false)
    const [loadProgress, setLoadProgress] = useState(0)
    const [allLoaded, setAllLoaded] = useState(false)

    const { language } = useLanguage()
    const { quality, ready: networkReady } = useNetworkSpeed()

    // Determine if we should use mobile-sized images:
    // - network is slow/medium, OR
    // - device is actually mobile
    const isMobileDevice = typeof window !== 'undefined' && window.innerWidth <= 768
    const useMobileFrames = isMobileDevice || quality === 'slow' || quality === 'medium'

    // Lock scroll only until first frame is ready (not until ALL frames load)
    useEffect(() => {
        if (!firstFrameLoaded) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [firstFrameLoaded])

    // Multilingual phrases
    const phrases = {
        'pt-BR': {
            phrase1: 'EXCELÊNCIA EM QUALIDADE',
            phrase2: 'CADA DETALHE\nÉ TESTADO',
            phrase3: 'CERTIFICAÇÃO\nGOLDPRIME',
            phrase4: 'REFERÊNCIA GLOBAL',
            scrollText: 'ROLE PARA EXPERIÊNCIA'
        },
        'en': {
            phrase1: 'EXCELLENCE IN QUALITY',
            phrase2: 'EVERY DETAIL\nTESTED & CERTIFIED',
            phrase3: 'GOLDPRIME\nCERTIFICATION',
            phrase4: 'GLOBAL REFERENCE',
            scrollText: 'SCROLL TO EXPERIENCE'
        },
        'es': {
            phrase1: 'EXCELENCIA EN CALIDAD',
            phrase2: 'CADA DETALLE\nPROBADO Y CERTIFICADO',
            phrase3: 'CERTIFICACIÓN\nGOLDPRIME',
            phrase4: 'REFERENCIA GLOBAL',
            scrollText: 'DESPLÁZATE PARA EXPLORAR'
        }
    }

    const currentPhrases = phrases[language as keyof typeof phrases] || phrases['en']

    // Scroll progress tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 180,
        damping: 25,
        restDelta: 0.001
    })

    // Render a frame index (finds nearest loaded frame if exact is not loaded yet)
    const renderFrame = useCallback((logicalFrameIndex: number) => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return

        const frameList = frameListRef.current
        if (frameList.length === 0) return

        // Find the closest available frame index
        // logicalFrameIndex is 0-based position in frameList
        const clampedIndex = Math.max(0, Math.min(logicalFrameIndex, frameList.length - 1))
        let img = imagesRef.current.get(frameList[clampedIndex])

        // Graceful degradation: find nearest loaded frame if this one isn't ready
        if (!img || !img.complete || img.naturalWidth === 0) {
            for (let offset = 1; offset < frameList.length; offset++) {
                const back = frameList[Math.max(0, clampedIndex - offset)]
                const backImg = imagesRef.current.get(back)
                if (backImg?.complete && backImg.naturalWidth > 0) {
                    img = backImg
                    break
                }
            }
        }

        if (!img || !img.complete || img.naturalWidth === 0) return

        const displayWidth = canvas.clientWidth
        const displayHeight = canvas.clientHeight
        const dpr = window.devicePixelRatio || 1

        if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
            canvas.width = displayWidth * dpr
            canvas.height = displayHeight * dpr
            ctx.scale(dpr, dpr)
        }

        ctx.clearRect(0, 0, displayWidth, displayHeight)

        const scale = Math.min(
            displayWidth / img.naturalWidth,
            displayHeight / img.naturalHeight
        )
        const x = (displayWidth - img.naturalWidth * scale) / 2
        const y = (displayHeight - img.naturalHeight * scale) / 2

        ctx.imageSmoothingEnabled = true
        ctx.imageSmoothingQuality = 'high'
        ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
    }, [])

    // Load frames once network quality is known (or after 1.5s timeout)
    useEffect(() => {
        if (!networkReady) return

        const frameList = buildFrameList(quality)
        frameListRef.current = frameList
        const total = frameList.length
        let loadedCount = 0

        function onLoad(this: HTMLImageElement & { _frameIndex?: number }) {
            loadedCount++
            const progress = loadedCount / total
            setLoadProgress(progress)

            // Unlock scroll as soon as the FIRST frame (000) is loaded
            if (this._frameIndex === 0) {
                setFirstFrameLoaded(true)
                renderFrame(0)
            }

            if (loadedCount >= total) {
                setAllLoaded(true)
            }
        }

        // Load key frames first (priority), then intermediate frames
        const keyFrames = frameList.filter(i => i === 0 || i === LAST_FRAME_INDEX)
        const restFrames = frameList.filter(i => i !== 0 && i !== LAST_FRAME_INDEX)

        const loadFrame = (frameIndex: number) => {
            const img = new Image()
                ; (img as any)._frameIndex = frameIndex

            if (frameIndex === 0) {
                // Highest priority: first visible frame
                img.fetchPriority = 'high'
            }

            img.onload = onLoad.bind(img as any)
            img.onerror = () => {
                // On error, still count as "loaded" to not stall progress
                ; (img as any)._frameIndex = frameIndex
                onLoad.call(img as any)
            }

            img.src = getFrameSrc(frameIndex, useMobileFrames)
            imagesRef.current.set(frameIndex, img)
        }

        // Load key frames first, then the rest
        keyFrames.forEach(loadFrame)
        restFrames.forEach(loadFrame)
    }, [networkReady, quality, useMobileFrames, renderFrame])

    // Update frame based on scroll
    useEffect(() => {
        const unsubscribe = smoothProgress.on('change', (latest) => {
            const frameList = frameListRef.current
            if (frameList.length === 0) return
            const frameListIndex = Math.min(
                Math.floor(latest * (frameList.length - 1)),
                frameList.length - 1
            )
            renderFrame(frameListIndex)
        })
        return () => unsubscribe()
    }, [smoothProgress, renderFrame])

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            const frameList = frameListRef.current
            if (frameList.length === 0) return
            const currentProgress = smoothProgress.get()
            const frameListIndex = Math.floor(currentProgress * (frameList.length - 1))
            renderFrame(frameListIndex)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [smoothProgress, renderFrame])

    // Text animations
    const phrase1Opacity = useTransform(scrollYProgress, [0, 0.08, 0.25, 0.33], [1, 1, 1, 0])
    const phrase2Opacity = useTransform(scrollYProgress, [0.33, 0.4, 0.55, 0.63], [0, 1, 1, 0])
    const phrase3Opacity = useTransform(scrollYProgress, [0.63, 0.7, 0.85, 0.93], [0, 1, 1, 0])
    const phrase4Opacity = useTransform(scrollYProgress, [0.93, 0.95, 0.98, 1], [0, 1, 1, 1])

    const phrase1Shiny = useTransform(scrollYProgress, [0, 0.33], ['0%', '100%'])
    const phrase2Shiny = useTransform(scrollYProgress, [0.33, 0.63], ['0%', '100%'])
    const phrase3Shiny = useTransform(scrollYProgress, [0.63, 0.93], ['0%', '100%'])
    const phrase4Shiny = useTransform(scrollYProgress, [0.93, 1], ['0%', '100%'])

    const metallicGradient = 'linear-gradient(90deg, #ffffff 0%, #ffffff 35%, #e8e8e8 45%, #c0c0c0 50%, #e8e8e8 55%, #ffffff 65%, #ffffff 100%)'
    const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.02], [1, 0])

    // Loading progress bar (shown only until first frame loads)
    const isLoading = !firstFrameLoaded

    return (
        <div
            id="home"
            ref={containerRef}
            className="relative bg-black"
            style={{ height: isMobileDevice ? '200vh' : '300vh' }}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ background: '#000000' }}
                />

                {/* Loading State — only blocks scroll until frame_000 is ready */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50 gap-4">
                        <div className="w-48 md:w-64 h-1 bg-zinc-900 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress * 100}%` }}
                            />
                        </div>
                        <p className="text-zinc-600 text-xs uppercase tracking-[0.4em] font-light text-center">
                            {Math.round(loadProgress * 100)}%
                        </p>
                    </div>
                )}

                {/* Subtle background loading indicator (non-blocking, shown after first frame) */}
                {firstFrameLoaded && !allLoaded && (
                    <motion.div
                        className="absolute bottom-4 right-4 z-30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="w-1 h-8 bg-zinc-800 rounded-full overflow-hidden">
                            <motion.div
                                className="w-full bg-amber-500/60 rounded-full"
                                initial={{ height: 0 }}
                                animate={{ height: `${loadProgress * 100}%` }}
                                style={{ marginTop: 'auto' }}
                            />
                        </div>
                    </motion.div>
                )}

                {/* Text Overlays */}
                {firstFrameLoaded && (
                    <>
                        {/* Phrase 1 */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-center px-6"
                            style={{ opacity: phrase1Opacity }}
                        >
                            <AnimatedText
                                text={currentPhrases.phrase1}
                                textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-tight md:leading-relaxed whitespace-pre-line"
                                gradientColors={metallicGradient}
                                manual={true}
                                style={{ backgroundPositionX: phrase1Shiny, backgroundSize: '300% 100%', fontFamily: 'Archivo, sans-serif' }}
                            />
                        </motion.div>

                        {/* Phrase 2 */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-center px-6"
                            style={{ opacity: phrase2Opacity }}
                        >
                            <AnimatedText
                                text={currentPhrases.phrase2}
                                textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-tight md:leading-relaxed max-w-5xl whitespace-pre-line"
                                gradientColors={metallicGradient}
                                manual={true}
                                style={{ backgroundPositionX: phrase2Shiny, backgroundSize: '300% 100%', fontFamily: 'Archivo, sans-serif' }}
                            />
                        </motion.div>

                        {/* Phrase 3 */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-center px-6"
                            style={{ opacity: phrase3Opacity }}
                        >
                            <AnimatedText
                                text={currentPhrases.phrase3}
                                textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-tight md:leading-relaxed max-w-4xl whitespace-pre-line"
                                gradientColors={metallicGradient}
                                manual={true}
                                style={{ backgroundPositionX: phrase3Shiny, backgroundSize: '300% 100%', fontFamily: 'Archivo, sans-serif' }}
                            />
                        </motion.div>

                        {/* Phrase 4 */}
                        <motion.div
                            className="absolute inset-0 flex items-center justify-center text-center px-6"
                            style={{ opacity: phrase4Opacity }}
                        >
                            <AnimatedText
                                text={currentPhrases.phrase4}
                                textClassName="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-semibold tracking-tight leading-tight md:leading-relaxed max-w-7xl whitespace-pre-line"
                                gradientColors={metallicGradient}
                                manual={true}
                                style={{ backgroundPositionX: phrase4Shiny, backgroundSize: '300% 100%', fontFamily: 'Archivo, sans-serif' }}
                            />
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                            className="absolute bottom-10 left-0 right-0 z-20 flex justify-center items-center pointer-events-none"
                            style={{ opacity: scrollIndicatorOpacity }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            <div className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full shadow-lg">
                                <motion.div
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                >
                                    <ChevronsDown className="w-4 h-4 text-white/60" strokeWidth={1.5} />
                                </motion.div>
                                <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60 font-light">
                                    {currentPhrases.scrollText}
                                </span>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    )
}
