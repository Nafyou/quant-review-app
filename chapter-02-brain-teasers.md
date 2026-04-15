# Chapter 2: Brain Teasers

> **Source:** *A Practical Guide to Quantitative Finance Interviews* — Xinfeng Zhou  
> **Chapter Pages:** 3–32 (PDF pages 19–48)  
> **Topic Tags:** `brain-teasers` `logic` `problem-solving` `combinatorics` `game-theory` `induction` `modular-arithmetic`

---

## Overview

This chapter covers problems that only require **common sense, logic, reasoning, and basic (no more than high school level) math knowledge** to solve. These are real brain teasers as opposed to mathematical problems in disguise.

Although they do not require specific math knowledge, they are no less difficult than other quantitative interview problems. Some test your analytical and general problem-solving skills; some require you to think out of the box; while others ask you to solve problems using fundamental math techniques in a creative way.

### Sections in This Chapter

| Section | Theme |
|---------|-------|
| 2.1 | Problem Simplification |
| 2.2 | Logic Reasoning |
| 2.3 | Thinking Out of the Box |
| 2.4 | Application of Symmetry |
| 2.5 | Series Summation |
| 2.6 | The Pigeon Hole Principle |
| 2.7 | Modular Arithmetic |
| 2.8 | Math Induction |
| 2.9 | Proof by Contradiction |

---

## 2.1 Problem Simplification

> **Core Technique:** If the original problem is too complex, identify a simplified version and start with it. Start with the simplest sub-problem and gradually increase complexity. You do not need a defined plan at the beginning — just solve simple cases, analyze your reasoning, and find a pattern that guides you through the whole problem.

---

### Problem: Screwy Pirates

**Setup:**  
Five pirates looted a chest full of 100 gold coins. They agree on the following method to divide the loot:

- The most senior pirate proposes a distribution.
- All pirates (including the proposer) vote. If at least **50% accept**, gold is divided as proposed.
- If not, the most senior pirate is fed to a shark and the process repeats with the next most senior pirate.
- Assume all pirates are perfectly rational: they want to **stay alive first**, **get as much gold as possible second**, and **have fewer pirates on the boat** if otherwise equal.

**How will the gold coins be divided in the end?**

**Solution:**  
Start with a simplified version — reduce the number of pirates:

- **2 pirates:** Pirate 2 (senior) claims all 100 gold. He always gets 50% of votes from himself. Pirate 1 gets nothing.
- **3 pirates:** Pirate 3 knows if his plan is voted down, pirate 1 gets nothing. So he offers pirate 1 one coin and keeps 99. Plan passes with 2 votes (pirates 1 and 3).
- **4 pirates:** Pirate 4 knows that if his plan fails, pirate 2 gets nothing. So he offers pirate 2 one coin, keeps 99. Passes with 50% votes (pirates 2 and 4).
- **5 pirates:** Pirate 5 knows that if his plan fails, pirates 1 and 3 get nothing. He offers them one coin each, keeps 98. Passes with 3 of 5 votes (pirates 1, 3, and 5).

**Pattern:** For any (2n+1)-pirate case (n < 99), the most senior pirate offers pirates 1, 3, 5, ..., 2n-1 each one coin and keeps the rest.

**Final Answer:** Pirate 5 keeps **98 coins**, pirates 1 and 3 get **1 coin each**, pirates 2 and 4 get **0 coins**.

---

### Problem: Tiger and Sheep

**Setup:**  
100 tigers and 1 sheep are on a magic island with only grass. Tigers can eat grass, but prefer to eat sheep. Rules:
- Only one tiger can eat the sheep at a time.
- A tiger that eats the sheep **becomes a sheep** itself.
- All tigers are smart and perfectly rational — they want to survive.

**Will the sheep be eaten?**

**Solution:**  
Use problem simplification:

- **n = 1 tiger:** The tiger eats the sheep (no threat of being eaten).
- **n = 2 tigers:** Neither tiger eats the sheep. If one eats the sheep, it becomes a sheep and gets eaten by the other.
- **n = 3 tigers:** The sheep gets eaten. Each tiger knows that after eating, there will be 2 tigers remaining and the new sheep (it) will not be eaten (from the n=2 case).
- **n = 4 tigers:** No tiger eats the sheep. If one eats, it becomes a sheep in a 3-tiger world and will be eaten.

