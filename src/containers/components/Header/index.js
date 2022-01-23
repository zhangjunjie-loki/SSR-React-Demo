import React, { useCallback } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import styles from "./style.css"
import { actions } from "./store"
import useStyles from "../../../hooks/useStyles"

const Header = (props) => {
  // 处理css问题
  useStyles(props.staticContext, styles)

  const { login } = useSelector(state => state.header)
  const dispatch = useDispatch()
  const handleLogin = useCallback(() => dispatch(actions.login()), [dispatch])
  const handleLogout = useCallback(() => dispatch(actions.logout()), [dispatch])

  
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.item}>首页</Link>
      {
        login ? 
          <>
            <Link to="/translation" className={styles.item}>翻译列表</Link>
            <div className={styles.item} onClick={() => handleLogout()}>退出</div>
          </> : 
          <div className={styles.item} onClick={() => handleLogin()}>登录</div>
      }
    </div>
  )
}

export default Header
