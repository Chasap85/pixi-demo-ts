import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  // Base public path when served in development or production
  base: '/',
  
  // Configure resolve aliases
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './public/assets')
    }
  },

  // Development server configuration
  server: {
    port: 3000,
    open: true, // Open browser on server start
    cors: true, // Enable CORS
    hmr: {
      // Configure hot module replacement
      overlay: true
    }
  },

  // Build configuration
  build: {
    // Output directory for production build
    outDir: 'dist',
    
    // Directory to nest generated assets under
    assetsDir: 'assets',
    
    // Configure bundling
    rollupOptions: {
      output: {
        // Chunk size warning limit (2MB)
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    },
    
    // Source map generation
    sourcemap: true,
    
    // Clear output directory on build
    emptyOutDir: true,
    
    // Target browsers
    target: 'es2015',
    
    // Asset handling
    assetsInlineLimit: 4096, // 4kb
  },

  // Plugin configuration options
  optimizeDeps: {
    include: ['pixi.js', 'matter-js', 'gsap'],
    exclude: []
  },

  // Configure esbuild transformation
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },

  // Configure preview server
  preview: {
    port: 8080,
    open: true
  }
})