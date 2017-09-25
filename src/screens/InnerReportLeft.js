import React, {Component} from 'react';
import ReactNative from 'react-native';
import {
  TextBtn,
  TextWithLetterSpacing
} from '../components/Atoms';
import {
  ItemListsWithTag
} from '../components/Molecule';

const {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Linking,
  TextInput
} = ReactNative;

/**
 * Container component for Left of Report page
 */
class InnerReportLeft extends Component {

  /**
    * ReportLeft Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props) {
    super(props);
  }

  /**
   * Render ReportLeft page
   * @return {jsxresult} result in jsx format
   */
  render() {
    let leftCnt = [];
    let itemListData = null;

    const {reportData, isEdit} = this.props;

    let count = 0;
    for(var key in reportData) {
      itemListData = reportData[key].map((item,index)=>{
        //itemListData = item.map((obj, key)=>{
          return {'label': item.name, value: index, default: item.default, radioBtnState: item.state}; //0: inital gray, 1: only blue, 2: checked blue, 3: checked blue with camera icon
        //});        
      });

      leftCnt[count] = {
        listTag: key,
        listData: itemListData
      };        
      count++;
    }

    return (
      <View style={{flex: 1, marginBottom: 140}}>
        <View>
          <TextBtn
            imgSrc={require('../assets/imgs/BTN_Blue_Large.png')}
            style={{height: 40, resizeMode: 'stretch', margin: 10}}
          >
            Overview Notes
          </TextBtn>
          <ScrollView>
            <ItemListsWithTag
              itemInfo={leftCnt}
              handleChangeItem = {(listIndex, listSubIndex, label)=>{this.props.handleChangeItem(listIndex, listSubIndex, label);}} 
              handleLeftIcon = {(label, listSubIndex, listIndex, isDefaultCategory)=>{this.props.handleLeftIcon(label, listSubIndex, listIndex, isDefaultCategory)}}
              listSubIndex = {this.props.listSubIndex}
              listIndex = {this.props.listIndex}
              isEdit={isEdit}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

let styles = StyleSheet.create({
  
});

export default InnerReportLeft;
