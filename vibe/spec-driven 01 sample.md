Here’s a **clean, realistic, end‑to‑end sample of a Spec‑Driven Development workflow** — the kind of process teams use when incorporating AI (like Copilot) into requirements → architecture → code → test flow.

This example is technology‑agnostic and usable in any modern team.

***

# ✅ **Spec‑Driven Development (AI‑Assisted) — Sample Workflow**

***

# **1. Capture Intent (High-Level Requirement)**

**Input (from Product Owner / Stakeholder):**

> “Users need a way to reset their password.”

**AI Role:**

*   Extracts core intent
*   Identifies missing details
*   Asks clarifying questions
*   Removes ambiguity

**Output (AI-generated questions):**

*   Should reset be via email, SMS, or both?
*   What’s the token expiration time?
*   Should the system limit how often reset emails can be sent?
*   Should activity be logged?

***

# **2. Define Formal Specification (AI‑Generated)**

After clarifications, AI generates a **formal spec**:

### ✅ **Feature: Password Reset**

**User Story:**  
As a user, I want to reset my password so I can regain access if I forget it.

**Functional Requirements:**

1.  User enters email on `/forgot-password`.
2.  System sends a reset link containing a signed token (expires in 15 minutes).
3.  User clicks link → opens `/reset-password?token=XYZ`.
4.  User enters new password twice.
5.  System validates token and updates password.
6.  Notify user via email: “Your password has been changed.”

**Non-Functional Requirements:**

*   Rate limit: max 3 reset emails per hour per IP.
*   Logging: log reset attempts + success events.
*   Security: token must be single-use + signed + time-bound.

**Acceptance Criteria (BDD / Gherkin):**

    Given a user with a valid email
    When they request a password reset
    Then they receive a reset link via email

    Given the user clicks an unexpired token
    When they submit a new password
    Then the password is updated and the token becomes invalid

    Given the user clicks an expired token
    Then they see an "Expired Link" error

***

# **3. Auto-Generate Technical Artifacts**

AI converts the spec into **developer-ready outputs**.

## ✅ API Contract (OpenAPI Snippet)

```yaml
paths:
  /auth/forgot-password:
    post:
      requestBody:
        email: string
      responses:
        200:
          description: Reset email sent

  /auth/reset-password:
    post:
      requestBody:
        token: string
        newPassword: string
      responses:
        200:
          description: Password reset successful
```

## ✅ Data Entities / Models

```ts
PasswordResetToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  used: boolean;
}
```

## ✅ Sequence Diagram (Text Version)

1.  User → Frontend: Submit email
2.  Frontend → Backend: POST /forgot-password
3.  Backend → DB: Create token
4.  Backend → Email Service: Send reset email
5.  User → Frontend: Click link
6.  Frontend → Backend: POST /reset-password
7.  Backend → DB: Validate + update password

***

# **4. AI Generates Code Skeletons**

### ✅ Backend (Example: Node + Express)

```ts
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password", resetPassword);
```

### ✅ Service Logic Stub

```ts
export async function requestPasswordReset(email: string) {
  // TODO: validate email
  // TODO: generate token
  // TODO: send email
}
```

### ✅ Frontend UI Stub (React)

```tsx
export function ResetPasswordForm() {
  // TODO: form logic
  return (<form>...</form>);
}
```

Developers now implement the real logic—no blank pages, no ambiguity.

***

# **5. AI Generates Test Cases**

### ✅ Unit Test Examples

```ts
it("should reject expired token", async () => {
  // TODO: mock expired token
});
```

### ✅ Integration Test Example

```ts
it("should update password and invalidate token", async () => {});
```

### ✅ E2E Acceptance Tests (Cypress-like)

```js
cy.visit('/forgot-password')
cy.get('input[type=email]').type('user@example.com');
cy.contains('Send Reset Link').click();
```

***

# **6. Implementation by Developers**

At this stage, engineers:

*   Fill in business logic
*   Connect services
*   Apply security and validation
*   Ensure performance and reliability
*   Review PRs

AI continues supporting by generating helper functions, refactors, or documentation.

***

# **7. Final Documentation (AI‑Generated)**

AI compiles all artifacts into a unified document:

*   Feature description
*   API endpoints
*   Database changes
*   Sequence diagrams
*   Test suite summary
*   Architectural decisions

This goes into Confluence, GitHub Wiki, or internal docs.

***

# ✅ **End Result**

A consistent, structured, and efficient workflow where:

*   **Requirements are clear**
*   **Specs drive code**
*   **AI removes ambiguity**
*   **Developers focus on logic, not boilerplate**
*   **Documentation stays in sync**

***

# ✅ If you want, I can generate:

✅ A **full template** your team can reuse  
✅ A **custom spec-driven workflow** for your company  
✅ A **prompt library** for AI-assisted spec generation  
✅ A **sample real feature** (e-commerce, banking, etc.)

Would you like one of those?
