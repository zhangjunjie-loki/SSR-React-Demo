const loginStatus = {
  success: true,
  data: {
    login: false
  }
}

export default (req, res) => {
  if(req.url === "/mock/homeList"){
    res.send(
      [
        {id:1, name: "12"},
        {id:2, name: "12"},
        {id:3, name: "sdf"},
        {id:4, name: "13rg"},
        {id:5, name: "234"},
      ]
    )  
  }else if (req.url === "/mock/isLogin"){
    if(req.cookie?.login){
      loginStatus.data.login = true
    }
    res.send(loginStatus)
  }else if (req.url === "/mock/login"){
    loginStatus.data.login = true
    res.cookie("login", "true")
    res.send(loginStatus)
  }else if (req.url === "/mock/logout"){
    loginStatus.data.login = false
    res.cookie("login", "false")
    res.send(loginStatus)
  }else if (req.url === "/mock/translation"){
    if(loginStatus.data.login === false){
      res.send({
        success: false
      })
    }else{
      res.send({
        success: true,
        data: [
          {id:1, title: "收到了反馈就是独立开发的时间"}, {id:2, title: "是大法师的克己复礼快速的减肥"},
          {id:3, title: "熟练度空间放松iu存在v承诺"}, {id:4, title: "哦i u却忘了你"},
          {id:5, title: "啊山东iu啊是v你出现"}, {id:6, title: "哦屁u去玩儿那么早"}
        ]
      })
    }
  }else {
    res.status(404)
    res.send("")
  }
}