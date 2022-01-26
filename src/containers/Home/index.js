import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Helmet } from "react-helmet"

import styles from "./style.css"
import { getHomeList } from "./store/actions"
import useStyles from "../../hooks/useStyles"
const Alldata={}

const Home = (props) => {
  // 处理css问题
  useStyles(props.staticContext, styles)

  const { homeList } = useSelector(state => state.home)
  const dispatch = useDispatch()
  const getHomeList = useCallback(
    () => dispatch(getHomeList()),
    [dispatch]
  )

  useEffect(() => {
    // 为了不重复请求，判断一下如果服务端已经请求过数据就不再发axios
    if(!homeList.length){
      getHomeList()
    }
  }, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>react-ssr|首页-丰富多彩的资讯</title>
      </Helmet>
      <div>{Alldata.testData}</div>
      <div className={styles.container}>
        {
          homeList.map((item)=>{
            return <div className={styles.item} key={item.id}>{item.id}-{item.name}</div>
          })
        }
      </div>
    </>
  )
}
Home.loadData = (store) => {
  // 该函数负责在服务端渲染前把该路由需要的数据提前加载好！
  Alldata.testData = "testdata-erwerwe"
  return store.dispatch(getHomeList())
}

export default Home