import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { sm } from 'App';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { Text } from './Text';

import { colors } from '~/theme/colors';

export interface GoBackProps {
  pageTitle?: string;
}

const GoBack = ({ pageTitle }: GoBackProps) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ marginRight: 5, flexDirection: 'row', alignItems: 'center' }}
            activeOpacity={0.9}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="chevron-back" size={20} color={colors.palette.primary} />
            <Text size={12} color={colors.palette.primary}>Back</Text>
          </TouchableOpacity>
          <Text family="bold" size={13}>
            {pageTitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default GoBack;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sm ? 21 : 11,
    paddingVertical: 15,
  },
});
