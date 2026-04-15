import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius, Shadows, Layout } from '../../constants/theme';

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function DashboardScreen() {
  const problems = useQuery(api.problems.list);
  const dueCards = useQuery(api.mastery.getDueCards, { user_id: 'local_user' });

  const totalProblems = problems?.length ?? 0;
  const dueCount = dueCards?.length ?? 0;
  const chaptersSet = new Set(problems?.map((p) => p.chapter));
  const chapterCount = chaptersSet.size;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Welcome ─── */}
      <Animated.View entering={FadeInDown.delay(100).duration(500)} style={styles.welcomeSection}>
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.welcomeSub}>
          Your journey to acing quant interviews continues here.
        </Text>
      </Animated.View>

      {/* ─── Stats Grid ─── */}
      <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.statsGrid}>
        <View style={[styles.statCard, styles.statCardHalf]}>
          <View style={[styles.statAccent, { backgroundColor: Colors.accent.primary }]} />
          <FontAwesome5 name="puzzle-piece" size={16} color={Colors.accent.primary} style={styles.statIcon} />
          <Text style={styles.statNumber}>{totalProblems}</Text>
          <Text style={styles.statLabel}>Total Problems</Text>
        </View>

        <View style={[styles.statCard, styles.statCardHalf]}>
          <View style={[styles.statAccent, { backgroundColor: Colors.accent.secondary }]} />
          <FontAwesome5 name="clock" size={16} color={Colors.accent.secondary} style={styles.statIcon} />
          <Text style={styles.statNumber}>{dueCount}</Text>
          <Text style={styles.statLabel}>Due Today</Text>
        </View>

        <View style={[styles.statCard, styles.statCardHalf]}>
          <View style={[styles.statAccent, { backgroundColor: Colors.accent.success }]} />
          <FontAwesome5 name="book" size={16} color={Colors.accent.success} style={styles.statIcon} />
          <Text style={styles.statNumber}>{chapterCount}</Text>
          <Text style={styles.statLabel}>Chapters</Text>
        </View>

        <View style={[styles.statCard, styles.statCardHalf]}>
          <View style={[styles.statAccent, { backgroundColor: Colors.accent.blue }]} />
          <FontAwesome5 name="trophy" size={16} color={Colors.accent.blue} style={styles.statIcon} />
          <Text style={styles.statNumber}>SM-2</Text>
          <Text style={styles.statLabel}>Algorithm</Text>
        </View>
      </Animated.View>

      {/* ─── Quick Actions ─── */}
      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionCard, { borderLeftColor: Colors.accent.secondary }]}
            activeOpacity={0.8}
            onPress={() => router.push('/(drawer)/flashcards')}
          >
            <View style={[styles.actionIconBox, { backgroundColor: Colors.accent.secondaryBg }]}>
              <FontAwesome5 name="layer-group" size={18} color={Colors.accent.secondary} />
            </View>
            <Text style={styles.actionTitle}>Review Cards</Text>
            <Text style={styles.actionDesc}>
              {dueCount > 0 ? `${dueCount} cards waiting` : 'All caught up!'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { borderLeftColor: Colors.accent.primary }]}
            activeOpacity={0.8}
            onPress={() => router.push('/(drawer)/reader')}
          >
            <View style={[styles.actionIconBox, { backgroundColor: Colors.accent.primaryBg }]}>
              <FontAwesome5 name="book-open" size={18} color={Colors.accent.primary} />
            </View>
            <Text style={styles.actionTitle}>Read Problems</Text>
            <Text style={styles.actionDesc}>
              {totalProblems} problems across {chapterCount} chapters
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* ─── Active Module ─── */}
      <Animated.View entering={FadeInDown.delay(400).duration(500)}>
        <Text style={styles.sectionLabel}>CURRENTLY STUDYING</Text>
        <View style={styles.moduleCard}>
          <View style={styles.moduleHeader}>
            <View style={styles.moduleBadge}>
              <Text style={styles.moduleBadgeText}>CH 2</Text>
            </View>
            <View style={styles.moduleTextBlock}>
              <Text style={styles.moduleTitle}>Brain Teasers</Text>
              <Text style={styles.moduleSubtitle}>Active module</Text>
            </View>
          </View>
          <View style={styles.moduleProgress}>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '35%' }]} />
            </View>
            <Text style={styles.progressText}>In Progress</Text>
          </View>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
  },
  scrollContent: {
    padding: Layout.pagePadding,
    paddingBottom: Spacing.xxxl,
  },

  /* ─── Welcome ─── */
  welcomeSection: {
    marginBottom: Spacing.xl,
    paddingTop: Spacing.sm,
  },
  greeting: {
    fontFamily: Typography.family.extrabold,
    ...Typography.size.title,
    color: Colors.text.primary,
    letterSpacing: -0.5,
    marginBottom: Spacing.xs,
  },
  welcomeSub: {
    fontFamily: Typography.family.regular,
    ...Typography.size.body,
    color: Colors.text.secondary,
  },

  /* ─── Stats Grid ─── */
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
    marginBottom: Spacing.xl + Spacing.sm,
  },
  statCard: {
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  statCardHalf: {
    flexBasis: '47%',
    flexGrow: 1,
  },
  statAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 3,
    height: '100%',
    borderTopLeftRadius: Radius.md,
    borderBottomLeftRadius: Radius.md,
  },
  statIcon: {
    marginBottom: Spacing.sm,
  },
  statNumber: {
    fontFamily: Typography.family.extrabold,
    fontSize: Typography.size.title.fontSize,
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.small.fontSize,
    color: Colors.text.tertiary,
    marginTop: Spacing.xxs,
  },

  /* ─── Section Label ─── */
  sectionLabel: {
    fontFamily: Typography.family.bold,
    fontSize: 10,
    color: Colors.text.muted,
    letterSpacing: 1.5,
    marginBottom: Spacing.md,
  },

  /* ─── Quick Actions ─── */
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.xl + Spacing.sm,
  },
  actionCard: {
    flex: 1,
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    borderLeftWidth: 3,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  actionIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },
  actionTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.body.fontSize,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  actionDesc: {
    fontFamily: Typography.family.regular,
    ...Typography.size.small,
    color: Colors.text.tertiary,
  },

  /* ─── Module Card ─── */
  moduleCard: {
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    borderRadius: Radius.md,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  moduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  moduleBadge: {
    backgroundColor: Colors.accent.primaryBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.accent.primary + '30',
  },
  moduleBadgeText: {
    fontFamily: Typography.family.extrabold,
    fontSize: Typography.size.small.fontSize,
    color: Colors.accent.primary,
  },
  moduleTextBlock: {
    flex: 1,
  },
  moduleTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.subtitle.fontSize,
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  moduleSubtitle: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.small.fontSize,
    color: Colors.text.tertiary,
    marginTop: Spacing.xxs,
  },
  moduleProgress: {
    gap: Spacing.sm,
  },
  progressTrack: {
    height: 6,
    backgroundColor: Colors.bg.elevated,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent.primary,
    borderRadius: 3,
  },
  progressText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.caption.fontSize,
    color: Colors.text.muted,
    textAlign: 'right',
  },
});
