import React, {Component} from 'react';
import ReactNative from 'react-native';
import {
  InputToggleText
} from '../components/Atoms';
import {
  DetailMultiSelectList,
  Compass,
  Floor,
  FiveStep
} from '../components/Molecule';

const {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Linking
} = ReactNative;

/**
 * Container component for Right of Report page
 */
class InnerReportRight extends Component {

  /**
    * ReportRight Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);

    this.state={
      goDetail: true
    }
  }

  handleGoDetail() {
    alert('');
  }

  /**
   * Render ReportRight page
   * @return {jsxresult} result in jsx format
   */
  render() {
    
    let detailList = this.props.dataList;
    const {location, floor, life, cost} = this.props;
    let reportRightTop = 
    (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', marginLeft: 20}}>
          <View>
            <Image source={require('../assets/imgs/Blue-waving-flag-iconSM.png')} style={{opacity: 0.2}} />
          </View>
          <View>
            <Text style={{fontStyle: 'italic', marginTop: 10, marginLeft: 10}}>remove highlight</Text>
          </View>
        </View>
        <View>
          <Image source={require('../assets/imgs/addressBoxBG.png')} style={{width: 320, height: 40, resizeMode: 'stretch', justifyContent: 'center', paddingLeft: 20, paddingRight: 50}}>
            <Text>123 Smaple Ss dfs df sdf sd fsdf </Text>
          </Image>
        </View>
      </View>
    );

    let renderCnt = (this.state.goDetail)?
      (
        <View style={{flex:1}}>
          
          {reportRightTop}

          <ScrollView>
            <DetailMultiSelectList
              items={detailList}
              handleChangeItem = {(selectedArray)=>{this.props.handleChangeRightItem(selectedArray);}}
              goDetail={true}
              handleGoDetail={()=>this.handleGoDetail()}
            />
          </ScrollView>

          <View>
            <View style={{flexDirection: 'row'}}>
              <Compass
                direction={location}
                handleChangeCompass={(val)=>{this.props.handleChangeCompass(val);}}
              />
              <Floor 
                floor={floor}
                handleChangeFloor={(val)=>{this.props.handleChangeFloor(val);}}
              />
              <FiveStep
                selected={life}
                stepText={{
                  'first': '< 3 yrs',
                  'second': '3-5 yrs',
                  'third': '5-7 yrs',
                  'forth': '7-10 yrs',
                  'fifth': '10+ yrs'
                }}
                handleChangeFiveStep={(val)=>{this.props.handleChangeFiveStep(val, 'life');}}
                initText='life expectancy'
              />
              <FiveStep
                selected={cost}
                stepText={{
                  'first': '$',
                  'second': '$$',
                  'third': '$$$',
                  'forth': '$$$$',
                  'fifth': '$$$$$'
                }}
                handleChangeFiveStep={(val)=>{this.props.handleChangeFiveStep(val, 'cost');}}
                initText='cost'
              />
            </View>
          </View>
        </View>
      )
      :
      (
        <View style={{flex: 1}}>
          {reportRightTop}
          <ScrollView>
            <DetailMultiSelectList
              items={detailList}
              handleChangeItem = {()=>{}}
              goDetail={false}
              handleGoDetail={()=>this.handleGoDetail()}
            />
          </ScrollView>
          <View style={{height: 150}}>
          </View>
        </View>
      )

    return (
      <View style={{flex:1, padding:10, paddingLeft: 40, paddingRight: 20, paddingBottom: 70, paddingTop: 0}}>
        {renderCnt}
      </View>
    );
  }
}

let styles = StyleSheet.create({
  
});

export default InnerReportRight;
