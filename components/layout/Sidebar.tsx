import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../constants/theme';

const chapters = [
  { num: 1, title: 'Principles' },
  { num: 2, title: 'Brain Teasers' },
  { num: 3, title: 'Calculus & Algebra' },
  { num: 4, title: 'Probability Theory' },
  { num: 5, title: 'Stochastic Processes' },
  { num: 6, title: 'Finance' },
  { num: 7, title: 'Algorithms' },
];

export default function Sidebar(props: any) {
  const [openChapter, setOpenChapter] = useState<number | null>(2);

  return (
    <View style={styles.container}>
      {/* ─── Brand Header ─── */}
      <View style={styles.header}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>Q</Text>
        </View>
        <View style={styles.headerTextBlock}>
          <Text style={styles.brandTitle}>Quant Review</Text>
          <Text style={styles.brandSubtitle}>Zhou's Practical Guide</Text>
        </View>
      </View>

      <DrawerContentScrollView {...props} contentContainerStyle={{ paddingTop: Spacing.sm }}>
        {/* ─── Core Navigation ─── */}
        <DrawerItemList {...props} />

        {/* ─── Divider ─── */}
        <View style={styles.divider} />

        {/* ─── Chapter Label ─── */}
        <Text style={styles.sectionLabel}>CHAPTERS</Text>

        {/* ─── Chapter Accordion ─── */}
        <View style={styles.chapterSection}>
          {chapters.map((chap) => (
            <View key={chap.num}>
              <TouchableOpacity
                style={[
                  styles.chapterBtn,
                  openChapter === chap.num && styles.chapterBtnActive,
                ]}
                activeOpacity={0.7}
                onPress={() => setOpenChapter(openChapter === chap.num ? null : chap.num)}
              >
                <View style={[
                  styles.chapterNum,
                  openChapter === chap.num && styles.chapterNumActive,
                ]}>
                  <Text style={[
                    styles.chapterNumText,
                    openChapter === chap.num && styles.chapterNumTextActive,
                  ]}>
                    {chap.num}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.chapterText,
                    openChapter === chap.num && styles.chapterTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {chap.title}
                </Text>
                <FontAwesome
                  name={openChapter === chap.num ? 'chevron-down' : 'chevron-right'}
                  size={10}
                  color={openChapter === chap.num ? Colors.accent.primary : Colors.text.muted}
                />
              </TouchableOpacity>

              {openChapter === chap.num && (
                <View style={styles.chapterContent}>
                  <TouchableOpacity
                    style={styles.subLink}
                    activeOpacity={0.7}
                    onPress={() => {
                      props.navigation.closeDrawer();
                      router.push('/(drawer)/reader');
                    }}
                  >
                    <View style={styles.subDot} />
                    <Text style={styles.subLinkText}>All Problems</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.subLink}
                    activeOpacity={0.7}
                    onPress={() => {
                      props.navigation.closeDrawer();
                      router.push('/(drawer)/flashcards');
                    }}
                  >
                    <View style={[styles.subDot, { backgroundColor: Colors.accent.secondary }]} />
                    <Text style={styles.subLinkText}>Flashcards</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))}
        </View>
      </DrawerContentScrollView>

      {/* ─── Footer ─── */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>v1.0 · Based on Zhou's Guide</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg.card,
  },

  /* ─── Header ─── */
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: 56,
    paddingBottom: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.bg.card,
  },
  logoBox: {
    width: 36,
    height: 36,
    backgroundColor: Colors.accent.primary,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.sm,
  },
  logoText: {
    color: Colors.text.inverse,
    fontFamily: Typography.family.extrabold,
    fontSize: 17,
  },
  headerTextBlock: {
    flex: 1,
  },
  brandTitle: {
    fontFamily: Typography.family.bold,
    fontSize: Typography.size.body.fontSize,
    color: Colors.text.primary,
    letterSpacing: -0.3,
  },
  brandSubtitle: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.caption.fontSize,
    color: Colors.text.tertiary,
    marginTop: 1,
  },

  /* ─── Section ─── */
  divider: {
    height: 1,
    backgroundColor: Colors.border.subtle,
    marginVertical: Spacing.sm,
    marginHorizontal: Spacing.md,
  },
  sectionLabel: {
    fontFamily: Typography.family.bold,
    fontSize: 10,
    color: Colors.text.muted,
    letterSpacing: 1.5,
    paddingHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xs,
  },

  /* ─── Chapters ─── */
  chapterSection: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  chapterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm + 2,
    paddingVertical: Spacing.sm + 3,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.sm,
    marginBottom: 1,
  },
  chapterBtnActive: {
    backgroundColor: Colors.accent.primaryBg,
  },
  chapterNum: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterNumActive: {
    backgroundColor: Colors.accent.primary,
  },
  chapterNumText: {
    fontFamily: Typography.family.bold,
    fontSize: 11,
    color: Colors.text.tertiary,
  },
  chapterNumTextActive: {
    color: Colors.text.inverse,
  },
  chapterText: {
    flex: 1,
    fontFamily: Typography.family.semibold,
    fontSize: Typography.size.small.fontSize,
    color: Colors.text.secondary,
  },
  chapterTextActive: {
    color: Colors.accent.primary,
  },
  chapterContent: {
    paddingLeft: 44,
    paddingBottom: Spacing.xs,
    gap: 2,
  },
  subLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: Radius.xs,
  },
  subDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent.primary,
  },
  subLinkText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.small.fontSize,
    color: Colors.text.secondary,
  },

  /* ─── Footer ─── */
  footer: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border.subtle,
    backgroundColor: Colors.bg.card,
  },
  footerText: {
    fontFamily: Typography.family.regular,
    fontSize: Typography.size.caption.fontSize,
    color: Colors.text.muted,
    textAlign: 'center',
  },
});
