# Grow Tech Backend — Clean Build Plan

> **Status:** As of October 4, 2026  
> **Purpose:** This document is the implementation source of truth for the remaining Grow Tech backend work. It is intentionally simple so it can be handed directly to an AI coding agent.

---

## 1. Current State

The backend project already has its basic foundation.

### Already completed — DO NOT REBUILD

- Express.js backend/project setup
- TypeScript setup
- Environment variable loading
- Prisma setup and Prisma client
- MongoDB connection/configuration
- Existing database schema
- Basic HTTP response/error helpers
- Health-check route
- Basic backend project structure/foundation

**Important for AI agents:** Do not recreate or replace these pieces unless the existing implementation is broken or a later task explicitly requires a change.

The remaining work starts with the application features.

---

# 2. Project Goal

Build a small backend for the Grow Tech website with three responsibilities:

1. **Lead capture** — visitors submit a project/request form.
2. **Public content API** — the landing page and public pages read services, packages, FAQs, testimonials, case studies and blog posts.
3. **Admin API** — authenticated admins manage leads and website content.

Keep the implementation straightforward.

### Explicitly out of scope for now

Do **not** add:

- Redis / Upstash Redis
- Cloudflare Turnstile
- CAPTCHA services
- Email automation
- Password-reset email flows
- Admin invitation email systems
- File-upload infrastructure
- Cloudinary/S3/UploadThing integration
- Performance/Lighthouse scorecard
- Cron jobs
- RSS
- Complex caching infrastructure
- Request-ID infrastructure
- Advanced observability/logging systems
- Separate backend service
- Any other infrastructure not required by the routes below

These can be added later if the project actually needs them.

---

# 3. Tech Stack

Use the existing project stack.

- Express.js
- TypeScript
- standard request validation
- Prisma
- MongoDB

Do not introduce another backend framework.

---

# 4. Architecture

Keep route handlers thin.

```text
Request
  ↓
Route Handler
  ↓
standard request validation Validation
  ↓
Service
  ↓
Prisma
  ↓
DTO / Response
```

### Responsibilities

**Route handlers**
- Read request data
- Authenticate admin routes
- Validate input
- Call services
- Return HTTP responses

**Services**
- Contain business logic
- Contain Prisma queries
- Do not expose database-only fields

**Validation**
- standard request validation schemas for request bodies and query parameters

**DTOs / mappers**
- Convert database records into API responses
- Never return sensitive fields such as password hashes

---

# 5. Suggested Folder Structure

Use the existing structure where possible. Do not reorganize the project unnecessarily.

```text
    src
    ├───controllers
    ├───db
    ├───generated
    │   └───prisma
    │       ├───internal
    │       └───models
    ├───middleware
    ├───routes
    ├───services
    ├───types
    └───utils
```

Do not create folders for features that are not currently required.

---

# 6. API Conventions

Use these conventions consistently.

## Success

Single resource:

```ts
{
  data: T
}
```

List:

```ts
{
  data: T[]
}
```

Paginated list:

```ts
{
  data: T[],
  meta: {
    page: number,
    limit: number,
    total: number,
    totalPages: number
  }
}
```

## Errors

```ts
{
  error: {
    code: string,
    message: string,
    details?: {
      path: string,
      message: string
    }[]
  }
}
```

## IDs

MongoDB ObjectId strings.

## Dates

ISO 8601 strings.

## Pagination

For large collections:

```text
?page=1&limit=20
```

Defaults:

- page: `1`
- limit: `20`
- maximum limit: `100`

Packages, services, FAQs and testimonials do not need pagination.

## Content type

JSON requests only for JSON endpoints.

## CORS

Same-origin only. Do not add CORS unless a real requirement appears.

---

# 7. Public API

## 7.1 POST `/api/leads`

Creates a new website lead.

### Request

```ts
{
  name: string;
  email: string;
  websiteUrl?: string;
  goal: string;
  packageTier?: "LAUNCH" | "GROWTH" | "SCALE" | "NOT_SURE";
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
    referrer?: string;
    landingPath?: string;
  };
  hp?: string;
}
```

### Validation

- `name`: trim, 2–100 characters
- `email`: valid email, lowercase, max 254 characters
- `websiteUrl`: optional HTTP/HTTPS URL, max 2048 characters
- `goal`: 10–1000 characters
- `packageTier`: valid enum, default `NOT_SURE`
- UTM values: maximum 200 characters each
- `hp`: honeypot; should normally be empty

### Processing

1. Validate the request.
2. If the honeypot is filled, return the normal success response without saving.
3. Prevent obvious duplicate submissions from the same email within 10 minutes.
4. Create the lead with status `NEW`.

No CAPTCHA, Redis or email notification is required.

### Success

`201`

```ts
{
  data: {
    id: string;
    status: "NEW";
    receivedAt: string;
  }
}
```

