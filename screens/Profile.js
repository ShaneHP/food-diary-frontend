import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';

const Profile = () => {
    const { user } = useContext(AuthContext);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>Current User: {user.email}</Text>
        </View>
    );
};

export default Profile;
