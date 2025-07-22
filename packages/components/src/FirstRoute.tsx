import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image, FlatList} from 'react-native';
import Scale from "../src/Scale";
import { add } from '../../blocks/catalogue/src/assets';
import i18n from './i18n/i18n.config';
import FlexConditionManage from './FlexConditionManage';
import PriceConvertValue from ".//PriceConvertValue";
interface DeliverEastimationProps {
    testID:string;
    data: any[];
    toggleModal: () => void;
    removeModal: any;
    getPlanForId: any;
    getCurrency:string;
}
const FirstRoute: React.FC<DeliverEastimationProps> = ({
    testID,data, toggleModal,removeModal,getPlanForId,getCurrency

}) => {
  return (
<>
    {data.length !== 0 ? (
      <>
        <FlatList
          testID="FirstId"
          scrollEnabled={true}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.firstRoute} testID="dataId">
              <View style={{ flexDirection: FlexConditionManage(i18n.language), paddingHorizontal: Scale(15), justifyContent: 'space-between' }}>
                <Text style={styles.listPlanitle}>
                  {item.attributes?.name === "weekly_plan" ? i18n.t("weeklyPlan") :
                    item.attributes?.name === "monthly_plan" ? i18n.t("monthlyPlan") :
                      item.attributes?.name === "quarterly_plan" ? i18n.t("quarterlyPlan") : i18n.t("defaultPlan")}
                </Text>
                <Text style={styles.listAmountTitle}>{PriceConvertValue(item.attributes?.service_charges,getCurrency)}/-</Text>
              </View>
              <View style={styles.line1}></View>
              <View style={{paddingHorizontal: Scale(15)}}>
                <View style={{ flexDirection: FlexConditionManage(i18n.language), alignItems: 'center', paddingBottom: Scale(10)}}>
                  <View style={styles.bullet}></View>
                  <Text style={styles.bulletlistTitle}>{item.attributes.styling_per_week} {item.attributes.name === "weekly_plan" && " " && i18n.t("stylingsPerWeek")}{item.attributes.name === "monthly_plan" &&  " " && i18n.t("stylingsPerMonth")}{item.attributes.name === "quarterly_plan" &&  " " && i18n.t("stylingsPerQuarter")}</Text>
                </View>
                <View style={{ flexDirection: FlexConditionManage(i18n.language), alignItems: 'center', paddingBottom: Scale(10) }}>
                  <View style={styles.bullet}></View>
                  <Text style={styles.bulletlistTitle}>{item.attributes?.discussion_time} {i18n.t("hoursOfDiscussionTime")}</Text>
                </View>
                {item.attributes?.voice_call_facility &&
                <View style={{ flexDirection: FlexConditionManage(i18n.language), alignItems: 'center' }}>
                  <View style={styles.bullet}></View>
                  <Text style={styles.bulletlistTitle}>{i18n.t("voiceCallFacility")}</Text>
                </View>
                }
              </View>
              <View style={{ flexDirection: FlexConditionManage(i18n.language), justifyContent: 'space-around', marginTop: 15, alignItems: 'center' }}>
                <TouchableOpacity testID="removePlanId" style={styles.removebtn} activeOpacity={0.7} onPress={() => removeModal(item.id)}>
                  <Text style={styles.removeTitle}>{i18n.t("removePlan")}</Text>
                </TouchableOpacity>
                <TouchableOpacity testID="editPlanID" style={styles.editBtn} activeOpacity={0.7} onPress={()=>getPlanForId(item.id)}>
                  <Text style={styles.editTitle}>{i18n.t("editPlan")}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
        {data.length < 3 && (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            style={styles.saveButtonStyle}
            activeOpacity={0.8}
            onPress={toggleModal}
          >
            <Text style={styles.saveButtonText}>{i18n.t("createPlan")}</Text>
          </TouchableOpacity>
          </View>
        )}
      </>
    ) : (
      <View style={styles.first}>
        <Text style={styles.dummyTxt}>{i18n.t("NoServicePlans")}</Text>
        <TouchableOpacity
          style={styles.createPlan}
          activeOpacity={0.8}
          onPress={toggleModal}
        >
          <Image source={add} style={styles.add} />
          <Text style={styles.txt}>{i18n.t("createPlans")}</Text>
        </TouchableOpacity>
      </View>
    )}

  </>
  );
};
const styles = StyleSheet.create({
    listAmountTitle: {
        color: '#375280',
        fontWeight: '700',
        fontSize: 20
      },
      listPlanitle: {
        color: '#375280',
        fontWeight: '700',
        fontSize: Scale(20)
      },
      firstRoute:{
        marginHorizontal: 10,
        borderWidth : 1,
        borderColor : '#375280',
        marginTop : Scale(15),
        padding : Scale(10),
        borderRadius: 2,
        marginVertical: 5,
      },
      bulletlistTitle:{
        color: '#375280',
        fontSize : Scale(16),
        fontWeight : "500",
      },
      removebtn:{
        width: Scale(164),
        height: Scale(48), borderRadius: 2, borderColor: '#F87171', borderWidth : 0.5, justifyContent: 'center',alignItems: 'center'
      },
      saveButtonStyle: {
        height: Scale(56),
        width: Scale(380),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#CCBEB1",
        borderRadius: 2,
        bottom: 20,
      },
      saveButtonText: {
        fontFamily: "Lato",
        fontSize: Scale(20),
        fontWeight: "700",
        color: "#FFFFFF",
        lineHeight: Scale(26),
      },
      line2: {
        borderWidth: 0.8,
        marginTop: 20,
        borderColor: "#E3E4E5",
        width: "100%",
      },
      line1: {
        borderWidth: 0.8,
        marginVertical: 15,
        borderColor: "#E3E4E5",
       marginHorizontal: Scale(15)
      },
      createPlan: {
        borderRadius: Scale(2),
        width: Scale(293),
        backgroundColor: "#CCBEB1",
        justifyContent: "center",
        alignItems: "center",
        minHeight: Scale(56),
        marginTop: Scale(20),
        flexDirection: "row",
      },
      toastContainer: {
        position: 'absolute',
        justifyContent : 'space-around',
        bottom: 15,
        width: Scale(340),
        height: Scale(58),
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      message: {
        fontSize: 16,
        color: '#375280',
        textAlign: 'right',
        fontWeight:'400',
      },
      deleteBtn:{
        width: Scale(182),
        height: Scale(54), padding: 10, borderRadius: 2, backgroundColor: '#F87171'
      },
      removeTitle : {
        fontSize : Scale(16),
        fontWeight : '500',
        color : '#F87171',
        bottom: 1
      },
      deleteTitle : {
        fontSize : Scale(20),
        fontWeight : '700',
        color : '#FFFFFF',
        textAlign : 'center',
      },
      txt: {
        fontFamily: "Lato",
        fontSize: 20,
        fontWeight: "700",
        lineHeight: 26,
        color: "#FFFFFF",
        marginLeft: Scale(5),
      },
      add: {
        height: Scale(24),
        width: Scale(24),
      },
      dummyTxt: {
        fontWeight: "500",
        fontSize: Scale(18),
        color: "#375280",
      },
      editBtn:{
        width: Scale(164),
        height: Scale(48), padding: 10, backgroundColor : '#CCBEB1',borderRadius : 2
      },
      first: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      cancelBtn:{
        width: Scale(182),
        height: Scale(54), padding: 10, borderColor : '#CCBEB1',borderRadius : 2, borderWidth: 1
      },
      editTitle:{
        fontSize : Scale(16),
        fontWeight : '500',
        textAlign : 'center',
        color : 'white',
        paddingTop: Scale(2)
      },
      cancelTitle:{
        fontSize : Scale(20),
        fontWeight : '500',
        textAlign : 'center',
        color : '#375280',
      },
      bullet: {
        width: 6,
        height: 6,
        borderRadius: 5,
        backgroundColor: '#375280',
        marginHorizontal: 10,
      },
});
export default FirstRoute;