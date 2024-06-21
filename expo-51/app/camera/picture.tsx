import { CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState,useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

export default function TabTwoScreen() {
  const [photo,setPhoto]=useState<CameraCapturedPicture>()

  return (
    <View>
      {photo && <Image
      source={{ uri: photo.uri }}
      style={{ width: 200, height: 200 }}
    />}
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
