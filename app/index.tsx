import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Colors, Typography, Spacing, Radius, Shadows, Layout } from '../constants/theme';

export default function LandingPage() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* ─── Hero Section ─── */}
      <View style={styles.hero}>
        {/* Badge */}
        <Animated.View entering={FadeInDown.delay(100).duration(600)} style={styles.badge}>
          <FontAwesome name="star" size={11} color={Colors.accent.secondary} />
          <Text style={styles.badgeText}>Based on Zhou's Practical Guide</Text>
        </Animated.View>

        {/* Headline */}
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <Text style={styles.headline}>
            Land the{'\n'}
            <Text style={styles.headlineAccent}>quant role</Text>{'\n'}
            you're after.
          </Text>
        </Animated.View>

        {/* Subheadline */}
        <Animated.View entering={FadeInDown.delay(300).duration(600)}>
          <Text style={styles.subheadline}>
            Every problem from the definitive quant interview guide — now interactive, tracked, and spaced for retention.
          </Text>
        </Animated.View>

        {/* CTA */}
        <Animated.View entering={FadeInDown.delay(400).duration(600)} style={styles.ctaWrapper}>
          <TouchableOpacity
            style={styles.ctaButton}
            activeOpacity={0.85}
            onPress={() => router.push('/(drawer)')}
          >
            <Text style={styles.ctaText}>Start Studying</Text>
            <View style={styles.ctaArrow}>
              <FontAwesome name="arrow-right" size={14} color={Colors.text.inverse} />
            </View>
          </TouchableOpacity>
          <Text style={styles.ctaSubtext}>Free & open source — no strings attached</Text>
        </Animated.View>

        {/* Stats Row */}
        <Animated.View entering={FadeInUp.delay(500).duration(600)} style={styles.statsRow}>
          <View style={styles.statPill}>
            <FontAwesome5 name="brain" size={14} color={Colors.accent.primary} />
            <Text style={styles.statNum}>100+</Text>
            <Text style={styles.statLabel}>Problems</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statPill}>
            <FontAwesome5 name="sync-alt" size={14} color={Colors.accent.secondary} />
            <Text style={styles.statNum}>SM-2</Text>
            <Text style={styles.statLabel}>Spaced Rep.</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statPill}>
            <FontAwesome5 name="book" size={14} color={Colors.accent.blue} />
            <Text style={styles.statNum}>7</Text>
            <Text style={styles.statLabel}>Chapters</Text>
          </View>
        </Animated.View>
      </View>

      {/* ─── Decorative Divider ─── */}
      <View style={styles.ornamentRow}>
        <View style={styles.ornamentLine} />
        <FontAwesome5 name="square-root-alt" size={14} color={Colors.text.muted} />
        <View style={styles.ornamentLine} />
      </View>

      {/* ─── Features Section ─── */}
      <View style={styles.features}>
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <Text style={styles.sectionEyebrow}>Everything you need</Text>
          <Text style={styles.sectionTitle}>Study smarter, not longer</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: Colors.accent.primaryBg }]}>
              <FontAwesome5 name="book-open" size={16} color={Colors.accent.primary} />
            </View>
            <View style={styles.featureTextBlock}>
              <Text style={styles.featureTitle}>Word-for-Word Reader</Text>
              <Text style={styles.featureDesc}>
                Every problem reproduced exactly from the source with beautifully typeset solutions you can reveal one at a time.
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: Colors.accent.secondaryBg }]}>
              <FontAwesome5 name="layer-group" size={16} color={Colors.accent.secondary} />
            </View>
            <View style={styles.featureTextBlock}>
              <Text style={styles.featureTitle}>Adaptive Flashcards</Text>
              <Text style={styles.featureDesc}>
                SM-2 spaced repetition schedules your reviews right before you forget — turning short-term cramming into lasting knowledge.
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: Colors.accent.blueBg }]}>
              <FontAwesome5 name="chart-line" size={16} color={Colors.accent.blue} />
            </View>
            <View style={styles.featureTextBlock}>
              <Text style={styles.featureTitle}>Track Your Progress</Text>
              <Text style={styles.featureDesc}>
                See your mastery grow across chapters. Know exactly where you stand and what to review next.
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* ─── Footer ─── */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Built for quants, by quants.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg.primary,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },

  /* ─── Hero ─── */
  hero: {
    paddingHorizontal: Layout.pagePadding,
    paddingTop: 80,
    paddingBottom: Spacing.xxl,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.accent.secondaryBg,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radius.pill,
    marginBottom: Spacing.xl,
  },
  badgeText: {
    fontFamily: Typography.family.semibold,
    fontSize: Typography.size.caption.fontSize,
    color: Colors.accent.secondary,
  },
  headline: {
    fontFamily: Typography.family.extrabold,
    ...Typography.size.hero,
    color: Colors.text.primary,
    textAlign: 'center',
    letterSpacing: -1,
    marginBottom: Spacing.lg,
  },
  headlineAccent: {
    color: Colors.accent.primary,
  },
  subheadline: {
    fontFamily: Typography.family.regular,
    ...Typography.size.bodyLg,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.sm,
    maxWidth: Layout.maxReadingWidth,
  },
  ctaWrapper: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
    width: '100%',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.accent.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: Radius.md,
    width: '100%',
    maxWidth: 300,
    ...Shadows.lg,
  },
  ctaText: {
    fontFamily: Typography.family.bold,
    color: Colors.text.inverse,
    fontSize: Typography.size.body.fontSize,
  },
  ctaArrow: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaSubtext: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.small.fontSize,
    color: Colors.text.muted,
    marginTop: Spacing.sm + 2,
  },

  /* ─── Stats ─── */
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    borderRadius: Radius.lg,
    paddingVertical: Spacing.md + 4,
    paddingHorizontal: Spacing.lg,
    ...Shadows.sm,
    width: '100%',
    maxWidth: 420,
  },
  statPill: {
    flex: 1,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statNum: {
    fontFamily: Typography.family.extrabold,
    fontSize: Typography.size.subtitle.fontSize,
    color: Colors.text.primary,
    marginTop: Spacing.xxs,
  },
  statLabel: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.caption.fontSize,
    color: Colors.text.tertiary,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: Colors.border.subtle,
    marginHorizontal: Spacing.sm,
  },

  /* ─── Ornament ─── */
  ornamentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
  },
  ornamentLine: {
    width: 48,
    height: 1,
    backgroundColor: Colors.border.medium,
  },

  /* ─── Features ─── */
  features: {
    paddingHorizontal: Layout.pagePadding,
    paddingVertical: Spacing.xl,
    maxWidth: Layout.maxReadingWidth,
    alignSelf: 'center',
    width: '100%',
  },
  sectionEyebrow: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.caption.fontSize,
    textTransform: 'uppercase',
    color: Colors.accent.primary,
    textAlign: 'center',
    letterSpacing: 1.5,
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    fontFamily: Typography.family.extrabold,
    ...Typography.size.title,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    letterSpacing: -0.5,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.subtle,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  featureTextBlock: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.body.fontSize,
    color: Colors.text.primary,
    marginBottom: Spacing.xs,
  },
  featureDesc: {
    fontFamily: Typography.family.regular,
    ...Typography.size.small,
    color: Colors.text.secondary,
  },

  /* ─── Footer ─── */
  footer: {
    paddingVertical: Spacing.xxl,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.small.fontSize,
    color: Colors.text.muted,
  },
});
