import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useHome} from '../hooks/useHome';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, FONTSIZE} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';
import {getCoffeeList} from '../hooks/utils';
import CoffeeCard from '../components/CoffeeCard';
import {styles} from '../styles/stylesHome';

const HomeScreen = ({navigation}: any) => {
  const {
    categories,
    sortedCoffee,
    searchText,
    categoryIndex,
    setCategoryIndex,
    setSearchText,
    setSortedCoffee,
    CoffeeList,
    BeanList,
    ListRef,
    searchCoffee,
    resetSearchCoffee,
  } = useHome();

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar />
        <Text style={styles.ScreenTitle}>
          Ayo pilih kopinya{'\n'}bakal lu, iya lu
        </Text>
        {/* Search Input */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText?.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
              style={styles.InputIcon}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Pilih Kopi Sendiri..."
            value={searchText}
            onChangeText={(text: string) => {
              setSearchText(text);
              searchCoffee(text);
            }}
            style={styles.TextInputContainer}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity onPress={() => resetSearchCoffee()}>
              <CustomIcon
                style={styles.InputIcon}
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        {/* Catagory Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => {
            return (
              <View
                key={index.toString()}
                style={styles.CategoryScrollViewContainer}>
                <TouchableOpacity
                  style={styles.CategoryScrollViewItem}
                  onPress={() => {
                    ListRef?.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                    setCategoryIndex({
                      index: index,
                      category: categories[index],
                    });
                    setSortedCoffee([
                      ...getCoffeeList(categories[index], CoffeeList),
                    ]);
                  }}>
                  <Text
                    style={[
                      styles.CategoryTextActive,
                      categoryIndex.index == index
                        ? {color: COLORS.primaryOrangeHex}
                        : {},
                    ]}>
                    {data}
                  </Text>
                  {categoryIndex.index == index ? (
                    <View style={styles.ActiveCategory} />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        {/* Coffee Flatlist */}
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryTextActive}>
                Ga ada kopi kaya gitu
              </Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatlistContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item?.index,
                    id: item?.id,
                    type: item?.type,
                  });
                }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Text style={styles.CoffeeBeansTitle}>Biji Kopi</Text>
        {/* Beans Flatlist */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[
            styles.FlatlistContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Details', {
                    index: item?.index,
                    id: item?.id,
                    type: item?.type,
                  });
                }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={() => {}}
                />
              </TouchableOpacity>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
