import ReExt from "@sencha/reext";

const BarChart = () => {
  const chartConfig = {
    xtype: "cartesian",
    width: 600,
    height: 300,
    insetPadding: 20,
    innerPadding: 10,
    title: "App Download in last 7 days",
    cls: "panelcls",
    store: {
      data: [
        { xValue: "Sun", yValue: 10, category: "Sunday" },
        { xValue: "Mon", yValue: 15, category: "Monday" },
        { xValue: "Tue", yValue: 8, category: "Tuesday" },
        { xValue: "Wed", yValue: 20, category: "Wednesday" },
        { xValue: "Thu", yValue: 18, category: "Thursday" },
        { xValue: "Fri", yValue: 11, category: "Friday" },
        { xValue: "Sat", yValue: 6, category: "Saturday" },
      ],

      fields: ["xValue", "yValue", "category"],
    },
    axes: [
      {
        type: "numeric", // numeric | numeric3d
        position: "left",
        fields: "yValue",
        label: {
          textAlign: "right",
        },
        title: {
          text: "Downloads",
          fontSize: 15,
        },
        grid: {
          odd: {
            fillStyle: "rgba(255, 255, 255, 0.06)",
          },
          even: {
            fillStyle: "rgba(0, 0, 0, 0.03)",
          },
        },
      },
      {
        type: "category", // category | category3d
        position: "bottom",
        fields: "xValue",
        title: {
          text: "Week",
          fontSize: 15,
        },
        grid: true,
      },
    ],
    series: [
      {
        type: "bar", // line | bar | bar3d
        xField: "xValue",
        yField: "yValue",
        stacked: true,
        style: {
          minGapWidth: 20,
        },

        tooltip: {
          trackMouse: true,
          renderer: (tooltip, record) => {
            tooltip.setHtml(
              `Category: ${record.get("category")}<br>X: ${record.get(
                "xValue"
              )}<br>Y: ${record.get("yValue")}`
            );
          },
        },
      },
    ],
  };

  return (
    <ReExt
      xtype="cartesian"
      style={{
        width: "100%",
        height: "100%",
        borderRadius: 8,
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        minHeight: "400px",
      }}
      config={chartConfig}
    />
  );
};

export default BarChart;
