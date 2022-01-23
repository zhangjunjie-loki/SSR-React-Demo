export default (staticContext, styles) => {
  if(staticContext){
    staticContext.css.push(styles._getCss())
  }
}