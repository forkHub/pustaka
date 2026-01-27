Got it — that’s a *very* common pattern among creative programmers and freelancers:

You get deeply focused on the **latest** idea/project, and older ones fade away.  
This isn’t a personal flaw — it’s a **brain pattern**: we get energy from *new problems*, not ongoing maintenance.

So you need a **system that protects old projects even when your focus moves elsewhere** — and your markdown‑only workflow makes this easier.

Below is a practical, simple framework designed specifically for people like you.

***

# 🎯 The ANCHOR System

### *(Anti-Neglect, Clear History, Organized Review)*

A markdown-based workflow **to prevent projects from getting lost** even when your brain jumps to new ones.

It has 3 core components:

1.  **A high-level Project Index (master list)**
2.  **A Weekly Reset that updates the status of each project**
3.  **A “Last Touched” marker on every project**

This ensures nothing disappears into chaos.

***

# 🔥 1. Create a MASTER PROJECT INDEX

File: `03_projects/_index.md`

This becomes your “map” so you never lose sight.

```markdown
# 🗺 Project Index

## 🟢 Active Projects
- [PROJECT NAME] – last touched: 2026-01-07  
- [PROJECT NAME] – last touched:

## 🟡 On Hold (intentional pause)
- 

## 🔴 Dormant (forgotten or revived later)
- 

## 🧨 Ideas & Experiments
- New App idea – started: 
- Script Automation – started:
```

Every time you open or edit any project, update **last touched**.  
(It takes 5 seconds but saves weeks of forgetting.)

***

# 🔥 2. Add a **Status Header** to every project file

At the top of each project:

```markdown
# 🚀 Project: {{NAME}}

**Status:** Active / On Hold / Dormant  
**Last touched:** 2026-01-07  
**Next Action:** (1 small next step only)
```

### Why it works

*   When you open the file, you instantly remember where you left off.
*   The “Next Action” prevents confusion when returning after weeks.

***

# 🔥 3. Weekly Reset (the secret sauce)

Once a week (5–10 minutes):

1.  Open `_index.md`
2.  Check each project’s “last touched” date
3.  Reclassify:
    *   If untouched for 2+ weeks → move to **On Hold**
    *   If untouched for 2+ months → move to **Dormant**
    *   If still important → bump “Next Action”

This makes sure you **never lose track** of anything.

Use this template:

### `02_weekly/reset.md`

```markdown
# 🔁 Weekly Reset — Week {{WEEK}}

## 🟢 Active Projects (review)
- Project A → next action:
- Project B → next action:

## 🟡 On Hold (check if revival needed)
- 
   
## 🔴 Dormant (archive or revive?)
- 

## 🧨 New ideas (sort into index)
- 
```

***

# 🔥 4. Use “Next Action” to fight overwhelm

People who jump to new ideas often see big projects and freeze.  
So **every project must only contain ONE next step at the top**.

Examples:

❌ Build API for client project  
✔ “Write the login request function”

❌ Finish dashboard  
✔ “Create user list component”

Your brain loves small tasks — it helps you come back even after weeks.

***

# 🔥 5. Add a “What was I doing?” trail in each project

At the bottom of each project markdown:

```markdown
## 🧵 Activity Log
- 2026-01-07 → implemented routing, next: build token validation
- 2026-01-03 → created folder structure
- 2025-12-28 → initial commit
```

This helps you **jump back instantly** even after long breaks.

***

# 🔥 6. Daily Habit: 15-second check

When you close your laptop:

**Open `_index.md` and update “last touched” for the day.**

That’s it.

It keeps your “map” up to date.

***

# 🧩 Putting It Together (Example Workflow)

### Morning

*   Open `_index.md` → choose 1 project
*   Check its “Next Action” → start

### Afternoon

*   Update the “last touched” date

### Weekly

*   Promote/demote projects
*   Review what got ignored
*   Prevent unintentional forgetting

***

# 🧰 If you want, I can generate:

✔ all markdown template files  
✔ with folder structure  
✔ as a downloadable ZIP  
✔ and pre-written sample content

Just say: **“Generate the ZIP.”** or **“Create the full structure.”**

Would you like me to generate it?
