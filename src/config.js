const baseUrl = 'https://api.lingxiaomz.top'
const product = "/product";
const member = "/member";
const config = {
  locale: 'zh-CN', // en-US, zh-CN
  url: baseUrl,
  debug: {
    http: true // http request log
  },
  api: `${baseUrl}`,
  theme:{
    primary: "#2196F3",
    secondary: "#455A64",
    accent: "#9c27b0",
    error: "#f44336",
    warning: "#FFC107",
    info: "#64B5F6",
    success: "#4caf50"
  },
  isDark:true,
}

export default config
