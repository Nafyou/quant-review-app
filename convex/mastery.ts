import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getDueCards = query({
  args: { user_id: v.string() },
  handler: async (ctx, args) => {
    const now = Date.now();
    const due = await ctx.db
      .query("mastery")
      .withIndex("by_user", (q) => q.eq("user_id", args.user_id))
      .filter((q) => q.lte(q.field("next_review"), now))
      .collect();

    const cards = await Promise.all(
      due.map(async (m) => {
        const problem = await ctx.db.get(m.problem_id);
        return { mastery: m, problem };
      })
    );
    return cards.filter(c => c.problem !== null);
  },
});

export const reviewCard = mutation({
  args: {
    user_id: v.string(),
    problem_id: v.id("problems"),
    quality: v.number(), // 0 to 5
  },
  handler: async (ctx, args) => {
    let record = await ctx.db
      .query("mastery")
      .withIndex("by_user", (q) => q.eq("user_id", args.user_id))
      .filter((q) => q.eq(q.field("problem_id"), args.problem_id))
      .first();

    let ease_factor = 2.5;
    let interval = 1;
    let repetitions = 0;

    if (record) {
      ease_factor = record.ease_factor;
      interval = record.interval;
      repetitions = record.repetitions;
    }

    if (args.quality >= 3) {
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * ease_factor);
      }
      repetitions += 1;
    } else {
      repetitions = 0;
      interval = 1;
    }

    ease_factor = ease_factor + (0.1 - (5 - args.quality) * (0.08 + (5 - args.quality) * 0.02));
    if (ease_factor < 1.3) ease_factor = 1.3;

    const next_review = Date.now() + interval * 24 * 60 * 60 * 1000;

    if (record) {
      await ctx.db.patch(record._id, {
        ease_factor, interval, repetitions, next_review
      });
    } else {
      await ctx.db.insert("mastery", {
        user_id: args.user_id,
        problem_id: args.problem_id,
        ease_factor, interval, repetitions, next_review
      });
    }
  },
});
