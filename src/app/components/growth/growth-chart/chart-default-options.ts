const CHART_DEFAULT_OPTIONS = {
  chart: {
    height: 540,
    type: "rangeArea",
    animations: {
      speed: 500,
    },
    zoom: {
      enabled: true,
      type: "x",
      autoScaleYaxis: true,
    },
    toolbar: {
      autoSelected: "zoom",
    },
  },
  stroke: {
    curve: "straight",
    width: [0, 0, 0, 3],
  },
  dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
      if (opts.seriesIndex === 3) {
        return val;
      } else {
        return "";
      }
    },
  },
  title: {
    text: "Weight-for-length Percentiles (boys)",
    align: "left",
  },
  xaxis: {
    type: "numeric",
    title: {
      text: "Length (cm)",
    },
    min: 45,
    max: 110,
    tickAmount: 10,
  },
  yaxis: {
    title: {
      text: "Weight (kg)",
    },
    min: 0,
    max: 25,
    labels: {
      formatter: (value) => value?.toFixed?.(0) ?? value,
    },
  },
};

export default CHART_DEFAULT_OPTIONS;
