import React from 'react';
import { Animated, ScrollView, StyleSheet, Text, View } from 'react-native';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#d8dfd3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#b7f0af',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 16,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
});

const CollapsibleHeaderScreen: React.FC = () => {

  // const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const scrollY = new Animated.Value(0);
  const _renderScrollViewContent = () => {
    const data = Array.from({length: 30});
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) =>
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    );
  }

  // Animate the header height between HEADER_MAX_HEIGHT and HEADER_MIN_HEIGHT
  // as the scroll changes between 0 and HEADER_SCROLL_DISTANCE.
  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  // Animate the opocity of the image between 1, 1, and 0
  // as the scroll changes between 0, half way of HEADER_SCROLL_DISTANCE, and HEADER_SCROLL_DISTANCE.
  // With 3 values, the opacity will only start to decay when the header has scrolled halfway.
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });

  // Animate the translateY value for the transform property between 0 and -50
  // as the scroll changes between 0 and HEADER_SCROLL_DISTANCE.
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  // Animate the opocity of the title between 0, 0 and 1
  // as the scroll changes between 0, HEADER_MIN_HEIGHT and and HEADER_SCROLL_DISTANCE
  const titleVisibility = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE - 5, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.fill}>
      <ScrollView
        style={styles.fill}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}]
        )}
      >
        {_renderScrollViewContent()}
      </ScrollView>
      <Animated.View style={[styles.header, {height: headerHeight}]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
          ]}
          source={require('./bg.jpeg')}
        />
        <Animated.View style={[
          styles.bar,
          {opacity: titleVisibility},
        ]}>
          <Text style={styles.title}>Title</Text>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default CollapsibleHeaderScreen;









