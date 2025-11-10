# Database Schema Synchronization Process

This document explains how to keep database schema documentation in sync between the Python Discord bot and TypeScript frontend.

---

## Overview

**Schema Documentation**: `docs/DATABASE_SCHEMA.md`

This file is the single source of truth for database structure shared between projects.

---

## Process

### 1. Export: Python Bot → Markdown (After Database Changes)

After modifying database structure in the Python bot, use a coding agent to update the schema documentation:

**Example Prompt:**

```
Update docs/DATABASE_SCHEMA.md to reflect the current database schema used in the codebase.
```

The agent will analyze your code and update the documentation automatically.

### 2. Import: Markdown → TypeScript Frontend

After copying the updated `DATABASE_SCHEMA.md` to your frontend repository, use a coding agent to sync TypeScript types:

**Example Prompt:**

```
Update TypeScript types/interfaces to match docs/DATABASE_SCHEMA.md
```

The agent will read the schema doc and update your TypeScript definitions automatically.

---

## Example Workflow

```bash
# In Python bot repository (after making database changes)
> "Update docs/DATABASE_SCHEMA.md to reflect the current database schema"

git add docs/DATABASE_SCHEMA.md src/...
git commit -m "feat: add email field to introductions"
git push

# In TypeScript frontend repository
cp ../discord-bot/docs/DATABASE_SCHEMA.md ./docs/

> "Update TypeScript types/interfaces to match docs/DATABASE_SCHEMA.md"

git add docs/DATABASE_SCHEMA.md src/types/...
git commit -m "chore: sync database schema types"
```

---

**Last Updated**: 2025-11-10
