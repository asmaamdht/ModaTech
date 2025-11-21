import React, { useState, useRef } from 'react';
import {View,Text,StyleSheet,Dimensions,FlatList,TouchableOpacity,Image,ViewToken,} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ROUTES } from '@/src/constants/Routes';
import { OnboardingItem } from '../types';

const { width , height} = Dimensions.get('window');

const onboardingData: OnboardingItem[] = [
  {
    id: '1',
    title: 'Hassle free\nshopping\nexperience',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lectus a nulla feugiat congue.',
    image: require('../assets/images/bg.png'),
    backgroundColor: '#F5D7B1',
    circleColor: '#D4A574',
    buttonColor: '#B8784D',
  },
  {
    id: '2',
    title: 'Earn margins\nlike never\nbefore',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lectus a nulla feugiat congue.',
    image: require('../assets/images/bg.png'),
    backgroundColor: '#B8D8D8',
    circleColor: '#7FB5B5',
    buttonColor: '#5A9999',
  },
  {
    id: '3',
    title: 'Quick & free\ndelivery to the\nstore',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis lectus a nulla feugiat congue.',
    image: require('../assets/images/bg.png'),
    backgroundColor: '#E5D5C8',
    circleColor: '#C4B5A8',
    buttonColor: '#9B8B7E',
  },
];

const OnboardingScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const navigation = useNavigation();

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    }
  ).current;

  const handleSkip = () => {
    navigation.navigate(ROUTES.LOGIN as never);
  };

  const renderItem = ({ item, index }: { item: OnboardingItem; index: number }) => (
    <View
      style={[styles.slide, { backgroundColor: item.backgroundColor }]}
    >
      <View
        style={[
          styles.imageCircle,
          { backgroundColor: item.circleColor },
        ]}
      >
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {/* Dots Indicator */}
        <View style={styles.dotsContainer}>
          {onboardingData.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === currentIndex ? item.buttonColor : '#D1D5DB',
                  width: i === currentIndex ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
    
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>SKIP</Text>
      </TouchableOpacity>

      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        bounces={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5D7B1',
  },
  skipButton: {
    position: 'absolute',
    top: 50,
    right: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
  skipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    letterSpacing: 1,
  },
  slide: {
    width,
    height,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  imageCircle: {
    width: 280,
    height: 280,
    borderRadius: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  image: {
    width: 200,
    height: 200,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
    lineHeight: 38,
    textAlign: 'center',
  },
  description: {
    fontSize: 15,
    color: '#5D6D7E',
    lineHeight: 22,
    marginBottom: 30,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 20,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});

export default OnboardingScreen;