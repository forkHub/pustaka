Good question — this changes the logic **slightly but cleanly**, depending on what you want the wall to do.

You now have:

*   ✅ **Two friendly towers** (same group)
*   ❌ **One enemy tower**

I’ll explain the **correct model**, then give the **exact edge rule**.

***

## 1. Define Areas Precisely

### Friendly protected area (union)

A cell is **friendly‑protected** if it is inside **either friendly tower**:

    friendly(x, y) =
        dist((x,y), F1) ≤ r1
     OR dist((x,y), F2) ≤ r2

### Enemy protected area

A cell is **enemy‑protected** if:

    enemy(x, y) =
        dist((x,y), E) ≤ re

***

## 2. Decide Wall Behavior (Important Design Choice)

There are **two common interpretations**.  
Most games use **Option A**.

***

## ✅ Option A (Recommended): Walls Protect Against Enemy Influence

You place walls where:

*   Friendly influence **ends**
*   And **enemy does NOT already control**

### Wall definition

Place walls on cells where:

1.  Cell is **friendly‑protected**
2.  Neighbor is **NOT friendly‑protected**
3.  Neighbor is **NOT enemy‑protected**

This prevents:

*   Walls inside enemy zones
*   Walls cutting through contested areas

***

## 3. Edge Detection Rule (Final)

### A tile `(x,y)` is a wall tile if:

    friendly(x,y) == true
    AND
    exists neighbor (nx,ny) such that:
        friendly(nx,ny) == false
    AND
        enemy(nx,ny) == false

***

## 4. Pseudocode (Grid-Based)

```python
walls = []

for each cell (x, y):

    friendly = inFriendlyTowerA(x,y) or inFriendlyTowerB(x,y)
    enemy = inEnemyTower(x,y)

    if not friendly:
        continue

    for each neighbor (nx, ny):
        n_friendly = inFriendlyTowerA(nx,ny) or inFriendlyTowerB(nx,ny)
        n_enemy = inEnemyTower(nx,ny)

        if (not n_friendly) and (not n_enemy):
            walls.append((x, y))
            break
```

✅ Result:

*   Clean **outer wall** around friendly territory
*   Enemy territory remains open (no useless walls)

***

## 5. What Happens in Overlaps?

| Situation           | Wall? | Why                 |
| ------------------- | ----- | ------------------- |
| Friendly → Empty    | ✅     | Border of control   |
| Friendly → Friendly | ❌     | Inside area         |
| Friendly → Enemy    | ❌     | Contested zone      |
| Enemy → Empty       | ❌     | Not yours           |
| Friendly ∩ Enemy    | ❌     | Invalid / contested |

***

## 6. Visual Example

    E E E . . . .
    E E E W W W .
    E E E W F F W
    . . . W F F W
    . . . W W W .

Legend:

*   `F` = friendly protected
*   `E` = enemy protected
*   `W` = wall
*   `.` = neutral

✅ Walls stop before enemy area

***

## 7. Multiple Enemy Towers?

No change needed.

Just compute:

    enemy(x,y) =
        inside any enemy tower radius

***

## 8. Optional: Hard Border Against Enemy (PvP Mode)

If you **do want walls between friendly and enemy**:
Change the condition to:

    wall if friendly(x,y) == true
    AND neighbor_friendly == false

⚠️ This causes walls **inside battlespaces**, usually undesirable.

***

## 9. Summary

**With third enemy tower:**

✅ Walls = **friendly → neutral boundary**  
❌ Not friendly → enemy  
❌ Not friendly → friendly

This keeps:

*   Territory clear
*   Walls meaningful
*   Gameplay readable

***

If you want, I can:

*   ✅ Handle **N friendly & N enemy towers**
*   ✅ Optimize for **large maps**
*   ✅ Output **wall segments / meshes**
*   ✅ Support **hex grids**

Just tell me your grid type and engine.
