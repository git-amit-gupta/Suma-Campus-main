Ext.define('ReExt.view.chart.line.RealTimeDate', {
    extend: 'Ext.Container',
    xtype: 'line-real-time-date',
    controller: "grid-ctrl",


    layout: 'fit',

    items: [{
        xtype: 'cartesian',
        reference: 'chart',
        insetPadding: '30 30 10 10',
        title: 'Real Time Users Chart-[stops after 30 seconds]',
        store: {
            fields: ['yValue', 'metric1', 'metric2']
        },
        axes: [{
            type: 'numeric',
            minimum: 0,
            maximum: 20,
            grid: true,
            position: 'left',
            title: 'Number of Active Users'
        }, {
            type: 'time',
            dateFormat: 'G:i:s',
            segmenter: {
                type: 'time',
                step: {
                    unit: Ext.Date.SECOND,
                    step: 1
                }
            },
            label: {
                fontSize: 10
            },
            grid: true,
            position: 'bottom',
            title: 'Seconds',
            fields: ['xValue'],
            majorTickSteps: 10
        }],
        series: [{
            type: 'line',
            title: 'Metric 1',
            marker: {
                type: 'cross',
                size: 5
            },
            style: {
                miterLimit: 0
            },
            xField: 'xValue',
            yField: 'metric1'
        }, {
            type: 'line',
            title: 'Metric 2',
            marker: {
                type: 'arrow',
                size: 5
            },
            style: {
                miterLimit: 0
            },
            xField: 'xValue',
            yField: 'metric2'
        }]
    }]
});
