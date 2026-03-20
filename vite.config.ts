import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 3000,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Target modern browsers that support WebP natively
    target: "es2020",

    // Improve chunking: split heavy libraries into separate chunks
    // so users only download what they need
    rollupOptions: {
      output: {
        manualChunks: {
          // Animation library
          "framer-motion": ["framer-motion"],
          // 3D / Globe (heavy)
          "three-globe": ["three", "react-globe.gl"],
          // Charts
          recharts: ["recharts"],
          // Radix UI primitives
          radix: [
            "@radix-ui/react-accordion",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
          ],
        },
      },
    },

    // Raise the chunk size warning threshold slightly
    // (we handle it via manualChunks above)
    chunkSizeWarningLimit: 600,

    // Enable source maps for production debugging (optional, comment out if unwanted)
    // sourcemap: true,
  },
}));
