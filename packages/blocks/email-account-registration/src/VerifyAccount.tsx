import React from 'react'
// Customizable Area Start
import { Text, StyleSheet, View, TextInput, SafeAreaView, Image, TouchableOpacity, Dimensions } from 'react-native'
import Scale from '../../../components/src/Scale'
import * as IMG_CONST from './assets'
import VerifyAccountController, { Props } from './VerifyAccountController'
import CustomLoader from '../../../components/src/CustomLoader'
import i18n from "../../../components/src/i18n/i18n.config";
import {rightArrow} from "./../../email-account-login/src/assets"
import FlexConditionManage from "../../../components/src/FlexConditionManage";
import TextAlignManage from "../../../components/src/TextAlignManage";
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
// Customizable Area End
export default class VeriftAccount extends VerifyAccountController {
	constructor(props: Props) {
		super(props);
		// Customizable Area Start
		// Customizable Area End
	}

	renderText = () => {
		if(this.state.isEmailChanged || this.state.isPhoneChanged){
			if(this.state.isPhoneChanged && !this.state.isEmailChanged){
				return(
					<Text style={styles.verifyTextEmail} >{i18n.t('phoneVerify')} {' +' + this.state.verifyPhone.replace(/.(?=.{4})/g, '*')}</Text>
				)
			}else if(this.state.isEmailChanged && !this.state.isPhoneChanged){
				return(
					<Text style={styles.verifyTextEmail} >{i18n.t('emailVerify')} {" "+this.state.maskedEmail}</Text>
				)
			}else if(this.state.isPhoneChanged && this.state.isEmailChanged){
				return(
					<Text style={styles.verifyTextEmail} >
					 {this.state.emailVerified ? i18n.t('phoneVerify')+ ' +' + this.state.verifyPhone.replace(/.(?=.{4})/g, '*'): i18n.t('emailVerify')+" "+ this.state.maskedEmail}</Text>
				)
			}
		}else {
			return(
				<Text style={styles.verifyTextEmail} >
					 {this.state.emailVerified ? i18n.t('phoneVerify')+ ' +' + this.state.verifyPhone.replace(/.(?=.{4})/g, '*'): i18n.t('emailVerify')+" "+ this.state.maskedEmail}</Text>
				)
		}
	}