Do not return the submitted personal information.

---

# 8. Public Content API

These routes expose published/active website content.

## GET `/api/landing`

Returns everything required by the main landing page.

```ts
{
  data: {
    services: ServiceDto[];
    packages: PackageDto[];
    caseStudies: CaseStudyCardDto[];
    testimonials: TestimonialDto[];
    faqs: FaqDto[];
    generatedAt: string;
  }
}
```

The landing page should receive up to 3 published case studies.

---

## GET `/api/packages`

Return active packages ordered by `sortOrder`.

---

## GET `/api/services`

Return active services ordered by `sortOrder`.

---

## GET `/api/faqs`

Return active FAQs ordered by `sortOrder`.

---

## GET `/api/testimonials`

Return published testimonials ordered by `sortOrder`.

Optional:

```text
?caseStudy=slug
```

---

## GET `/api/case-studies`

Return published case studies.

Use pagination.

Order by:

1. `sortOrder`
2. `publishedAt` descending

---

## GET `/api/case-studies/:slug`

Return one published case study.

Return `404` when:

- slug does not exist
- case study is unpublished

Include its published testimonials.

---

## GET `/api/posts`

Return published blog posts.

Use pagination.

Optional:

```text
?tag=...
```

Newest posts first.

---

## GET `/api/posts/:slug`

Return one published blog post.

Return `404` when:

- slug does not exist
- post is draft
- post is archived

---

# 9. Public DTOs

Use database-to-DTO mapping so internal database fields are never exposed.

```ts
type MetricDto = {
  label: string;
  value: string;
};

type ServiceDto = {
  id: string;
  slug: string;
  title: string;
  description: string;
};

type PackageDto = {
  id: string;
  tier: "LAUNCH" | "GROWTH" | "SCALE";
  name: string;
  bestFor: string;
  features: string[];
  priceFrom: number | null;
  currency: string;
  priceNote: string | null;
  isHighlighted: boolean;
};

type FaqDto = {
  id: string;
  question: string;
  answer: string;
};

type TestimonialDto = {
  id: string;
  authorName: string;
  authorRole: string | null;
  company: string | null;
  quote: string;
  avatarUrl: string | null;
  caseStudySlug: string | null;
};

type CaseStudyCardDto = {
  id: string;
  slug: string;
  clientName: string;
  industry: string;
  resultSummary: string;
  coverImageUrl: string | null;
  metrics: MetricDto[];
};

type CaseStudyDto = CaseStudyCardDto & {
  challenge: string;
  solution: string;
  techStack: string[];
  liveUrl: string | null;
  testimonials: TestimonialDto[];
  publishedAt: string;
};

type PostCardDto = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string | null;
  tags: string[];
  authorName: string;
  readingMinutes: number | null;
  publishedAt: string;
};

type PostDto = PostCardDto & {
  contentMd: string;
  updatedAt: string;
};
```

---

# 10. Admin Authentication

The admin API requires authentication.

Keep authentication simple for the first version.

## Roles

### OWNER

Can:

- manage users
- manage leads
- manage all content

### EDITOR

Can:

- manage leads
- manage website content

Cannot:

- manage users
- delete leads

---

## POST `/api/admin/auth/register`

Used only to create the first admin.

Request:

```ts
{
  name: string;
  email: string;
  password: string;
  bootstrapSecret: string;
}
```

Rules:

- Only works when no admin exists.
- `bootstrapSecret` must match the environment variable.
- First user becomes `OWNER`.
- Once an admin exists, this route returns `403`.

No invite system is required.

---

## POST `/api/admin/auth/login`

Request:

```ts
{
  email: string;
  password: string;
}
```

On success:

- validate credentials
- create a session
- set an HTTP-only cookie
- return the admin user

---

## POST `/api/admin/auth/logout`

Clear the session cookie.

Return `204`.

---

## GET `/api/admin/auth/me`

Return the currently authenticated admin.

---

## POST `/api/admin/auth/change-password`

Request:

```ts
{
  currentPassword: string;
  newPassword: string;
}
```

Update the authenticated user's password.

---

# 11. Admin Users API

Only `OWNER` can manage users.

## GET `/api/admin/users`

List admin users.

Use pagination.

---

## PATCH `/api/admin/users/:id`

Allow an owner to update:

```ts
{
  name?: string;
  role?: "OWNER" | "EDITOR";
  isActive?: boolean;
}
```

Protect against removing/deactivating the last active owner.

No user invitation system is required.

No password reset system is required.

---

# 12. Admin Leads API

## GET `/api/admin/leads`

List leads.

Supported filters:

```text
?status=NEW
?packageTier=GROWTH
?q=search
?from=ISO_DATE
?to=ISO_DATE
?page=1
?limit=20
```

Search can match:

- name
- email
- website

