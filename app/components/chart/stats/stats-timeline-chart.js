import Ember from 'ember';

export default Ember.Component.extend({
    
    width: 600,
    height: 400,
    type: 'column2d',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Countries With Most Oil Reserves [2017-18]',
        subCaption: 'In MMbbl = One Million barrels',
        xAxisName: 'Country',
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K',
        theme: 'fusion'
      },
      data: [
        {
          label: 'Venezuela',
          value: '290'
        },
        {
          label: 'Saudi',
          value: '260'
        },
        {
          label: 'Canada',
          value: '180'
        },
        {
          label: 'Iran',
          value: '140'
        },
        {
          label: 'Russia',
          value: '115'
        },
        {
          label: 'UAE',
          value: '100'
        },
        {
          label: 'US',
          value: '30'
        },
        {
          label: 'China',
          value: '30'
        }
      ]
    },
    events: null,
    message: 'Hover on the plot to see the value along with the label',
  
    init() {
      this._super(...arguments);
      const self = this;
      this.set('events', {
        dataplotRollOver: function(eventObj, dataObj) {
          self.set(
            'message',
            'You are currently hovering over ' +
              dataObj.categoryLabel +
              ' whose value is ' +
              dataObj.displayValue
          );
        },
        dataPlotRollOut: function(eventObj, dataObj) {
          self.set(
            'message',
            'Hover on the plot to see the value along with the label'
          );
        }
      });
    }
  });