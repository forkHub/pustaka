Here’s a **sample MVP Game Design Document (GDD)** for a simple **Breakout-style game**. It’s stripped down to essentials so programmers can implement quickly without ambiguity:

---

# 🧱 Breakout MVP – Game Design Document

## 1. Game Overview
- **Genre**: Arcade
- **Platform**: PC (keyboard input)
- **Goal**: Player controls a paddle to bounce a ball and break all bricks.

---

## 2. Core Gameplay Loop
1. Player moves paddle left/right.
2. Ball bounces off paddle, walls, and bricks.
3. Bricks disappear when hit.
4. Player wins when all bricks are destroyed.
5. Player loses if ball falls below paddle.

---

## 3. Mechanics & Rules
- **Ball Physics**:
  - Constant speed (e.g., 5 units/frame).
  - Reflects angle based on collision surface.
- **Paddle**:
  - Moves horizontally only.
  - Speed: 8 units/frame.
  - Collision alters ball trajectory depending on hit position (center vs. edge).
- **Bricks**:
  - Single-hit destruction.
  - Arranged in grid (e.g., 6 rows × 10 columns).
- **Lives**:
  - Player starts with 3 lives.
  - Lose 1 life if ball falls below paddle.
- **Win Condition**: All bricks destroyed.
- **Lose Condition**: Lives = 0.

---

## 4. Controls & Input
- **Left Arrow / A** → Move paddle left.
- **Right Arrow / D** → Move paddle right.
- **Space** → Launch ball (only at start or after losing a life).

---

## 5. UI/UX
- **HUD**:
  - Lives remaining (top-left).
  - Score (top-right).
- **Screens**:
  - Start screen: “Press Space to Start.”
  - Game Over screen: “You Lose.”
  - Victory screen: “You Win!”

---

## 6. Assets & Data
- **Sprites**:
  - Paddle (rectangle).
  - Ball (circle).
  - Brick (colored rectangles).
- **Audio**:
  - Bounce sound.
  - Brick break sound.
  - Win/Lose jingle.
- **Data Tables**:
  - Brick layout grid (rows × columns).

---

## 7. Technical Requirements
- **Engine**: Unity or similar 2D engine.
- **Resolution**: 800×600.
- **Frame Rate**: 60 FPS.

---

## 8. System Architecture (MVP)
- **Classes/Objects**:
  - `Ball`: position, velocity, collision logic.
  - `Paddle`: position, movement input.
  - `Brick`: position, state (active/destroyed).
  - `GameManager`: tracks lives, score, win/lose state.

---

## 9. Edge Cases
- Ball stuck bouncing horizontally → Add small random angle adjustment.
- Multiple bricks hit in one frame → Destroy all collided bricks.
- Paddle collision at extreme edge → Reflect ball at sharper angle.

---

✅ This MVP GDD is **programmer-ready**: clear rules, defined inputs/outputs, and minimal scope. It can be expanded later with power-ups, multiple levels, or difficulty scaling.

---

Would you like me to **convert this into a WhatsApp-ready checklist format** (super concise, bullet-pointed, easy to share with a dev team), or keep it as a full document template for editing?