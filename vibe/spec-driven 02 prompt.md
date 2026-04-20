Absolutely — here is a **clean, structured, battle‑tested Prompt Library for AI-Assisted Spec Generation**, designed for developers, product teams, and architects using a spec‑driven workflow.

This library includes prompt templates for:

✅ Feature specs  
✅ API design  
✅ Data modeling  
✅ Acceptance criteria (BDD)  
✅ Architecture diagrams  
✅ Flow diagrams  
✅ Security specs  
✅ Test generation  
✅ Code scaffolding  
✅ Documentation

All prompts are **plug‑and‑play** and tailored for tools like GitHub Copilot, M365 Copilot, ChatGPT, etc.

***

# 🔧 **AI-Assisted Spec Generation — Prompt Library**

Each prompt includes:

✅ **Purpose**  
✅ **Prompt Template**  
✅ **Example Usage**

Copy → Paste → Replace placeholders.

***

# ✅ 1. **Feature Specification Prompt**

**Purpose:** Generate a complete formal feature specification from a business requirement.

**Prompt Template:**

    You are a senior solution architect. Convert the following high-level requirement into a complete formal specification. 
    Include:

    1. User story
    2. Functional requirements
    3. Non-functional requirements
    4. Business rules
    5. Data requirements
    6. Success criteria
    7. Edge cases
    8. Constraints

    Requirement:
    [PASTE REQUIREMENT HERE]

    Ask clarifying questions if needed.

**Example Usage:**  
“Users need a bookmark feature for saved articles.”

***

# ✅ 2. **API Specification Prompt (OpenAPI)**

**Purpose:** generate consistent API specification from written requirements.

    Generate a full API specification (OpenAPI 3.0 YAML) for the following feature:

    [FEATURE DESCRIPTION]

    Include:
    - Paths
    - Request body schemas
    - Response schemas
    - Status codes
    - Validation rules
    - Example payloads

***

# ✅ 3. **Data Model / ERD Prompt**

    Generate a normalized data model based on this feature:

    [FEATURE]

    Output:
    - Entities
    - Attributes (name, type, constraints)
    - Relationships (1:1, 1:N, N:N)
    - ERD (text-based or Mermaid)
    - Justification for design decisions.

***

# ✅ 4. **Acceptance Criteria (BDD) Prompt**

    Generate complete BDD acceptance criteria (Gherkin format) for this feature:

    [FEATURE]

    Include:
    - Positive scenarios
    - Negative scenarios
    - Edge cases
    - Security scenarios

***

# ✅ 5. **Architecture Breakdown Prompt**

    Act as a software architect. Break the following feature into architectural components:

    [FEATURE]

    Deliverables:
    - High-level architecture
    - Sequence diagram (Mermaid)
    - Component responsibilities
    - Integration points
    - Risks and assumptions

***

# ✅ 6. **User Flow / System Flow Diagram Prompt**

    Create a system flow and user flow diagram for this feature:

    [FEATURE]

    Output in Mermaid format.
    Include:
    - Decision points
    - External systems
    - Data inputs/outputs

***

# ✅ 7. **Security Requirements Prompt**

    Generate security specifications for this feature:

    [FEATURE]

    Include:
    - Authentication requirements
    - Authorization requirements
    - Data validation
    - Input sanitization
    - Logging and monitoring
    - Audit requirements
    - OWASP risks and mitigations

***

# ✅ 8. **Test Case Generation Prompt**

    Generate a test plan for this feature:

    [FEATURE]

    Include:
    - Unit tests
    - Integration tests
    - End-to-end tests
    - API tests
    - Negative & edge tests
    - Required test data

***

# ✅ 9. **Code Skeleton Prompt**

    Generate code skeletons based on this spec:

    [SPEC]

    Deliver:
    - Folder structure
    - Controller/handler skeletons
    - Service layer skeletons
    - Repository/data-access skeletons
    - Interfaces/DTOs
    - No business logic, only scaffolding

***

# ✅ 10. **Full Spec-Driven Flow Prompt (End-to-End)**

A prompt that generates an entire spec pack in one go.

    You are an AI architect. Produce a full specification package for this feature:

    [FEATURE]

    Include:
    1. User story
    2. Functional requirements
    3. Non-functional requirements
    4. Business rules
    5. Acceptance criteria (BDD)
    6. API spec (OpenAPI YAML)
    7. Data model (ERD + tables)
    8. Architecture diagram (Mermaid)
    9. System sequence diagram
    10. Test plan
    11. Code skeleton (scaffolding only)

    Ask clarifying questions if anything is ambiguous.

***

# ✅ 11. **Refinement Prompt**

Use this to improve a spec.

    Refine this specification for clarity, completeness, and engineering usability.
    Identify ambiguities and propose improvements.

    [SPEC]

***

# ✅ 12. **Comparison Prompt (Options Evaluation)**

    Provide 2–3 architectural options for implementing this feature:

    [FEATURE]

    For each option, provide:
    - Summary
    - Pros
    - Cons
    - Complexity level
    - Suggested use cases

***

# ✅ 13. **Change Impact Analysis Prompt**

    Analyze the impact of this change request on the existing spec:

    [CHANGE REQUEST]
    [CURRENT SPEC]

    Include:
    - Affected components
    - Required API changes
    - Required database changes
    - Regression risks
    - Test updates

***

# ✅ 14. **Documentation Generation Prompt**

    Generate clean technical documentation in Markdown for this feature:

    [SPEC]

    Include:
    - Overview
    - Architecture
    - API references
    - Models
    - Workflow diagrams
    - Usage examples

***

# ✅ 15. **Prompt for Clarification-First Mode**

Use this for situations where requirements tend to be vague.

    You MUST ask all necessary clarifying questions before producing any spec. 
    Do not generate output until requirements are fully understood.

    Initial requirement:
    [REQUIREMENT]

***

# ✅ Want this as a **downloadable playbook**?

I can generate:

✅ A PDF of this library  
✅ A Notion template  
✅ A Markdown file for your repo  
✅ A VS Code snippet pack  
✅ A tailored version for your team or tech stack

Just tell me which format you want!
