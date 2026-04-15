import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("problems").collect();
  },
});

export const insertProblem = mutation({
  args: {
    uid: v.string(),
    chapter: v.number(),
    section: v.string(),
    title: v.string(),
    setup: v.string(),
    solution: v.string(),
    tags: v.array(v.string()),
    difficulty: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("problems")
      .withIndex("by_uid", (q) => q.eq("uid", args.uid))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      return await ctx.db.insert("problems", args);
    }
  },
});
