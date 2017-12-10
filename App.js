/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  AppRegistry,
  StyleSheet,
  Text,
  StatusBar,
  View,
  Image,
  FlatList,
  Dimensions,
  PixelRatio
} from 'react-native';





import {StackNavigator, TabNavigator} from 'react-navigation';

import TitleBar from './app/views/TitleBar';
import Global from './app/utils/Global';
import ContactsScreen from './app/screens/ContactsScreen';

const {width} = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class HomeScreen extends Component<{}> {

  static navigationOptions = {//cza导航栏组件
    tabBarLabel: '微信',
    tabBarIcon: ({focused, tintColor}) => {
      if (focused) {
        return (
          <Image style={styles.tabBarIcon} source={require('./images/ic_weixin_selected.png')}/>
        );
      }
      return (
        <Image style={styles.tabBarIcon} source={require('./images/ic_weixin_normal.png')}/>
      );
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      checkedUpgrade: true, // 标记是否检查了更新，这里置为true则不会检查更新，设置为false则每次启动时检查更新，该功能默认不开启
      recentConversation: []
    };
  }


  render() {
    return (
      <View style = {styles.container2}>
          <StatusBar
          backgroundColor='#393A3E'
          barStyle="light-content"
        />
        <TitleBar nav = {this.props.navication}/>
        <View style={styles.divider}></View>
        <View style={styles.content}>
          {
            this.state.recentConversation.length == 0 ? (
              <Text style={styles.emptyHintText}>暂无会话消息</Text>
            ) : (
              <FlatList
                data={this.state.recentConversation}
                renderItem={this.renderItem}
                keyExtractor={this._keyExtractor}
              />
            )
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  divider: {
    width: width,
    height: 1 / PixelRatio.get(),
    backgroundColor: Global.dividerColor
  },
  content: {
    flex: 1,
    width: width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Global.pageBackgroundColor
  },
  emptyHintText: {
    fontSize: 18,
    color: '#999999'
  }

});

//TabNavigator：类似底部导航栏，用来在同一屏幕下切换不同界面
const tabNavigatorScreen = TabNavigator({
  Home: {screen: HomeScreen},
  Contacts: {screen: ContactsScreen}
}, {
  tabBarOptions: {
    activeTintColor: '#45C018',
    inactiveTintColor: '#999999',
    showIcon: true,
    labelStyle: {
      fontSize: 12,
      marginTop: 0,
      marginBottom: 0,
    },
    style: {
      backgroundColor: '#FCFCFC',
      paddingBottom: 5
    },
    tabStyle: {
    }
  },
  tabBarPosition: 'bottom',
});

//StackNavigator:用来跳转页面和传递参数
export default  App = StackNavigator({
  Home: {screen: tabNavigatorScreen},
 
}, {
  headerMode: 'none', // 此参数设置不渲染顶部的导航条
});

//AppRegistry.registerComponent('cza', () => App);

/**
 * navigationOptions：配置StackNavigator的一些属性。

    title：标题，如果设置了这个导航栏和标签栏的title就会变成一样的，不推荐使用
    header：可以设置一些导航的属性，如果隐藏顶部导航栏只要将这个属性设置为null
    headerTitle：设置导航栏标题，推荐
    headerBackTitle：设置跳转页面左侧返回箭头后面的文字，默认是上一个页面的标题。可以自定义，也可以设置为null
    headerTruncatedBackTitle：设置当上个页面标题不符合返回箭头后的文字时，默认改成"返回"
    headerRight：设置导航条右侧。可以是按钮或者其他视图控件
    headerLeft：设置导航条左侧。可以是按钮或者其他视图控件
    headerStyle：设置导航条的样式。背景色，宽高等
    headerTitleStyle：设置导航栏文字样式
    headerBackTitleStyle：设置导航栏‘返回’文字样式
    headerTintColor：设置导航栏颜色
    headerPressColorAndroid：安卓独有的设置颜色纹理，需要安卓版本大于5.0
    gesturesEnabled：是否支持滑动返回手势，iOS默认支持，安卓默认关闭
 

screen：对应界面名称，需要填入import之后的页面

mode：定义跳转风格

   card：使用iOS和安卓默认的风格

   modal：iOS独有的使屏幕从底部画出。类似iOS的present效果

headerMode：返回上级页面时动画效果

   float：iOS默认的效果

   screen：滑动过程中，整个页面都会返回

   none：无动画

cardStyle：自定义设置跳转效果

   transitionConfig： 自定义设置滑动返回的配置

   onTransitionStart：当转换动画即将开始时被调用的功能

   onTransitionEnd：当转换动画完成，将被调用的功能

path：路由中设置的路径的覆盖映射配置

initialRouteName：设置默认的页面组件，必须是上面已注册的页面组件

initialRouteParams：初始路由参数
 */