**Pattern:** If the number of tigers is **odd**, the sheep is eaten. If **even**, the sheep is safe.

**Final Answer:** With **100 tigers (even)**, the sheep will **NOT** be eaten.

---

## 2.2 Logic Reasoning

---

### Problem: River Crossing

**Setup:**  
Four people (A, B, C, D) need to cross a river. The bridge holds at most 2 people. They have only one torch. Each pair walks at the speed of the slower person.

- A takes **10 minutes**
- B takes **5 minutes**
- C takes **2 minutes**
- D takes **1 minute**

**What is the minimum time to get all across?**

**Solution:**  
Key insight: The 10-minute and 5-minute people should cross together, and this should NOT happen in the first crossing (otherwise one has to come back).

1. C and D cross → **2 min** (total: 2)
2. D returns with torch → **1 min** (total: 3)
3. A and B cross → **10 min** (total: 13)
4. C returns with torch → **2 min** (total: 15)
5. C and D cross → **2 min** (total: 17)

**Minimum time: 17 minutes.**

---

### Problem: Birthday Problem

**Setup:**  
Your boss A's birthday is one of 10 dates:

- Mar 4, Mar 5, Mar 8
- Jun 4, Jun 7
- Sep 1, Sep 5
- Dec 1, Dec 2, Dec 8

- You know only the **month**.
- Your colleague C knows only the **day**.

You said: *"I don't know A's birthday; C doesn't know it either."*  
C replied: *"I didn't know A's birthday, but now I know it."*  
You said: *"Now I know it, too."*

**What is A's birthday?**

**Solution:**  
Let D = the day. Possible days: {1, 2, 4, 5, 7, 8}.

- Days **2** (Dec 2) and **7** (Jun 7) appear only once → C would know immediately if told those days.
- Since **you** are certain C doesn't know, the month cannot be **June or December** (those months contain the unique days 7 and 2).
- Remaining months: **March** or **September**.
- C now knows → the day must be unique within {March, September} dates.
- Mar 5 and Sep 5 are both in different months but day 5 appears twice → eliminated.
- Remaining: **Mar 4, Mar 8, Sep 1**.
- You now know → you must have been told a month with only one remaining date.
- March still has two options (Mar 4, Mar 8); September has only one (Sep 1).

**Answer: September 1.**

---

### Problem: Card Game

**Setup:**  
A casino uses a normal 52-card deck. You turn over two cards at a time:
- Both black → go to dealer's pile
- Both red → go to your pile
- One black, one red → discarded

If you end up with more cards in your pile, you win $100. How much would you pay to play?

**Solution:**  
No matter how the cards are arranged, you and the dealer will **always have the same number of cards**. Each discarded pair has one black and one red card, so equal numbers of red and black cards are discarded. The number of red cards left for you and black cards left for the dealer are always the same.

**You should pay $0. The dealer always wins (or ties).**

---

### Problem: Burning Ropes

**Setup:**  
You have two ropes, each taking **1 hour to burn**. The density is uneven, so you can't use length to measure time. How do you measure **45 minutes**?

**Solution:**  
Key insight: If you light both ends of a rope simultaneously, it burns in x/2 minutes.

1. **Light both ends of rope 1** AND **one end of rope 2** simultaneously.
2. After **30 minutes**, rope 1 is fully burned. At this moment, **light the other end of rope 2**.
3. Rope 2 now has 30 minutes left but is burning from both ends → it will finish in **15 more minutes**.

**Total: 30 + 15 = 45 minutes.**

---

### Problem: Defective Ball

**Setup:**  
You have **12 identical balls**. One is heavier **OR** lighter than the rest (unknown which). Using a balance scale that only shows which side is heavier, **determine the defective ball in 3 measurements**.

**Solution:**  
The key is to **divide into 3 groups** instead of 2. Each comparison gives information about the third group.

