---
description: use this ALWAYS to create/update a task in json
globs: docs/tasklist.json
alwaysApply: false
---

Use the following JSON to add a task

```json
{
  "id": "{{STORY-ID}}",
  "title": "Short descriptive title",
  "files": "docs/stories/{{STORY-ID}}.md",
  "status": "todo|done",
  "created": "YYYY-MM-DD",
  "updated": "YYYY-MM-DD",
  "notes": "add max 10 notes for other devs for documentation"
}
```