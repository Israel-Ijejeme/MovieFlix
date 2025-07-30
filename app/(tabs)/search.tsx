import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from '@/services/useFetch'
import { fetchMovies } from '@/services/api'
import { icons } from '@/constants/icons'
import SearchBar from '@/components/SearchBar'
import { updateSearchCount } from '@/services/appwrite'

const search = () => {
  const [searchQuery, setSearchquery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const lastProcessedQuery = useRef('');
  
  const {
    data: movies,
    loading: moviesLoading,
    reset,
    refetch: loadMovies,
    error: moviesError
  } = useFetch(() => fetchMovies({query: debouncedQuery}), false);

  // Handle debouncing the search query
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.trim()) {
        await loadMovies();
      } else {
        reset();
        lastProcessedQuery.current = '';
      }
    };

    performSearch();
  }, [debouncedQuery]);

  // Handle updating search count when movies data changes
  useEffect(() => {
    const updateCount = async () => {
      if (
        debouncedQuery.trim() && 
        movies?.length > 0 && 
        movies[0] && 
        debouncedQuery !== lastProcessedQuery.current &&
        !moviesLoading &&
        debouncedQuery.length >= 2 // Only save searches with 2+ characters
      ) {
        try {
          await updateSearchCount(debouncedQuery, movies[0]);
          lastProcessedQuery.current = debouncedQuery;
        } catch (error) {
          console.error('Error updating search count:', error);
        }
      }
    };

    updateCount();
  }, [movies, debouncedQuery, moviesLoading]);

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' resizeMode='cover'></Image>
      
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className='px-5'
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-gray-500'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <>
            <View className='w-full flex-row justify-center mt-20'>
              <Image source={icons.logo}></Image>
            </View>
            
            <View className='my-5'>
              <SearchBar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchquery(text)}
              />
            </View>
            
            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000ff" className='my-3'/>
            )}
            
            {moviesError && (
              <Text className='text-red-500 px-5 my-3'>Error: {moviesError.message}</Text>
            )}
            
            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className='text-xl text-white'>Search Results for{' '}
                <Text className='text-accent'>{debouncedQuery}</Text>
              </Text>
            )}
          </>
        }
      />
    </View>
  )
}

export default search