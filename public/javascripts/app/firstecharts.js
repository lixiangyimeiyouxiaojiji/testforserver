var echarts = require('echarts');

// ����׼���õ�dom����ʼ��echartsʵ��
var myChart = echarts.init(document.getElementById('main'));
// ����ͼ��
myChart.setOption({
    title: { text: 'ECharts ����ʾ��' },
    tooltip: {},
    xAxis: {
        data: ["����","��ë��","ѩ����","����","�߸�Ь","����"]
    },
    yAxis: {},
    series: [{
        name: '����',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});