import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomeLogo from '../../assets/HomeLogo.svg';
import Location from '../../assets/Loction.svg';
import Pesntage from '../../assets/Pasentage.svg';
import Image1 from '../../assets/Rise1.svg';
import Image2 from '../../assets/Rise2.svg';
import Image3 from '../../assets/Rise3.svg';
import Image4 from '../../assets/Rise4.svg';
import {HomeData} from '../../components/DummyData';
import {useDispatch, useSelector} from 'react-redux';
import {
  addToCart,
  decrementProductCount,
  incrementProductCount,
  selectCart,
} from '../../Redux/cartSlice';
import { useToast } from "react-native-toast-notifications";


const Home = ({navigation}) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  console.log(cart.products);
  const [TotalPrice, setTotalPrice] = useState();
  const [AddProduct,setAddProduct] = useState([]);

  useEffect(() => {
    const matchingItems = HomeData.filter(item =>
      cart.products.some(newItem => newItem.id === item.id),
    );
    setAddProduct(matchingItems)
    console.log("++++++",matchingItems)
    const totalPrice = cart.products.reduce((accumulator, newData) => {
      const product = matchingItems.find(item => item.id === newData.id);

      if (product) {
        return accumulator + newData.quantity * product.price;
      }

      return accumulator;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cart.products]);

  const handleAddToCart = productId => {
    toast.show( 'successfully add to cart',{
      type:'success',
    });
    dispatch(addToCart({productId}));
  };

  const handleIncrementCount = productId => {
    toast.hideAll()
    if(cart?.products.length){
      dispatch(incrementProductCount({productId}));
    }else{
      toast.show("Click The Product Image  ",{
        type:'danger',
      });
    }

  };

  const handleDecrementCount = productId => {
    toast.hideAll()
    if(cart?.products.length){
      dispatch(decrementProductCount({productId}));
    }else{
      toast.show("Click The Product Image  ",{
        type:'danger',
      });
    }
  };

  const RenderData = ({item}) => {
    return (
      <>
        <View style={{flexDirection: 'row', gap: 10, marginBottom: 20,}}>
          <Text onPress={() => handleAddToCart(item?.id)}>{item?.image}</Text>
          <View>
            <Text
              onPress={() => handleAddToCart(item?.id)}
              style={{
                color: 'black',
                fontSize: 12,
                fontWeight: '400',
                lineHeight: 15,
              }}>
              {item.name}
            </Text>
            <View
              onPress={() => handleAddToCart(item?.id)}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '75%',
              }}>
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
            <View
              style={{
                backgroundColor: '#F5F5F5',
                width: '75%',
                height: 35,
                marginTop: 10,
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
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <SafeAreaView />
      <StatusBar backgroundColor={'#08C25D'} barStyle={'light-content'} />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View
            style={[
              styles.container,
              {width: '90%', alignSelf: 'center', marginTop: 15},
            ]}>
            <View
              style={{
                flexDirection: 'row',
                gap: 5,
                justifyContent: 'space-between',
              }}>
              <Location />
              <View style={{width: '75%'}}>
                <View style={{flexDirection: 'row', gap: 2}}>
                  <Text
                    style={{fontSize: 18, color: 'black', fontWeight: '400'}}>
                    Work
                  </Text>
                  <MaterialIcons
                    name={'keyboard-arrow-down'}
                    color={'black'}
                    size={28}
                  />
                </View>
                <Text style={{color: '#8F8F8F', fontSize: 12}}>
                  P.O. Box 3625. Sheikh Khalifa Bin Saeed Street Dubai. P.O. Box
                  901
                </Text>
              </View>
              <View>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    borderColor: '#08C25D',
                    borderWidth: 3,
                  }}
                  source={require('../../assets/User.jpg')}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#DDDDDD',
                width: '100%',
                height: 1,
                marginVertical: 20,
              }}
            />
          </View>

          <View style={[styles.container, {width: '90%', alignSelf: 'center'}]}>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center'}}>
              <HomeLogo />
              <View style={{rowGap: 5}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: '500',
                    lineHeight: 19,
                  }}>
                  Store 1
                </Text>
                <Text
                  style={{
                    color: '#8F8F8F',
                    fontSize: 12,
                    width: '80%',
                    lineHeight: 15,
                  }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
              </View>
            </View>
            <ScrollView
              style={{marginVertical: 25}}
              horizontal
              showsHorizontalScrollIndicator={false}>
              <View
                style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}>
                <Pesntage />
                <View>
                  <Text
                    style={{fontSize: 12, fontWeight: '600', color: 'black'}}>
                    60% OFF up to Rs120
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: 'black'}}>
                    Use code ZCRICKET
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 10,
                  alignItems: 'center',
                  marginLeft: 20,
                }}>
                <Pesntage />
                <View>
                  <Text
                    style={{fontSize: 12, fontWeight: '600', color: 'black'}}>
                    60% OFF up to Rs120
                  </Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '400', color: 'black'}}>
                    Use code ZCRICKET
                  </Text>
                </View>
              </View>
            </ScrollView>
            <ScrollView
              horizontal
              contentContainerStyle={{flexDirection: 'row', gap: 15}}>
              <View style={{alignItems: 'center', rowGap: 5}}>
                <Image4 />
                <Text style={{color: 'black', fontSize: 12}}>Rise</Text>
              </View>
              <View style={{alignItems: 'center', rowGap: 5}}>
                <Image1 />
                <Text style={{color: 'black', fontSize: 12}}>Rise</Text>
              </View>
              <View style={{alignItems: 'center', rowGap: 5}}>
                <Image2 />
                <Text style={{color: 'black', fontSize: 12}}>Rise</Text>
              </View>
              <View style={{alignItems: 'center', rowGap: 5}}>
                <Image3 />
                <Text style={{color: 'black', fontSize: 12}}>Rise</Text>
              </View>
            </ScrollView>
            <View style={{marginVertical: 30, paddingBottom: 90}}>
              <FlatList
                data={HomeData}
                keyExtractor={(item, index) => item.id}
                renderItem={RenderData}
              />
            </View>
          </View>
        </ScrollView>

        {/* Fixed Cart Button */}
        <View style={styles.cartButton}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: 84,
              marginHorizontal: 30,
            }}>
            <View>
              <Text style={{color: '#EEEEEE', fontSize: 15}}>
                {cart?.products.length} Items
              </Text>
              <Text style={{color: 'white', fontSize: 18, fontWeight: '500'}}>
                ₹ {TotalPrice}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Cart')}
              style={{
                flexDirection: 'row',
                backgroundColor: 'white',
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 10,
                gap: 5,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '400', color: 'black'}}>
                Checkout
              </Text>
              <Text>@</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // scrollContainer: {
  //   flexGrow: 1,
  //   paddingBottom: 60, // Adjust based on the height of your fixed button
  // },
  content: {
    padding: 16,
  },
  cartButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 84,
    backgroundColor: '#08C25D',
    borderRadius: 20,
  },
  cartButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