**Step 1:** Weigh balls 1–4 vs. balls 5–8.

- **Case A: They balance** → defective ball is in {9, 10, 11, 12}.
  - Weigh 9, 10 vs. 8, 11 (8 is known normal).
  - Sub-cases resolve in one more measurement.

- **Case B: 1–4 lighter than 5–8** → defective is either L in {1,2,3,4} or H in {5,6,7,8}.
  - Further comparisons with known normals identify the exact ball.

**General rules:**
- With knowledge of whether defective is heavier or lighter: identify among **3^n** balls in n measurements.
- Without that knowledge: identify among **(3^n − 3) / 2** balls in n measurements.

*(See Figure 2.1 in the book for the full decision tree.)*

---

### Problem: Trailing Zeros

**Question:** How many trailing zeros are in **100!** (factorial of 100)?

**Solution:**  
Trailing zeros come from factors of 10 = 2 × 5. Since factors of 2 far outnumber factors of 5, count factors of 5 in 100!:

- Numbers divisible by 5 in [1, 100]: 20 numbers (5, 10, ..., 100)
- Numbers divisible by 5² = 25: 4 numbers (25, 50, 75, 100)

Total factors of 5 = 20 + 4 = **24**

**Answer: 24 trailing zeros.**

---

### Problem: Horse Race

**Setup:**  
25 horses, each running at a unique constant speed. The track has 5 lanes — only 5 horses can race at a time. **Find the 3 fastest horses with the minimum number of races.**

**Solution:**

**Round 1 (5 races):** Divide 25 horses into 5 groups of 5. Race each group → determine the winner of each group.

**Round 2 (1 race):** Race the 5 group winners. Without loss of generality, assume the order is: horse 1 > horse 6 > horse 11 > horse 16 > horse 21.
- Horses 16–25 are eliminated (their group winners finished 4th and 5th).
- Horse 1 is the fastest overall.
- Candidates for 2nd and 3rd place: horses **2, 3** (same group as 1), **6, 7** (same group as 6), and **11** (same group as 11).

**Round 3 (1 race):** Race horses 2, 3, 6, 7, and 11. Top 2 from this race, plus horse 1, are the 3 fastest.

**Minimum races needed: 7.**

---

### Problem: Infinite Sequence

**Question:** If x^x^x^x^... = 2, what is x? (where ^ denotes exponentiation)

**Solution:**  
Since the sequence is infinite, adding or removing one x^ does not change the result:

x^(x^x^x^...) = x^2 = 2  
→ x = √2

**Answer: x = √2.**

---

## 2.3 Thinking Out of the Box

---

### Problem: Box Packing

**Question:** Can you pack **53 bricks of dimension 1×1×4** into a **6×6×6 box**?

**Solution:**  
Total volume: 53 × 4 = 212, which is less than 6³ = 216. However, packing is **impossible**.

**Proof via coloring:**  
Imagine the 6×6×6 box divided into 27 small 2×2×2 cubes, alternating black and white (like a 3D chess board). There are either 14 black + 13 white, or 13 black + 14 white.

Any 1×1×4 brick always covers exactly **one 2×2×2 black cube and one 2×2×2 white cube**. Each 2×2×2 cube can hold **at most 4** such bricks. With only 13 cubes of one color, at most 13×4 = 52 bricks can be placed. **The 53rd brick cannot be packed.**

---

### Problem: Calendar Cubes

**Question:** Design two custom dice (6 faces each) using single digits so that every morning they show the current day of the month (01–31). Both dice must be used.

**Solution:**  
Since 11 and 22 must be displayable, **both dice must have 1 and 2**. For single-digit days 01–09, both dice need **0**.

Assignment so far:
- Dice 1: 0, 1, 2, ?, ?, ?
- Dice 2: 0, 1, 2, ?, ?, ?

Remaining digits: 3, 4, 5, 6, 7, 8, 9 → 7 digits, but only 6 remaining face slots.

**Key insight:** **6 can be used as 9** (by flipping upside down) since they never appear on the same date.

**Final answer:**
- Dice 1: 0, 1, 2, 3, 4, 5
- Dice 2: 0, 1, 2, 6/9, 7, 8

