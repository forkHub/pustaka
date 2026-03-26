Physics engines use a combination of **broad-phase**, **narrow‑phase**, and **collision resolution** strategies to detect and resolve collisions efficiently and accurately. Here’s a clean, structured overview you can use for study or implementation.

***

# 🚀 Collision Detection & Resolution Strategies in Physics Engines

Physics engines (like Box2D, Bullet, Havok, PhysX, Unity, Unreal) typically break the problem into **three major stages**.

***

# 1️⃣ Broad-Phase Collision Detection

**Goal:** Quickly find *potential* collision pairs without checking every object against every other object.  
This reduces the complexity from **O(n²)** to near **O(n log n)** or better.

### Common Techniques

### **🔹 Spatial Partitioning**

Divide space into regions and test only objects in the same region.

*   **Uniform Grid / Spatial Hashing**
*   **Quadtrees (2D)**
*   **Octrees (3D)**

### **🔹 Sweep and Prune (SAP) / Sort and Sweep**

*   Sort objects along one or more axes by their bounding boxes.
*   Overlapping intervals are potential collisions.
*   Very efficient for scenes where objects move slightly between frames.

### **🔹 Bounding Volume Hierarchies (BVH)**

Use simple bounding volumes arranged in a tree structure:

*   AABB trees (Axis-Aligned Bounding Box)
*   OBB trees (Oriented Bounding Box)
*   k‑DOP trees (Discrete Oriented Polytopes)

**Broad-phase only tells you which objects *might* collide.**  
Then you move to narrow-phase.

***

# 2️⃣ Narrow-Phase Collision Detection

**Goal:** Perform accurate, mathematical collision detection on each pair.

### Common Algorithms

### **🔹 Shape Overlap Tests**

*   Sphere–sphere
*   AABB vs AABB
*   OBB vs OBB

### **🔹 SAT (Separating Axis Theorem)**

Used for convex polygons/polyhedra.

***

### **🔹 GJK (Gilbert-Johnson-Keerthi) algorithm**

*   Detects collision between any two **convex shapes**.
*   Very fast and widely used in Bullet & Box2D.

Often paired with:

### **🔹 EPA (Expanding Polytope Algorithm)**

*   Computes penetration depth & direction after GJK reports a collision.

***

### **🔹 Special-case tests**

Efficient special solvers for:

*   Sphere-plane
*   Capsule-capsule
*   Terrain heightmap

These provide more stability and speed in games.

***

# 3️⃣ Collision Resolution

Once a collision is detected, physics engines must:

1.  **Generate contact points**
2.  **Separate overlapping objects**
3.  **Apply realistic forces (impulses)**

### Key Techniques

### **🔹 Contact Manifolds**

Multiple contact points per object pair to prevent jittering.

***

### **🔹 Impulse-Based Resolution**

The most common method in real-time physics.  
Uses conservation of momentum:

    j = -(1 + e)(v_rel · n) / (1/m1 + 1/m2)

where:

*   **e** = restitution (bounciness)
*   **n** = collision normal
*   **v\_rel** = relative velocity

Impulses adjust velocities to prevent interpenetration.

***

### **🔹 Positional Correction (a.k.a. Baumgarte stabilization)**

Small positional adjustments applied to prevent sinking.

***

### **🔹 Constraint Solvers**

Used for joints, stacking, friction, etc.

Most famous: **Sequential Impulse Solver**

*   Used by Box2D, Bullet, and many game engines.
*   Iteratively solves constraints until stable.

***

# 4️⃣ Additional Systems (Optional but Common)

### **Friction Model**

*   Coulomb friction model
*   Solved during constraint resolution

### **Restitution**

*   Handles bounciness
*   Applied in collision impulse calculation

### **Continuous Collision Detection (CCD)**

Prevents "tunneling" at high speeds.

*   Sweep tests (Raycast, Shape cast)
*   Time-of-impact solvers

***

# 🎯 Summary Diagram

**Collision Pipeline**

    [Broad Phase]
        ↓
    Potential Pairs
        ↓
    [Narrow Phase]
        ↓
    Contact Points
        ↓
    [Collision Resolution]
    (Impulses, Constraints, Friction)

***

# If you want, I can help you with:

✅ A visual diagram  
✅ Example implementation (Box2D-style)  
✅ Pseudocode for each stage  
✅ Comparison of methods for game engines vs simulation engines

Just tell me!
