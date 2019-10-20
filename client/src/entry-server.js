import { createApp } from '@/app'

export default context => {
  return new Promise((resolve, reject) => {
    //some magic with router and store
    const { app, router, store } = createApp()
    router.push(context.url)
    router.onReady(() => {
      context.rendered = () => {
        context.state = store.state;
      }
      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      resolve(app)
    }, reject)
  })
}