Return paginated results.

---

## GET `/api/admin/leads/:id`

Return one lead.

---

## PATCH `/api/admin/leads/:id`

Allow:

```ts
{
  status?: "NEW" | "CONTACTED" | "QUALIFIED" | "WON" | "LOST" | "SPAM";
  notes?: string;
}
```

When status first becomes `CONTACTED`, set `contactedAt`.

---

## DELETE `/api/admin/leads/:id`

Owner only.

Used when a lead needs to be deleted.

---

# 13. Admin Content Management

The following resources use the same CRUD pattern:

- packages
- services
- FAQs
- testimonials
- case studies
- posts

## List

```http
GET /api/admin/{resource}
```

Support:

```text
?page=1
?limit=20
?q=search
```

---

## Create

```http
POST /api/admin/{resource}
```

Validate the body with standard request validation.

---

## Get One

```http
GET /api/admin/{resource}/:id
```

---

## Update

```http
PATCH /api/admin/{resource}/:id
```

---

## Delete

```http
DELETE /api/admin/{resource}/:id
```

---

# 14. Content Fields

## Packages

```text
tier
name
bestFor
features
priceFrom
currency
priceNote
isHighlighted
isActive
sortOrder
```

Rules:

- tier must be `LAUNCH`, `GROWTH` or `SCALE`
- tier must be unique
- only one package can be highlighted

---

## Services

```text
slug
title
description
isActive
sortOrder
```

---

## FAQs

```text
question
answer
isActive
sortOrder
```

---

## Testimonials

```text
authorName
quote
authorRole
company
avatarUrl
caseStudyId
isPublished
sortOrder
```

---

## Case Studies

```text
slug
clientName
industry
challenge
solution
resultSummary
metrics
techStack
liveUrl
coverImageUrl
isPublished
sortOrder
```

When publishing for the first time, set `publishedAt`.

---

## Posts

```text
slug
title
excerpt
contentMd
authorName
coverImageUrl
tags
readingMinutes
seo
```

New posts start as drafts.

---

# 15. Post Publishing

## POST `/api/admin/posts/:id/publish`

Optional:

```ts
{
  publishedAt?: string;
}
```

If omitted, publish immediately.

---

## POST `/api/admin/posts/:id/unpublish`

Return the post to draft status.

---

# 16. Validation Rules

Apply these consistently.

### Slugs

```text
^[a-z0-9]+(?:-[a-z0-9]+)*$
```

Length:

- minimum 2
- maximum 60

### URLs

Only:

- `http://`
- `https://`

### Text

Keep sensible limits:

- titles: max 120 characters
- descriptions: max 500 characters
- post excerpts: max 300 characters
- lead notes: max 5000 characters

### Unknown fields

Admin requests should reject unknown fields with `422`.

Public requests should ignore unknown fields where appropriate.

---

# 17. Authentication Implementation

Use the existing authentication foundation if one already exists.

If authentication is not implemented yet:

- password hashing: bcrypt or argon2
- session: signed HTTP-only cookie
- session should contain the user ID
- every admin request verifies the session
- inactive users cannot access admin routes

Do not build:

- OAuth
- password reset
- email verification
- invite tokens
- multi-factor authentication

Those are future features.

---

# 18. HTTP Status Codes

Use:

| Status | Code | Meaning |
|---|---|---|
| 200 | — | Successful read/update |
| 201 | — | Resource created |
| 204 | — | Successful operation with no body |
| 400 | `BAD_REQUEST` | Malformed request |
| 401 | `UNAUTHENTICATED` | Missing/invalid login |
| 403 | `FORBIDDEN` | Insufficient permissions |
| 404 | `NOT_FOUND` | Resource does not exist |
| 409 | `CONFLICT` | Duplicate/unique conflict |
| 422 | `VALIDATION_ERROR` | Invalid input |
| 500 | `INTERNAL` | Unexpected server error |

Do not create additional error codes unless a real requirement appears.

---

# 19. Seed Data

Create/update:

```text
scripts/seed.ts
```

Seed enough content to make the frontend usable:

- 3 packages
- several services
- several FAQs
- several testimonials
- several case studies
- several blog posts
- one admin user only if the project explicitly wants seeded development credentials

Seed data should be safe for local development.

---

# 20. Implementation Order

Build in this order.

## Phase 1 — Lead Capture

Implement:

- `POST /api/leads`
- standard request validation validation
- honeypot
- duplicate prevention
- Prisma insert

### Done when

A valid form submission creates a `NEW` lead and invalid input returns useful validation errors.

---

## Phase 2 — Public Content

Implement:

- `/api/landing`
- `/api/packages`
- `/api/services`
- `/api/faqs`
- `/api/testimonials`
- `/api/case-studies`
- `/api/case-studies/:slug`
- `/api/posts`
- `/api/posts/:slug`

