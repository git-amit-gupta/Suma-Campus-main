Ext.define("app.custom.GridController", {
  extend: "Ext.app.ViewController",
  alias: "controller.grid-ctrl",

  addNew: function () {
    const routerAdd = this.getView().config.onAddNew;

    if (routerAdd && typeof routerAdd === "function") {
      routerAdd();
    } else {
      Ext.Msg.alert("Error", "Navigation not supported in this context.");
    }
  },
  onEdit: function (grid, rowIndex) {
    const record = grid.getStore().getAt(rowIndex).data;
    
    const router = this.getView().config.routerEdit;

    if (record && typeof router === "function") {
      router(record);
    } else {
      Ext.Msg.alert("Error", "Router function or record is not available.");
    }
  },
  onView: function (grid, rowIndex) {
    const record = grid.getStore().getAt(rowIndex).data;
   

    const router = this.getView().config.routerView;

    if (record && typeof router === "function") {
      router(record);
    } else {
      Ext.Msg.alert("Error", "Router function or record is not available.");
    }
  },
  onDelete: function (grid, rowIndex) {
    const record = grid.getStore().getAt(rowIndex).data;
   

    const router = this.getView().config.onDelete;

    if (record && typeof router === "function") {
      router(record);
    }
  },
  onBeforeDocumentSave: function (view) {
    view.mask({
      xtype: "loadmask",
      message: "Document is prepared for export. Please wait ...",
    });
  },

  onDocumentSave: function (view) {
    view.unmask();
  },
  doExport: function (btn) {
    let config = Ext.merge(
      {
        title: "Tasks",
        fileName: "Tasks." + btn.cfg.ext,
      },
      btn.cfg
    );

    this.getView().saveDocumentAs(config);
  },
  exportToCSV: function (grid) {
    const store = grid.getStore();
    const data = store.getData().items; // Fetch all records in the store
    const columns = grid.getColumns();

    // Extract column headers
    const headers = columns.map((column) => column.config.text);

    // Extract data rows
    const rows = data.map((record) => {
      const rowData = [];
      columns.forEach((column) => {
        const dataIndex = column.config.dataIndex;
        rowData.push(record.get(dataIndex) || ""); // Get data based on dataIndex
      });
      return rowData;
    });

    // Combine headers and rows into a single CSV content
    const csvContent = [headers, ...rows];

    // Convert the CSV content array into a string
    const csvString = csvContent.map((row) => row.join(",")).join("\n");

    // Trigger CSV file download
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grid-data.csv";
    a.click();
    URL.revokeObjectURL(url);
  },
  prevButton: function () {
    const handleFetchPrev = this.getView().config.handleFetchPrev;
    if (handleFetchPrev && typeof handleFetchPrev === "function") {
      handleFetchPrev();
    } else {
      Ext.Msg.alert("Error", "Navigation not supported in this context.");
    }
  },
  nextButton: function () {
    const handleFetchNext = this.getView().config.handleFetchNext;
    if (handleFetchNext && typeof handleFetchNext === "function") {
      handleFetchNext();
    } else {
      Ext.Msg.alert("Error", "Navigation not supported in this context.");
    }
  },
  
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
        // me.getView().config.fetchCount(me);
      },
      interval: 5000, // Fetch every 5 seconds
      fireOnStart: true,
      scope: me,
    });


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
  onPreview: function () {
    var chart;

    if (Ext.isIE8) {
      Ext.Msg.alert(
        "Unsupported Operation",
        "This operation requires a newer version of Internet Explorer."
      );

      return;
    }

    chart = this.getChart();

    chart.preview();
  },
});
