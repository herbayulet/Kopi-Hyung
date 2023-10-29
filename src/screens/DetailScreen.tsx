import {View, Text} from 'react-native';
import React from 'react';
import useDetails from '../hooks/useDetails';

const DetailScreen = ({navigation, route}: any) => {
  const {ItemOfIndex} = useDetails({route});
  return (
    <View>
      <Text>DetailScreen</Text>
    </View>
  );
};

export default DetailScreen;