	renderPassCode = () => {
		return (
			<View style={{
				justifyContent: "center",
				alignItems: "center",
			}} >
				{this.renderText()}
				<View style={styles.otpMainTextInputView}>
					<View>
						<View
							style={[styles.otpTextInputContainer]}
						>
							{this.state.OtpArray.map((item, index) => (<TextInput
								testID={"txt_input_otp" + index.toString()}
								key={index.toString()}
								maxLength={1}
								ref={ref => this.otpTextInput[index] = ref}
								onFocus={() => this.setState({ showErrorMessage: false })}
								textContentType="oneTimeCode"
								value={item}
								keyboardType="numeric"
								onKeyPress={e => this.prevoiusFocus(e.nativeEvent.key, index)}
								onChangeText={text => this.changeFocus(text.replace(/\D/g, ''), index)}
								style={styles.txt_otp_input}
							>
							</TextInput>
							))}
						</View>
					</View>
				</View>
				{this.state.showErrorMessage && <Text style={[styles.errorName,{textAlign:TextAlignManage(i18n.language)}]} >{this.state.showErroMessageString}</Text>}
				<View style={{marginTop:windowWidth*7/100}}>
					<Text style={styles.timeRemainingText}>{i18n.t('TimeRemaining')} {this.state.remainingTime}</Text>
					<View style={[styles.timeRemainingMainView,{flexDirection:FlexConditionManage(i18n.language)}]}>
						<Text style={styles.didnotReceivedText}>
							{i18n.t('notReceivedCode')}
						</Text>
						<TouchableOpacity
							testID='btnResendApi'
							onPress={() => this.resendOtp()} >
							<Text style={[styles.resendText,this.state.remainingTime == '0:00' ? styles.resendButtonAfter : styles.resendButtonBefore]}>{i18n.t('ResendCode')}</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}
	renderResetButton = () => {
		return (
			<View style={styles.resetbuttonView}>
				<TouchableOpacity testID='btnverifyAccount' style={styles.touchabbleResetButton}
					onPress={() => this.changeDetailsHandler()} >
					<Text style={styles.restText}>{i18n.t('VerifyAccount')}</Text>
				</TouchableOpacity>
			</View>
		)
	}
	// Customizable Area End

	render() {
		// Customizable Area Start
		return (
			<SafeAreaView style={styles.safeAreaContainer}>
				{this.state.isLoading &&
					<CustomLoader />
				}
				<View style={styles.container}>
					<View style={[styles.headerContainer,{flexDirection:FlexConditionManage(i18n.language)}]}>
						<TouchableOpacity
							testID='backButtonID'
							onPress={() => this.props.navigation.goBack()}
						>
							<Image source={i18n.language==="ar"?rightArrow:IMG_CONST.BackIcon} style={styles.backIconImg} />
						</TouchableOpacity>
						<Text style={styles.headertext}>{i18n.t('VerifyAccount')}</Text>
						<View />
					</View>
					<View style={styles.otpViewContainer}>
						{this.renderPassCode()}
						{this.renderResetButton()}
					</View>
				</View>
			</SafeAreaView>
		)
		// Customizable Area End
	}
}

// Customizable Area Start
const styles = StyleSheet.create({
	safeAreaContainer: {
		backgroundColor: '#fff',
		width: '100%',
		flex: 1
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 20,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: 15,
		width: '100%'
	},
	backIconImg: {
		width: Scale(32),
		height: Scale(32),
		tintColor: '#475569',
		marginLeft: Scale(-5)
	},
	headertext: {
		fontFamily: 'Avenir-Heavy',
		fontSize: Scale(20),
		fontWeight: '800',
		lineHeight: 26,
		color: '#375280',
		textAlign: 'center',
		marginLeft: -30
	},
	otpViewContainer: {
		justifyContent: 'center',
		flex: 1,
	},
	verifyTextEmail: {
		fontFamily: 'Avenir-Heavy',
		color: "#375280",
		fontWeight: '800',
		fontSize: Scale(20),
		textAlign: "center",
		lineHeight: Scale(26),
		width: '100%',
		paddingBottom: 8,
		marginBottom: 30
	},
	resendText: {
		fontFamily: 'Lato-Regular',
		flexWrap: 'wrap',
		fontSize: windowWidth * 3.7 / 100, 
		color: '#8C8C8C',
		lineHeight: Scale(24),
		paddingLeft:windowWidth*1/100
	},
	errorName: {
		fontFamily: 'Lato-Regular',
		fontSize: Scale(16),
		fontWeight: '400',
		lineHeight: Scale(24),
		color: '#F87171',
		marginTop: Scale(25),
		alignSelf: 'flex-start',
		textAlign: 'left',
		marginLeft: windowWidth*9/100
	},
	resetbuttonView: {
		justifyContent: "flex-end",
		alignItems: "center",
		bottom: -200
	},
	touchabbleResetButton: {
		width: '100%',
		height: Scale(56),
		backgroundColor: "#CCBEB1",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: Scale(5),
	},
	restText: {
		fontFamily: 'Lato-Black',
		color: "#FFFFFF",
		fontSize: Scale(20),
		lineHeight: Scale(26),
		letterSpacing: Scale(0.02)
	},
	otpMainTextInputView: {
		flex: 1,
		padding: 20
	},
	otpTextInputContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
	},
	txt_otp_input: {
		fontFamily: 'Lato-Regular',
		width: 60,
		borderRadius: 5,
		height: 60,
		alignItems: 'center',
		textAlign: 'center',
		textAlignVertical: 'center',
		justifyContent: 'center',
		margin: 10,
		backgroundColor: '#F8F8F8',
		fontSize: Scale(30),
		fontWeight: '500',
		lineHeight: Scale(40),
		letterSpacing: Scale(0.5),
		color: '#375280',
	},
	timeRemainingMainView: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		marginTop: windowWidth*0.5/100
	},
	didnotReceivedText: {
		fontFamily: 'Lato-Regular',
		flexWrap: 'wrap',
		fontSize: windowWidth * 3.7 / 100, 
		color: '#8C8C8C',
		lineHeight: Scale(24)
	},
	timeRemainingText:{
		color: '#0061A7', 
		fontSize: windowWidth * 3.7 / 100, 
		textAlign: 'center',
		fontFamily:'Lato-Bold'
	},
	resendButtonBefore: {
		color: '#8C8C8C'
	},
	resendButtonAfter: {
		color: '#375280',
		fontFamily:'Lato-Bold'
	},
})
// Customizable Area End
