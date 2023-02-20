import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, signupUser } from '../reducers/authReducer';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [auth, setAuth] = useState('Login');
    const dispatch = useDispatch();

    const handleSubmit = () => {
        // Perform authentication here, such as sending a request to a server to check the email and password
        // console.log(`Email: ${email}, Password: ${password}`);
        (auth == 'Login') ? (
            dispatch(loginUser({email, password}))
        ) : (
            dispatch(signupUser({email, password}))
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome To {auth}!</Text>
            <TextInput
                keyboardType='email-address'
                style={styles.input}
                placeholder="Email"
                onChangeText={text => setEmail(text)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />
            {
                auth=='Login'
                ? <TouchableOpacity onPress={() => setAuth('Signup')}><Text>Don't have an account?</Text></TouchableOpacity>
                : <TouchableOpacity onPress={() => setAuth('Login')}><Text>Already have an account?</Text></TouchableOpacity>
            }
            {/* <Button
            color="black"
            title={auth}
            onPress={()=>handleSubmit()}
            /> */}
            <TouchableOpacity style={styles.button} onPress={()=>handleSubmit()}>
                <Text style={{ color: 'white' }}>{auth}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Auth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 30,
        // marginBottom: 50,
    },
    input: {
        width: '80%',
        height: 44,
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 5,
        marginBottom: 10,
    },
});