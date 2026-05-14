// Package router sets up the HTTP router with all routes and middleware.
package router

import (
	"fmt"
	"log/slog"
	"net/http"

	"github.com/bonheur/go-starter-kit/internal/config"
	"github.com/bonheur/go-starter-kit/internal/handler"
	"github.com/bonheur/go-starter-kit/internal/middleware"
)

// New creates and configures the HTTP router with all routes and middleware.
func New(cfg *config.Config, logger *slog.Logger) http.Handler {
	mux := http.NewServeMux()

	// --- Handlers ---
	healthHandler := handler.NewHealthHandler()
	apiHandler := handler.NewAPIHandler()

	// --- API Routes ---
	mux.HandleFunc("/healthz", healthHandler.ServeHTTP)
	mux.HandleFunc("/readyz", apiHandler.HandleReadiness)
	mux.HandleFunc("/version", handler.VersionHandler)
	mux.HandleFunc("/api/hello", apiHandler.HandleHello)

	// --- Middleware Stack ---
	// Build middleware chain (outermost first)
	middlewares := []middleware.Middleware{
		middleware.RequestID,
		middleware.Recovery(logger),
		middleware.Logging(logger),
		middleware.Security,
		middleware.CORS(middleware.CORSConfig{
			AllowedOrigins: cfg.CORSAllowedOrigins,
			AllowedMethods: cfg.CORSAllowedMethods,
			AllowedHeaders: cfg.CORSAllowedHeaders,
			MaxAge:         fmt.Sprintf("%d", cfg.CORSMaxAge),
		}),
	}

	// Add rate limiting if enabled
	if cfg.RateLimitEnabled {
		middlewares = append(middlewares, middleware.RateLimit(cfg.RateLimitRPS, cfg.RateLimitBurst))
	}

	// Add compression if enabled
	if cfg.CompressionEnabled {
		middlewares = append(middlewares, middleware.Compress(cfg.CompressionLevel))
	}

	chain := middleware.Chain(middlewares...)

	return chain(mux)
}
