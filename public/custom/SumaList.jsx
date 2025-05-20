Ext.define("ReExt.view.suma.List", {
  extend: "Ext.grid.Panel",
  xtype: "sumalist",
  controller: "grid-ctrl",

  bodyCls: "gridTabel",

  store: {
    data: [],
  },

  tbar: [
    {
      xtype: "container",
      layout: {
        type: "vbox",
        align: "stretch",
      },
      width: "100%",
      margin: "10 10 10 0",
      items: [
        {
          xtype: "container",
          layout: {
            type: "hbox",
            align: "stretch",
          },
          width: "100%",

          items: [
            {
              xtype: "textfield",
              itemId: "searchField",
              emptyText: "Search by  Name...",
              flex: 2,
              margin: "0 5 0 0",
              cls: "search-field",
            },
            {
              xtype: "button",
              text: "Search",
              iconCls: "x-fa fa-search",
              margin: "0 5 0 0",
              cls: "search-btn",
              overCls: "hover-btn",

              handler: function (btn) {
                const grid = btn.up("grid");
                const searchValue = grid.down("#searchField").getValue().trim();
                if (searchValue) {
                  grid.searchData(searchValue);
                }
              },
            },
            {
              xtype: "button",
              text: "Clear",
              iconCls: "x-fa fa-times",
              cls: "clear-btn",
              overCls: "hover-btn",

              handler: function (btn) {
                const grid = btn.up("grid");
                grid.down("#searchField").setValue("");
                grid.refreshData(); // Reload the full dataset
              },
            },
          ],
        },
        {
          xtype: "container",
          layout: {
            type: "hbox",
            pack: "space-between",
            align: "middle",
          },
          width: "100%",
          margin: "10 0 0 0",
          items: [
            {
              xtype: "button",
              text: "Refresh",
              iconCls: "fa fa-sync",
              cls: "refresh-btn",
              overCls: "hover-btn",
              //   flex: 1,
              width: 100,
              // margin: "0 5 0 0",
              handler: function (btn) {
                const grid = btn.up("grid");
                grid.refreshData();
              },
            },
            {
              xtype: "displayfield",
              flex: 1,
            },
            {
              xtype: "splitbutton",
              text: "Options",
              innerCls: "options-btn",
              cls: "options-btn",
              //   itemId: "options",
              // floating: false,
              //   flex: 1,
              overCls: "hover-btn",

              width: 100,
              menu: [
                {
                  text: "Add New",
                  iconCls: "x-fa fa-plus",
                  handler: "addNew",
                },
                "-",
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
        },
      ],
    },
  ],

  bbar: [
    {
      xtype: "button",
      text: "Previous",
      itemId: "prevBtn",
      disabled: true,
      iconCls: "x-fa fa-chevron-circle-left",
      handler: function (btn) {
        const grid = btn.up("grid");
        grid.fetchData("prev");
      },
    },
    "->",
    {
      xtype: "button",
      text: "Next",
      itemId: "nextBtn",
      iconCls: "x-fa fa-chevron-circle-right",

      handler: function (btn) {
        const grid = btn.up("grid");
        grid.fetchData("next");
      },
    },
  ],
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
    this.callParent();
    this.pageStack = [];
    this.currentIndex = 0;
    this.lastDoc = null;
    this.pageSize = 8;

    this.type = "";
    // University | student
    if (this?.gridType === "university") {
      this.type = "university";
      this.sortField = "rank"; // Default sort field
    } else if (this?.gridType === "students") {
      this.type = "students";
      this.sortField = "name";
    } else if (this?.gridType === "referral") {
      this.type = "referral";
      this.sortField = "name";
    }
    this.fetchTotalCount().then(() => {
      this.fetchData();
    });
  },

  fetchTotalCount: async function () {
    const { db, collection, getCountFromServer } = await import(
      "../../firebase/firebaseConfig"
    );
    const colRef = collection(db, this.type); //University | student | referral
    const snapshot = await getCountFromServer(colRef);
    this.totalCount = snapshot.data().count;
  },

  fetchData: async function (direction = "next") {
    const store = this.getStore();
    const { db, collection, query, orderBy, limit, startAfter, getDocs } =
      await import("../../firebase/firebaseConfig");

    let q;

    if (direction === "next" && this.lastDoc) {
      q = query(
        collection(db, this.type),
        orderBy(this.sortField),
        startAfter(this.lastDoc),
        limit(this.pageSize)
      );
    } else if (direction === "prev" && this.pageStack.length > 1) {
      const prevDoc = this.pageStack[this.pageStack.length - 2];
      q = query(
        collection(db, this.type), //University | student | referral
        orderBy(this.sortField),
        startAfter(prevDoc),
        limit(this.pageSize)
      );
    } else {
      q = query(
        collection(db, this.type), //University | student | referral
        orderBy(this.sortField),
        limit(this.pageSize)
      );
    }

    const snapshot = await getDocs(q);
    const universities = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    // console.log("008", universities);
    store.loadData(universities);

    if (snapshot.docs.length > 0) {
      const first = snapshot.docs[0];
      const last = snapshot.docs[snapshot.docs.length - 1];
      this.lastDoc = last;

      if (direction === "next") {
        this.pageStack.push(first);
      } else if (direction === "prev") {
        this.pageStack.pop();
      }

      // this.down("#prevBtn").setDisabled(this.pageStack.length <= 1);
      // this.down("#nextBtn").setDisabled(universities.length < this.pageSize);

      this.down("#prevBtn").setDisabled(this.pageStack.length <= 1);
      this.down("#nextBtn").setDisabled(
        this.totalCount <= this.pageStack.length * this.pageSize
      );
    }
  },

  // Search function
  searchData: async function (searchValue) {
    const store = this.getStore();
    const { db, collection, query, where, getDocs } = await import(
      "../../firebase/firebaseConfig"
    );

    const q = query(
      collection(db, this.type), //University | student
      where("name", ">=", searchValue),
      where("name", "<=", searchValue + "\uf8ff") // Ensures partial search works
    );
    const snapshot = await getDocs(q);

    const results = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    if (results.length === 0) {
      // toast if no results found
      Ext.toast({
        html: "No Data Found",
        closable: false,
        align: "t",
        slideInDuration: 400,
        minWidth: 200,
        bodyCls: "bg-toastred",
      });
      return;
    }
    if (results.length >= 1) {
      // toast if no results found
      Ext.toast({
        html: "Data Found",
        closable: false,
        align: "t",
        slideInDuration: 400,
        minWidth: 200,
        bodyCls: "bg-toastgreen",
      });
    }
    store.loadData(results);

    this.down("#prevBtn").setDisabled(true);
    this.down("#nextBtn").setDisabled(true);
  },

  refreshData: function () {
    this.pageStack = [];
    this.lastDoc = null;
    this.fetchData();
  },

  sortData: function (field) {
    // this.sortField = field;
    this.refreshData();
  },
});
