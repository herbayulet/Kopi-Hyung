import {useRef, useState} from 'react';
import {getCategoriesFromData, getCoffeeList} from './utils';
import {useStore} from '../store/store';
import {FlatList} from 'react-native';

export const useHome = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeansList);
  const ListRef: any = useRef<FlatList>();

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState<string>('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...CoffeeList]);
    setSearchText('');
  };

  return {
    categories,
    searchText,
    setSearchText,
    categoryIndex,
    setCategoryIndex,
    sortedCoffee,
    setSortedCoffee,
    CoffeeList,
    BeanList,
    ListRef,
    searchCoffee,
    resetSearchCoffee,
  };
};
