import { View, Text, ImageBackground, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { images } from "@/constants/images"
import { icons } from '@/constants/icons';

const TabIcon = ({ focused, icon, title}) => {
  if (focused) {
    return(
      <ImageBackground className='flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden' source={images.highlight}>
        <Image source={icon} tintColor="#151312" className="size-5" />
        <Text className='px-2 text-secondary text-base font-semibold'>{title}</Text>
      </ImageBackground>
    )
  } else {
    return(
      <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={icon} tintColor="#A8B5DB" className='size-5'></Image>
      </View>
    )
  }
}

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        tabBarStyle: {
          backgroundColor: '#0f0d23',
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          position: 'absolute',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#0f0d23'
        },
      }}  
    >
        <Tabs.Screen name='index' options={{ 
          title: '', 
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused = {focused}
              icon = {icons.home}
              title="Home"
            />
          )}}
        />
        <Tabs.Screen name='search' options={{ 
          title: '', 
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused = {focused}
              icon = {icons.search}
              title="Search"
            />
          )}}
        />
        <Tabs.Screen name='saved' options={{ 
          title: '', 
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused = {focused}
              icon = {icons.save}
              title="Saved"
            />
          )}}
        />
        <Tabs.Screen name='profile' options={{ 
          title: '', 
          headerShown: false, 
          tabBarIcon: ({focused}) => (
            <TabIcon
              focused = {focused}
              icon = {icons.person}
              title="Profile"
            />
          )}}
        />
    </Tabs>
  )
}

export default _layout