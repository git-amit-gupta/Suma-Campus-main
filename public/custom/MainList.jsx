// import { exportToCSV, exportToExcel } from "../../app/text/page";
// import "./Store";

Ext.define("ReExt.view.main.List", {
  extend: "Ext.grid.Panel",
  xtype: "mainlist",
  controller: "grid-ctrl",

  tbar: [
    {
      text: "Refresh",
      iconCls: "fa fa-sync",
      cls: "refresh-btn",
      handler: function (btn) {
        let grid = btn.up("grid");
        grid.getStore().load();
      },
    },
    "->",
    {
      text: "Options",
      itemId: "options",
      menu: [
        {
          text: "Add New",
          iconCls: "x-fa fa-plus",
          handler: "addNew",
        },
        {
          text: "Export to Excel",
          iconCls: "x-fa fa-file-excel",
          cfg: { type: "excel07", ext: "xlsx" },
          handler: "doExport",
          // handler: function (btn){
          //   exportToCSV(btn.up("grid"))
          // }
        },
        {
          text: "Export to CSV",
          iconCls: "x-fa fa-file-csv",
          cfg: { type: "csv", ext: "csv" },
          // handler: (btn) => exportToExcel(btn.up("grid")),
          handler: "doExport",
        },
      ],
    },
  ],
  bbar: {
    xtype: "pagingtoolbar",
    displayInfo: true,
    displayMsg: "Displaying records {0} - {1} of {2}",
    emptyMsg: "No records to display",
  },
  // bbar: [
  //   {
  //     xtype: "button",
  //     text: "Prev",
  //     handler:"prevButton"
  //   },
  //   {
  //     xtype: "button",
  //     text: "Next",
  //     handler:"nextButton"

  //   }
  // ],
  plugins: {
    gridfilters: true,
    gridexporter: true,
  },
  listeners: {
    // this event notifies us when the document was saved
    documentsave: "onDocumentSave",
    beforedocumentsave: "onBeforeDocumentSave",
  },
  initComponent: function () {
    let me = this;
    this.callParent();
    this.getStore().load();
    if (this?.gridType === "admin") {
      console.log("first", this.columns);
    } else {
      console.log("second", this.columns);
    }
  },
});
