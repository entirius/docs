# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.


## Rules regarding keeping documentation

Documentation is written in English.
Links are Mintlify specific, check if relative links work, if not, use Absolute links.

Use full pahts in links ex; 

## Development Commands

This is a Mintlify documentation site. Common development commands:

```bash
# Install Mintlify CLI globally (one-time setup)
npm i -g mintlify

# Start local development server
mintlify dev

# Troubleshooting: re-install dependencies if dev server fails
mintlify install
```

The documentation is served locally at the default Mintlify port when running `mintlify dev`.

## Architecture Overview

This is the documentation site for Entirius, an open-source e-commerce AI platform. The site uses Mintlify framework ([ADR-006](/development/architecture/adr/adr-006-mintlify-documentation-platform)) with the following key components:

### Configuration
- `docs.json` - Primary configuration defining navigation structure, theming, and external links
- `style.css` - Custom CSS with Entirius brand colors (primary: #00ACC1, light: #00E5FF, dark: #263238)
- `api-reference/openapi.json` - OpenAPI specification for automated API documentation

### Content Structure
The site is organized into 4 main tabs:
- **Docs**: Getting started guides and setup instructions
- **Development**: System architecture, services, and modules documentation
- **API Reference**: API documentation with endpoint examples
- **Changelog**: Version history and release notes

### Content Format
- All content written in MDX format (Markdown with React components)
- Images stored in `/images/` with organized subdirectories
- Brand assets in `/logo/` directory

### Deployment
- Automatic deployment via Mintlify's GitHub integration
- Changes to main branch automatically deploy to production
- No manual build process required

## Key Development Notes

- The site focuses on documenting a modular e-commerce platform with services like `entirius-backend` and modules like `entirius-config` and `entirius-pim`
- Navigation structure is defined entirely in `docs.json` - adding new pages requires updating this configuration
- The site serves both technical developers and business users, with content structured accordingly
- Custom theming maintains Entirius brand identity while leveraging Mintlify's built-in components

## Architecture Decision Records (ADRs)

The project uses Architecture Decision Records to document key technical decisions. Current ADRs include:

- **ADR-001**: Modular Monolith Architecture - Foundation architectural pattern
- **ADR-002**: OpenAPI and Django Rest Framework - Backend API framework choice
- **ADR-003**: Next.js for Frontend Applications - Frontend framework decision
- **ADR-004**: Mozilla Public License for Codebase - Open-source licensing choice
- **ADR-005**: GitHub as Code Repository - Version control and collaboration platform
- **ADR-006**: Mintlify for Technical Documentation - Documentation platform choice

All ADRs are located in `/development/architecture/adr/` and follow the established template.

## Technology Stack

Based on architectural decisions, Entirius uses:

### Backend
- **Django** with Django Rest Framework for API development
- **OpenAPI 3.0** for API documentation and schema validation
- **Python 3** as primary programming language
- **PostgreSQL** as database (modular monolith architecture)

### Frontend
- **React** with **Next.js** framework for both customer and admin applications
- **TypeScript** for type safety and developer experience
- Server-side rendering (SSR) for SEO optimization

### Development & Operations
- **GitHub** for source code management, issue tracking, and CI/CD
- **Mozilla Public License 2.0** for open-source distribution
- **Mintlify** for technical documentation platform


# Development local environment

Below are the code repositories on which the Development is carried out with the use of a pycharm in which Claude can change on the local disk.

- Entirius Backend: ../services/entirius-backend/
- Entirius PIM: ../modules/entirius-pim/


