/*
 * @Author: Jipu Li 
 * @Date: 2022-03-17 12:05:22 
 * @Last Modified by: Jipu Li
 * @Last Modified time: 2022-03-17 12:06:03
 */


window.addEventListener("load", () => {
  const canvas = document.querySelector('#canvas')
  const ctx = canvas.getContext('2d')


  canvas.height = window.innerHeight
  canvas.width = window.innerWidth

  let painting = false

  function startPosition(e) {
      painting = true
      draw(e)
  }

  function finishPosition() {
      painting = false
      ctx.beginPath()
  }

  function draw(e) {
      if (!painting) return

      ctx.lineWidth = 5;
      ctx.lineCap = 'round'
      ctx.strokeStyle = 'red'

      ctx.lineTo(e.clientX, e.clientY)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(e.clientX, e.clientY)
  }

  canvas.addEventListener('mousedown', startPosition)
  canvas.addEventListener('mouseup', finishPosition)
  canvas.addEventListener('mousemove', draw)

})