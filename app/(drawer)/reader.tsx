import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useState } from 'react';
import Markdown from 'react-native-markdown-display';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadows, Layout } from '../../constants/theme';

/* ─── Difficulty Badge ─── */
const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const d = difficulty?.toLowerCase() || 'medium';
  const color =
    d === 'easy' ? Colors.accent.success :
    d === 'hard' ? Colors.accent.danger :
    Colors.accent.secondary;
  const bg =
    d === 'easy' ? Colors.accent.successBg :
    d === 'hard' ? Colors.accent.dangerBg :
    Colors.accent.secondaryBg;

  return (
    <View style={[styles.diffBadge, { backgroundColor: bg, borderColor: color + '30' }]}>
      <Text style={[styles.diffBadgeText, { color }]}>
        {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}
      </Text>
    </View>
  );
};

/* ─── Problem Card ─── */
const ProblemCard = ({ problem, index }: { problem: any; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const heightProgress = useSharedValue(0);

  const toggleExpand = () => {
    setExpanded(!expanded);
    heightProgress.value = withTiming(expanded ? 0 : 1, { duration: 300 });
  };

  const bodyStyle = useAnimatedStyle(() => ({
    opacity: heightProgress.value,
    maxHeight: heightProgress.value * 2000,
    marginTop: heightProgress.value * Spacing.md,
    overflow: 'hidden',
  }));

  return (
    <View style={styles.card}>
      {/* ─── Card Header ─── */}
      <View style={styles.cardHeader}>
        <View style={styles.cardNumberBox}>
          <Text style={styles.cardNumber}>{index + 1}</Text>
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cardTitle}>{problem.title}</Text>
        </View>
        {problem.difficulty && <DifficultyBadge difficulty={problem.difficulty} />}
      </View>

      {/* ─── Problem Body ─── */}
      <View style={styles.cardBody}>
        <Markdown style={markdownStyles}>{problem.setup}</Markdown>
      </View>

      {/* ─── Expand Toggle ─── */}
      <TouchableOpacity
        onPress={toggleExpand}
        activeOpacity={0.7}
        style={styles.expandButton}
      >
        <FontAwesome5
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={10}
          color={Colors.accent.primary}
        />
        <Text style={styles.expandText}>
          {expanded ? 'Hide Solution' : 'Show Solution'}
        </Text>
      </TouchableOpacity>

      {/* ─── Solution (Collapsible) ─── */}
      <Animated.View style={bodyStyle}>
        <View style={styles.solutionBox}>
          <View style={styles.solutionLabel}>
            <FontAwesome5 name="lightbulb" size={12} color={Colors.accent.primary} />
            <Text style={styles.solutionLabelText}>Solution</Text>
          </View>
          <View style={styles.solutionContent}>
            <Markdown style={markdownStyles}>{problem.solution}</Markdown>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

/* ─── Main Screen ─── */
export default function ReaderScreen() {
  const problems = useQuery(api.problems.list);

  if (problems === undefined) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.accent.primary} />
        <Text style={styles.loadingText}>Loading problems…</Text>
      </View>
    );
  }

  if (problems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <FontAwesome5 name="book" size={32} color={Colors.text.muted} />
        <Text style={styles.emptyTitle}>No problems yet</Text>
        <Text style={styles.emptyDesc}>Run the seed script to ingest problems from the guide.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={problems}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => <ProblemCard problem={item} index={index} />}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.listHeaderTitle}>All Problems</Text>
            <Text style={styles.listHeaderCount}>{problems.length} problems</Text>
          </View>
        }
      />
    </View>
  );
}

/* ─── Markdown Theme (Reading-Optimized) ─── */
const markdownStyles = StyleSheet.create({
  body: {
    fontFamily: Typography.family.regular,
    color: Colors.text.secondary,
    fontSize: Typography.size.body.fontSize,
    lineHeight: Typography.size.body.lineHeight + 2, // extra generous for reading
  },
  paragraph: {
    marginTop: 0,
    marginBottom: Spacing.md,
  },
  strong: {
    fontFamily: Typography.family.bold,
    color: Colors.text.primary,
  },
  em: {
    fontFamily: Typography.family.regular,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
  code_inline: {
    fontFamily: 'monospace',
    backgroundColor: Colors.bg.elevated,
    color: Colors.accent.primary,
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 14,
  },
  code_block: {
    fontFamily: 'monospace',
    backgroundColor: Colors.bg.elevated,
    padding: Spacing.md,
    borderRadius: Radius.sm,
    fontSize: 14,
    lineHeight: 22,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  fence: {
    fontFamily: 'monospace',
    backgroundColor: Colors.bg.elevated,
    padding: Spacing.md,
    borderRadius: Radius.sm,
    fontSize: 14,
    lineHeight: 22,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
  },
  blockquote: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent.secondary,
    backgroundColor: Colors.accent.secondaryBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    marginVertical: Spacing.sm,
    borderRadius: Radius.xs,
  },
  list_item: {
    marginBottom: Spacing.sm,
  },
  ordered_list: {
    marginBottom: Spacing.md,
  },
  bullet_list: {
    marginBottom: Spacing.md,
  },
});

/* ─── Styles ─── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
  },
  listContent: {
    padding: Layout.pagePadding,
    paddingBottom: Spacing.xxxl,
    maxWidth: Layout.maxReadingWidth + Layout.pagePadding * 2,
    alignSelf: 'center',
    width: '100%',
  },

  /* ─── List Header ─── */
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: Spacing.lg,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  listHeaderTitle: {
    fontFamily: Typography.family.extrabold,
    ...Typography.size.title,
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  listHeaderCount: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.small.fontSize,
    color: Colors.text.muted,
  },

  /* ─── Card ─── */
  card: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  cardNumberBox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNumber: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.small.fontSize,
    color: Colors.text.tertiary,
  },
  cardHeaderText: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: Typography.family.bold,
    ...Typography.size.subtitle,
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },

  /* ─── Card Body ─── */
  cardBody: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xs,
  },

  /* ─── Expand Toggle ─── */
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.subtle,
    marginHorizontal: Spacing.lg,
  },
  expandText: {
    fontFamily: Typography.family.semibold,
    fontSize: Typography.size.small.fontSize,
    color: Colors.accent.primary,
  },

  /* ─── Solution Box ─── */
  solutionBox: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    backgroundColor: Colors.bg.elevated,
    borderRadius: Radius.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.accent.primary,
    overflow: 'hidden',
  },
  solutionLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
  },
  solutionLabelText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.small.fontSize,
    color: Colors.accent.primary,
  },
  solutionContent: {
    padding: Spacing.md,
    paddingTop: Spacing.md,
  },

  /* ─── Difficulty Badge ─── */
  diffBadge: {
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xxs + 1,
    borderRadius: Radius.pill,
    borderWidth: 1,
  },
  diffBadgeText: {
    fontFamily: Typography.family.semibold,
    fontSize: Typography.size.caption.fontSize,
  },

  /* ─── Loading / Empty ─── */
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.body.fontSize,
    color: Colors.text.muted,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    padding: Layout.pagePadding,
  },
  emptyTitle: {
    fontFamily: Typography.family.bold,
    ...Typography.size.subtitle,
    color: Colors.text.primary,
  },
  emptyDesc: {
    fontFamily: Typography.family.regular,
    ...Typography.size.body,
    color: Colors.text.tertiary,
    textAlign: 'center',
  },
});
