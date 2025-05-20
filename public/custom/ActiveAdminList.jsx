Ext.define("ReExt.view.admin.List", {
  extend: "Ext.grid.Panel",
  xtype: "adminlist",
  // title: "Active Admin List",
  //   controller: "active-grid-ctrl",
  tbar: [
    {
      xtype: "tbtext",
      text: "Active Admins",
      style:
        "font-size: 16px; margin-right: 10px;font-weight:400; color:var(--navbtn-color)",
    },
    "->",
    {
      text: "Timer",
      iconCls: "x-fa fa-clock",
      itemId: "timerButton",
      handler: function (btn) {
        const grid = btn.up("grid");
        grid.startStopTimer(btn);
      },
      // TIME
    },
  ],
  plugins: {
    gridfilters: true,
  },
  columns: [
    { text: "Id", dataIndex: "id", flex: 1 },
    { text: "Username", dataIndex: "username", flex: 1 },

    {
      text: "Active / Inactive",
      dataIndex: "active",
      flex: 1,
      cell: {
        encodeHtml: false,
      },
      renderer: function (value) {
        return value
          ? `<section class="container">
          <div class="blinking-circle"><div class="circle-green" /></div></section>`
          : `<section class="container"><div class="circle-red"></section>`;
      },
      filter: "boolean",
    },
  ],
  store: {
    fields: ["id", "username", "active"],
    data: [],
  },
  initComponent: function () {
    this.callParent();
    let toolbar = this.down("toolbar");
    this.timer = null; // Timer reference
    this.timerInterval = 20; // 20 seconds countdown
    this.currentCountdown = this.timerInterval; // Tracks remaining time
    this.isTimerRunning = false; // Timer state

    this.fetchData();
  },

  fetchData: async function () {
    const store = this.getStore();
    const { db, collection, query, getDocs } =
      await import("../../firebase/firebaseConfig");
    let q = query(collection(db, "login"));
    const snapshot = await getDocs(q);
    const adminList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    store.loadData(adminList);
  },
  startStopTimer: function (btn) {
    if (this.isTimerRunning) {
      clearInterval(this.timer);
      this.timer = null;
      this.currentCountdown = this.timerInterval; // Reset countdown
      this.isTimerRunning = false;
      btn.setText("Start Timer");
    } else {
      this.isTimerRunning = true;
      this.timer = setInterval(() => {
        if (this.currentCountdown === 0) {
          this.fetchData();
          this.currentCountdown = this.timerInterval; // Reset countdown after refresh
        } else {
          this.currentCountdown -= 1; // Decrement countdown
        }
        btn.setText(`Stop Timer (${this.currentCountdown}s)`); // Update button text
      }, 1000);
    }
  },
});