### Done when

The frontend can render all public website content entirely from the API.

---

## Phase 3 — Admin Authentication

Implement:

- register/bootstrap
- login
- logout
- me
- change password
- authentication guard
- OWNER/EDITOR authorization

### Done when

Unauthenticated users receive `401` from admin routes and role restrictions work correctly.

---

## Phase 4 — Admin Leads

Implement:

- lead list
- filtering
- lead detail
- lead updates
- lead deletion for OWNER

### Done when

Admins can use the API as a basic CRM for website leads.

---

## Phase 5 — Admin Content

Implement CRUD for:

- packages
- services
- FAQs
- testimonials
- case studies
- posts

Then implement:

- post publish
- post unpublish

### Done when

An admin can manage all website content without editing the database manually.

---

## Phase 6 — Seed and Integration Testing

Add realistic seed data and test the complete flow:

```text
Visitor
  ↓
Lead form
  ↓
POST /api/leads
  ↓
MongoDB

Admin
  ↓
Login
  ↓
Admin API
  ↓
Manage leads/content
  ↓
Public API
  ↓
Frontend
```

---

# 21. AI Agent Development Rules

This section is specifically for coding agents.

## Before changing code

1. Inspect the existing repository.
2. Read the existing Prisma schema.
3. Read existing route/helper files.
4. Identify what is already implemented.
5. Do not recreate existing foundations.
6. Reuse existing utilities.

## When implementing a feature

1. Create/update the standard request validation schema.
2. Create/update the service.
3. Create/update the route.
4. Add DTO mapping if needed.
5. Handle expected errors.
6. Test the route.
7. Only then move to the next feature.

## Keep changes small

Do not refactor unrelated code while implementing a feature.

Do not replace working dependencies without a reason.

Do not introduce infrastructure just because it is common in production systems.

## Database

Use Prisma for database access.

Do not write raw MongoDB queries unless Prisma genuinely cannot perform the required operation.

Do not modify unrelated schema models.

## Security

Never return:

- password hashes
- session secrets
- bootstrap secrets
- internal authentication fields

Never log passwords or tokens.

## API consistency

Every route should follow the same response format.

Avoid returning arbitrary response shapes from individual endpoints.

---

# 22. Final Route Checklist

### Public

- [x] `GET /api/health` — already implemented
- [ ] `POST /api/leads`
- [ ] `GET /api/landing`
- [ ] `GET /api/packages`
- [ ] `GET /api/services`
- [ ] `GET /api/faqs`
- [ ] `GET /api/testimonials`
- [ ] `GET /api/case-studies`
- [ ] `GET /api/case-studies/:slug`
- [ ] `GET /api/posts`
- [ ] `GET /api/posts/:slug`

### Admin Auth

- [ ] `POST /api/admin/auth/register`
- [ ] `POST /api/admin/auth/login`
- [ ] `POST /api/admin/auth/logout`
- [ ] `GET /api/admin/auth/me`
- [ ] `POST /api/admin/auth/change-password`

### Admin Users

- [ ] `GET /api/admin/users`
- [ ] `PATCH /api/admin/users/:id`

### Admin Leads

- [ ] `GET /api/admin/leads`
- [ ] `GET /api/admin/leads/:id`
- [ ] `PATCH /api/admin/leads/:id`
- [ ] `DELETE /api/admin/leads/:id`

### Admin Content

- [ ] `GET /api/admin/{resource}`
- [ ] `POST /api/admin/{resource}`
- [ ] `GET /api/admin/{resource}/:id`
- [ ] `PATCH /api/admin/{resource}/:id`
- [ ] `DELETE /api/admin/{resource}/:id`

### Posts

- [ ] `POST /api/admin/posts/:id/publish`
- [ ] `POST /api/admin/posts/:id/unpublish`

---

# 23. Definition of Done

The backend is ready for the first production version when:

- Prisma connects successfully to MongoDB.
- Health check works.
- Visitors can submit leads.
- Public website content can be read through the API.
- Admins can log in.
- OWNER and EDITOR permissions work.
- Admins can view and update leads.
- Admins can CRUD website content.
- Admins can publish/unpublish posts.
- Validation errors are consistent.
- Sensitive fields never appear in API responses.
- Seed data can populate a development database.
- The frontend can operate without direct database access.

Everything else can be added after this baseline is working.

---

# 24. Future Features — Not Part of This Build

Keep these out of the current implementation:

- Redis / distributed rate limiting
- CAPTCHA / Turnstile
- transactional email
- password reset emails
- admin invitation system
- image upload service
- performance scorecard
- Lighthouse CI integration
- scheduled jobs
- spam purge jobs
- RSS
- advanced caching
- analytics
- observability platforms
- advanced security infrastructure

The goal of this version is a **small, understandable, maintainable backend that works end-to-end**.
