import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
} from 'react-native';

import { Text } from './Text';

import { colors } from '~/theme/colors';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  length?: 'half' | 'full' | number;
  color?: string;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textColor?: string;
  borderColor?: string;
  fontFamily?: 'bold' | 'medium' | 'light' | 'semi-bold' | 'regular';
  onPress?: () => void;
  textSize?: number;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  variant,
  color,
  label,
  leftIcon,
  length,
  rightIcon,
  textColor,
  borderColor,
  fontFamily,
  textSize,
  onPress,
  disabled,
  loading,
  style,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled || loading}
      onPress={() => {
        if (!loading) {
          onPress?.();
        }
      }}
      style={[
        styles.buttonContainer({
          variant,
          length,
          color,
          leftIcon,
          rightIcon,
          borderColor,
          disabled,
        }),
        style,
      ]}>
      {leftIcon}
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator
            color={textColor ? textColor : variant === 'secondary' ? '#050505' : '#FFF'}
          />
        ) : (
          <Text
            size={textSize}
            color={textColor ? textColor : variant === 'secondary' ? '#050505' : '#FFF'}>
            {label}
          </Text>
        )}
      </View>
      {rightIcon}
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  variant: 'primary',
  length: 'full',
  color: '',
  label: '',
  leftIcon: null,
  rightIcon: null,
  onPress: () => {},
  textColor: '',
  borderColor: '',
  textSize: 14,
  disabled: false,
  fontFamily: 'medium',
};

const styles = StyleSheet.create({
  buttonContainer: ({
    variant,
    length,
    color,
    leftIcon,
    rightIcon,
    borderColor,
    disabled,
  }: ButtonProps) => ({
    flexDirection: 'row',
    height: 52,
    backgroundColor: color
      ? color
      : disabled
        ? 'gray'
        : variant === 'primary'
          ? '#fff'
          : variant === 'danger'
            ? '#FFDDE3'
            : 'transparent',
    borderColor: borderColor
      ? borderColor
      : variant === 'secondary'
        ? colors.palette.primary
        : 'transparent',
    width: length === 'full' ? '100%' : length === 'half' ? '50%' : length,
    alignItems: 'center',
    justifyContent: leftIcon !== null || rightIcon !== null ? 'space-evenly' : 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
  }),
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { Button };
