import React, { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect } from "react-router-dom"
import useStyles from "../../hooks/useStyles"

import { actions } from "./store"
import styles from "./style.css"

const Translation = (props) => {
  useStyles(props.staticContext, styles)
  const { login } = useSelector(state => state.header)
  const { list } = useSelector(state => state.translation)
  const dispatch = useDispatch()
  const getTranslationList = useCallback(() => dispatch(actions.getTranslationList()), [dispatch])
  
  useEffect(()=> {
    if(!list.length){
      getTranslationList()
    }
  }, [])

  return login ? (
    <div className={styles.container}>
      {list.map(item => (
        <div className={styles.item} key={item.id}>{item.title}</div>
      ))}
    </div>
  ) : (
    <Redirect to="/" />
  )
}

Translation.loadData = (store) => {
  return store.dispatch(actions.getTranslationList())
}

export default Translation
