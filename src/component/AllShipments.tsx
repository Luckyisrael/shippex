import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { box } from 'assets/images';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Button } from './Button';
import { Text } from './Text';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '../../components/sidcn/ui/collapsible';

import { colors } from '~/theme/colors';

interface AllShipmentsProps {
  shippmentID: string;
  to: string;
  from: string;
  status: string;
  addressFrom?: string;
  addressTo?: string;
  isChecked: boolean;
  onCheckboxChange: () => void;
}

const AllShipments = ({
  shippmentID,
  to,
  from,
  status,
  addressFrom,
  addressTo,
  isChecked,
  onCheckboxChange,
}: AllShipmentsProps) => {
  const statusColors = {
    RECEIVED: { background: '#D9E6FD', text: '#2F50C1' },
    ERROR: { background: '#FEE3D4', text: '#D12030' },
    DELIVERED: { background: '#E3FAD6', text: '#208D28' },
    CANCELED: { background: '#F4F2F8', text: '#58536E' },
    'ON HOLD': { background: '#FFF3D5', text: '#DB7E21' },
  };

  // Get colors based on the status
  const { background, text } = statusColors[status] || { background: 'gray', text: 'black' };

  return (
    <View>
      <Collapsible onOpenChange={(e) => console.log(e)} height={150}>
        <CollapsibleTrigger>
          <View style={styles.triggerContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={onCheckboxChange} // Handle checkbox change
                color={isChecked ? colors.palette.primary : undefined}
              />
            </View>
            <View>
              <Image source={box} resizeMode="contain" style={{ width: 40, height: 40 }} />
            </View>
            <View>
              <Text family="light" size={10}>
                AWB
              </Text>
              <Text family="medium" size={13}>
                {shippmentID}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text family="light" size={10} style={styles.spacing}>
                  {to}
                </Text>
                <AntDesign
                  name="arrowright"
                  size={13}
                  color={colors.palette.primary}
                  style={styles.spacing}
                />
                <Text family="light" size={10}>
                  {from}
                </Text>
              </View>
            </View>
            <View style={[{ backgroundColor: background, padding: 3, borderRadius: 5 }]}>
              <Text family="bold" size={8} color={text}>
                {status}
              </Text>
            </View>
            <View style={{ backgroundColor: '#fff', padding: 5, borderRadius: 20 }}>
              <AntDesign name="arrowsalt" size={16} color="black" />
            </View>
          </View>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <View style={styles.shippmentContent}>
            <View>
              <Text family="light" size={11} color={colors.palette.primary}>
                Origin
              </Text>
              <Text size={12} family="medium">
                {from}
              </Text>
              <Text family="light" size={11}>
                {addressFrom}
              </Text>
            </View>
            <View>
              <AntDesign
                name="arrowright"
                size={23}
                color={colors.palette.primary}
                style={styles.spacing}
              />
            </View>
            <View>
              <Text family="light" size={11} color={colors.palette.primary}>
                Destination
              </Text>
              <Text size={13} family="medium">
                {to}
              </Text>
              <Text family="light" size={11}>
                {addressTo}
              </Text>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              length="35%"
              leftIcon={<Ionicons name="call" size={22} color="#fff" />}
              label="Call"
              color={colors.palette.primary300}
            />

            <Button
              length="35%"
              leftIcon={<FontAwesome name="whatsapp" size={22} color="#fff" />}
              label="Whatsapp"
              color={colors.palette.green}
              style={{ marginLeft: 15 }}
            />
          </View>
        </CollapsibleContent>
      </Collapsible>
    </View>
  );
};

export default AllShipments;

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
    borderRadius: 5,
  },
  triggerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#F4F2F8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  spacing: {
    marginRight: 5,
  },
  shippmentContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
