import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  FadeInDown,
} from 'react-native-reanimated';
import { useState } from 'react';
import Markdown from 'react-native-markdown-display';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Typography, Spacing, Radius, Shadows, Layout } from '../../constants/theme';

export default function FlashcardsScreen() {
  const cards = useQuery(api.mastery.getDueCards, { user_id: 'local_user' });
  const reviewCard = useMutation(api.mastery.reviewCard);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useSharedValue(0);

  const activeCard = cards?.[currentIndex];
  const totalCards = cards?.length ?? 0;
  const progress = totalCards > 0 ? currentIndex / totalCards : 0;

  const handleFlip = () => {
    setFlipped(!flipped);
    flipAnim.value = withSpring(flipped ? 0 : 1, { damping: 15, stiffness: 120 });
  };

  const handleScore = async (score: number) => {
    if (!activeCard) return;
    await reviewCard({
      user_id: 'local_user',
      problem_id: activeCard.problem._id,
      quality: score,
    });

    setFlipped(false);
    flipAnim.value = withTiming(0, { duration: 0 });
    setCurrentIndex((prev) => prev + 1);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipAnim.value, [0, 1], [0, 180]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipAnim.value, [0, 1], [180, 360]);
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      backfaceVisibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  });

  /* ─── Loading State ─── */
  if (cards === undefined) {
    return (
      <View style={styles.centeredContainer}>
        <FontAwesome5 name="sync-alt" size={24} color={Colors.text.muted} />
        <Text style={styles.loadingText}>Syncing review schedule…</Text>
      </View>
    );
  }

  /* ─── Empty / Complete State ─── */
  if (cards.length === 0 || !activeCard) {
    return (
      <View style={styles.centeredContainer}>
        <Animated.View entering={FadeInDown.duration(500)} style={styles.emptyState}>
          <View style={styles.trophyCircle}>
            <FontAwesome5 name="trophy" size={28} color={Colors.accent.secondary} />
          </View>
          <Text style={styles.emptyTitle}>You're all caught up!</Text>
          <Text style={styles.emptyDesc}>
            Superb job. Your spaced repetition schedule is clear.{'\n'}Check back tomorrow for new reviews.
          </Text>
        </Animated.View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ─── Progress Bar ─── */}
      <View style={styles.progressSection}>
        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {currentIndex} of {totalCards} reviewed
        </Text>
      </View>

      {/* ─── Remaining Counter ─── */}
      <View style={styles.counterRow}>
        <View style={styles.counterPill}>
          <FontAwesome5 name="layer-group" size={12} color={Colors.accent.primary} />
          <Text style={styles.counterText}>{totalCards - currentIndex} remaining</Text>
        </View>
      </View>

      {/* ─── Flashcard ─── */}
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleFlip}
        style={styles.cardContainer}
      >
        {/* Front Face */}
        <Animated.View style={[styles.flashcard, frontAnimatedStyle]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.cardScrollContent}
          >
            <Text style={styles.cardTitle}>{activeCard.problem.title}</Text>
            <View style={styles.cardDivider} />
            <Markdown style={mdStyles}>{activeCard.problem.setup}</Markdown>
          </ScrollView>
          <View style={styles.flipHint}>
            <FontAwesome5 name="sync-alt" size={11} color={Colors.text.muted} />
            <Text style={styles.flipHintText}>Tap to reveal solution</Text>
          </View>
        </Animated.View>

        {/* Back Face */}
        <Animated.View style={[styles.flashcard, styles.flashcardBack, backAnimatedStyle]}>
          <View style={styles.solutionHeader}>
            <FontAwesome5 name="lightbulb" size={14} color={Colors.accent.primary} />
            <Text style={styles.solutionTitle}>Solution</Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.solutionScroll}
          >
            <Markdown style={mdStyles}>{activeCard.problem.solution}</Markdown>
          </ScrollView>
        </Animated.View>
      </TouchableOpacity>

      {/* ─── Rating Buttons ─── */}
      {flipped && (
        <Animated.View entering={FadeInDown.duration(300)} style={styles.actions}>
          <TouchableOpacity
            style={[styles.btn, styles.btnHard]}
            activeOpacity={0.8}
            onPress={() => handleScore(1)}
          >
            <FontAwesome5 name="times" size={14} color={Colors.accent.danger} />
            <Text style={[styles.btnText, { color: Colors.accent.danger }]}>Hard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnGood]}
            activeOpacity={0.8}
            onPress={() => handleScore(3)}
          >
            <FontAwesome5 name="bolt" size={14} color={Colors.accent.secondary} />
            <Text style={[styles.btnText, { color: Colors.accent.secondary }]}>Good</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, styles.btnEasy]}
            activeOpacity={0.8}
            onPress={() => handleScore(5)}
          >
            <FontAwesome5 name="check" size={14} color={Colors.accent.success} />
            <Text style={[styles.btnText, { color: Colors.accent.success }]}>Easy</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}

