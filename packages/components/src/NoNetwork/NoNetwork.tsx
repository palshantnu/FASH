import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import CustomButton from '../CustomButton';
import Scale, { verticalScale } from '../Scale';
import {noWifi} from '../assets'
import i18n from '../i18n/i18n.config';
import CustomLoader from "../../../components/src/CustomLoader";

type InternetStatusProps = {
    onRetry: () => void;
    isLoading: boolean
  };
const InternetStatus:React.FC<InternetStatusProps> = ({onRetry,isLoading}) => {

        return (
            <SafeAreaView style={styles.offlineContainer}>
               {isLoading && <CustomLoader/> }
                <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
                    <Image source={noWifi}/>
                    <Text style={styles.offlineText}>{i18n.t("noInternetConnection")}</Text>
                    <Text style={styles.detailsText}>{i18n.t("noInternetMessage")}</Text>
                </View>
                <View style={{ justifyContent: 'flex-end',marginHorizontal:Scale(16),marginVertical:verticalScale(18) }}>
                    <CustomButton title={i18n.t('retry')}  onPress={onRetry} />
                 
                </View>

            </SafeAreaView>
        );
    };

const styles = StyleSheet.create({
    offlineContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    offlineText: {
        color: '#375280',
        fontSize: 24,
        fontWeight:'700',
        fontFamily:'Avenir',
        textAlign: 'center',
        paddingHorizontal:5
    },
    detailsText: {
        color: '#375280',
        fontSize: 16,
        fontWeight:'400',
        fontFamily:'Lato',
        lineHeight:24,
        textAlign: 'center',
        marginTop:verticalScale(7),
        paddingHorizontal:5
    }
});

export default InternetStatus;
