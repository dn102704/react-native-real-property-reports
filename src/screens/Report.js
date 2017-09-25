import React, {Component} from 'react';
import ReactNative from 'react-native';
import {Header, Footer} from '../components';
import {InnerReport} from './';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as reportActions from '../modules/report';
import update from 'react-addons-update';

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
 * Container component for Report page
 */
class Report extends Component {

  /**
    * Report Container Constructor
    * @param {props} props from parent component
    * @return {void}
    */
  constructor(props){
    super(props);
    this.state= {
      goDetail: true,
      selectedGoDetailItemIndex: null,
      isEdit: false
    };
  }

  handleGoDetail(index) {
    this.setState({
      goDetail: false,
      selectedGoDetailItemIndex: index
    });
  }

  cancelDetail() {
    this.setState({
      goDetail: true,
      selectedGoDetailItemIndex: null
    });    
  }

  handleEditReport() {
    this.setState({
      isEdit: true
    });
  }

  /**
   * Render Report page
   * @return {jsxresult} result in jsx format
   */
  render() {
    const {report, selectedBigCategory} = this.props;
    const {goDetail, selectedGoDetailItemIndex, isEdit} = this.state;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
      	<Header.Main
          page='Report'
          goDetail={goDetail}
          cancelDetail={()=>this.cancelDetail()}
        />
     	  <View style={{flex:1}}>
          <Image source={require('../assets/imgs/mainBackground.png')}>
            <InnerReport 
              reportData = {report[selectedBigCategory]}
              selectedBigCategory={selectedBigCategory}
              goDetail={goDetail}
              selectedGoDetailItemIndex={selectedGoDetailItemIndex}
              isEdit={isEdit}
              handleGoDetail={(index)=>this.handleGoDetail(index)}
              cancelDetail={()=>{
                this.setState({
                  isEdit:false
                });
                this.cancelDetail();
              }}
              handleChangeCompass={(listIndex, listSubIndex, val)=>{
                this.props.reportActions.updateLocation({listIndex:listIndex, listSubIndex:listSubIndex, location:val});
              }}
              handleChangeFloor={(listIndex, listSubIndex, val)=>{
                this.props.reportActions.updateFloor({listIndex:listIndex, listSubIndex:listSubIndex, floor:val});
              }}
              handleChangeFiveStep={(listIndex, listSubIndex, val, type)=>{
                if (type === 'life') {
                  this.props.reportActions.updateLife({listIndex:listIndex, listSubIndex:listSubIndex, life:val});
                } else {
                  this.props.reportActions.updateCost({listIndex:listIndex, listSubIndex:listSubIndex, cost:val});
                }                
              }}
              handleChangeRightItem={
                (listIndex, listSubIndex, selectedArray)=>{
                  if (goDetail)
                    this.props.reportActions.selectItem({listIndex:listIndex, listSubIndex:listSubIndex, selectedArray:selectedArray});
                  else
                    this.props.reportActions.selectDetailItem({listIndex:listIndex, listSubIndex:listSubIndex, selectedGoDetailItemIndex:selectedGoDetailItemIndex, selectedArray:selectedArray});
                }
              }
              handleLeftIcon={
                (label, listSubIndex, listIndex, isDefaultCategory)=>{
                  if (isDefaultCategory) {
                    let count = 0; let existCount = 0; let copiedObject = {};
                    for(var k in report[selectedBigCategory]) {
                      if ( count === listIndex) {
                        // copiedObject = Object.assign({}, report[selectedBigCategory][k][listSubIndex]);
                        copiedObject.state = '0';
                        copiedObject.data = report[selectedBigCategory][k][listSubIndex].data.map((item, index)=>{
                          return {
                            name: item.name,
                            selected: '0',
                            endDataSelected: [],
                            default: true
                          }
                        });
                        copiedObject.endData = Object.assign([], report[selectedBigCategory][k][listSubIndex].endData);
                        copiedObject.location = '';
                        copiedObject.floor = '';
                        copiedObject.life = '';
                        copiedObject.cost = '';
                        copiedObject.default = false;


                        report[selectedBigCategory][k].map((item, index)=>{
                          if(item.name.indexOf(label) !== -1) {
                            existCount++;
                          }
                        });
                      }
                      count++;
                    }
                    copiedObject.name = `${label} (${(existCount+1)})`;
                    
                    this.props.reportActions.createCategory({listIndex:listIndex, listSubIndex:listSubIndex, label: label, copiedObject: copiedObject});
                  } else {
                    this.props.reportActions.removeCategory({listIndex:listIndex, listSubIndex:listSubIndex});
                  }
                }
              }
              handleCreateItem={(listIndex, listSubIndex)=>{
                const {report, selectedBigCategory} = this.props;
                let count = 0; let copiedObject = {}; let label = '';
                let reportt = update({}, {$set:report});
                for(var k in reportt[selectedBigCategory]) {
                  if ( count === listIndex) {
                    copiedObject = update({}, {$set:reportt[selectedBigCategory][k]});
                    // copiedObject[listSubIndex].endData.push({name: 'hello'});

                    label = reportt[selectedBigCategory][k][listSubIndex].name;
                    reportt[selectedBigCategory][k].map((item, index)=>{
                      if(item.name.indexOf(label) !== -1) {
                        copiedObject[index].endData.push({name: 'hello'});
                      }
                    });
                  }
                  count++;
                }
                this.props.reportActions.createItem({listIndex:listIndex, listSubIndex:listSubIndex, copiedObject: copiedObject});
              }}
            />
          </Image>
        </View>
        <Footer.Main
          page='Report'
          selectedBigCategory={selectedBigCategory}
          pressReportFooterBtn={(bigCategory)=>{this.props.reportActions.selectBigCategory(bigCategory);}}
          handleEditReport={()=>{this.handleEditReport();}}
          isEdit={isEdit}
        />
      </View>
    );
  }
}

let styles = StyleSheet.create({
});

export default connect(
  (state) => ({
    report: state.report,
    selectedBigCategory: state.report.selectedBigCategory
  }),
  (dispatch) => ({
    reportActions: bindActionCreators(reportActions, dispatch)
  })
)(Report);
