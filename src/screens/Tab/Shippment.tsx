import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { headerIcon, profileIcon } from 'assets/images';
import Checkbox from 'expo-checkbox';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Touchable,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { BottomSheet } from 'react-native-btr';

import { Input } from '../../../components/sidcn/ui/input';

import { Button, Screen, Text } from '~/component';
import AllShipments from '~/component/AllShipments';
import { shippingData } from '~/service/shippingData';
import { colors } from '~/theme/colors';

const statusFilters = ['Canceled', 'On Hold', 'Error', 'Received', 'Delivered'];

const Shippment = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [checkAll, setCheckAll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [visible, setVisible] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(3000).then(() => setRefreshing(false));
  }, []);

  function toggle() {
    setVisible((visible) => !visible);
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterData(query, statusFilter);
  };

  const handleFilter = (status: string) => {
    setStatusFilter(status === statusFilter ? '' : status);
    filterData(searchQuery, status === statusFilter ? '' : status);
  };

  const handleClearFilter = () => {
    setStatusFilter('');
    filterData(searchQuery, '');
  };

  const handleCheckAllChange = (value: boolean) => {
    setCheckAll(value);
    const updatedData = shippingData.map((item) => ({ ...item, isChecked: value }));
    setFilteredData(updatedData);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedData = [...shippingData];
    updatedData[index].isChecked = !updatedData[index].isChecked;
    setFilteredData(updatedData);
    setCheckAll(updatedData.every((item) => item.isChecked));
  };
  const filterData = (query: string, status: string) => {
    let filtered = shippingData;
    if (query) {
      filtered = filtered.filter((item) =>
        item.shippmentID.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (status) {
      filtered = filtered.filter((item) => item.status.toLowerCase() === status.toLowerCase());
    }
    const updatedData = filtered.map((item) => ({ ...item, isChecked: checkAll }));
    setFilteredData(updatedData);
  };

  // Render item function for FlatList
  const renderItem = ({ item, index }: any) => (
    <AllShipments
      from={item.from}
      to={item.to}
      shippmentID={item.shippmentID}
      status={item.status}
      addressFrom={item.addressFrom}
      addressTo={item.addressTo}
      isChecked={item.isChecked || false} // Pass the isCheckedAll state to AllShipments component
      onCheckboxChange={() => handleCheckboxChange(index)}
    />
  );

  return (
    <Screen safeAreaEdges={['top', 'start', 'end']} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View>
          <Image source={profileIcon} resizeMode="contain" style={styles.profileImage} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image source={headerIcon} resizeMode="contain" style={styles.logoImage} />
        </View>
        <TouchableOpacity style={styles.notificationBell}>
          <Ionicons name="notifications-outline" size={24} color={colors.palette.primary} />
        </TouchableOpacity>
      </View>

      <View>
        <Text size={15} family="light">
          Hello,
        </Text>
        <Text family="bold" size={20}>
          Ibrahim Shaker
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          type="text"
          style={styles.input}
          placeholder="Search by Shipping ID"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.button}>
        <Button
          leftIcon={<Ionicons name="filter" size={24} color="#000" />}
          label="Filter"
          length="47%"
          variant="secondary"
          textColor="#000"
          onPress={toggle}
        />
        <Button
          leftIcon={<MaterialCommunityIcons name="line-scan" size={24} color="#fff" />}
          label="Add Scan"
          length="47%"
          variant="primary"
          color={colors.palette.primary}
        />
      </View>

      <View>
        <View style={styles.shippmentHeader}>
          <Text family="medium" size={18}>
            Shippments
          </Text>
          <View style={styles.shippmentContent}>
            <Checkbox
              style={styles.checkbox}
              value={checkAll}
              onValueChange={handleCheckAllChange}
              color={checkAll ? colors.palette.primary : undefined}
            />
            <Text size={14} family="light" color={colors.palette.primary}>
              Mark All
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            data={searchQuery || statusFilter ? filteredData : shippingData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          />
          {refreshing && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.palette.primary} />
            </View>
          )}
        </View>
      </View>

      <View>
        <BottomSheet visible={visible} onBackButtonPress={toggle} onBackdropPress={toggle}>
          <View style={styles.bottomSheetContainer}>
            <View style={styles.bottomSheetHeader}>
              <TouchableOpacity onPress={toggle}>
                <Text family="bold" size={16} color={colors.palette.primary300}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text family="bold" size={16}>
                  Filter
                </Text>
              </View>
              <TouchableOpacity onPress={toggle}>
                <Text family="bold" size={16} color={colors.palette.primary300}>
                  Done
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: colors.palette.grey,
              }}
            />
            <View style={{ marginHorizontal: 20 }}>
              <Text family="medium" color="grey" size={14} style={{ marginVertical: 10 }}>
                SHIPMENT STATUS
              </Text>
              <View style={styles.filterButtonsContainer}>
                {statusFilters.map((status, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.filterButton,
                      {
                        borderWidth: 2,
                        borderColor:
                          statusFilter === status ? colors.palette.primary300 : colors.palette.grey,
                      },
                    ]}
                    onPress={() => handleFilter(status)}>
                    <Text
                      size={13}
                      family="medium"
                      color={statusFilter === status ? colors.palette.primary300 : 'grey'}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    {
                      backgroundColor: statusFilter
                        ? colors.palette.primary300
                        : colors.palette.grey,
                    },
                  ]}
                  onPress={handleClearFilter}>
                  <Text family="medium" size={13}>
                    Clear Filter
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </BottomSheet>
      </View>
    </Screen>
  );
};

export default Shippment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  profileImage: {
    width: 45,
    height: 45,
  },
  logoImage: {
    height: 100,
    width: 100,
  },
  notificationBell: {
    backgroundColor: colors.palette.grey,
    padding: 10,
    borderRadius: 25,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
  },
  checkbox: {
    margin: 8,
    borderRadius: 5,
  },
  shippmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  shippmentContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    //borderWidth: 1,
    borderRadius: 5,
    height: 55,
  },
  inputContainer: { marginTop: 20, backgroundColor: '#F4F2F8', borderRadius: 10 },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    height: 300,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 10,
  },
  bottomSheetContent: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterOption: {
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.palette.grey,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: colors.palette.grey,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});