---

### Problem: Door to Offer

**Setup:**  
Two doors: one leads to a job offer, one leads to the exit. Each door has a guard — one always lies, one always tells the truth. You can ask **one guard one yes/no question**.

**What do you ask?**

**Solution:**  
Ask one guard: **"Would the other guard say that you are guarding the door to the offer?"**

- **If the answer is NO** → choose THIS door (it leads to the offer).
- **If the answer is YES** → choose the OTHER door.

**Why it works:** In both scenarios (truth-teller at offer door vs. liar at offer door), this double-negation question produces a consistent, reliable answer — eliminating the uncertainty of asking either guard directly.

---

### Problem: Message Delivery

**Setup:**  
You need to send a document to a colleague. The messenger service is insecure — anything in an unlocked box is lost (including locks placed inside). Each person's padlock has only one key (their own).

**How do you securely deliver the document?**

**Solution:**
1. **You** place your lock on the box and send it to your colleague.
2. **Your colleague** cannot open it, but adds **their own lock** and sends it back.
3. **You** remove your lock (you have your key) and send the box back.
4. **Your colleague** removes their lock and retrieves the document.

---

### Problem: Last Ball

**Setup:**  
A bag has **20 blue balls** and **14 red balls**. Each time, randomly take 2 balls out. Replace with:
- Both same color → add one **blue** ball
- Different colors → add one **red** ball

**What color is the last ball? What if we start with 20 blue and 13 red?**

**Solution:**  
Analyze changes in red ball count (R):
- Both blue: R stays same
- Both red: R decreases by 2
- One of each: R stays same

**R never becomes odd if it starts even (14).** Since the total balls decrease to 1, the last ball cannot be red (that would require R → 1, which is odd). **Last ball is BLUE.**

With 13 red balls (odd), R can only stay odd or decrease by 2 (remain odd). The last ball must be **RED**.

---

### Problem: Light Switches

**Setup:**  
One light bulb inside a room. **Four switches** outside. Only one controls the light bulb. How many times must you enter the room to identify the correct switch?

**Solution:**  
**Once.**

Use two binary properties of a light bulb: **on/off** and **hot/cold**.

**Strategy:**
1. Turn on switches **1 and 2**; wait a while.
2. Turn **off switch 2**, turn **on switch 3**.
3. Enter the room **once** and check:
   - Light **on + hot** → switch 1
   - Light **off + hot** → switch 2 (was on, now off)
   - Light **on + cold** → switch 3
   - Light **off + cold** → switch 4 (never turned on)

---

### Problem: Quant Salary

**Setup:**  
8 quants want to compute their average salary without anyone disclosing their individual salary.

**Solution:**  
1. Quant 1 picks a **random number R**, adds their salary, and passes the sum to quant 2.
2. Each subsequent quant adds their salary and passes the running total.
3. The total returns to quant 1, who subtracts R.
4. Divide by 8 → **average salary**.

No one individual salary is ever revealed.

*(This technique is actually used in practice by data providers to anonymize fund position data.)*

---

## 2.4 Application of Symmetry

---

### Problem: Coin Piles

**Setup:**  
Blindfolded in a room. 1000 coins on the floor: **980 tails up**, **20 heads up**. You cannot feel which side is up. Separate the coins into two piles so **both piles have equal number of heads**.

**Solution:**  
Take any **20 coins** and flip all of them.

**Proof:** Say m of those 20 coins started heads up. After flipping all 20:
- First pile has (20 - m) heads.
- Second pile (980 coins) has (20 - m) heads.

**Both piles always have equal heads**, regardless of m!

---

### Problem: Mislabeled Bags

**Setup:**  
Three bags — one with only apples, one with only oranges, one with a mix. **All three bags are mislabeled.**

**Develop a strategy to identify all bags with the minimum number of fruit picks.**

**Solution:**  
**Pick one fruit from the bag labeled "mix."**

Since all bags are mislabeled, the bag labeled "mix" must be either **all apples** or **all oranges**.

