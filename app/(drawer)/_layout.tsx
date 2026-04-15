import { Drawer } from 'expo-router/drawer';
import { FontAwesome5 } from '@expo/vector-icons';
import Sidebar from '../../components/layout/Sidebar';
import { Colors, Typography, Spacing } from '../../constants/theme';

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <Sidebar {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.bg.primary,
          shadowColor: 'transparent',
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: Colors.border.subtle,
        },
        headerTintColor: Colors.text.primary,
        headerTitleStyle: {
          fontFamily: Typography.family.bold,
          fontSize: Typography.size.body.fontSize,
          color: Colors.text.primary,
        },
        drawerActiveTintColor: Colors.accent.primary,
        drawerInactiveTintColor: Colors.text.tertiary,
        drawerLabelStyle: {
          fontFamily: Typography.family.semibold,
          fontSize: Typography.size.body.fontSize,
        },
        sceneStyle: { backgroundColor: Colors.bg.primary },
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: 'Dashboard',
          title: 'Dashboard',
          drawerIcon: ({ color }) => <FontAwesome5 name="columns" size={16} color={color} />,
        }}
      />
      <Drawer.Screen
        name="reader"
        options={{
          drawerLabel: 'Reader',
          title: 'Reader Mode',
          drawerIcon: ({ color }) => <FontAwesome5 name="book-reader" size={16} color={color} />,
        }}
      />
      <Drawer.Screen
        name="flashcards"
        options={{
          drawerLabel: 'Flashcards',
          title: 'Review',
          drawerIcon: ({ color }) => <FontAwesome5 name="layer-group" size={16} color={color} />,
        }}
      />
    </Drawer>
  );
}
