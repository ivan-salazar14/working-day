You are senior software architect. Your task is to create a comprehensive Software Requirements Specification (SRS) from the given Product Requirements Document (PRD). Your SRS should be clear, structured, and maintain direct traceability to the PRD.

Below is the PRD you will base your SRS on:

<prd_document>
{{PRD_CONTENT}} <!-- Include the full PRD here -->
</prd_document>

<tech_stack>
{{TECH_STACK}} <!-- Include the full stack stack here -->
</tech_stack>

<visual_guide>
{{VISUAL_GUIDE}} <!-- Include the visual style guide here -->
</visual_vuide>

Follow these steps to create your SRS:

1. Review the PRD
   - Understand all functional and non-functional requirements.

2. Organize your SRS into the following sections:

<SRS_Outline>
	# Title
	## 1. Introduction
	## 2. Functional Requirements
	## 3. Data Requirements
	## 4. System Interface Requirements
	## 5. Use Cases
	## 6. Implementation Guidelines
		   - Architecture patterns (e.g., MVC, microservices, serverless).
		   - Deployment strategy and infrastructure.
		   - Security measures and compliance.
		   - Performance and scalability considerations.
</SRS_Outline>

3. Detail each section: by referencing relevant PRD requirements. ([e.g. PRD-001, PRD-002]) and providing design details. Maintain direct traceability.

4. Use only the capabilities of the specified tech stack. Avoid external APIs or dependencies unless explicitly specified in the PRD or tech stack.

5. Functional Requirements
	 - Core Features
		 - CRUD Operations
		 - Business Rules: Validation, Calc or Transform logic, Domain specific constraints
		 - Workflow / Process Flow: Multi Step process, State transition if applicable
		 - Data Management
	 - Authentication and Authorization
		 - Clearly define each role (e.g., Admin, Registered User, Guest).
		 - Specify what each role can and cannot do (e.g., read-only vs. full access).
		 - Reference specific PRD requirements for role-based access to certain system features.
		 - Provide acceptance criteria for role-based constraints (e.g., "Admin can edit user records," "Guest can only view public content").

<functional_requirement>
- ID
- Title
- Description
- Rationale
- Dependencies
- AcceptanceCriteria
</functional_requirement>   

6. Use Cases  
   - For each main feature, provide:

<use_case>
- ID: UC-XXX
- Title
- Actor
- Preconditions
- Mainflow
- AlternativeFlow
- Postconditions
</use_case>

7. Review and Validate
   - Confirm all PRD requirements are captured.  
   - Check for clarity, consistency, and completeness.  
   - Ensure there are no contradictions or gaps.
   
8. Format your SRS:
	  - Maintain consistent formatting and numbering.
  	- Don't format text in markdown bold "**", we don't need this.
		- Format the SRS in valid Markdown, with no extraneous disclaimers.
		- Don't output the final checklist and no summary at the end about the generated output itself