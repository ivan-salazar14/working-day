# .planr/ - Project Planning and Implementation Template

This directory contains a comprehensive template system for planning, architecting, and implementing software projects using AI-assisted workflows. It defines roles for dev team members and provides prompts, rules, and modes to guide the development process from ideation to deployment.

## Overview

The `.planr/` system is designed to standardize software development processes by assigning specific roles to AI agents or human developers. Each role has dedicated prompts and guidelines to ensure consistency and quality across projects, regardless of tech stack.

## Directory Structure

- `api-promt.md` - Prompt for Backend Architects to design APIs
- `nextjs-promt.md` - Prompt for Frontend Developers (adaptable to other frameworks)
- `prd-promt.md` - Prompt for Product Managers to create Product Requirements Documents
- `srs-promt.md` - Prompt for Software Architects to create Software Requirements Specifications
- `roadmap.json` - Tracks user stories and project progress
- `tech-stack.md` - Example tech stack configuration (customize for your project)
- `tech-stack-example.md` - Detailed tech stack example with installation steps
- `tech-stack-formatter.md` - Prompt for formatting tech stack documentation
- `modes/` - AI agent modes for different phases (planning, implementation, etc.)
- `rules/` - Coding standards and rules (template-based for any tech stack)
- `stories/` - Templates for user stories and tasks

## Roles and Workflow

### 1. Product Manager (PRD)
- **File**: `prd-promt.md`
- **Responsibilities**: Define product vision, user personas, user stories, and high-level requirements
- **Output**: Product Requirements Document (PRD)

### 2. Software Architect (SRS)
- **File**: `srs-promt.md`
- **Responsibilities**: Design system architecture, functional requirements, data models, interfaces
- **Output**: Software Requirements Specification (SRS)

### 3. Backend Architect (API)
- **File**: `api-promt.md`
- **Responsibilities**: Design API endpoints, request/response formats, authentication
- **Output**: API Design Document

### 4. Frontend Developer
- **File**: `nextjs-promt.md`
- **Responsibilities**: Implement UI/UX, components, client-side logic
- **Output**: Working frontend code

### 5. Implementation Agent
- **File**: `modes/implement.md`
- **Responsibilities**: Execute user stories, write code, update documentation
- **Output**: Completed features

## Manual Usage Guide

### Step 1: Project Initialization
1. Copy the `.planr/` directory to your new project root
2. Customize `tech-stack.md` for your chosen technologies
3. Update placeholders in rules (e.g., `{{FRAMEWORK}}` → `Express.js`)

### Step 2: Planning Phase
1. Use `prd-promt.md` to generate a PRD based on your product idea
2. Break down the PRD into user stories using `stories/US-template.md`
3. Update `roadmap.json` with the stories

### Step 3: Architecture Phase
1. Use `srs-promt.md` to create an SRS from the PRD
2. Design the API using `api-promt.md`
3. Define coding rules by filling in the templates in `rules/`

### Step 4: Implementation Phase
1. For each user story in `roadmap.json`:
   - Create a detailed story file in `stories/` using the template
   - Implement the code following the defined rules
   - Update story status and add developer notes

### Step 5: Quality Assurance
1. Follow testing rules from `rules/001-tests.md`
2. Ensure security compliance per `rules/002-security.md`
3. Update documentation as per `rules/004-docs.md`

## Customization for Different Tech Stacks

1. **Backend**: Replace FastAPI references with your framework (e.g., Express.js, Django)
2. **Frontend**: Adapt `nextjs-promt.md` principles to your framework (React, Vue, Angular)
3. **Database**: Update ORM and database references in rules
4. **Rules**: Fill in placeholders like `{{TECH_STACK}}`, `{{FRAMEWORK}}`, etc.

## AI Integration

This system is optimized for use with AI coding assistants. Each prompt is designed to be fed into an LLM to generate the respective documents or code. Use the modes in `modes/` to switch AI behavior for different tasks.

## Best Practices

- Always maintain traceability between PRD, SRS, and implementation
- Update roadmap.json regularly to track progress
- Use the story templates for consistent documentation
- Customize rules based on team preferences and project needs
- Review and update prompts as you discover improvements

## Example Workflow

1. Product Manager: "Create PRD for a task management app"
2. Software Architect: "Generate SRS from PRD"
3. Backend Architect: "Design REST API for tasks"
4. Frontend Developer: "Build React components for task list"
5. Implementation: Execute each user story incrementally

This template ensures comprehensive project planning and consistent implementation across any tech stack.