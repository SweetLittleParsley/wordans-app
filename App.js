import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  WebView,
} from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';

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
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    height: 200,
  },
});

export default class Wordans extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'About',
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

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  _renderCategory = item => {
    if (item.id % 2 == 0)
      return (
        <View style={styles.category}>
          <Image resizeMode="cover" style={styles.categoryImage} source={{uri: item.image}} />
          <Text style={styles.categoryText}>{item.name}</Text>
        </View>
      );
    else
      return (
        <View style={styles.category}>
          <Text style={styles.categoryText}>{item.name}</Text>
          <Image resizeMode="cover" style={styles.categoryImage} source={{uri: item.image}} />
        </View>
      );
  }

  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE"
        }}
      />
    );
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
    return (
      <Container>
        <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
        >
          <Header style={styles.header}>
            <Left>
              <Button transparent>
                <Icon name='arrow-back' style={styles.headerArrow} />
              </Button>
            </Left>
            <Body>
              <Image
                style={styles.headerLogo}
                source={{ uri }}
              />
            </Body>
            <Right>
              <Button transparent>
                <TouchableOpacity
                  onPress={this.toggle}
                >
                  <Icon name='menu' style={styles.hamburgerMenu}/>
                </TouchableOpacity>
              </Button>
            </Right>
          </Header>
          <View style={styles.banner}>
            <Text>
              Welcome to Wordans!!
            </Text>
            <Text>
              Current selected menu item is: {this.state.selectedItem}
            </Text>
          </View>
          <FlatList
            data={this.state.categories}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this._renderSeparator}
            renderItem={({item}) => this._renderCategory(item)}
          />
        </SideMenu>
      </Container>
    );
  }
}
