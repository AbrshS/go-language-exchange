# Frontend Architecture & Product Blueprint

Based on the robust microservices backend you have built (featuring Workflow Engines, RAG pipelines, and AI Agents), your frontend must be a **B2B Enterprise Dashboard**. 

This document outlines the comprehensive page-by-page structure, user flows, and how the frontend components will map directly to your backend microservices.

---

## 🏗️ Technology Stack Recommendation
- **Framework**: Next.js (App Router) for SEO-friendly marketing pages and highly dynamic dashboard rendering.
- **Styling**: Tailwind CSS + shadcn/ui (for enterprise-grade, accessible UI components).
- **State Management**: Zustand (client state) + React Query (server state & caching).
- **Workflow Builder**: React Flow (for visual, drag-and-drop workflow DAGs).

---

## 1. 🚪 Public & Authentication Flow
*Backend Mapping: `api-gateway` → `auth-service`*

This is the user's first impression. It needs to be frictionless while supporting enterprise security.

### Pages:
- **`/login` & `/signup`**: Standard email/password and Google/GitHub OAuth login. 
- **`/verify-mfa`**: (Required for enterprise users) TOTP code entry.
- **`/onboarding/organization`**: After signup, the user must create a "Workspace" (this creates a `Tenant` in the backend database, ensuring data isolation).
- **`/onboarding/invite`**: Prompt the user to invite team members to their newly created tenant.
- **`/forgot-password`**: Standard password reset flow.

---

## 2. 🏠 Dashboard Home (The Command Center)
*Backend Mapping: Aggregates data from `workflow-engine`, `billing-service`, and `agent-runtime`*

The overview screen when a user logs in.

### Features:
- **Quick Stats Bar**: Total workflows executed today, active AI agents, and API usage quota.
- **Recent Activity Feed**: A list of recently completed or failed workflows (powered by Redis Streams data).
- **System Health**: A small widget showing if backend integrations (like Salesforce) are connected and healthy.

---

## 3. 🧠 Knowledge Base (RAG & Documents)
*Backend Mapping: `document-intelligence` & `rag-pipeline` & `embedding-service`*

This is where users train the AI on their own data.

### Pages:
- **`/knowledge` (Document Library)**: A file explorer view showing uploaded PDFs, Word docs, and web links. 
- **`/knowledge/upload`**: A drag-and-drop interface for uploading large files. Shows a progress bar as the `document-intelligence` service extracts text and the `embedding-service` vectors it into Pinecone.
- **`/knowledge/test` (Playground)**: A chat interface where the user can query their uploaded documents to test the RAG (Retrieval-Augmented Generation) pipeline before putting it into a production workflow.

---

## 4. 🤖 AI Agents Hub
*Backend Mapping: `agent-runtime` & `llm-orchestrator`*

Where users configure the "brains" of the operation.

### Pages:
- **`/agents`**: A list of all configured AI Agents (e.g., "Customer Support Agent", "Sales Lead Scorer").
- **`/agents/create`**: 
  - **Prompt Engineering**: Text area to define the system prompt ("You are a helpful sales assistant...").
  - **Tool Selection**: Checkboxes to give the agent access to specific tools (e.g., "Allow Web Search", "Allow CRM Update").
  - **Model Selection**: Dropdown to choose the underlying LLM (GPT-4, Claude 3, etc.).
- **`/agents/[id]/logs`**: Real-time logs of the agent's thought process (showing how the `llm-orchestrator` parses reasoning steps).

---

## 5. ⚡ Workflow Builder (The Core Product)
*Backend Mapping: `workflow-engine`*

This is the visual engine of the platform where users connect Triggers to Actions.

### Pages:
- **`/workflows`**: Table view of all active/inactive workflows.
- **`/workflows/builder/[id]`**: A **visual, drag-and-drop canvas** (using React Flow).
  - **Triggers**: "On Webhook Received", "On Schedule", "On CRM Update".
  - **Logic Nodes**: "If/Else Conditions", "Delay".
  - **Action Nodes**: "Run AI Agent", "Query Knowledge Base", "Send Email".
- **`/workflows/[id]/runs`**: Execution history. Shows a green checkmark or red X for every step of the DAG (Directed Acyclic Graph) so users can debug exactly where a workflow failed.

---

## 6. 🔌 Integrations Directory
*Backend Mapping: `integration-service`*

Where users connect their third-party tools.

### Pages:
- **`/integrations`**: A marketplace-style grid of apps (HubSpot, Salesforce, Slack, Gmail).
- **`/integrations/[app]`**: Shows the connection status. Contains an "OAuth Connect" button which redirects to the third-party service and handles the callback via the `integration-service`.

---

## 7. ⚙️ Settings & Administration

### A. Team & Security
*Backend Mapping: `auth-service`*
- **`/settings/members`**: List of users in the organization.
- **`/settings/roles`**: (RBAC) Assign members as "Admin", "Editor", or "Viewer".
- **`/settings/security`**: Enforce Organization-wide MFA or Single Sign-On (SSO/SAML).

### B. API & Developers
*Backend Mapping: `api-gateway` & `auth-service`*
- **`/settings/api-keys`**: Generate, view, and revoke long-lived API keys.
- **`/settings/webhooks`**: Register URLs where the platform will send events (e.g., "Workflow Completed").

### C. Billing & Usage
*Backend Mapping: `billing-service`*
- **`/settings/billing`**: View current subscription tier (e.g., Starter vs Enterprise).
- **`/settings/usage`**: Visual charts showing API calls made, LLM tokens consumed, and storage used. Includes a button to download past Stripe invoices.

---

## 🔁 Typical User Journey (End-to-End)

1. **Jane** signs up and creates her workspace "Acme Corp" (`auth-service`).
2. She navigates to **Integrations** and connects her Salesforce account (`integration-service`).
3. She navigates to **Knowledge Base** and uploads Acme Corp's 50-page employee handbook (`document-intelligence` + `embedding-service`).
4. She creates an **AI Agent** called "HR Assistant", gives it access to the handbook, and sets its prompt to answer HR queries (`agent-runtime`).
5. She goes to the **Workflow Builder** and creates a flow: 
   *TRIGGER: New Slack Message in #hr-help* → *ACTION: Run HR Assistant Agent* → *ACTION: Reply in Slack* (`workflow-engine`).
6. At the end of the month, the **Billing** page charges Acme Corp based on the tokens used by the HR Assistant (`billing-service`).