- If you draw an **orange** → that bag is all oranges.
  - The bag labeled "apple" cannot be all apples → it must be the **mix**.
  - The bag labeled "orange" must be the **apple** bag.
- If you draw an **apple** → that bag is all apples.
  - Similar logic applies.

**Only 1 fruit pick needed.**

---

### Problem: Wise Men (Sultan's Glass)

**Setup:**  
50 wise men imprisoned. A sultan has a glass (currently bottom-down). Each minute, one wise man is called and may turn it over or do nothing. Calls are random and may repeat infinitely. If any wise man correctly declares "all have been called at least once," they go free. If wrong, they die.

**Design a strategy.**

**Solution:**  
Designate one wise man as the **spokesman**. Assign roles:

- **Other 49 wise men:** Each flips the glass upside down the **first time** they find it bottom-down, and does nothing after that (or if it's already upside down).
- **Spokesman:** Each time the glass is upside down, he flips it back to bottom-down. He **counts** each such flip.

After the spokesman performs his **49th flip**, all 49 others have been called at least once. He then declares freedom.

---

## 2.5 Series Summation

### Key Formulas

| Formula | Expression |
|---------|-----------|
| Sum of first N integers | N(N+1)/2 |
| Sum of first N squares | N(N+1)(2N+1)/6 |
| Sum of first N cubes | [N(N+1)/2]² |

---

### Problem: Clock Pieces

**Setup:**  
A clock (numbered 1–12) breaks into three pieces. The sums of numbers on each piece are equal. What numbers are on each piece?

**Solution:**  
Total sum = 12×13/2 = 78. Each piece sums to **26**.

Key insight: 12 and 1 are adjacent on a clock, so they can be on the same piece.

- Piece 1: **12, 1, 2, 11** (sum = 26) — wait: 12+1+2+11 = 26 ✓
- Piece 2: **3, 4, 9, 10** (sum = 26) ✓
- Piece 3: **5, 6, 7, 8** (sum = 26) ✓

**Answer:** {12, 1, 2, 11}, {3, 4, 9, 10}, {5, 6, 7, 8}

---

### Problem: Missing Integers

**Setup:**  
You have 98 distinct integers from the set {1, 2, ..., 100}. Find the two missing integers.

**Solution:**  
Let x and y be the missing integers. Let z₁, ..., z₉₈ be the existing ones.

Using two summation equations:

1. **Sum equation:** x + y = 100×101/2 − Σzᵢ
2. **Sum of squares equation:** x² + y² = 100×101×201/6 − Σzᵢ²

Solve the two equations to find x and y uniquely.

**Algorithm complexity: O(n)** for two missing integers in {1, ..., n}.

---

### Problem: Counterfeit Coins I

**Setup:**  
10 bags of 100 coins each. 9 bags have 10-gram coins; 1 bag has coins weighing 9 or 11 grams. **Find the counterfeit bag in one weighing** using a digital scale.

**Solution:**  
Take **1 coin from bag 1, 2 from bag 2, ..., 10 from bag 10** (55 coins total).

If all coins were genuine: 55 × 10 = **550 grams**.

If bag j is counterfeit: the actual weight = 550 ± j.

Since j is distinct for each bag, the weight deviation identifies the counterfeit bag **and** whether the coins are heavier or lighter.

---

### Problem: Glass Balls

**Setup:**  
Two glass balls in a 100-story building. A ball breaks at floor X or higher, but survives below X. **Minimize the number of drops in the worst case.**

**Solution:**  
Let N = max number of drops. The optimal strategy is to drop ball 1 from progressively lower floors:

- Drop 1: floor N
- Drop 2: floor N + (N-1)
- Drop 3: floor N + (N-1) + (N-2)
- etc.

This covers N + (N-1) + ... + 1 = **N(N+1)/2** floors.

For 100 floors: N(N+1)/2 ≥ 100 → **N = 14**

**Optimal strategy:** Start at floor 14, then 27, then 39, etc.

---

## 2.6 The Pigeon Hole Principle

> **Basic Principle:** If you have more pigeons than pigeon holes and every pigeon is in a hole, at least one hole has more than one pigeon.
>
> **Generalized:** If you have n holes and at least mn+1 pigeons, at least m+1 pigeons must share one hole.

---

### Problem: Matching Socks

**Setup:**  
A drawer has 2 red, 20 yellow, and 31 blue socks. What is the **minimum number of socks** you must grab to guarantee a matching pair?

**Solution:**  
3 colors = 3 pigeon holes. By the Pigeon Hole Principle, grabbing **4 socks (4 pigeons)** guarantees at least 2 are the same color.

**Answer: 4 socks.**

---

### Problem: Handshakes

**Setup:**  
At a party of 26 people, each shook hands with at least 1 other. Prove that **at least two people shook hands with exactly the same number of people**.

**Solution:**  
26 people, each shook hands with between 1 and 25 people → 25 possible values.

26 pigeons (people), 25 holes (possible handshake counts) → by the Pigeon Hole Principle, **at least two people have the same handshake count**.

---

### Problem: Have We Met Before?

**Statement:** Show that among any 6 people at a party, either at least 3 people met each other before, or at least 3 people were strangers before.

**Solution:**  
Fix person 6. Among the remaining 5, either **≥ 3 met person 6** or **≥ 3 did not meet person 6**.

**Case 1: 3+ have met you.**  
- If any two of them met each other → you + those two = 3 mutual acquaintances.
- If none of them met each other → those 3+ are mutual strangers.

**Case 2: 3+ have NOT met you.**  
- If any two of them have NOT met each other → you + those two = 3 mutual strangers.
- If all pairs among them HAVE met each other → those 3+ are mutual acquaintances.

In all cases, the conclusion holds. ∎

---

### Problem: Ants on a Square

**Setup:**  
51 ants on a unit square. Can you place a circle of radius 1/7 to encompass at least 3 ants?

**Solution:**  
Divide the square into a **5×5 grid** of 25 smaller squares (each with side 1/5).

By the Generalized Pigeon Hole Principle: 51 ants in 25 squares → at least one square has **⌈51/25⌉ = 3** ants.

A circle of radius 1/7 can cover any 1/5 × 1/5 square (since √2 × (1/5) ≈ 0.283 < 2/7 ≈ 0.286). **Yes, you can always find such a position.**

---

### Problem: Counterfeit Coins II

**Setup:**  
5 bags of 100 coins each. Each coin weighs 9, 10, or 11 grams. All coins in a bag weigh the same. How many times do you use a digital scale to determine the type of each bag?

**Solution:**  
Use **1, 3, 9, 27, 81 coins** from bags 1, 2, 3, 4, 5 respectively (powers of 3).

Each bag has 3 possible types. The unique weighted sum identifies all 5 bags simultaneously — **one weighing.**

*This uses the Pigeon Hole Principle to ensure all 3⁵ = 243 combinations produce distinguishable sums.*

---

## 2.7 Modular Arithmetic

> The **modulo operation** x%y finds the remainder when x is divided by y.
> 
> **Key property:** If x₁%y = x₂%y, then (x₁ − x₂)%y = 0.

---

### Problem: Prisoner Problem (2 colors)

**Setup:**  
100 prisoners each receive a red or blue hat. Each can see all others' hats but not their own. They are called out randomly and must guess their own hat color aloud (others can hear). If a prisoner guesses correctly, they're freed; otherwise executed.

**Design a strategy to save as many as possible.**

**Solution:**  
At least **99 prisoners can be guaranteed to be saved**.

- Prisoner 1 (first called) counts the red hats he sees. If **odd**, he declares **red**; if **even**, he declares **blue**. He has a 1/2 chance of survival.
- Each subsequent prisoner, using the declared color plus what they observe, can deduce their own hat color with certainty.

**Extension to 3 colors (red, green, blue):**  
Assign scores: red=0, green=1, blue=2.

Prisoner 1 announces the color corresponding to (sum of all visible scores) % 3. All others can then deduce their own score. **At least 99 are still guaranteed to be saved.**

---

### Problem: Division by 9

**Rule:** An integer is divisible by 9 if and only if the **sum of its digits is divisible by 9**.

**Proof:**  
Write integer a = aₙ·10ⁿ + aₙ₋₁·10ⁿ⁻¹ + ... + a₁·10 + a₀.

Define b = a − (aₙ + aₙ₋₁ + ... + a₀).

Then b = aₙ(10ⁿ−1) + aₙ₋₁(10ⁿ⁻¹−1) + ... + a₁(10−1).

Since each (10ᵏ − 1) is divisible by 9 (e.g., 9, 99, 999, ...), b is divisible by 9. Therefore a is divisible by 9 iff the digit sum is divisible by 9. ∎

*(Similarly: a number is divisible by 11 iff the alternating digit sum (with signs ±) is divisible by 11.)*

---

### Problem: Chameleon Colors

**Setup:**  
A remote island has **13 red, 15 green, 17 blue** chameleons. When two chameleons of different colors meet, **both change to the third color**.

**Can all chameleons ever become the same color?**

**Solution:**  
**No.**

**Approach 1 (Simplification):**  
Reduce: subtract minimum (13) from each → (0, 2, 4). Try to reach (0, 0, 6). As shown in the combination transition graph, combination (0, 2, 4) cannot reach (0, 0, 6).

**Approach 2 (Modular invariant):**  
The initial counts mod 3: 13 ≡ 1, 15 ≡ 0, 17 ≡ 2 (mod 3).

After any meeting of two different-colored chameleons, the three possible transformations are:
- (3x+2, 3y, 3z+1) → (3x, 3y+1, 3z+2)
- (3x, 3y+1, 3z+2) → (3x+2, 3y+2, 3z)  ← wait

In every case, the residues mod 3 remain one of {0, 1, 2} for the three groups. Since we need two groups to have equal counts (as an intermediate step toward all-same), and the mod-3 residues of any two groups remain permanently distinct, two groups can **never** have the same count.

**The chameleons can never all become one color.** ∎

---

## 2.8 Math Induction

> **Steps for Proof by Induction:**
> 1. State you're using induction; define predicate P(n).
> 2. Prove the **base case** P(1) (or smallest applicable n).
> 3. Prove that **P(n) implies P(n+1)** for every integer n.
>    *(In strong induction: P(1), P(2), ..., P(n) together imply P(n+1).)*

---

### Problem: Coin Split Problem

**Setup:**  
Split 1000 coins into two piles. Multiply the two pile sizes. Split again, repeat, accumulate products. Continue until all piles have exactly 1 coin. Prove the final sum is **always the same** regardless of how splits are made.

**Claim:** f(n) = n(n−1)/2

**Solution (by strong induction):**  
Base cases: f(2) = 1, f(3) = 3, f(4) = 6. ✓

Inductive step: Assume f(k) = k(k−1)/2 for all k < N.

For N coins split into x and N−x:
f(N) = x(N−x) + f(x) + f(N−x) = x(N−x) + x(x−1)/2 + (N−x)(N−x−1)/2 = N(N−1)/2

**For n = 1000:** f(1000) = 1000 × 999 / 2 = **499,500**

---

### Problem: Chocolate Bar Problem

**Setup:**  
A 6×8 chocolate bar (48 squares). Each break splits one rectangle into two. **How many breaks to get all 48 individual squares?**

**Solution:**  
**General answer: mn − 1 breaks for an m×n bar.**

**Intuitive proof:** Each break increases the number of pieces by exactly 1. Start with 1 piece; end with mn pieces. Therefore: **mn − 1 breaks**.

**For 6×8:** 6 × 8 − 1 = **47 breaks.**

---

### Problem: Race Track

**Setup:**  
One-way circular track. N gas cans placed randomly. The total gas is exactly enough to complete one circle. Your car starts with no gas. **Prove you can always find a starting position that lets you complete the full circle.**

**Solution (by induction):**  
- **Base n=1:** Start at the single gas can. ✓
- **Base n=2:** One can must have enough gas to reach the other. Start there. ✓
- **Inductive step:** Given the statement holds for N=n, prove for N=n+1:  
  Among n+1 cans, there always exists some i where gas xᵢ ≥ segment yᵢ. Merge can i+1 into can i (combine gas at position i). This reduces the N=n+1 problem to N=n, for which a valid start exists. ∎

**Alternative approach:** Drive the full circle with a "fully-fueled phantom car" from any starting point. Record tank level at each gas can (before refueling). The position with the **lowest recorded level** before refueling is the valid starting position for an empty-tank car.

---

## 2.9 Proof by Contradiction

> **Method:** Assume the proposition is false. Show this leads to a logical contradiction. Therefore the proposition must be true.

---

### Problem: Irrational Number

**Prove that √2 is irrational.**

**Proof:**  
Assume √2 is rational. Then √2 = m/n for integers m, n with **no common factors** (irreducible fraction).

Then m² = 2n² → m² is even → m is even. Write m = 2x.

Then 4x² = 2n² → n² = 2x² → n is even.

But if both m and n are even, they share the common factor 2 — **contradicting our assumption**. Therefore, √2 is irrational. ∎

---

### Problem: Rainbow Hats

**Setup:**  
7 prisoners, each receives a hat of one of 7 rainbow colors (at the executioner's discretion). Each prisoner can see all others' hats but not their own. They cannot communicate. Each writes down their guess. **If at least one guess is correct, all go free.** Design a guaranteed strategy.

**Solution:**  
Assign color codes 0–6 to the 7 colors. Label prisoners 0–6.

**Strategy:** Prisoner i guesses the color gᵢ such that:

gᵢ + (sum of all other 6 prisoners' hat codes) ≡ i (mod 7)

This means each prisoner is "responsible" for a unique remainder class.

**Why it works:**  
The true sum Σxₖ must have some remainder r ∈ {0, 1, 2, 3, 4, 5, 6}. The prisoner responsible for remainder r will guess their hat color correctly.

**Proof by contradiction:** If gᵢ ≠ xᵢ for all i, then Σxₖ % 7 ≠ 0, 1, 2, 3, 4, 5, or 6 — which is impossible. Therefore at least one prisoner guesses correctly. **All 7 go free.** ∎

---

## Chapter Summary

| Section | Key Technique | Signature Problem |
|---------|--------------|-------------------|
| 2.1 | Problem Simplification | Screwy Pirates, Tiger & Sheep |
| 2.2 | Logic Reasoning | Burning Ropes, Birthday, Card Game |
| 2.3 | Thinking Out of the Box | Light Switches, Message Delivery |
| 2.4 | Symmetry | Coin Piles, Mislabeled Bags, Wise Men |
| 2.5 | Series Summation | Trailing Zeros, Glass Balls, Clock Pieces |
| 2.6 | Pigeon Hole Principle | Matching Socks, Counterfeit Coins II |
| 2.7 | Modular Arithmetic | Prisoner Problem, Chameleon Colors |
| 2.8 | Math Induction | Coin Split, Chocolate Bar, Race Track |
| 2.9 | Proof by Contradiction | √2 Irrational, Rainbow Hats |

---

## Review Questions

1. In the Screwy Pirates problem, how many coins does the most senior pirate keep? Why do pirates 2 and 4 receive nothing?
2. Explain the coloring argument used to prove that 53 bricks (1×1×4) cannot pack into a 6×6×6 box.
3. Why does the burning rope problem require you to light one rope from both ends, and what principle does this exploit?
4. In the Pigeon Hole Principle, what is the key insight that allows a single weighing to identify the counterfeit coin bag among 10 bags?
5. Explain why the number of red chameleons modulo 3 is an invariant in the Chameleon Colors problem.
6. In the Glass Balls problem, why is 14 the minimum number of drops, and how is the optimal dropping sequence derived?
7. Describe the strategy for the 7-prisoner Rainbow Hats problem. Why does the modular arithmetic approach guarantee at least one correct guess?
8. Why does the Coin Split sum always equal n(n−1)/2 regardless of the splitting order?
9. In the River Crossing problem, why should A (10 min) and B (5 min) cross together, and why not in the first trip?
10. What is the key "aha" insight in the Calendar Cubes problem?

---

*End of Chapter 2*
