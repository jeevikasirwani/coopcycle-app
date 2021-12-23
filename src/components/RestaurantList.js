import React, { Component } from 'react'
import { FlatList, StyleSheet, TouchableOpacity, View, Image, ImageBackground, useColorScheme } from 'react-native'
import { Text, Icon, HStack, MoonIcon } from 'native-base'
import { withTranslation } from 'react-i18next'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { getNextShippingTimeAsText, getRestaurantCaption } from '../utils/checkout'

const styles = StyleSheet.create({
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e7e7e7',
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 15,
  },
  restaurantNameText: {
    marginBottom: 5,
  },
  badge: {
    alignItems: 'center',
    position: 'absolute',
    height: 30,
    alignSelf: 'center',
    bottom: -15,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 12,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  restaurantName: {
    color: '#ffffff',
    fontFamily: 'Raleway-Regular',
    fontWeight: 'bold',
  },
  closedLabel: {
    color: '#ffffff',
  },
})

const OneLineText = (props) => (
  <Text numberOfLines={ props.numberOfLines || 1 } ellipsizeMode="tail" { ...props }>
    { props.children }
  </Text>
)

const TimingBadge = ({ restaurant }) => {

  const colorScheme = useColorScheme()

  return (
    <HStack style={ [ styles.badge ] } bg={ colorScheme === 'dark' ? 'gray.800' : 'gray.200' } px="2">
      <Icon as={ FontAwesome } name="clock-o" size="xs" mr="1" />
      <Text style={ styles.badgeText }>{ getNextShippingTimeAsText(restaurant) }</Text>
    </HStack>
  )
}

class RestaurantList extends Component {

  constructor(props) {
    super(props)
  }

  renderItem(restaurant, index) {

    return (
      <TouchableOpacity
        onPress={ () => this.props.onItemClick(restaurant) }
        testID={ restaurant.testID }>
        <View style={ styles.item }>
          <View style={{ flex: 1, width: '66.6666%', padding: 15, paddingBottom: 25 }}>
            <OneLineText style={ [ styles.restaurantNameText ] }>{ restaurant.name }</OneLineText>
            <OneLineText note numberOfLines={ 2 }>{ getRestaurantCaption(restaurant) }</OneLineText>
            <TimingBadge restaurant={ restaurant } />
          </View>
          <View style={{ width: '33.3333%' }}>
            {!restaurant.isOpen &&
            <ImageBackground source={{ uri: restaurant.image }} style={{ width: '100%', height: '100%' }}>
              <View style={ styles.overlay }>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <MoonIcon size="4" color="white"/>
                  <Text style={ styles.closedLabel } numberOfLines={ 1 }>{ this.props.t('RESTAURANT_CLOSED_NOW') }</Text>
                </View>
              </View>
            </ImageBackground>
            }
            {restaurant.isOpen && <Image style={{ flex: 1, height: undefined, width: undefined }} resizeMode="cover" source={{ uri: restaurant.image }} />}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render() {

    let matchingCounter = 0
    const restaurantsWithTestIDs = this.props.restaurants.map((restaurant, index) => {

      let testID = `restaurants:${index}`
      if (restaurant.address.streetAddress.match(/75020/g)
      ||  restaurant.address.streetAddress.match(/75010/g)
      ||  restaurant.address.streetAddress.match(/75019/g)) {
        testID = `restaurantMatches:${matchingCounter}`
        matchingCounter += 1
      }

      return {
        ...restaurant,
        testID,
      }

    })

    return (
      <FlatList
        testID="restaurantList"
        data={ restaurantsWithTestIDs }
        keyExtractor={ (item, index) => item['@id'] }
        renderItem={ ({ item, index }) => this.renderItem(item, index) } />
    )
  }
}

export default withTranslation()(RestaurantList)
