# Game Expansion Plan: Pixel Zombie Side-Scroller

## Phase 1: Core Engine & Architecture Refactor
- [ ] **Level Loading System**: Implement a JSON-based level loader to support 10+ distinct level configurations.
- [ ] **Physics Engine Decoupling**: Separate collision logic from rendering to allow for headless testing.
- [ ] **Entity Component System (ECS)**: Refactor Player, Zombie, and Power-ups into a common `Entity` class for easier expansion.
- [ ] **Collision Expansion**: Add detection for "Pits" (falling out of bounds) and "Spikes" (instant damage).

## Phase Phase 2: Environment & Level Design
- [ ] **Level Schema Definition**: Define a structure for platforms, gaps, and hazards.
- [ ] **Obstacle Implementation**:
    - [ ] **Pits**: Trigger `gameover` state when player Y-coordinate exceeds ground level.
    _ [ ] **Spikes**: Static hazards that trigger damage.
    - [ ] **Moving Platforms**: Platforms that follow a predefined path.
- [ ] **Level Progression**: Implement a level transition system (Level 1 $\rightarrow$ Level 2, etc.).

## Phase 3: Enemy & Power-up Expansion
- [ ] **Advanced Enemy Types**:
    - [ ] **Flyer**: Enemies that hover and move vertically.
    - [ ] **Ranged Zombie**: Enemies that fire projectiles.
- [ ] **Power-up System**:
    - [ ] **Speed Boost**: Temporary increase to `moveSpeed`.
    - [ ] **Shield**: Temporary immunity to enemy collisions.
    - [ ] **Double Jump**: Ability to jump once more mid-air.

## Phase 4: The Grand Finale (Boss Fight)
- [ ] **Boss Entity**: A large, multi-phase entity with a health bar.
- [ ] **Boss Patterns**: Implement phases (e.g., Phase 1: Melee, Phase 2: Projectiles).
- [ ] **Victory Condition**: Final level completion logic.

## Phase 5: Testing & Automation
- [ ] **Unit Testing**:
    - [ ] Setup **Vitest** or **Jest** in the repository.
    - [ ] Write tests for:
        - Player movement physics.
        - Enemy collision/death logic.
        - Power-up duration and effect logic.
- [ ] **Headless Browser Testing**:
    - [ ] Setup **Playwright**.
    - [ ] Create automation scripts to:
        - Verify level transitions.
        - Simulate "Jump on Zombie" action to verify score increase.
        - Verify "Fall in Pit" triggers Game Over.

## Phase 6: Polish & Content
- [ ] **Asset Generation**: Generate all pixel art for 10 levels' worth of variety.
- [ ] **Audio Integration**: Implement SFX for jumping, hitting enemies, and power-ups.
- [ ] **UI/UX**: Add Main Menu, Level Selection, and High Score persistence.