/* ─── Markdown (Flashcard-optimized) ─── */
const mdStyles = StyleSheet.create({
  body: {
    fontFamily: Typography.family.regular,
    color: Colors.text.secondary,
    fontSize: Typography.size.body.fontSize,
    lineHeight: Typography.size.body.lineHeight + 2,
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
    fontStyle: 'italic',
    color: Colors.text.secondary,
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
  },
  fence: {
    fontFamily: 'monospace',
    backgroundColor: Colors.bg.elevated,
    padding: Spacing.md,
    borderRadius: Radius.sm,
    fontSize: 14,
    lineHeight: 22,
  },
});

/* ─── Styles ─── */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
    padding: Layout.pagePadding,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.pagePadding,
    gap: Spacing.md,
  },

  /* ─── Progress ─── */
  progressSection: {
    marginBottom: Spacing.md,
  },
  progressTrack: {
    height: 4,
    backgroundColor: Colors.bg.elevated,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.accent.primary,
    borderRadius: 2,
  },
  progressText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.caption.fontSize,
    color: Colors.text.muted,
    textAlign: 'right',
  },

  /* ─── Counter ─── */
  counterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  counterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.accent.primaryBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.pill,
    borderWidth: 1,
    borderColor: Colors.accent.primary + '20',
  },
  counterText: {
    fontFamily: Typography.family.semibold,
    fontSize: Typography.size.small.fontSize,
    color: Colors.accent.primary,
  },

  /* ─── Card ─── */
  cardContainer: {
    flex: 1,
    maxHeight: 480,
    marginBottom: Spacing.lg,
  },
  flashcard: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    ...Shadows.md,
  },
  cardScrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl + Spacing.lg,
  },
  cardTitle: {
    fontFamily: Typography.family.extrabold,
    ...Typography.size.subtitle,
    color: Colors.accent.primary,
    textAlign: 'center',
    letterSpacing: -0.3,
    marginBottom: Spacing.md,
  },
  cardDivider: {
    height: 1,
    backgroundColor: Colors.border.subtle,
    marginBottom: Spacing.lg,
  },
  flipHint: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bg.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border.subtle,
    borderBottomLeftRadius: Radius.lg,
    borderBottomRightRadius: Radius.lg,
  },
  flipHintText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.small.fontSize,
    color: Colors.text.muted,
  },

  /* ─── Back Face ─── */
  flashcardBack: {
    overflow: 'hidden',
  },
  solutionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
    backgroundColor: Colors.accent.primaryBg,
  },
  solutionTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.body.fontSize,
    color: Colors.accent.primary,
  },
  solutionScroll: {
    padding: Spacing.lg,
  },

  /* ─── Actions ─── */
  actions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    minWidth: 100,
    backgroundColor: Colors.bg.card,
    ...Shadows.sm,
  },
  btnHard: {
    borderColor: Colors.accent.danger + '40',
  },
  btnGood: {
    borderColor: Colors.accent.secondary + '40',
  },
  btnEasy: {
    borderColor: Colors.accent.success + '40',
  },
  btnText: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.body.fontSize,
  },

  /* ─── Empty / Loading ─── */
  loadingText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.body.fontSize,
    color: Colors.text.muted,
  },
  emptyState: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  trophyCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent.secondaryBg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.accent.secondary + '30',
  },
  emptyTitle: {
    fontFamily: Typography.family.extrabold,
    ...Typography.size.title,
    color: Colors.text.primary,
    letterSpacing: -0.5,
  },
  emptyDesc: {
    fontFamily: Typography.family.regular,
    ...Typography.size.body,
    color: Colors.text.tertiary,
    textAlign: 'center',
    maxWidth: 300,
  },
});
