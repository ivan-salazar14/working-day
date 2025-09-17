# Project Development Process Guide

This guide outlines the step-by-step process for using the `.planr/` template system to develop software projects. It ensures all roles work cohesively from planning to implementation.

## Phase 1: Project Initialization

### Step 1.1: Set Up Project Structure
- Copy `.planr/` to your project root
- Initialize version control (Git)
- Set up basic project directory structure

### Step 1.2: Define Tech Stack
- Customize `tech-stack.md` with your chosen technologies
- Update `rules/` files with specific framework details
- Document installation and setup procedures

### Step 1.3: Configure Development Environment
- Set up local development environment
- Configure CI/CD pipelines if applicable
- Establish coding standards and linting rules

## Phase 2: Product Planning

### Step 2.1: Create PRD
- Gather product requirements and stakeholder input
- Use `prd-promt.md` to generate comprehensive PRD
- Include user personas, stories, and acceptance criteria

### Step 2.2: Break Down User Stories
- Extract user stories from PRD
- Create individual story files in `stories/` using `US-template.md`
- Assign priorities and estimate effort

### Step 2.3: Update Roadmap
- Populate `roadmap.json` with all user stories
- Set initial status to "todo"
- Establish project milestones

## Phase 3: Architecture & Design

### Step 3.1: Create SRS
- Use `srs-promt.md` to generate SRS from PRD
- Define functional and non-functional requirements
- Specify system interfaces and constraints

### Step 3.2: Design API
- Use `api-promt.md` to design API specifications
- Define endpoints, data formats, and authentication
- Consider different API paradigms (REST, GraphQL, etc.)

### Step 3.3: Establish Coding Standards
- Customize `rules/` for your tech stack
- Define naming conventions and code organization
- Set up automated code quality checks

## Phase 4: Implementation

### Step 4.1: Story Implementation Cycle
For each user story in `roadmap.json`:

1. Move story status to "in_progress"
2. Create detailed implementation plan using `task-template.md`
3. Implement code following defined rules
4. Write unit and integration tests
5. Update documentation
6. Move story to "done" and update roadmap

### Step 4.2: Continuous Integration
- Run automated tests on each commit
- Perform code reviews
- Maintain documentation currency

### Step 4.3: Iterative Development
- Demo completed features to stakeholders
- Gather feedback and adjust requirements
- Plan next iteration based on priorities

## Phase 5: Testing & Quality Assurance

### Step 5.1: Unit Testing
- Achieve minimum coverage defined in rules
- Test edge cases and error conditions
- Automate test execution

### Step 5.2: Integration Testing
- Test component interactions
- Validate API contracts
- Perform end-to-end testing

### Step 5.3: Security & Performance Testing
- Conduct security audits
- Performance benchmarking
- Load testing for scalability

## Phase 6: Deployment & Maintenance

### Step 6.1: Deployment Preparation
- Set up production environment
- Configure monitoring and logging
- Prepare rollback procedures

### Step 6.2: Release Management
- Tag releases in version control
- Update documentation
- Communicate changes to users

### Step 6.3: Post-Release Activities
- Monitor system performance
- Collect user feedback
- Plan future enhancements

## Role Responsibilities

### Product Manager
- Own PRD creation and maintenance
- Prioritize user stories
- Validate feature completeness

### Software Architect
- Design system architecture
- Ensure technical feasibility
- Guide technology decisions

### Backend Architect
- Design APIs and data models
- Implement server-side logic
- Ensure scalability and security

### Frontend Developer
- Implement user interfaces
- Ensure responsive design
- Optimize user experience

### QA Engineer
- Define testing strategies
- Execute test plans
- Report and track defects

## Quality Gates

- **Planning Gate**: PRD and SRS approved
- **Architecture Gate**: Design reviews completed
- **Implementation Gate**: Code reviews and tests passed
- **Release Gate**: All acceptance criteria met, no critical bugs

## Metrics & Monitoring

- Track story completion velocity
- Monitor code quality metrics
- Measure test coverage
- Collect deployment success rates

## Continuous Improvement

- Conduct retrospectives after each phase
- Update templates based on lessons learned
- Refine processes for efficiency
- Share best practices across projects

This process ensures systematic, high-quality software development with clear accountability and traceability throughout the project lifecycle.