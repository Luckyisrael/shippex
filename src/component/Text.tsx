/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React from 'react';
import { TextStyle } from 'react-native';
import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export interface TextProps {
  children:
    | React.ReactElement
    | React.ReactElement[]
    | React.JSX.Element
    | string
    | string[]
    | React.JSX.Element[]
    | number
    | number[];
  size: number ;
  color: string;
  family:
    | 'bold'
    | 'medium'
    | 'light'
    | 'regular'
    | 'semi-bold';
  style: TextStyle;
  numberOfLines?: number; 
}

//const Text = (props: TextProps) => {
  //return <StyledText {...props}>{props.children}</StyledText>;
//};

const Text = (props: TextProps) => {
  const { size, color, family, numberOfLines, style } = props;
  const responsiveFontSize = RFValue(size);

  return (
    <StyledText
      size={responsiveFontSize}
      color={color}
      family={family}
      numberOfLines={numberOfLines}
      style={style}
    >
      {props.children}
    </StyledText>
  );
};

const renderFamily = (type: string) => {
    switch (type) {
      case 'bold':
        return "CircularStd-Bold";
      case 'regular':
        return 'CircularStd-Book';
      case 'semi-bold':
        return 'CircularStd-Black';
      case 'medium':
        return 'CircularStd-Medium';
      case 'light':
        return "CircularStd-Light";
      default:
        return 'CircularStd-Book';
    }
  };

const StyledText = styled.Text`
  font-size: ${(props: any) => props.size}px;
  color: ${(props: any) => (props.color ? props.color : '#00000080')};
  font-family: ${(props: any) => renderFamily(props.family)};
  ${(props: any) => props.numberOfLines && `overflow: hidden;`}
`;

Text.defaultProps = {
  children: '',
  family: '',
  color: '#000000',
  size: 14,
  style: {},
};

export { Text };

