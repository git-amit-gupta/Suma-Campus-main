Ext.define("app.custom.RealtimeController",{
    extend:"Ext.app.ViewController",
    alias:"controller.realtime-ctrl",

    init: function (view) {
        this.callParent([view]);
        this.fetchDataPeriodically();
      },
      destroy: function () {
        Ext.TaskManager.stop(this.dataFetchTask);
        this.callParent();
      },
      fetchDataPeriodically: function () {
        const me = this;
    
        this.dataFetchTask = Ext.TaskManager.start({
          run: function () {
            // me.fetchDataFromAPI();
            me.getView().config.fetchCount(me);
          },
          interval: 5000, // Fetch every 5 seconds
          fireOnStart: true,
          scope: me,
        });
    
        Ext.defer(async function () {
          Ext.TaskManager.stop(me.dataFetchTask);
          alert("Due to limitation, API is stopped after 30 seconds.");
        }, 30000);
      },
    
      updateChart: function (value) {
        const chart = this.lookup("chart");
        const store = chart.getStore();
        const xAxis = chart.getAxes()[1];
    
        const xValue = Ext.Date.now();
    
        store.add({
          xValue: xValue,
          metric1: value,
        });
    
        // Adjust axis range for real-time updates
        const visibleRange = 60000; // 1 minute range
        if (xValue - (this.startTime || xValue) > visibleRange) {
          this.startTime = xValue - visibleRange;
          xAxis.setMinimum(this.startTime);
          xAxis.setMaximum(xValue);
        }
      },
})