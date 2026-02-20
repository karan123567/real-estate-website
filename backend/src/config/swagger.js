import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// ============================================================
// SWAGGER CONFIGURATION
// ============================================================

const options = {
  definition: {
    // ─── OpenAPI Version ────────────────────────────────────
    openapi: '3.0.0',
    // This is the standard version (like using HTTP/1.1 vs HTTP/2)
    
    // ─── API Metadata ───────────────────────────────────────
    info: {
      title: 'Real Estate API',
      version: '1.0.0',
      description: `
        # Real Estate Website API
        
        Complete RESTful API for managing properties, inquiries, and admin operations.
        
        ## Features
        - 🏠 Property management (CRUD operations)
        - 📧 Inquiry submissions and tracking
        - 👤 Admin authentication & dashboard
        - 📊 Analytics and reporting
        
        ## Authentication
        Most endpoints require a Bearer token. Get one by logging in at \`/api/admin/login\`.
        
        ## Rate Limiting
        API requests are limited to 100 per 15 minutes per IP address.
      `,
      contact: {
        name: 'API Support',
        email: 'support@yourdomain.com',
        url: 'https://yourdomain.com/support'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    
    // ─── Servers (Different Environments) ───────────────────
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Local Development Server'
      },
      {
        url: 'https://staging-api.yourdomain.com',
        description: 'Staging Server (for testing)'
      },
      {
        url: 'https://api.yourdomain.com',
        description: 'Production Server (live)'
      }
    ],
    
    // ─── Security Schemes (How to authenticate) ─────────────
    components: {
      securitySchemes: {
        // JWT Bearer Token Authentication
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token from /api/admin/login'
        }
      },
      
      // ─── Reusable Schemas (Data Models) ───────────────────
      schemas: {
        // Property Model
        Property: {
          type: 'object',
          required: ['title', 'price', 'location'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated property ID',
              example: 1
            },
            title: {
              type: 'string',
              description: 'Property title',
              example: 'Luxury Beach House'
            },
            description: {
              type: 'string',
              description: 'Detailed property description',
              example: 'Beautiful 3-bedroom beach house with ocean views'
            },
            price: {
              type: 'number',
              format: 'decimal',
              description: 'Property price in USD',
              example: 750000.00
            },
            location: {
              type: 'string',
              description: 'Property location',
              example: 'Miami, FL'
            },
            bedrooms: {
              type: 'integer',
              description: 'Number of bedrooms',
              example: 3
            },
            bathrooms: {
              type: 'integer',
              description: 'Number of bathrooms',
              example: 2
            },
            area_sqft: {
              type: 'integer',
              description: 'Area in square feet',
              example: 2500
            },
            status: {
              type: 'string',
              enum: ['active', 'sold', 'pending', 'draft'],
              description: 'Property status',
              example: 'active'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
              example: '2024-02-19T10:30:00Z'
            }
          }
        },
        
        // Inquiry Model
        Inquiry: {
          type: 'object',
          required: ['name', 'email', 'message'],
          properties: {
            id: {
              type: 'integer',
              example: 1
            },
            property_id: {
              type: 'integer',
              description: 'Related property ID (optional)',
              example: 5
            },
            name: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            phone: {
              type: 'string',
              example: '+1-555-0123'
            },
            message: {
              type: 'string',
              example: 'I am interested in scheduling a viewing'
            },
            status: {
              type: 'string',
              enum: ['new', 'contacted', 'closed'],
              example: 'new'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        
        // Error Response Model
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Resource not found'
            },
            message: {
              type: 'string',
              example: 'The requested property does not exist'
            },
            statusCode: {
              type: 'integer',
              example: 404
            }
          }
        },
        
        // Success Response Model
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation completed successfully'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        }
      },
      
      // ─── Common Response Examples ───────────────────────────
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                error: 'Unauthorized',
                message: 'Invalid or expired token',
                statusCode: 401
              }
            }
          }
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              }
            }
          }
        },
        ValidationError: {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                error: 'Validation Error',
                message: 'Title is required',
                statusCode: 400
              }
            }
          }
        }
      }
    },
    
    // ─── Tags (Organize endpoints into groups) ─────────────
    tags: [
      {
        name: 'Properties',
        description: 'Property management endpoints',
      },
      {
        name: 'Inquiries',
        description: 'Contact form and inquiry management'
      },
      {
        name: 'Admin',
        description: 'Admin authentication and dashboard'
      },
      {
        name: 'Analytics',
        description: 'Statistics and reports'
      }
    ]
  },
  
  // ─── Where to Find API Documentation Comments ──────────────
  apis: [
    './src/routes/*.js',        // All route files
    './src/models/*.js',        // Model definitions
    './src/controllers/*.js'    // Controller files (if you use them)
  ]
};

// Generate Swagger specification from comments
const specs = swaggerJsdoc(options);


// ============================================================
// SWAGGER UI SETUP FUNCTION
// ============================================================

const setupSwagger = (app) => {
  // Custom CSS for better looking docs
  const customCss = `
    .swagger-ui .topbar { display: none; }
    .swagger-ui .info { margin: 50px 0; }
    .swagger-ui .info .title { color: #2c3e50; }
  `;
  
  // Swagger UI Options
  const swaggerOptions = {
    customCss,
    customSiteTitle: 'Real Estate API Documentation',
    customfavIcon: '/favicon.ico',
    
    swaggerOptions: {
      // Enable "Try it out" by default
      tryItOutEnabled: true,
      
      // Remember authorization tokens between page refreshes
      persistAuthorization: true,
      
      // Filter endpoints by tags
      filter: true,
      
      // Display request duration
      displayRequestDuration: true,
      
      // Deep linking to specific operations
      deepLinking: true,
      
      // Show extensions
      showExtensions: true,
      
      // Default models expansion
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 1,
      
      // Syntax highlighting theme
      syntaxHighlight: {
        activate: true,
        theme: 'monokai'
      }
    }
  };
  
  // Serve Swagger UI
  app.use('/api-docs', swaggerUi.serve);
  app.get('/api-docs', swaggerUi.setup(specs, swaggerOptions));
  
  // Also serve raw JSON spec (useful for other tools)
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(specs);
  });
  
  console.log('📚 Swagger docs available at: /api-docs');
  console.log('📄 JSON spec available at: /api-docs.json');
};


// ============================================================
// EXPORTS
// ============================================================

export { setupSwagger, specs };
export default setupSwagger;