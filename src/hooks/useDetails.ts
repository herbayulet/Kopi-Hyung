import {useStore} from '../store/store';

const useDetails = ({route}: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type == 'Coffee' ? state.CoffeeList : state.BeanList,
  )[route.params.index];
  return {ItemOfIndex};
};

export default useDetails;
