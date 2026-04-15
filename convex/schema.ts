import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  problems: defineTable({
    uid: v.string(),
    chapter: v.number(),
    section: v.string(),
    title: v.string(),
    setup: v.string(),
    solution: v.string(),
    tags: v.array(v.string()),
    difficulty: v.string(),
  }).index("by_uid", ["uid"]),

  mastery: defineTable({
    user_id: v.string(),
    problem_id: v.id("problems"),
    ease_factor: v.number(),
    interval: v.number(),
    repetitions: v.number(),
    next_review: v.number(), // epoch timestamp
  })
    .index("by_user", ["user_id"])
    .index("by_user_next_review", ["user_id", "next_review"]),
});
