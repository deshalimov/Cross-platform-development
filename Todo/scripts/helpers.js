const GAUGE_MAX = 329

function setGaugePercent($node, percent) {
  const $gaugeCircle = $node.querySelector('.gauge__cirlce-arc')
  const $gaugePercent = $node.querySelector('.gauge__percent')
  
  const value = GAUGE_MAX * (percent / 100) 

  $gaugeCircle.setAttribute('stroke-dasharray', `${value} ${GAUGE_MAX}`)
  $gaugePercent.innerHTML = percent + '<span style="color: #999999; font-size: 14px;"><sup>%</sup></span>'
}
