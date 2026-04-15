# Chapter 5: Stochastic Process and Stochastic Calculus

**Source:** *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou

> This chapter covers Markov chains, random walks and martingales, dynamic programming, and stochastic calculus — topics not always included in introductory probability courses, yet often tested in quantitative interviews. A good understanding of these tools can simplify answers to many problems and turn seemingly hard puzzles into tractable ones.

---

## Table of Contents

- [5.1 Markov Chain](#51-markov-chain)
- [5.2 Martingale and Random Walk](#52-martingale-and-random-walk)
- [5.3 Dynamic Programming](#53-dynamic-programming)
- [5.4 Brownian Motion and Stochastic Calculus](#54-brownian-motion-and-stochastic-calculus)

---

## 5.1 Markov Chain

### Definition and Structure

A **Markov chain** is a sequence of random variables X₀, X₁, ..., Xₙ, ... with the **Markov property**: given the present state, future and past states are independent:

```
P(Xₙ₊₁ = j | Xₙ = i, Xₙ₋₁ = iₙ₋₁, ..., X₀ = i₀) = pᵢⱼ = P(Xₙ₊₁ = j | Xₙ = i)
```

for all n and all states i, j ∈ {1, 2, ..., M}. For a **homogeneous Markov chain**, transition probabilities do not depend on n.

**Transition matrix** for M states:
```
P = {pᵢⱼ} =  | p₁₁  p₁₂  ...  p₁ₘ |
              | p₂₁  p₂₂  ...  p₂ₘ |
              | ...                 |
              | pₘ₁  pₘ₂  ...  pₘₘ |
```

**Initial probabilities:** `P(X₀) = (P(X₀=1), P(X₀=2), ..., P(X₀=M))` with `Σᵢ P(X₀=i) = 1`

**Probability of a path:**
```
P(X₁=i₁, X₂=i₂, ..., Xₙ=iₙ | X₀=i₀) = pᵢ₀ᵢ₁ × pᵢ₁ᵢ₂ × ... × pᵢₙ₋₁ᵢₙ
```

A **transition graph** depicts states as nodes and transition probabilities as directed edges, making possible and impossible transitions immediately visible.

---

### Classification of States

- **Accessible:** State j is accessible from state i if ∃n such that P(Xₙ=j | X₀=i) > 0 (there is a directed path from i to j).
- **Communicating:** States i and j communicate if each is accessible from the other.
- **Recurrent:** State i is recurrent if, for every accessible state j, i is also accessible from j (the chain always returns). Equivalently, P(Tᵢᵢ < ∞) = 1.
- **Transient:** State i is transient if it is not recurrent — there exists a state j accessible from i such that i is not accessible from j.
- **Absorbing state:** State i with pᵢᵢ = 1 (impossible to leave). A **Markov chain is absorbing** if it has at least one absorbing state and every state can reach an absorbing state.

---

### Key Equations for Absorbing Chains

Let aᵢ denote the probability of being absorbed by a specific absorbing state s, and μᵢ the expected number of steps to absorption.

**Absorption probability equations:**
```
aₛ = 1
aᵢ = 0     for all absorbing states i ≠ s
aᵢ = Σⱼ pᵢⱼ aⱼ    for all transient states i
```
(Derived by conditioning on the next state using the law of total probability.)

**Expected time to absorption equations:**
```
μᵢ = 0     for all absorbing states i
μᵢ = 1 + Σⱼ pᵢⱼ μⱼ    for all transient states i
```
(The "+1" accounts for the one step taken to reach the next state.)

---

### Problems

**Gambler's Ruin (Markov Chain Approach)**

**Question:** Player M has $1 and player N has $2. Each game, the winner takes $1 from the other. M wins 2/3 of the time. They play until one is bankrupt. What is the probability M wins?

**Solution:**

State space: {m} = {0, 1, 2, 3} (M's current balance), where 0 and 3 are absorbing states.

Transition probabilities from transient states:
```
p₁₀ = 1/3,  p₁₂ = 2/3
p₂₁ = 1/3,  p₂₃ = 2/3
```

Let aᵢ = probability M reaches $3 from state i. Applying the absorption equations:

```
a₃ = 1,  a₀ = 0

a₁ = (1/3)×0 + (2/3)×a₂   →   a₁ = 2a₂/3
a₂ = (1/3)×a₁ + (2/3)×1   →   a₂ = a₁/3 + 2/3
```

Substituting the first into the second: `a₂ = (2a₂/3)/3 + 2/3 = 2a₂/9 + 2/3`

`a₂(7/9) = 2/3  →  a₂ = 6/7`

`a₁ = 2(6/7)/3 = 4/7`

**P(M wins) = 4/7 ≈ 0.571.** Starting from $2, P(M wins) = 6/7.

---

**Dice Question (12 vs. 7-7)**

**Question:** Player A bets that a sum of 12 will appear before two consecutive 7s (Player B). What is the probability A wins?

**Solution:**

Probabilities per roll: `P(12) = 1/36`, `P(7) = 6/36`, `P(other) = 29/36`.

**Method 1 — Conditional probability:** Let P(A) be A's winning probability.

Condition on the first roll F:
```
P(A) = P(A|F=12)×(1/36) + P(A|F=7)×(6/36) + P(A|F∉{7,12})×(29/36)
     = 1×(1/36) + P(A|F=7)×(6/36) + P(A)×(29/36)
```

Condition on the second roll E given F=7:
```
P(A|F=7) = 1×(1/36) + 0×(6/36) + P(A)×(29/36)
          = 1/36 + (29/36)P(A)
```

Substituting back:
```
P(A) = 1/36 + (6/36)×(1/36 + 29/36×P(A)) + 29/36×P(A)
     = 42/1296 + (1218/1296)P(A)
P(A)×(78/1296) = 42/1296    →    P(A) = 42/78 = 7/13
```

**Method 2 — Markov chain:** States: S (start), 7 (one 7 occurred, no 12 or 7-7 yet), 12 (A wins, absorbing), 7-7 (B wins, absorbing).

Absorption probability equations for state 12:
```
a₁₂ = 1,   a₇₇ = 0

aₛ = (1/36)×1 + (6/36)×a₇ + (29/36)×aₛ
a₇ = (1/36)×1 + (6/36)×0 + (29/36)×aₛ
```

Solving: `a₇ = 1/36 + (29/36)aₛ`, substituting: `aₛ(7/36) = 1/36 + 6/36×(1/36 + 29/36×aₛ)`

Both methods yield: **P(A wins) = 7/13**

---

**Coin Triplets**

**Part A — Expected tosses to reach HHH and THH**

For **HHH**: State machine with states S, H, HH, HHH:
- S + H → H, S + T → S
- H + H → HH, H + T → S
- HH + H → HHH (absorbing), HH + T → S

Absorption time equations (μ = expected tosses from each state):
```
μₛ = 1 + (1/2)μₛ + (1/2)μH
μH = 1 + (1/2)μₛ + (1/2)μHH
μHH = 1 + (1/2)μₛ + 0
```

Solving: `μHH = 1 + μₛ/2`, `μH = 12`, **`μₛ = 14`**

> **Conway leading number method:** For HHH, the prefix "HHH" matches suffix "HHH" (length 3), "HH" matches "HH" (length 2), "H" matches "H" (length 1). So E[HHH] = 2³ + 2² + 2¹ = 8 + 4 + 2 = **14** ✓

For **THH**: State machine with states S, T, TH, THH:
- S + T → T, S + H → S
- T + H → TH, T + T → T
- TH + H → THH (absorbing), TH + T → T

Absorption time equations:
```
μTH = 1 + (1/2)×0 + (1/2)μT
μT = 1 + (1/2)μTH + (1/2)μT    →    (1/2)μT = 1 + (1/2)μTH
μₛ = 1 + (1/2)μₛ + (1/2)μT    →    μₛ = 2 + μT
```

From the first two: `μT = 2 + μTH` and `μTH = 1 + μT/2`, giving:
```
μT = 2 + 1 + μT/2    →    μT/2 = 3    →    μT = 6
μTH = 1 + 3 = 4
μₛ = 2 + 6 = 8
```

> **Conway method:** For THH, only the full pattern "THH" matches itself (length 3) → E[THH] = 2³ = **8** ✓ (The length-2 suffix "HH" does not match the prefix "TH", and length-1 "H" ≠ "T".)

**Summary: E[HHH] = 14 tosses, E[THH] = 8 tosses.**

---

**Part B — Probability of HHH before THH**

**Solution:** Once a T appears, the last two characters of any potential HHH sequence are "HH" — which is exactly the last two characters of THH. Therefore, once T appears in the sequence, THH will always be completed before HHH.

The **only** way HHH appears first is if the sequence begins with **HHH** immediately, before any T:
```
P(HHH before THH) = (1/2)³ = 1/8
```

This can be confirmed with the Markov chain absorption equations:
Setting up states S, T, TH, H, HH, HHH, THH, and solving for probability of reaching HHH from S, we get aₛ = **1/8**.

---

**Part C — Choosing Sequences (Penney's Game)**

If both players are rational and player 1 announces their sequence first, player 2 can **always** choose a sequence with more than 1/2 probability of winning. This game exhibits **non-transitive** preferences — A beats B and B beats C does not imply A beats C.

**Player 2's optimal counter-strategy:** Take the last two characters of player 1's sequence and prepend the opposite of player 1's second character:

| Player 1 | Player 2's best response | P(Player 2 wins) |
|----------|-------------------------|-----------------|
| HHH | THH | **7/8** |
| THH | TTH | **2/3** |
| HTH | HHT | **2/3** |
| HHT | THH | **3/4** |
| TTH | HTT | **3/4** |
| THT | TTH | **2/3** |
| HTT | HHT | **2/3** |
| TTT | HTT | **7/8** |

> **Conclusion:** Player 1 should always go **second**. No matter what sequence player 1 picks, player 2 can always achieve at least 2/3 probability of winning. **Never go first.**

---

**Color Balls** *(Advanced)*

**Question:** A box contains n balls of n different colors. Each step: randomly select a pair (ordered), repaint the first to match the second, return both. What is the expected number of steps until all balls are the same color?

**Solution:** By symmetry, the expected total steps equals the expected steps conditioned on all balls ending as color 1: `E[Nₙ] = E[Nₙ | F₁]`.

Define state i = number of color-1 balls. Using Bayes' theorem, the **conditional transition probabilities given F₁** (final color is 1) are:

```
P(i → i+1 | F₁) = (n-i)(i+1) / [n(n-1)]    (color-1 ball is 2nd; non-color-1 is 1st)
P(i → i-1 | F₁) = (i-1)(n-i) / [n(n-1)]    (color-1 ball is 1st; non-color-1 is 2nd)
P(i → i   | F₁) = 1 - 2i(n-i)/[n(n-1)]
```

> **Derivation of P(i→i-1|F₁):** Using Bayes: `P(F₁|xₖ₊₁=i-1)×P(xₖ₊₁=i-1|xₖ=i) / P(F₁|xₖ=i) = [(i-1)/n]×[i(n-i)/(n(n-1))] / [i/n] = (i-1)(n-i)/[n(n-1)]`

Setting Zᵢ = E[Nₙ | F₁, current state = i] with boundary Zₙ = 0, the system of equations yields the solution:

```
Z₁ = E[Nₙ] = (n-1)²
```

For example: n=2: E[N₂] = 1; n=3: E[N₃] = 4; n=10: E[N₁₀] = 81.

---

## 5.2 Martingale and Random Walk

### Definitions

**Random walk:** A process {Sₙ; n ≥ 1} is a random walk if Sₙ = X₁ + X₂ + ... + Xₙ where {Xᵢ, i ≥ 1} are IID random variables.

**Simple random walk:** Xᵢ takes values +1 (prob p) and −1 (prob 1−p).

**Symmetric random walk (p = 1/2):**
- `E[Sₙ] = 0`
- `Var(Sₙ) = n`
- Both **Sₙ** and **Sₙ² − n** are martingales.

**Martingale:** A stochastic process {Zₙ; n ≥ 1} satisfying `E[|Zₙ|] < ∞` and:
```
E[Zₙ₊₁ | Zₙ = zₙ, Zₙ₋₁ = zₙ₋₁, ..., Z₁ = z₁] = zₙ
```

The conditional expected future value equals the current value. A martingale is NOT necessarily a Markov process (and vice versa).

---

### Stopping Rules and Wald's Equality

**Stopping rule:** A positive integer-valued random variable N (stopping time) for IID variables {Xᵢ, i ≥ 1} such that, for each n, the event {N ≤ n} depends only on X₁, X₂, ..., Xₙ (no look-ahead).

**Key property:** A martingale stopped at a stopping time is a martingale.

**Wald's Equality:** If N is a stopping rule for IID variables X₁, X₂, ... and Sₙ = X₁ + ... + Xₙ, then:
```
E[Sₙ] = E[X] × E[N]
```

*Proof sketch:* Write Sₙ = Σₙ Xₙ Iₙ where Iₙ = 1 if N ≥ n, 0 otherwise. Since Iₙ is independent of Xₙ (stopping depends only on past): `E[XₙIₙ] = E[X]E[Iₙ]`. Summing: `E[Sₙ] = E[X]×Σₙ E[Iₙ] = E[X]×E[N]`.

---

### General Martingale Results for Random Walk

For a **symmetric random walk** starting at 0 with absorbing barriers at α > 0 and −β (β > 0):

```
P(stops at α) = β/(α + β)        [from E[Sₙ] = 0 ⟹ pα·α − (1−pα)·β = 0]
E[N] = α·β                        [from E[Sₙ² − N] = 0 ⟹ pα·α² + (1−pα)·β² = E[N]]
```

---

### Problems

**Drunk Man on Bridge**

**Question:** A drunk man stands at position 17 on a 100-meter bridge (positions 0 to 100). He steps forward or backward with equal probability 1/2. What is the probability he reaches the end (position 100) before the beginning (position 0)? What is the expected number of steps?

**Solution:** Set 0 at the man's current position (meter 17). The walk stops at:
- α = 83 (reaching meter 100)
- −β = −17 (reaching meter 0)

Using the symmetric random walk general results:
```
P(reaches end) = β/(α+β) = 17/(83+17) = 17/100 = 0.17
E[N] = α·β = 83 × 17 = 1411
```

**Verification:** Using martingales directly:
- From E[Sₙ] = 0: `p_α × 83 − (1−p_α) × 17 = 0  →  p_α = 17/100` ✓
- From E[Sₙ²−N] = 0: `p_α × 83² + (1−p_α) × 17² = E[N]  →  E[N] = (17×83²+83×17²)/100 = 17×83 = 1411` ✓

---

**Dice Game (Wald's Equality)**

**Question:** Roll a die; receive the face value. On a 4, 5, or 6 you may roll again. Game stops on 1, 2, or 3. Expected total payoff?

**Solution:** The stopping rule is clear: stop after each roll with probability 1/2. Stopping time N ~ Geometric(1/2), so E[N] = 1/(1/2) = 2. Expected face value per roll: E[X] = 7/2.

By **Wald's Equality:**
```
E[Sₙ] = E[X] × E[N] = (7/2) × 2 = 7
```

---

**Ticket Line (Ballot Problem)**

**Question:** 2n people in line — n with \$5 bills and n with \$10 bills — want to buy a \$5 ticket. The seller starts with no change. What is the probability all people can be served without reordering?

**Solution:** Assign +1 to \$5-bill people and −1 to \$10-bill people. The process is a walk from (0,0) to (2n,0) with n steps of +1 and n steps of −1. We need all partial sums positive (seller always has change).

Using the **reflection principle:** The number of paths from (0,0) to (2n,0) that touch or cross y = −1 equals the number of paths from (0,−2) to (2n,0), which is C(2n, n−1).

Valid paths = C(2n, n) − C(2n, n−1) = C(2n,n)/(n+1) (the Catalan number).

```
P = [C(2n,n)/(n+1)] / C(2n,n) = 1/(n+1)
```

---

**Coin Sequence: Expected Tosses for n Heads in a Row**

**Question:** What is the expected number of fair coin tosses to get n consecutive heads?

**Solution:** Let E[f(n)] denote the expected number of tosses.

**Base cases** (verified from Markov chain analysis):
- E[f(1)] = 2, E[f(2)] = 6, E[f(3)] = 14

**General formula: E[f(n)] = 2^(n+1) − 2**

**Inductive proof:** Assume E[f(n)] = 2^(n+1) − 2. After reaching the state of n consecutive heads (nH), there is a 1/2 chance of completing the sequence (head) and a 1/2 chance of resetting (tail):

```
E[f(n+1)] = E[f(n)] + 1 + (1/2)×E[f(n+1)]
E[f(n+1)]/2 = E[f(n)] + 1 = 2^(n+1) − 1
E[f(n+1)] = 2^(n+2) − 2  ✓
```

**Martingale approach (general):** Imagine a sequence of gamblers each betting \$1 on a run of n consecutive heads. Gambler k joins before toss k and bets their entire bankroll on each subsequent toss, stopping when they lose or complete the n-run. The (i−n+1)-th gambler wins 2ⁿ when the sequence ends at toss i. The total payout at the stopping time is **fixed** at:

```
xᵢ = 2ⁿ + 2^(n-1) + ... + 2 = 2^(n+1) − 2
```

Since `(xᵢ − i)` is a martingale and `E[(xᵢ − i)] = 0`:

**E[i] = 2^(n+1) − 2**

**Extension to any sequence:** For sequence HHTTHH, check which prefixes of HHTTHH match suffixes of HHTTHH:
- Full: HHTTHH = HHTTHH → 2⁶ = 64
- Length 2: "HH" = "HH" ✓ → 2² = 4
- Length 1: "H" = "H" ✓ → 2¹ = 2

**E[HHTTHH] = 64 + 4 + 2 = 70 tosses**

---

## 5.3 Dynamic Programming

### Framework

A **dynamic programming (DP)** problem has two components:

**1. Discrete-time dynamic system:** Divide the problem into stages 0, 1, ..., N. At stage k, state xₖ evolves as:
```
x_{k+1} = f(xₖ, uₖ, wₖ)
```
where uₖ is the decision at stage k and wₖ is a random disturbance.

**2. Additive cost/profit function:**
```
Total = gₙ(xₙ) + Σₖ₌₀^(N-1) gₖ(xₖ, uₖ, wₖ)
```

**Principle of Optimality:** If π* = {u₀*, ..., uₙ₋₁*} is the optimal policy, then the tail policy {uₖ*, ..., uₙ₋₁*} is optimal for the tail sub-problem.

**DP Algorithm (backward induction):** Start from the final stage and work backwards:
```
Jₙ(xₙ) = gₙ(xₙ)
Jₖ(xₖ) = min_{uₖ} E{gₖ(xₖ, uₖ, wₖ) + J_{k+1}(f(xₖ, uₖ, wₖ))}    for k = N-1,...,0
```

> **Key insight:** Start with the optimal policy for every state of the **final stage** (maximum information, minimum uncertainty) and work backward toward the initial stage.

---

### Problems

**DP Dice Game (Up to 3 Rolls)**

**Question:** Roll a die up to 3 times. After each of the first two rolls, you can either keep the value or roll again (forfeiting the current value). On the third roll, you must keep the result. What is the expected value and optimal strategy?

**Solution (backward induction):**

**Stage 3 (final):** No choice. E[payoff] = (1+2+3+4+5+6)/6 = **3.5**

**Stage 2:** Keep if face value > 3.5, i.e., keep if ≥ 4. Otherwise roll again.
```
E[stage 2] = (3/6)×3.5 + (1/6)×(4+5+6) = 1.75 + 2.5 = 4.25
```
**Strategy:** Stop at 4, 5, or 6. Roll again at 1, 2, or 3.

**Stage 1:** Keep if face value > 4.25, i.e., keep if ≥ 5. Otherwise roll again.
```
E[stage 1] = (4/6)×4.25 + (1/6)×(5+6) = 17/6 + 11/6 = 28/6 = 14/3 ≈ 4.67
```
**Strategy:** Stop at 5 or 6. Roll again at 1, 2, 3, or 4.

**Game value: $14/3 ≈ $4.67. Optimal strategy: stop at first roll if ≥5; stop at second roll if ≥4; always accept third roll.**

---

**World Series Betting**

**Question:** The Red Sox and Rockies play a best-of-7 series (first to 4 wins). You have \$100 to bet on the Red Sox on a double-or-nothing basis, but can only bet on individual games. Devise a strategy so that if the Red Sox win the series you net exactly +\$100, and if they lose you net exactly −\$100.

**Solution:** Let f(i, j) = net payoff at state where Red Sox have won i games and Rockies have won j games. Terminal conditions:
```
f(4, j) = +100  for j = 0,1,2,3  (Red Sox win)
f(i, 4) = −100  for i = 0,1,2,3  (Rockies win)
```

The recursion: at each state, choose bet y so that:
```
f(i+1, j) = f(i,j) + y    (Red Sox win next game)
f(i, j+1) = f(i,j) − y    (Rockies win next game)
```

This gives: `y = [f(i+1,j) − f(i,j+1)] / 2` and `f(i,j) = [f(i+1,j) + f(i,j+1)] / 2`

Working backwards from the terminal conditions produces all payoffs and bets:

| State | Net Payoff | Bet |
|-------|-----------|-----|
| (3,3) | 0 | 100 |
| (3,2) | 50 | 50 |
| (2,3) | −50 | 50 |
| (3,1) | 75 | 25 |
| (2,2) | 0 | 50 |
| (1,3) | −75 | 25 |
| (0,0) | 0 | 31.25 |

> **Connection to options pricing:** This is structurally identical to pricing a European binary option using a binomial tree. The bet size at each state is the delta of a dynamic hedge.

---

**Dynamic Dice Game**

**Question:** A casino game: roll a die repeatedly. After each roll 1–5 you earn that amount and can choose to stop or continue. If a 6 appears at any time, you lose all accumulated winnings and the game ends. How much should you pay to play (risk-neutral)?

**Solution:** Let f(n) = expected optimal value given accumulated n dollars. For n ≥ 15, stop (see below). For n < 15, keep rolling since:

```
E[payoff from extra roll | accumulated n] = (1/6)Σᵢ₌₁⁵ f(n+i) + (1/6)×0
```

**Stopping threshold:** Keep rolling if `E[extra roll payoff] > n`. With n ≤ 14:
```
E = n/6 + 2.5 > n  ⟺  2.5 > 5n/6  ⟺  n < 15
```

For n ≥ 15: f(n) = n (stop immediately). For n ≤ 14: f(n) = (1/6)Σᵢ₌₁⁵ f(n+i).

Maximum payoff: \$19 (roll a 5 from state n=14: 14+5=19). Recursive calculation gives **f(0) = \$6.15**.

---

**Dynamic Card Game**

**Question:** A dealer draws from a shuffled standard 52-card deck (26 red, 26 black) one card at a time (no replacement). Red = +\$1, black = −\$1. You choose when to stop. What is the optimal stopping strategy and expected payoff?

**Solution:** Let (b, r) = number of black and red cards remaining. Current net score: b − r.

**Key symmetry:** `red drawn − black drawn = black remaining − red remaining = b − r`

**System equation:**
```
E[f(b,r)] = max(b−r, b/(b+r)×E[f(b-1,r)] + r/(b+r)×E[f(b,r-1)])
```

**Boundary conditions:** f(0, r) = 0 (no black cards left, can't gain more), f(b, 0) = b (all remaining are black, worth +b).

Working backwards from boundaries: **E[f(26,26)] = \$2.62**

> The optimal stopping rule mirrors the structure of American option pricing — stop when the "intrinsic value" (b−r) exceeds the "continuation value."

---

## 5.4 Brownian Motion and Stochastic Calculus

### Brownian Motion: Definition and Properties

A continuous stochastic process W(t), t ≥ 0, is a **Brownian motion** (Wiener process) if:

1. `W(0) = 0`
2. Increments are **independent**: W(t₁)−W(0), W(t₂)−W(t₁), ..., W(tₙ)−W(tₙ₋₁) are independent for 0 < t₁ < ... < tₙ
3. Each increment is **normally distributed**: `W(s+t) − W(s) ~ N(0, t)`

**Key properties:**

| Property | Formula |
|----------|---------|
| Mean | `E[W(t)] = 0` |
| Variance | `E[W(t)²] = t` |
| Distribution | `W(t) ~ N(0, t)` |
| Covariance | `Cov(W(s), W(t)) = s` for 0 ≤ s ≤ t |
| Martingale | `E[W(t+s) | W(t)] = W(t)` |
| Markov property | holds in continuous space |

**Two additional martingales:** If W(t) is a Brownian motion:
- `Y(t) = W(t)² − t` is a martingale
- `Z(t) = exp(λW(t) − ½λ²t)` is a martingale (**exponential martingale**) for any constant λ

---

### Brownian Motion Problems

**A — Correlation of Brownian motion and its square**

**Question:** What is Corr(Bₜ, Bₜ²)?

**Solution:** Since Bₜ ~ N(0,t) is symmetric about 0:
- E[Bₜ] = 0
- E[Bₜ³] = 0 (odd moment of symmetric distribution)

```
Cov(Bₜ, Bₜ²) = E[Bₜ³] − E[Bₜ]E[Bₜ²] = 0 − 0 = 0
```

**Corr(Bₜ, Bₜ²) = 0** despite the obvious nonlinear dependence (Bₜ² = |Bₜ|²). This demonstrates that zero correlation does not imply independence.

---

**B — P(B₁ > 0 and B₂ < 0)**

**Solution:** Let X = B₁ and Y = B₂ − B₁. Then X and Y are **independent N(0,1)**.

B₂ < 0 means X + Y < 0, i.e., Y < −X. Given X > 0, this requires Y < −X < 0, which means Y < 0 AND |Y| > |X|.

```
P(B₁>0, B₂<0) = P(X>0) × P(Y<0) × P(|Y| > |X|)
              = (1/2) × (1/2) × (1/2) = 1/8
```

The three probabilities:
- P(X > 0) = 1/2 ✓
- P(Y < 0) = 1/2 ✓
- P(|Y| > |X|) = 1/2 — by symmetry of IID N(0,1): P(|Y|>|X|) = P(|X|>|Y|) and they sum to 1 ✓

**Geometric insight:** The joint distribution of (X, Y) = (B₁, B₂−B₁) divides the 2D plane into 8 equally-probable sectors separated by lines x=0, y=0, y=x, y=−x. The event {X>0, Y<−X} occupies exactly one sector.

---

### Stopping Time / First Passage Time

**A — Expected time for Brownian motion to reach ±1**

**Solution:** Since W(t)² − t is a martingale, stopped at T = min{t: Bₜ = 1 or −1}:
```
E[Bₜ² − T] = B₀² − 0 = 0
```
Since Bₜ = ±1 with probability 1: `E[Bₜ²] = 1²`. Therefore: **E[T] = 1**.

---

**B — First passage time to level x**

For a standard Brownian motion, the first passage time to level x > 0 is τₓ = min{t: W(t) = x}.

**Distribution:** Using the reflection principle:
```
P(τₓ < t) = 2P(W(t) > x) = 2[1 − N(x/√t)]
```

**PDF:**
```
f_{τₓ}(t) = (x / √(2πt³)) × exp(−x²/(2t))    for t > 0
```
(An **inverse Gaussian** distribution.)

**Expected value: E[τₓ] = ∞** even though P(τₓ < ∞) = 1. The distribution has such a heavy tail that the mean diverges.

---

**C — BM hitting boundaries with and without drift**

**Question:** X starts at 0. Without drift (dX = dW): what is P(X hits 3 before −5)? With drift m (dX = m dt + dW)?

**No drift:** X is a martingale. Let p₃ = P(hits 3 before −5). By optional stopping:
```
3p₃ + (−5)(1−p₃) = 0    →    p₃ = 5/8
```

**General rule for no-drift BM:** P(hits α before −β) = β/(α+β), E[T] = α·β.

**With drift m:** X is no longer a martingale. P(x) satisfies the ODE:
```
m·P'(x) + (1/2)P''(x) = 0    for −5 < x < 3
```
with P(3) = 1, P(−5) = 0.

**General solution:** P(x) = c₁ + c₂e^{−2mx}

Applying boundary conditions:
- At x = 3: c₁ + c₂e^{−6m} = 1
- At x = −5: c₁ + c₂e^{10m} = 0

Solving:

```
P(0) = (e^{10m} − 1) / (e^{10m} − e^{−6m})
```

**Alternative using exponential martingale:** Set λ = −2m in Z(t) = exp(λW(t) − ½λ²t) = exp(−2m·X(t)) (since W(t) = X(t) − mt). By optional stopping:
```
p₃·e^{−6m} + (1−p₃)·e^{10m} = 1    →    p₃ = (e^{10m}−1)/(e^{10m}−e^{−6m})
```

---

**D — Probability of ever reaching −1 with positive drift**

**Question:** dX = dt + dW, X(0) = 0. What is P(X ever reaches −1)?

**Solution:** With drift m = 1 and upper boundary at +∞:
```
P_{−1}·exp(−2×1×(−1)) + (1−P_{−1})·exp(−2×1×∞) = 1
P_{−1}·e² + 0 = 1    →    P_{−1} = e^{−2} ≈ 0.135
```

Positive drift makes it unlikely (but not impossible) for the process to ever reach −1.

---

### Itô's Lemma

**Itô's Lemma** is the stochastic chain rule. For an Itô process `dX(t) = μ(t,X)dt + γ(t,X)dW(t)` and twice-differentiable function f(X(t), t):

```
df = [∂f/∂t + μ(t,X)·∂f/∂X + (1/2)γ²(t,X)·∂²f/∂X²] dt + γ(t,X)·(∂f/∂X) dW(t)
```

**Drift rate** = `∂f/∂t + μ(t,X)·∂f/∂X + (1/2)γ²(t,X)·∂²f/∂X²`

> A generalized Wiener process `dx = a(x,t)dt + b(x,t)dW(t)` is a martingale **if and only if** the drift coefficient `a(x,t) = 0`.

---

### Itô's Lemma Problems

**A — Is Z(t) = √t · Bₜ a martingale?**

**Solution:** Apply Itô's lemma to f(Bₜ, t) = √t · Bₜ:
- ∂f/∂t = Bₜ/(2√t)
- ∂f/∂B = √t
- ∂²f/∂B² = 0

```
dZ = (Bₜ/2√t) dt + √t dBₜ
```

**Mean and variance of Zₜ:** Since Bₜ ~ N(0,t), and √t is constant at time t:
```
E[Zₜ] = √t · E[Bₜ] = 0
Var(Zₜ) = t · Var(Bₜ) = t · t = t²
```
So `Zₜ ~ N(0, t²)`.

**Martingale check:** The drift term `(Bₜ/2√t)dt ≠ 0` whenever Bₜ ≠ 0, which occurs with probability 1. Therefore **Z(t) = √t · Bₜ is NOT a martingale**.

---

**B — Is W(t)³ a martingale?**

**Solution:** Apply Itô's lemma to f(W(t)) = W(t)³:
- ∂f/∂W = 3W(t)²
- ∂²f/∂W² = 6W(t)
- ∂f/∂t = 0

```
d(W³) = 0·dt + 3W(t)²·dW + (1/2)·1·6W(t)·dt = 3W(t)dt + 3W(t)²dW(t)
```

The drift term `3W(t)dt ≠ 0` whenever W(t) ≠ 0 (probability 1). Therefore **W(t)³ is NOT a martingale**.

> **Note:** W(t)² − t IS a martingale: d(W²−t) = 2W dW + dt − dt = 2W dW (drift = 0). ✓

---

*End of Chapter 5*
