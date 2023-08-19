import { Box, Flex, Icon, IconButton, Text, TextInput } from '@react-native-material/core'
import React from 'react'
import SearchIcon from '../../assets/icon/SearchIcon'
import { colors } from '../util/colors'

const Searchbar = () => {
    return (
        <Flex justify='center' radius={50} overflow='hidden' h={50} >
            <TextInput variant='filled' placeholder='Search' role='form' leading={<SearchIcon />} inputContainerStyle={{ height: "100%", borderRadius: 50, backgroundColor: colors.grey }} />
        </Flex>
    )
}

export default Searchbar
