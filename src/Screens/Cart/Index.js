import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {HomeData, IsActiveTime} from '../../components/DummyData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Image1 from '../../assets/Cart1.svg';
import Image2 from '../../assets/Cart2.svg';
import Image3 from '../../assets/Cart3.svg';
import Image4 from '../../assets/Cart4.svg';
import {Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  decrementProductCount,
  incrementProductCount,
  selectCart,
} from '../../Redux/cartSlice';
import {useToast} from 'react-native-toast-notifications';

const Cart = ({navigation}) => {
  const toast = useToast();
  const [isActive, setIsActive] = useState(false);
  const [isActiveShedule, setIsActiveShedule] = useState(true);
  const [DayActive, setDayActive] = useState(true);
  const [DayActive1, setDayActive1] = useState(false);
  const [Data, setData] = useState(IsActiveTime);
  const [checked, setChecked] = React.useState(false);
  const cart = useSelector(selectCart);
  const dispatch = useDispatch();
  console.log('---->', cart.products);
  const [NewData, setNewData] = useState([]);
  const [TotalPrice, setTotalPrice] = useState();

  useEffect(() => {
    const matchingItems = HomeData.filter(item =>
      cart.products.some(newItem => newItem.id === item.id),
    );
    setNewData(matchingItems);
    console.log(matchingItems);
    const totalPrice = cart.products.reduce((accumulator, newData) => {
      const product = matchingItems.find(item => item.id === newData.id);

      if (product) {
        return accumulator + newData.quantity * product.price;
      }

      return accumulator;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cart.products]);

  const HandleClick = id => {
    const newData = IsActiveTime.map(item => {
      if (item?.id == id) {
        return {
          ...item,
          isActives: true,
        };
      } else {
        return {...item, isActives: false};
      }
    });
    setData(newData);
  };
  const handleIncrementCount = productId => {
    dispatch(incrementProductCount({productId}));
  };

  const handleDecrementCount = productId => {
    dispatch(decrementProductCount({productId}));
  };

  const RenderData = ({item}) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginBottom: 20,
            justifyContent: 'space-between',
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 15,
              }}>
              {item.name}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '500'}}>
                {' '}
                ₹{item.price}/KG
              </Text>
              <Text
                style={{
                  color: '#B8B8B8',
                  textDecorationLine: 'line-through',
                  fontSize: 12,
                  fontWeight: '500',
                }}>
                {' '}
                ₹{item.off_price}
              </Text>
              <Text
                style={{
                  color: 'white',
                  backgroundColor: '#F9C941',
                  fontSize: 12,
                  fontWeight: '500',
                  borderRadius: 5,
                  paddingHorizontal: 4,
                  paddingVertical: 1,
                }}>
                {item.off}%
              </Text>
            </View>
          </View>
          <View style={{width: '40%'}}>
            <View
              style={{
                backgroundColor: '#F5F5F5',
                height: 35,
                borderRadius: 10,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 5,
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                onPress={() => handleDecrementCount(item?.id)}
                style={{
                  backgroundColor: 'white',
                  width: 27,
                  height: 27,
                  borderRadius: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: '#08C25D', fontSize: 18, fontWeight: '900'}}>
                  -
                </Text>
              </TouchableOpacity>
              <View>
                <Text
                  style={{color: '#959595', fontSize: 14, fontWeight: '500'}}>
                  {cart.products.map(items => {
                    if (item?.id == items.id) {
                      return items?.quantity;
                    }
                  })}{' '}
                  Nos
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => handleIncrementCount(item?.id)}
                style={{
                  backgroundColor: 'white',
                  width: 27,
                  height: 27,
                  borderRadius: 7,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{color: '#08C25D', fontSize: 18, fontWeight: '900'}}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                fontWeight: '500',
                textAlign: 'right',
              }}>
              {' '}
              ₹400
            </Text>
          </View>
        </View>
      </>
    );
  };

  const FooterComponent = () => {
    return (
      <>
        <View style={{marginBottom: 30}}>
          <Text style={{color: 'black', textAlign: 'center', fontSize: 15}}>
            Recommended
          </Text>
          <ScrollView
            horizontal
            contentContainerStyle={{marginVertical: 10, gap: 20}}>
            <View style={{alignItems: 'center'}}>
              <Image1 height={50} />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Cabbage
              </Text>
              <Text style={{color: 'black', fontSize: 12, fontWeight: '500'}}>
                {' '}
                ₹400
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#08C25D',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18,
                  width: 51,
                }}>
                <Text style={{color: 'white', fontSize: 12}}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image2 height={50} />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Kiwi
              </Text>
              <Text style={{color: 'black', fontSize: 12, fontWeight: '500'}}>
                {' '}
                ₹100
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#08C25D',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18,
                  width: 51,
                }}>
                <Text style={{color: 'white', fontSize: 12}}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image3 height={50} />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Cherries
              </Text>
              <Text style={{color: 'black', fontSize: 12, fontWeight: '500'}}>
                {' '}
                ₹500
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#08C25D',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18,
                  width: 51,
                }}>
                <Text style={{color: 'white', fontSize: 12}}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image4 height={50} />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Chicken
              </Text>
              <Text style={{color: 'black', fontSize: 12, fontWeight: '500'}}>
                {' '}
                ₹200
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#08C25D',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18,
                  width: 51,
                }}>
                <Text style={{color: 'white', fontSize: 12}}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image1 height={50} />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Cabbage
              </Text>
              <Text style={{color: 'black', fontSize: 12, fontWeight: '500'}}>
                {' '}
                ₹400
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#08C25D',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18,
                  width: 51,
                }}>
                <Text style={{color: 'white', fontSize: 12}}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image2 height={50} />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Kiwi
              </Text>
              <Text style={{color: 'black', fontSize: 12, fontWeight: '500'}}>
                {' '}
                ₹100
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#08C25D',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18,
                  width: 51,
                }}>
                <Text style={{color: 'white', fontSize: 12}}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image3 height={50} />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Cherries
              </Text>
              <Text style={{color: 'black', fontSize: 12, fontWeight: '500'}}>
                {' '}
                ₹500
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#08C25D',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18,
                  width: 51,
                }}>
                <Text style={{color: 'white', fontSize: 12}}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image4 height={50} />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Chicken
              </Text>
              <Text style={{color: 'black', fontSize: 12, fontWeight: '500'}}>
                {' '}
                ₹200
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#08C25D',
                  borderRadius: 4,
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 18,
                  width: 51,
                }}>
                <Text style={{color: 'white', fontSize: 12}}>Add</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 5,
              marginTop: 20,
            }}>
            <TouchableOpacity
              onPress={() => {
                setIsActive(true);
                setIsActiveShedule(false);
              }}
              style={{
                borderColor: `${isActive ? '#08C25D' : '#EDEDED'}`,
                borderWidth: 2,
                borderRadius: 10,
                width: '48%',
                height: 73,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name={'lightning-bolt-outline'}
                color={isActive ? '#08C25D' : '#EDEDED'}
                size={30}
              />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Instant delivery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsActive(false);
                setIsActiveShedule(true);
              }}
              style={{
                borderColor: `${isActiveShedule ? '#08C25D' : '#EDEDED'}`,
                borderWidth: 2,
                borderRadius: 10,
                width: '48%',
                height: 73,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialIcons
                name={'schedule'}
                color={isActiveShedule ? '#08C25D' : '#EDEDED'}
                size={30}
              />
              <Text style={{color: 'black', fontSize: 12, fontWeight: '400'}}>
                Scheduled delivery
              </Text>
            </TouchableOpacity>
          </View>
          {isActiveShedule && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 5,
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setDayActive(true);
                    setDayActive1(false);
                  }}
                  style={{
                    borderRadius: 10,
                    width: '48%',
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: `${DayActive ? '#08C25D' : ''}`,
                  }}>
                  <Text
                    style={{
                      color: `${DayActive ? 'white' : 'black'}`,
                      fontSize: 12,
                      fontWeight: '400',
                    }}>
                    Today
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setDayActive(false);
                    setDayActive1(true);
                  }}
                  style={{
                    borderRadius: 10,
                    width: '48%',
                    height: 36,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: `${DayActive1 ? '#08C25D' : ''}`,
                  }}>
                  <Text
                    style={{
                      color: `${DayActive1 ? 'white' : 'black'}`,
                      fontSize: 12,
                      fontWeight: '400',
                    }}>
                    Tommorrow
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 20,
                  justifyContent: 'space-between',
                }}>
                {Data.map((item, index) => {
                  return (
                    <>
                      <TouchableOpacity
                        key={index}
                        onPress={() => HandleClick(item?.id)}
                        style={{
                          borderColor: `${
                            item?.isActives ? '#08C25D' : 'white'
                          }`,
                          borderWidth: 2,
                          width: '30%',
                          height: 60,
                          borderRadius: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 7,
                          }}>
                          <Text
                            style={{
                              color: 'black',
                              fontSize: 12,
                              fontWeight: '400',
                            }}>
                            {item.day_time}
                          </Text>
                          <Text> {item?.icome}</Text>
                        </View>
                        <Text
                          style={{
                            color: '#A6A6A6',
                            fontSize: 12,
                            fontWeight: '400',
                          }}>
                          {item.time}
                        </Text>
                      </TouchableOpacity>
                    </>
                  );
                })}
              </View>
            </View>
          )}
          <View>
            <Text style={{color: '#A6A6A6', fontSize: 12}}>
              Delivery address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 20,
                width: '90%',
                alignSelf: 'center',
              }}>
              <Text style={{color: 'black', fontSize: 15, width: '50%'}}>
                416 Grandrose Ave. Des Plaines, IL 60016
              </Text>
              <FontAwesome5 name={'pen'} color={'#A6A6A6'} size={25} />
            </View>
          </View>
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={{color: 'black', fontSize: 12}}>
              Do you have a promo code ?
              <Text style={{color: '#08C25D'}}>Redeem Now</Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 15,
                marginBottom: 5,
              }}>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '400'}}>
                Order total
              </Text>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '400'}}>
                {' '}
                ₹400
              </Text>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '400'}}>
                Delivery fee
              </Text>
              <Text style={{color: 'black', fontSize: 15, fontWeight: '400'}}>
                {' '}
                ₹40
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 30,
              }}>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '400'}}>
                Total cost
              </Text>
              <Text style={{color: 'black', fontSize: 18, fontWeight: '400'}}>
                {' '}
                ₹{TotalPrice}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginVertical: 10, gap: 10}}>
            <Checkbox
              color="#08C25D"
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text
              style={{
                color: '#A8A8A8',
                fontSize: 15,
                fontWeight: '400',
                width: '80%',
              }}>
              By placing an order you agree to our Terms and Conditions
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              toast.show('Payment success', {
                type: 'success',
              });
            }}
            style={{
              borderColor: '#08C25D',
              borderWidth: 2,
              borderRadius: 10,
              height: 70,
              backgroundColor: '#F5F5F5',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'black', fontSize: 18}}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const ListEmpty = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text
          style={{
            color: 'gray',
            fontSize: 20,
            marginBottom: 50,
          }}>
          cart is empty
        </Text>
      </View>
    );
  };
  return (
    <>
      <SafeAreaView />
      <StatusBar backgroundColor={'#08C25D'} barStyle={'light-content'} />
      <View style={[styles.headerContainer, {backgroundColor: '#08C25D'}]}>
        <AntDesign
          name={'arrowleft'}
          color={'white'}
          size={29}
          style={styles.hederIcon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerName}>Your order</Text>
      </View>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
          <FlatList
            data={NewData}
            keyExtractor={(item, index) => item.id}
            renderItem={RenderData}
            ListFooterComponent={FooterComponent}
            ListEmptyComponent={ListEmpty}
          />
        </View>
      </View>
    </>
  );
};

export default Cart;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 0.1,
    elevation: 5,
  },
  hederIcon: {
    position: 'absolute',
    left: 16,
    width: 50,
  },
  headerName: {
    fontSize: 18,
    color: 'white',
    textTransform: 'capitalize',
  },
});
