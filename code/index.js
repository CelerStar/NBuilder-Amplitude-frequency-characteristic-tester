/*!
 * NBuilder-Amplitude-frequency-characteristic-tester v1.0.0
 * Copyright 2017-2018 NBuilder, Inc.
 * Licensed under MIT
 */

var tcpServer;
var myChart;
var dataa = [

];

var tcpServerStatus = false;

/*
 * 名称：打开按钮事件
 * 输入：
 * 输出：
 * 描述：
 */
$("#start").click(function() {

	if(tcpServerStatus == false) {
		tcpIp = $("#ip").val();
		tcpPort = parseInt($("#port").val());

		tcpServer = new NbuilderTcpServer(tcpIp, tcpPort, onListenedCallback);
		tcpServer.setOnRecvCallback(onRecvCallback);
	} else {
		$("#start").html("启动");
		$("#start").removeClass("btn-success");
		$("#start").addClass("btn-primary");
		tcpServer.disconnect();
		tcpServerStatus = false;
	}

});

var onListenedCallback = function() {
	console.log("Listen");
	tcpServerStatus = true;
	$("#start").html("关闭");
	$("#start").removeClass("btn-primary");
	$("#start").addClass("btn-success");
}

$(window).ready(function() {

	// 基于准备好的dom，初始化echarts实例
	myChart = echarts.init(document.getElementById('main'));

	// 使用刚指定的配置项和数据显示图表。
	myChart.setOption(option);

})

option = {
	title: {
		text: '远程幅频特性曲线',
		subtext: 'Made By NBuilder',

		left: 'center'
	},
	tooltip: {
		trigger: 'axis',

		axisPointer: {
			type: 'cross'
		}
	},
	dataZoom: [{
			show: true,
			start: 0,
			end: 100
		},
		{
			type: 'inside',
			start: 0,
			end: 100
		},
		{
			show: true,
			yAxisIndex: 0,
			filterMode: 'empty',
			width: 30,
			left: '93%'
		}
	],
	xAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				type: 'dashed'
			}
		},
		splitNumber: 20
	},
	yAxis: {
		type: 'value',
		splitLine: {
			lineStyle: {
				type: 'dashed'
			}
		},
		splitNumber: 20
	},
	series: [{
		name: '幅频特性',
		type: 'line',
		showSymbol: false,
		smooth: true,
		data: dataa,
	}]
};

var onRecvCallback = function(clientSocketId, data) {
	console.log(data);

	var data = eval("(" + data + ")");
	dataa = data;

	myChart.setOption({
		series: [{
			data: dataa
		}]
	});

}

$(window).resize(function() {
	myChart.resize();
});


/*
 * 名称：NBuilder连接
 * 输入：
 * 输出：
 * 描述：
 */
$("#nbuilder").click(function() {
	nw.Shell.openExternal('http://nbuilder.celerstar.com/');
});
