import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHighcharts from 'react-highcharts';

import { formatHours } from '../../DefaultData/Dates';
import AhPill from './AhPill';

class Timeline extends Component {


	renderTimeline() {
		let units = this.props.units || '',
			y1LabelsEnabled = true,
			yAxis0MinVal = 0,
			yAxis0MaxVal = null,
			yAxis1Label = ' GB',
			y2LabelsEnabled = false,
			yAxis1MinVal = 0,
			yAxis1MaxVal = null,
			yAxis2MinVal = 0,
			yAxis2MaxVal = null,
			self = this,
			xCat = this.props.data.map( point => point.timestamp ),
			xInterval = xCat.length > 15 ? Math.round(xCat.length / 10) : null,
			data = {
				data: this.props.data.map( point => point.value ),
				color: this.props.colors ? this.props.colors[0] : '#457dba',
				name: 'Historical Clients'
			}

		const options = {
			chart: {
                type: 'spline',
                zoomType: 'x',
                height: this.props.height,
                backgroundColor: '#FFFFFF',
                events: {
	                selection: function(e){
	                	if(e.xAxis){
                            var selectedMin = e.xAxis[0].min < 0 ? 0 : Math.round(e.xAxis[0].min),
                                selectedMax = e.xAxis[0].max > this.xAxis[0].dataMax ? this.xAxis[0].dataMax : Math.round(e.xAxis[0].max),
                                minStartTime = this.xAxis[0].categories[selectedMin],
                                maxEndTime = this.xAxis[0].categories[selectedMax],
                                selectedRange = (selectedMax - selectedMin);

                            this.xAxis[0].options.tickInterval = selectedRange > 10 ? Math.round(selectedRange / 11) : null;
                            self.props.updateTimes(minStartTime, maxEndTime);
                        } else {
                            self.props.updateTimes(this.xAxis[0].categories[0], this.xAxis[0].categories[this.xAxis[0].categories.length - 1]);
                            this.xAxis[0].options.tickInterval = xInterval;
                        }
                    }
                },
            },

            title: {
                text: null,
            },
            exporting: {
                enabled: false
            },
            legend: {
            	enabled: false
            },
            credits: {
                enabled: false
            },
            yAxis: [{
                labels: {
                    format: '{value}' + units,
                    enabled: y1LabelsEnabled
                },
                title: {
                    text: null
                },
                min: yAxis0MinVal,
                max: yAxis0MaxVal,
            }, {
                labels: {
                    format: '{value} ' + yAxis1Label,
                    enabled: y2LabelsEnabled
                },
                title: {
                    text: null
                },
                gridLineWidth: 0,
                min: yAxis1MinVal,
                max: yAxis1MaxVal,
                opposite: true,
                allowDecimals: false
            }, {
                labels: {
                    enabled: false
                },
                title: {
                    text: null
                },
                gridLineWidth: 0,
                min: yAxis2MinVal,
                max: yAxis2MaxVal
            }],
            xAxis: [{
                categories: xCat,
                crosshair: false,
                tickLength: 0,
                tickInterval: xInterval,
                labels: {
                    formatter: function() {
                        var timeDispHours = formatHours(this.value),
                            timeDisp = timeDispHours;

                        return timeDisp;
                    }
                }
            }],
           plotOptions: {
                line: {
                    marker: {
                        enabled: false
                    },
                },
                spline: {
                    marker: {
                        enabled: false
                    },
                },
                series: {
                	marker: {
                		states: {
                			hover: {
                				enabled: false
                			}
                		}
                	}
                }
            },

            tooltip: {
                enabled: false
                // useHTML: true,
                // formatter: function(v) {
                //     return self.props.toolTip(this, units)
                // }
            },
            scrollbar: {
                enabled: false
            },
            series: [data]
		}

		return <ReactHighcharts
			config={options} ></ReactHighcharts>
	}

	togglePill() {

	}

  	render() {
  		let timeline = this.renderTimeline();
    	return (<div className="Timeline" id="Components/ReusableTemplates/Timeline">
    		<AhPill
    			options={['Day', 'Week', 'Month']}
    			classes={'long-selector'}
    			type={'LongRange'}
    			checked={this.props.longRange}
    			togglePill={this.props.toggleLongRange} />
    		<AhPill
    			options={this.props.longRange === 0 
    				? ['1 Hour', '4 Hours', '8 Hours', '24 Hours'] 
    				: this.props.longRange === 1 ? ['1 Day', '2 Days', '7 Days']
    				: ['7 Days', '14 Days', '30 Days']}
    			classes={'short-selector'}
    			type={'ShortRange'}
    			checked={this.props.shortRange}
    			togglePill={this.props.toggleShortRange} />
			{timeline}
    	</div>);
  	}
}

Timeline.propTypes = {
	data: PropTypes.array.isRequired,
	colors: PropTypes.array,
	height: PropTypes.number,
	toolTip: PropTypes.func,
	units: PropTypes.string,
	updateTimes: PropTypes.func

}

export default Timeline;