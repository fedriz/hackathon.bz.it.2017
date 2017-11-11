import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppWrapper from '../containers/AppWrapper';
import { ProfileHeader } from '../components/ProfileHeader';

import { dashboardMonthAggregationNoPerc } from './utils/dataAggregations';

/**
 * css
 */
import '../css/profile.css';
/**
 * assets
 */
import peterDolonPic from '../assets/img/peterDolonPic.png';
import totalCake from '../assets/img/totalCake.png';

class ProfileContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalExpenses: {
        finalSum: 0,
        totEcommerce: 0,
        totFastFood: 0,
        totFuel: 0,
        totTransport: 0
      }
    };
  }

  componentDidMount() {
    let aggregation = dashboardMonthAggregationNoPerc(this.props, 2);
    let aggregationPastMonth = dashboardMonthAggregationNoPerc(this.props, 3);
    let aggregationPastPastMonth = dashboardMonthAggregationNoPerc(this.props, 4);
    let totalExpenses =
      parseInt(aggregation.finalSum) +
      parseInt(aggregationPastMonth.finalSum) +
      parseInt(aggregationPastPastMonth.finalSum);
    this.setState({
      totalExpenses: {
        finalSum: totalExpenses,
        totEcommerce:
          parseInt(aggregation.totEcommerce) +
          parseInt(aggregationPastMonth.totEcommerce) +
          parseInt(aggregationPastPastMonth.totEcommerce),
        totFastFood:
          parseInt(aggregation.totFastFood) +
          parseInt(aggregationPastMonth.totFastFood) +
          parseInt(aggregationPastPastMonth.totFastFood),
        totFuel:
          parseInt(aggregation.totFuel) +
          parseInt(aggregationPastMonth.totFuel) +
          parseInt(aggregationPastPastMonth.totFuel),
        totTransport:
          parseInt(aggregation.totTransport) +
          parseInt(aggregationPastMonth.totTransport) +
          parseInt(aggregationPastPastMonth.totTransport)
      }
    });
  }

  render() {
    console.log(this.state.totalExpenses);

    return (
      <AppWrapper class="profile container">
        <ProfileHeader userPic={peterDolonPic} user={{ name: 'Peter Dolon' }} />
        <div className="row profile__month-select">
          <div className="col-4 right">JUL 2017</div>
          <div className="col-4">
            <span className="centered">AUG 2017</span>
          </div>
          <div className="col-4 left">SEPT 2017</div>
        </div>
        <p className="profile__centered-title">TOTAL EXPENSES</p>
        <p className="profile__centered-money">€ {this.state.totalExpenses.finalSum}</p>
        <img className="profile__cake-chart" src={totalCake} alt="" />
      </AppWrapper>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {})(ProfileContainer);
