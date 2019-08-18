export default function initAnimatePlays () {
  return new Promise(resolve => {
    Object.entries(animates).forEach(([id, animate]) => {
      if (animate.components === undefined) {
        return
      }
      animate.components.play.forEach(play => {
        play.onTick = (evtObj) => {
          play._tick(evtObj)
        }
        createjs.Ticker.addEventListener('tick', play.onTick)
      })
    })
  })
}
