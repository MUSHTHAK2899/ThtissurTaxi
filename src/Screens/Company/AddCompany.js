import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    Share,
    Clipboard,
    Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Hedder from '../../Componets/Hedder';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DriveLIst } from '../../Componets/DummyData';
import { FONTS } from '../../Constants/Constants';
import Api from '../../Api/GeneralApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import LoadingMoadal from '../../Componets/LoadingMoadal';
import Display from '../../utils/Display';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';

const AddCompany = ({ navigation }) => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [adressOne, setAdressOne] = useState('');
    const [adressTwo, setAdressTwo] = useState('');
    const [phone, setPhone] = useState('');
    const [gst, setGst] = useState('');
    const [HsnCode, setHsnCode] = useState('');
    const [taxRate, setTaxRate] = useState('');

    function FocusAwareStatusBar(props) {
        const isFocused = useIsFocused();
        return isFocused ? <StatusBar {...props} /> : null;
    }




    return (
        <>
            <SafeAreaProvider style={{ backgroundColor: '#fefce8' }}>
                <SafeAreaView style={styles.safeAreaContainer} />
                <FocusAwareStatusBar
                    translucent
                    backgroundColor={'#FFBF00'}
                    barStyle={'light-content'}
                />
                <Hedder name={'Add Company'} navigation={navigation} />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}>
                    <ScrollView style={{ flex: 1, backgroundColor: '#fefce8' }}>
                        <View
                            style={{
                                marginHorizontal: 20,
                                marginVertical: 20,
                            }}>
                            <TextInput
                                label="Name"
                                value={name}
                                style={styles.valueText}
                                activeOutlineColor={'black'}
                                mode="outlined"
                                outlineColor={'black'}
                                onChangeText={text => setName(text)}
                                keyboardType="ascii-capable"
                            />
                            <TextInput
                                label="Address One"
                                value={adressOne}
                                style={styles.valueText}
                                activeOutlineColor={'black'}
                                mode="outlined"
                                outlineColor={'black'}
                                onChangeText={text => setAdressOne(text)}
                                keyboardType="ascii-capable"
                            />
                            <TextInput
                                label="Address Two"
                                value={adressTwo}
                                style={styles.valueText}
                                activeOutlineColor={'black'}
                                mode="outlined"
                                outlineColor={'black'}
                                onChangeText={text => setAdressTwo(text)}
                                keyboardType="ascii-capable"
                            />
                            <TextInput
                                label="Phone Number"
                                value={phone}
                                style={styles.valueText}
                                activeOutlineColor={'black'}
                                mode="outlined"
                                outlineColor={'black'}
                                onChangeText={text => setPhone(text)}
                                keyboardType="phone-pad"
                            />
                            <TextInput
                                label="GST"
                                value={gst}
                                style={styles.valueText}
                                activeOutlineColor={'black'}
                                mode="outlined"
                                outlineColor={'black'}
                                onChangeText={text => setGst(text)}
                                keyboardType="phone-pad"
                            />
                            <TextInput
                                label="Hsn Code"
                                value={HsnCode}
                                style={styles.valueText}
                                activeOutlineColor={'black'}
                                mode="outlined"
                                outlineColor={'black'}
                                onChangeText={text => setHsnCode(text)}
                                keyboardType="default"
                            />
                            <TextInput
                                label="Tax Rate"
                                value={taxRate}
                                style={styles.valueText}
                                activeOutlineColor={'black'}
                                mode="outlined"
                                outlineColor={'black'}
                                onChangeText={text => setTaxRate(text)}
                                keyboardType="default"
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <TouchableOpacity
                    disabled={loading}
                    style={[styles.buttonView, { backgroundColor: '#28a745' }]}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </SafeAreaProvider>
            {loading && <LoadingMoadal />}
        </>
    );
};

export default AddCompany;

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 0,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    buttonView: {
        borderRadius: 10,
        backgroundColor: '#134e4a',
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: Display.setWidth(14),
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        fontFamily: FONTS.FontRobotoMedium,
    },
    valueText: {
        fontFamily: FONTS.FontRobotoRegular,
        color: 'black',
        backgroundColor: '#fefce8',
        fontSize: 16,
        width: '100%',
        marginTop: 10,
    },
    buttonView: {
        borderRadius: 100,
        backgroundColor: '#FFBF00',
        // marginHorizontal: 16,
        marginBottom: 13,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        width: Display.setWidth(90),
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontFamily: FONTS.FontRobotoRegular,
    },

});
