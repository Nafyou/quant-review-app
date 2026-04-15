# Chapter 7: Algorithms and Numerical Methods

**Source:** *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou

> Programming skill tests are an inherent part of quantitative interviews. This chapter focuses on algorithm problems and numerical methods that are favorite topics in quant interviews, rather than a comprehensive review of all programming problems.

---

## Table of Contents

- [7.1 Algorithms](#71-algorithms)
  - [Complexity Notation Reference](#complexity-notation-reference)
  - [Master Theorem](#master-theorem)
  - [Number Swap](#number-swap)
  - [Unique Elements](#unique-elements)
  - [Horner's Algorithm](#horners-algorithm)
  - [Moving Average](#moving-average)
  - [Sorting Algorithms](#sorting-algorithms)
  - [Random Permutation](#random-permutation)
  - [Search Algorithms](#search-algorithms)
  - [Fibonacci Numbers](#fibonacci-numbers)
  - [Maximum Contiguous Subarray](#maximum-contiguous-subarray)
- [7.2 The Power of Two](#72-the-power-of-two)
  - [Power of 2](#power-of-2)
  - [Multiplication by 7](#multiplication-by-7)
  - [Probability Simulation](#probability-simulation)
  - [Poisonous Wine](#poisonous-wine)
- [7.3 Numerical Methods](#73-numerical-methods)
  - [Monte Carlo Simulation](#monte-carlo-simulation)
  - [Finite Difference Method](#finite-difference-method)

---

## 7.1 Algorithms

### Complexity Notation Reference

**Asymptotic analysis** studies running time `T(n)` (number of primitive operations) as `n → ∞`, ignoring machine-dependent constants.

| Notation | Name | Meaning |
|----------|------|---------|
| `O(g(n))` | Big-O | Asymptotic **upper bound**: `∃ c, n₀` such that `0 ≤ f(n) ≤ c·g(n)` for all `n ≥ n₀` |
| `Ω(g(n))` | Big-Omega | Asymptotic **lower bound**: `∃ c, n₀` such that `0 ≤ c·g(n) ≤ f(n)` for all `n ≥ n₀` |
| `Θ(g(n))` | Big-Theta | Asymptotic **tight bound**: `∃ c₁, c₂, n₀` such that `c₁g(n) ≤ f(n) ≤ c₂g(n)` for all `n ≥ n₀` |

**Two key running time concepts:**
- **Worst-case W(n):** Upper bound on running time for any n inputs
- **Average-case A(n):** Expected running time for randomly selected n inputs

---

### Master Theorem

For divide-and-conquer recurrences of the form `T(n) = a·T(n/b) + f(n)` where `a ≥ 1`, `b > 1`, `f(n) > 0`:

| Condition | Result |
|-----------|--------|
| `f(n) = o(n^(log_b a - ε))` for some `ε > 0` | `T(n) = Θ(n^(log_b a))` |
| `f(n) = Θ(n^(log_b a) · log^k n)` for some `k ≥ 0` | `T(n) = Θ(n^(log_b a) · log^(k+1) n)` |
| `f(n) = Ω(n^(log_b a + ε))` for some `ε > 0`, and `a·f(n/b) ≤ c·f(n)` for some `c < 1` | `T(n) = Θ(f(n))` |

**Example — Binary Search:** Find element in sorted array of n elements.
- Each step compares to middle element and halves the search space
- `a = 1`, `b = 2`, `f(n) = 1 = Θ(n^(log₂1) · log⁰ n) = Θ(1)`
- By case 2: **`T(n) = Θ(log n)`**

---

### Number Swap

**Question:** Swap two integers `i` and `j` without additional storage space.

**Solution:**

**Arithmetic approach:**
```cpp
void swap(int &i, int &j) {
    i = i + j;  // store sum
    j = i - j;  // j = original i
    i = i - j;  // i = original j
}
```

**Bitwise XOR approach** (using `x ^ x = 0` and `0 ^ x = x`):
```cpp
void swap(int &i, int &j) {
    i = i ^ j;
    j = j ^ i;  // j = i ^ (j ^ i) = original i
    i = i ^ j;  // i = (i ^ j) ^ i = original j
}
```

---

### Unique Elements

**Question:** Given a sorted array, extract the unique elements. E.g., `[1,1,3,3,3,5,5,5,9,9,9,9]` → `[1,3,5,9]`.

**Solution:**

In a sorted array, a new unique element `a[i]` satisfies `a[i] ≠ a[i-1]`. Use this property to build the output array in one pass:

```cpp
template <class T>
vector<T> unique(T a[], int n) {
    vector<T> vec;
    vec.reserve(n);        // avoid reallocations
    vec.push_back(a[0]);
    for (int i = 1; i < n; ++i) {
        if (a[i] != a[i-1])
            vec.push_back(a[i]);
    }
    return vec;
}
```

> **Note:** C++ STL provides `std::unique` and `std::unique_copy` for this operation.

**Complexity:** O(n) time, O(k) space where k = number of unique elements.

---

### Horner's Algorithm

**Question:** Compute `y = A₀ + A₁x + A₂x² + A₃x³ + ... + Aₙxⁿ` efficiently.

**Solution:**

**Naive approach:** Compute each term separately → O(n²) multiplications.

**Horner's algorithm:** Rewrite as nested form:
```
y = A₀ + x(A₁ + x(A₂ + x(... + x(Aₙ₋₁ + x·Aₙ)...)))
```

Sequential computation: `Bₙ = Aₙ`, `Bₙ₋₁ = Bₙ·x + Aₙ₋₁`, ..., `B₀ = B₁·x + A₀`, `y = B₀`.

**Complexity:** O(n) multiplications — optimal for polynomial evaluation.

---

### Moving Average

**Question:** Given array A of length m, compute the w-element moving average array B efficiently.

**Solution:**

Reuse the previously computed sum: subtract the element that leaves the window, add the new element entering it.

```
S = A[1] + A[2] + ... + A[w];  B[w] = S/w;
for (i = w+1 to m) {
    S = S - A[i-w] + A[i];
    B[i] = S/w;
}
```

**Complexity:** O(m) — each element is added and subtracted exactly once, vs. O(m·w) naive.

---

### Sorting Algorithms

**Question:** Explain three sorting algorithms and analyze their complexity.

**Solution:**

#### Insertion Sort

**Strategy:** Incremental — maintain a sorted subarray and insert each new element into its correct position.

- For step i: compare A[i] against up to i elements in the sorted prefix
- Expected comparisons per step: i/2 (average), i (worst case)

| | Complexity |
|-|-----------|
| Average A(n) | Θ(n²) |
| Worst-case W(n) | Θ(n²) |

**Best for:** Small arrays or nearly-sorted data.

---

#### Merge Sort

**Strategy:** Divide-and-conquer — split array into two halves, recursively sort each, merge.

```
mergesort(A, begin, end):
    if begin < end:
        center = (begin + end) / 2
        merge1 = mergesort(A, begin, center)
        merge2 = mergesort(A, center+1, end)
        merge(merge1, merge2)
```

Merging two sorted arrays of n/2 elements: O(n) operations.
Recurrence: `T(n) = 2T(n/2) + Θ(n)`

Applying Master Theorem: `a = 2`, `b = 2`, `f(n) = Θ(n) = Θ(n^(log₂2) · log⁰ n)` → Case 2:

| | Complexity |
|-|-----------|
| Average A(n) | Θ(n log n) |
| Worst-case W(n) | Θ(n log n) |

---

#### Quicksort

**Strategy:** Choose a pivot A[i], partition remaining elements into two subarrays (smaller left, larger right), recurse on both.

**Worst case:** Already-sorted array with first-element pivot → each step reduces size by only 1:
```
W(n) = Θ(n²)  (same as insertion sort)
```

**Average case analysis:**

Let Aₚ and Aᵧ be the p-th and q-th elements in the final sorted order. They are compared only if one is chosen as the pivot before any element strictly between them. By symmetry:

```
P(Aₚ compared with Aᵧ) = 2 / (q - p + 1)
```

Total expected comparisons:
```
A(n) = Σ_{q=2}^{n} Σ_{p=1}^{q-1} 2/(q-p+1) = Θ(n log n)
```

| | Complexity |
|-|-----------|
| Average A(n) | Θ(n log n) |
| Worst-case W(n) | Θ(n²) |

**Practice:** Often faster than merge sort in practice due to smaller constant factors and cache efficiency, despite identical average-case asymptotic complexity.

---

### Random Permutation

#### Part A — Shuffling a Deck of Cards

**Question:** Generate a uniformly random permutation of 52 cards using a uniform random number generator.

**Solution:**

**Method 1 — Sort by random keys:** Assign each card a random number, sort by those numbers. All n! orderings are equally likely. Complexity: Θ(n log n).

**Method 2 — Knuth Shuffle** (for large n):
```
for (i = 1 to n):
    swap(A[i], A[Random(i, n)])
```

where `Random(i, n)` draws uniformly from `{i, i+1, ..., n}`.

**Complexity:** Θ(n)

**Correctness:** In step i, each of the n-i+1 remaining cards has equal probability of being chosen as position i. By induction, each ordered sequence has probability 1/n!.

---

#### Part B — Reservoir Sampling (Unknown File Length)

**Question:** From a file of unknown length read sequentially, choose one character uniformly at random.

**Solution:**

**Reservoir sampling (k=1 case):**

After reading n characters, keep the current pick with probability `n/(n+1)` and replace it with the (n+1)-th character with probability `1/(n+1)`.

**Invariant:** After reading n characters, each of the first n has probability `1/n` of being chosen.

**Proof by induction:**
- Base: After character 1, it's selected with probability 1 = 1/1 ✓
- Step: If each of the first n has probability 1/n, after reading character (n+1):
  - Current pick is replaced with prob 1/(n+1) → each of first n has prob `(1/n) × (n/(n+1)) = 1/(n+1)`
  - New character selected with prob `1/(n+1)` ✓

---

### Search Algorithms

#### Part A — Find Min and Max with ≤ 3n/2 Comparisons

**Question:** Find both the minimum and maximum of n numbers using at most 3n/2 comparisons.

**Solution:**

A naive approach uses n-1 comparisons for min and n-1 for max → total ≈ 2n comparisons.

**Optimal approach:**
1. Pair up elements: n/2 comparisons → put smaller in group A, larger in group B
2. Find minimum of group A: n/2 - 1 comparisons
3. Find maximum of group B: n/2 - 1 comparisons

**Total:** n/2 + (n/2 - 1) + (n/2 - 1) = **3n/2 - 2 ≤ 3n/2 comparisons** ✓

*(Slight adjustment needed for odd n, but bound 3n/2 still holds)*

---

#### Part B — Find First Nonzero in Unknown-Length Array

**Question:** An array has zeros from the start up to some position, then all nonzeros. Array size is unknown. Find the first nonzero element.

**Solution:**

**Exponential search + binary search:**

1. Check positions 1, 2, 4, 8, ..., 2^i until the 2^i-th element is nonzero
2. Once found at position 2^i, binary search in `[2^(i-1)+1, 2^i]`

Each stage halves the search range. If first nonzero is at position n:

**Complexity:** Θ(log n)

---

#### Part C — Search in a Sorted 2D Grid

**Question:** Grid where each row increases left-to-right and each column increases top-to-bottom. Find a target value x. What is the complexity?

**Solution:**

**Algorithm:** Start at top-right corner (A[1,n]), move left or down:

1. Start at position (i, j) = (1, n) — top-right corner
2. If `A[i,j] == x`: found
3. If `A[i,j] < x`: move down (i++)
4. If `A[i,j] > x`: move left (j--)
5. Continue until found or out of bounds

**Correctness:** Each step eliminates either an entire row or an entire column.

**Complexity:** At most 2n steps (traverse at most n rows + n columns)  → **O(n)**

---

### Fibonacci Numbers

**Question:** The recursive C++ implementation takes 100 seconds for Fibonacci(n). How long for Fibonacci(n+1)? Is it efficient? How would you improve it?

```cpp
int Fibonacci(int n) {
    if (n <= 0) return 0;
    else if (n == 1) return 1;
    else return Fibonacci(n-1) + Fibonacci(n-2);
}
```

**Solution:**

**Closed-form (Binet's formula):**
```
Fₙ = (φⁿ - ψⁿ) / √5
```
where `φ = (1+√5)/2 ≈ 1.618` (golden ratio), `ψ = (1-√5)/2`

**Running time analysis:**

The running time T(n) satisfies the same recurrence: `T(0) = T(1) = 1`, `T(n) = T(n-1) + T(n-2) + 1`

For large n, `ψⁿ → 0`, so `T(n) ≈ φⁿ`. Therefore:

```
T(n+1) / T(n) ≈ φ ≈ 1.618
```

**Answer: ~162 seconds**

**Complexity:** O(φⁿ) — exponential — extremely inefficient due to massive redundant recomputation.

---

**Efficient approaches:**

**Linear O(n) — iterative:**
```
Compute F₀, F₁, F₂, ..., Fₙ sequentially using the definition.
```

**Logarithmic O(log n) — recursive squaring:**

Using the matrix identity:
```
|Fₙ₊₁  Fₙ  |   |1  1|ⁿ
|Fₙ    Fₙ₋₁| = |1  0|
```

Compute matrix power using divide-and-conquer: `Aⁿ = A^(n/2) × A^(n/2)` (if n even).

Each matrix multiplication is O(1) for 2×2. Applying Master Theorem: `T(n) = T(n/2) + Θ(1)` → **Θ(log n)**.

---

### Maximum Contiguous Subarray

**Question:** Given array A of length n (positive and negative values), find the maximum sum of any contiguous subarray A[i..j]. This directly models max drawup/drawdown in trading.

**Solution:**

**O(n²) naive approach:**
```
V(i,i) = A[i];  V(i,j) = V(i,j-1) + A[j] for j > i
Track maximum V(i,j) and the indices i, j.
```

**O(n) optimal approach (Kadane's variant):**

Define prefix sums `T(j) = Σ A[x]` for x from 1 to j, with `T(0) = 0`.

Then: `V(i,j) = T(j) - T(i-1)`

For any fixed j, V(i,j) is maximized when T(i-1) is minimized. Track `T_min = min(T(0), ..., T(j-1))` as j increases:

```
T = A[1]; V_max = A[1]; T_min = min(0, T)
for j = 2 to n:
    T = T + A[j]
    if T - T_min > V_max: V_max = T - T_min
    if T < T_min: T_min = T
return V_max
```

**C++ implementation:**
```cpp
double maxSubarray(double A[], int len, int &i, int &j) {
    double T = A[0], V_max = A[0];
    double T_min = min(0.0, T);
    for (int k = 1; k < len; ++k) {
        T += A[k];
        if (T - T_min > V_max) { V_max = T - T_min; j = k; }
        if (T < T_min) { T_min = T; i = (k+1 < j) ? (k+1) : j; }
    }
    return V_max;
}
```

**Example:** For `A = [1.0, 2.0, -5.0, 4.0, -3.0, 2.0, 6.0, -5.0, -1.0]`:
→ Maximum subarray: `[4.0, -3.0, 2.0, 6.0]`, sum = **9**, indices i=3, j=6.

---

## 7.2 The Power of Two

> "There are only 10 kinds of people in the world — those who know binary, and those who don't."

Computers use the binary (base-2) number system where each bit is 0 or 1. Binary representations yield interesting properties frequently tested in quant interviews.

---

### Power of 2

**Question:** Determine whether an integer is a power of 2.

**Solution:**

Any integer `x = 2ⁿ` has exactly one bit set to 1 in binary. For example: `8 = 2³ = 00001000₂`.

The number `2ⁿ - 1` has all n lower bits set to 1. For example: `7 = 00000111₂`.

Since `2ⁿ` and `2ⁿ - 1` share no common bits: `2ⁿ & (2ⁿ - 1) = 0`.

**Implementation:**
```cpp
bool isPowerOf2(int x) {
    return (x > 0) && ((x & (x - 1)) == 0);
}
```

**Complexity:** O(1)

---

### Multiplication by 7

**Question:** Fast way to multiply an integer by 7 without using the `*` operator.

**Solution:**

Use bit-shift and subtraction:
```
x * 7 = x * 8 - x = (x << 3) - x
```

**Implementation:**
```cpp
int multiplyBy7(int x) {
    return (x << 3) - x;
}
```

> **Note:** This can overflow if `x << 3` exceeds the integer range.

---

### Probability Simulation

**Question:** Given a fair coin, design a game with winning probability p (0 < p < 1).

**Solution:**

Express `p` in binary: `p = 0.p₁p₂p₃...pₙ = p₁·2⁻¹ + p₂·2⁻² + ... + pₙ·2⁻ⁿ`, where `pᵢ ∈ {0, 1}`.

**Algorithm:**
1. Toss coin; let `sᵢ ∈ {0,1}` be the result of the i-th toss (1=heads, 0=tails)
2. Compare `sᵢ` to `pᵢ` at each step:
   - `sᵢ < pᵢ` (s=0, p=1): **WIN**, stop
   - `sᵢ > pᵢ` (s=1, p=0): **LOSE**, stop
   - `sᵢ = pᵢ`: continue to next toss

**Correctness:** For any rational p, the binary expansion terminates; for irrational p, the probability of reaching a tie at step i goes to 0 as i → ∞. The overall win probability equals exactly p.

**Example (p = 1/4 = 0.01₂):**
- Toss sequence `00` → WIN (probability 1/4) ✓
- Toss sequences `01`, `10`, `11` → LOSE (probability 3/4) ✓

---

### Poisonous Wine

**Question:** 1000 bottles of wine, one poisoned. Poison kills in exactly 18 hours, no symptoms until death. You have 10 mice and 20 hours. Find the poisoned bottle.

**Solution:**

**Key insight:** 10 binary bits can encode `2¹⁰ = 1024` values, covering all 1000 bottles.

**Algorithm:**
1. Label each bottle 1 to 1000 with its 10-bit binary representation
   - e.g., bottle 1000 = `1111101000₂`
2. Mouse k drinks from every bottle with a `1` in bit position k (k = 1, ..., 10)
3. Wait 18 hours
4. Read the result: dead mouse = 1, live mouse = 0
5. The binary number formed by the 10 mice (bit 10 to bit 1) gives the bottle number

**Example:** If mice 6, 7, and 9 die:
```
Binary: 0101100000₂ = 2⁸ + 2⁶ + 2⁵ = 256 + 64 + 32 = 352
Poisoned bottle: #352
```

**Why it works:** Each bottle "writes" its binary label across the mice. The mice collectively perform a binary search in a single parallel test.

---

## 7.3 Numerical Methods

The prices of many financial instruments lack closed-form analytical solutions. Numerical methods — primarily Monte Carlo simulation and finite difference methods — fill this gap.

---

### Monte Carlo Simulation

Monte Carlo simulation iteratively evaluates a deterministic model using random inputs. For derivative pricing:
1. Simulate many price paths under risk-neutral measure
2. Calculate discounted payoff for each path
3. Average the payoffs → price estimate

**Validity:** Law of Large Numbers ensures convergence.

**Limitation:** Cannot be directly applied to American options or derivatives with early exercise features (must use finite difference or lattice methods instead).

---

#### Part A — Pricing a European Call via Monte Carlo

**Solution:**

Under risk-neutral GBM: `dS = rSdt + σSdW(t)`

Discretize with N time steps (Δt = T/N):
```
Sᵢ = Sᵢ₋₁ · exp((r - σ²/2)·Δt + σ·√Δt·εᵢ)
```
where `εᵢ ~ N(0,1)` i.i.d.

Simulate M paths → obtain terminal prices `S_T^(k)` for k = 1, ..., M.

**Estimated call price:**
```
C = e^(-r(T-t)) · (1/M) · Σ max(S_T^(k) - K, 0)
```

> **Note:** For European options, N = 1 suffices. For path-dependent options, use large N.

---

#### Part B — Generating N(μ, σ²) from Uniform Random Variables

**Solution:**

Two-step process:

**Step 1: Generate `x ~ N(0,1)` from `U ~ Uniform(0,1)`**

The **inverse transform method** maps uniform random variables to any distribution via:
`X = F⁻¹(U)`, where F is the CDF.

For the standard normal, F⁻¹ has no closed form, so use the **acceptance-rejection method** instead:

- Use an exponential distribution as the proposal: `g(x) = e^(-x)`, CDF inverse: `x = -log(1-u)`
- Find constant M such that `f(x)/g(x) ≤ M` for all x
  - For standard normal vs. exponential (λ=1): `M ≈ √(2e/π) ≈ 1.32`
- **Acceptance-rejection loop:**
  1. Draw `y ~ Exponential(1)` and `v ~ Uniform(0,1)`
  2. If `v ≤ f(y)/(M·g(y))`: accept `x = y`; else repeat

**Step 2: Scale to N(μ, σ²):** Return `μ + σ·x`

---

#### Part C — Variance Reduction Techniques

**Goal:** Reduce the variance `Var(Ȳ) = σ²/M` to achieve the same accuracy with fewer simulations.

**1. Antithetic Variables**

For each path `(ε₁, ..., εₙ)`, also compute the payoff with `(-ε₁, ..., -εₙ)`. When `Y(ε)` and `Y(-ε)` are negatively correlated, their average has reduced variance.

```
Ȳ_antithetic = [Y(ε₁,...,εₙ) + Y(-ε₁,...,-εₙ)] / 2
```

---

**2. Moment Matching**

Draw a large sample of random variables. Rescale/shift so that the sample's moments (mean, variance) exactly match the target population moments before using them in simulation.

---

**3. Control Variate**

If pricing derivative X and derivative Y has a known analytical solution:
- Simulate both X and Y using the same random sequences → estimates X̂ and Ŷ
- Corrected estimate: `X* = X̂ + (Y - Ŷ)`

The error `(Y - Ŷ)` "corrects" the estimation error in X̂, reducing variance when X and Y are correlated.

---

**4. Importance Sampling**

Instead of drawing from distribution f(x), draw from distribution g(x) and reweight:

```
E_f[h(X)] = E_g[h(X)·f(X)/g(X)]
```

**Application:** For deep OTM options under f, most paths give payoff 0 (high variance). Choose g with fatter tails so more paths have positive payoffs. The weight `f(x)/g(x)` keeps the estimator unbiased while reducing variance.

---

**5. Low-Discrepancy Sequences (Quasi-Monte Carlo)**

Replace random samples with deterministic sequences that fill the space more uniformly (e.g., Sobol sequences, Halton sequences). Can improve convergence rate from `1/√M` (random MC) to approximately `1/M`.

---

#### Part D — Estimating Delta and Gamma via Monte Carlo

**Solution:**

Run Monte Carlo for prices at `S - δS`, `S`, and `S + δS` using the **same random number sequences** (reduces variance via control variates):

```
Estimated Delta:  Δ ≈ [f(S + δS) - f(S - δS)] / (2·δS)

Estimated Gamma:  Γ ≈ [f(S + δS) - 2f(S) + f(S - δS)] / (δS)²
```

> **Note:** Using the same random sequences for all three prices is critical for variance reduction. This approach may not work well if the payoff function is discontinuous (e.g., binary options near expiry).

---

#### Part E — Estimating π via Monte Carlo

**Solution:**

**Setup:** Randomly sample points `(x, y)` uniformly in the unit square `[0,1] × [0,1]`.

A point falls inside the quarter-circle if `x² + y² ≤ 1`. The ratio of points inside to total:

```
p = (Area of quarter-circle) / (Area of unit square) = (π/4) / 1 = π/4
```

Therefore: **`π = 4p`**

**Algorithm:**
```
count = 0
for i = 1 to M:
    generate (x, y) ~ Uniform(0,1)
    if x² + y² ≤ 1: count++
π ≈ 4 × count / M
```

**Practical performance:** 1,000 simulations × 1,000,000 points each (Matlab): average estimate of π ≈ 3.1416, std dev ≈ 0.0015 (< 1 minute on a laptop).

---

### Finite Difference Method

The finite difference method numerically solves the BSM PDE by discretizing both time and the underlying price into a grid. Different derivatives share the same heat equation structure — they differ only in boundary conditions.

---

#### Part A — Finite Difference Methods Explained

**Setup:** Convert BSM PDE to heat equation `∂u/∂τ = ½σ²·∂²u/∂x²`. Build a grid:
- Time: `τₙ = n·Δτ` for n = 0, 1, ..., N; Δτ = T/N
- Space: `xⱼ = x₀ + j·Δx` for j = 0, 1, ..., J

**Three methods:**

---

**1. Explicit (Forward) Difference Method**

Uses forward difference in time, central difference in space:

```
∂u/∂τ ≈ (uⱼⁿ⁺¹ - uⱼⁿ) / Δτ
∂²u/∂x² ≈ (uⱼ₋₁ⁿ - 2uⱼⁿ + uⱼ₊₁ⁿ) / (Δx)²
```

Rearranging (update rule):
```
uⱼⁿ⁺¹ = α·uⱼ₋₁ⁿ + (1 - 2α)·uⱼⁿ + α·uⱼ₊₁ⁿ
```
where `α = Δτ/(Δx)²`

**Advantage:** Explicit formula — easy to compute.
**Disadvantage:** Conditionally stable (requires `Δτ/(Δx)² ≤ 1/2`).

---

**2. Implicit (Backward) Difference Method**

Uses backward difference in time, central difference in space:

```
(uⱼⁿ⁺¹ - uⱼⁿ) / Δτ = (uⱼ₋₁ⁿ⁺¹ - 2uⱼⁿ⁺¹ + uⱼ₊₁ⁿ⁺¹) / (Δx)²
```

At each time step, solve a **tridiagonal linear system**.

**Advantage:** Unconditionally stable and convergent — no restriction on Δτ.
**Disadvantage:** More computational work per step (requires solving a linear system).

---

**3. Crank-Nicolson Method**

Average of explicit and implicit methods; uses central difference at time `(τₙ + τₙ₊₁)/2`:

```
(uⱼⁿ⁺¹ - uⱼⁿ) / Δτ = ½ · [(uⱼ₋₁ⁿ⁺¹ - 2uⱼⁿ⁺¹ + uⱼ₊₁ⁿ⁺¹) + (uⱼ₋₁ⁿ - 2uⱼⁿ + uⱼ₊₁ⁿ)] / (Δx)²
```

**Advantages:**
- Unconditionally stable
- Second-order accurate in both time and space (superior to explicit and implicit methods)
- Most commonly used in practice

---

#### Part B — Too Many Time Steps vs. Too Many Space Steps?

**Question:** For the explicit finite difference method applied to a parabolic PDE, is it worse to have too many time steps or too many space steps?

**Solution:**

The explicit method is stable only when:
```
α = Δτ/(Δx)² ≤ 1/2
```

- **Many time steps** (small Δτ): decreases α → **promotes stability** ✓
- **Many space steps** (small Δx): (Δx)² decreases even faster → α = Δτ/(Δx)² increases → can violate stability → **causes numerical blow-up** ✗

**Answer: Too many space steps is worse.**

For the implicit and Crank-Nicolson methods, this is not an issue — they are **unconditionally stable** regardless of the step ratio.

| Method | Stability | Accuracy |
|--------|-----------|---------|
| Explicit | Conditional: `Δτ/(Δx)² ≤ 1/2` | O(Δτ, (Δx)²) |
| Implicit | Unconditional | O(Δτ, (Δx)²) |
| Crank-Nicolson | Unconditional | O((Δτ)², (Δx)²) |

---

*End of Chapter 7*
