import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { logout } from '../reducers/authReducer';
import { useDispatch } from 'react-redux';

const Header = () => {
    const dispatch = useDispatch();
    return (
        <View style={styles.container}>
            <Text>Maps</Text>
            <TouchableOpacity style={styles.button} onPress={() => dispatch(logout())}>
                <Text style={{ color: 'white' }}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginBottom: 10,
    },
});