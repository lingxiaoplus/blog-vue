var drawers = [
	{
	  action: "home",
	  title: "首页",
	  path:"/index",
	  items: [{ title: "统计", path: "/dashboard" }]
	},
  {
    action: "food-variant",
    title: "商品管理",
    path:"/items",
    items: [
      {
        title: "线路管理",
        path: "/normalLine" ,
      },
      { title: "订单管理", path: "/order" },
    ]
  },
	{
	  action: "comment-account-outline ",
	  title: "人员管理",
	  path:"/items",
    items: [
      { title: "权限管理", path: "/list" },
      { title: "角色管理", path: "/roleManage" },
      { title: "人员管理", path: "/member" }
    ]
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
