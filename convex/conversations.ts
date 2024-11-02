import { v } from 'convex/values'

import { auth } from './auth'
import { mutation } from './_generated/server'

export const createOrGet = mutation({
  args: {
    memberId: v.id('members'),
    workspaceId: v.id('workspaces')
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)

    if (!userId) {
      throw new Error('Unauthorized')
    }

    const currentMember = await ctx.db
      .query('members')
      .withIndex('by_workspacec_id_user_id', (q) => q.eq('workspaceId', args.workspaceId).eq('userId', userId))
      .unique()

    const ortherMember = await ctx.db.get(args.memberId)

    if (!currentMember || !ortherMember) {
      throw new Error('Member not found')
    }

    const existingConversation = await ctx.db
      .query('conversations')
      .filter((q) => q.eq(q.field('workspaceId'), args.workspaceId))
      .filter((q) =>
        q.or(
          q.and(q.eq(q.field('memberOneId'), currentMember._id), q.eq(q.field('memberTwoId'), ortherMember._id)),
          q.and(q.eq(q.field('memberOneId'), ortherMember._id), q.eq(q.field('memberTwoId'), currentMember._id))
        )
      )
      .unique()

    if (existingConversation) {
      return existingConversation._id
    }

    const conversationId = await ctx.db.insert('conversations', {
      workspaceId: args.workspaceId,
      memberOneId: currentMember._id,
      memberTwoId: ortherMember._id
    })

    return conversationId
  }
})