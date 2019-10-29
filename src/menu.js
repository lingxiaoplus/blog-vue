var drawers = [
	{
	  action: "home",
	  title: "首页",
	  path:"/index",
	  items: [{ title: "统计", path: "/dashboard" }]
	},
  {
    action: "apps",
    title: "线路管理",
    path:"/items",
    items: [
      {
        title: "普通线路",
        path: "/normalLine" ,
      }
    ]
  },
	{
	  action: "apps",
	  title: "人员管理",
	  path:"/items",
    items: []
	},
];

var themes = [
  {
    name: "知乎蓝",
    color: "#42A5F5",
    dark: false,
  },
  {
    name: "依提篮",
    color: "#29B6F6",
    dark: false,
  },
  {
    name: "水鸭青",
    color: "#4DB6AC",
    dark: false,
  },
  {
    name: "重力橘",
    color: "#FFF176",
    dark: true,
  },
  {
    name: "少女粉",
    color: "#F06292",
    dark: false,
  },
];
export default {drawers,themes};
