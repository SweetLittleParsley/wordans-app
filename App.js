import React, { Component } from 'react';
import { StyleSheet, Image, FlatList, View, TouchableOpacity } from 'react-native';
import { Container, Button, Text } from "native-base";
import { StackNavigator } from 'react-navigation'; // 1.0.0-beta.14

const uri = 'https://wordans-mxelda46illwc0hq.netdna-ssl.com/images/responsive/img_layout/wordans_logo_desktop_EN.png';

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFB600',
  },
  headerLogo: {
    width: 105,
    height: 30
  },
  hamburgerMenu: {
    color: 'black'
  },
  headerArrow: {
    color: 'black',
    fontSize: 20
  },
  list: {
    borderWidth: 1,
    borderColor: '#CED0CE'
  },
  category: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#F5FCFF',
    height: 70
  },
  categoryImage: {
    flex: 1,
    height: 70
  },
  categoryText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categorySeparator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE'
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: 200,
  },
});

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: null,
    };
  }
  componentDidMount() {
    this._fetchCategories();
  }

  _fetchCategories() {
    return fetch('http://www.wordansdev.pt/api/v1/categories.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          categories: responseJson.categories,
        });
      })
      .catch(e => e)
      .done();
  }
  _renderCategory = (item, navigate) => {
    if (item.id % 2 == 0)
      return (
        <TouchableOpacity activeOpacity={0.8} style={styles.category}
          onPress={() => navigate('Category', {name: item.name})}>
          <Image resizeMode="cover" style={styles.categoryImage} source={{uri: item.image}} />
          <View style={styles.categoryText}>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    else
      return (
        <TouchableOpacity activeOpacity={0.8} style={styles.category}
          onPress={() => navigate('Category', {name: item.name})}>
          <View style={styles.categoryText}>
            <Text>{item.name}</Text>
          </View>
          <Image resizeMode="cover" style={styles.categoryImage} source={{uri: item.image}} />
        </TouchableOpacity>
      );
  }
  _renderSeparator = () => {
    return (
      <View
        style={styles.categorySeparator}
      />
    );
  }
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <View style={styles.banner}>
          <Text>
            Welcome to Wordans!!
          </Text>
        </View>
        <FlatList
          style={styles.list}
          data={this.state.categories}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this._renderSeparator}
          renderItem={({item}) => this._renderCategory(item, navigate)}
        />
      </View>
     )
   }
}

class CategoryScreen extends React.Component {
  render() {
    const {state} = this.props.navigation;

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{state.params.name}</Text>
      </View>
    )
  }
}

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: <Image style={styles.headerLogo} source={{ uri }} />,
    },
  },
  Category: {
    screen: CategoryScreen,
    navigationOptions: {
      headerTitle: 'Category',
    },
  },
});

export default class Wordans extends Component {
  render() {
    return (
      <RootNavigator />
    );
  }
}
