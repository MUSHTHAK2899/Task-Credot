import Chiecken1 from '../../src/assets/Chicken1.svg'
import Chiecken2 from '../../src/assets/Chicken2.svg'

import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const HomeData =[
    {
        id:1,
        name:'Siamese Hybrid Chicken',
        price:200,
        off_price:250,
        off:-20,
        image:<Chiecken1/>,
        count:0
    },
    {
        id:2,
        name:'Vietnamese Turkey',
        price:100,
        off_price:150,
        off:-10,
        image:<Chiecken2/>,
        count:0
    },
    {
        id:3,
        name:' Hybrid Chicken',
        price:200,
        off_price:250,
        off:-20,
        image:<Chiecken1/>,
        count:0
    },
    {
        id:4,
        name:' Turkey Chicken',
        price:100,
        off_price:150,
        off:-10,
        image:<Chiecken2/>,
        count:0
    },
    {
        id:5,
        name:'  Chicken Hybrid',
        price:300,
        off_price:350,
        off:-20,
        image:<Chiecken1/>,
        count:0
    },
    {
        id:6,
        name:'  Chicken Turkey',
        price:1000,
        off_price:1500,
        off:-10,
        image:<Chiecken2/>,
        count:0
    },
    {
        id:7,
        name:' Turkey Chicken',
        price:100,
        off_price:150,
        off:-10,
        image:<Chiecken2/>,
        count:0
    },
    {
        id:8,
        name:'  Chicken Hybrid',
        price:300,
        off_price:350,
        off:-20,
        image:<Chiecken1/>,
        count:0
    },
    {
        id:9,
        name:'  Chicken Turkey',
        price:1000,
        off_price:1500,
        off:-10,
        image:<Chiecken2/>,
        count:0
    },
]

const IsActiveTime=[
    {
    id:1,
    day_time:'Morning',
    time:'10AM to 11AM',
    icome:<Entypo name={'light-up'} color={'black'} size={20}/>,
    isActives:true
},
{
    id:2,
    day_time:'Evening',
    time:'2PM to 3PM',
    icome:<MaterialIcons name={'dark-mode'} color={'black'} size={20}/>,
    isActives:false
},
{
    id:3,
    day_time:'Evening',
    time:'16PM to 7PM',
    icome:<MaterialIcons name={'dark-mode'} color={'black'} size={20}/>,
    isActives:false
},
]

export {HomeData,IsActiveTime}