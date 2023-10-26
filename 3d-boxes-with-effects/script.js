const $ = select => document.querySelector(select)
const boxesContainers = document.querySelectorAll('.boxes')

// box creating
boxesContainers.forEach((container)=>{
  const containerId = container.id
  let rollBox = 'rollBox'
  let spiralBox = 'spiralBox'
  let flipBox = 'flipBox'
  let desintegrateBox = 'desintegrateBox'
  if( containerId === rollBox){
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        const box1 = document.createElement('div');
        box1.classList.add('roll')
        box1.style.backgroundPosition = `${-j * 56.25}px ${-i * 56.25}px`;
        container.appendChild(box1);
      }
    }
  } 
  if( containerId === spiralBox){
    for (let i = 1; i < 9; i++){
      const box2 = document.createElement("div");
      box2.id = `image-${i}`
      container.appendChild(box2);
      container = box2;
    }
  } 
  if( containerId === flipBox){
    const box3 = document.createElement('div');
    box3.classList.add('flip')
    container.appendChild(box3)
  } 
  if( containerId === desintegrateBox){
    const box4 = document.createElement('div');
    box4.classList.add('desintegrate')
    box4.id = 'desintegrate'
    box4.dataset.disType = 'simultaneous'
    box4.dataset.disParticleType = 'thanosSnap'
    box4.dataset.disReductionFactor = '35'
    container.appendChild(box4)
  }
})

// roll effect logic
const box1 = $('#rollBox')
const btnRoll = $('#btnRoll')
    // button effect
btnRoll.addEventListener('click', () => {
  box1.classList.toggle('rollBox');
})

// spiral effect logic
const btnSpiral = $('#btnSpiral')
    // button effect
btnSpiral.addEventListener('click', () => {
  $('#image-2').classList.toggle('animation-spiral')
  $('#image-3').classList.toggle('animation-spiral')
  $('#image-4').classList.toggle('animation-spiral')
  $('#image-5').classList.toggle('animation-spiral')
  $('#image-6').classList.toggle('animation-spiral')
  $('#image-7').classList.toggle('animation-spiral')
  $('#image-8').classList.toggle('animation-spiral')
})

// flip effect logic
const btnFlip = $('#btnFlip')
const box3 = $('.flip')
    // button effect
btnFlip.addEventListener('click', ()=>{
  box3.classList.toggle('animation-flip')
  setTimeout(function(){
    box3.classList.toggle('animation-flip')
  }, 2001)
})

// disintegrate effect logic
const btnDesintegrate = $('#btnDesintegrate')
const url1 = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js'
const url2 = 'https://raw.githubusercontent.com/WebDevSimplified/Thanos-Snap/master/disintegrate.js';
function ready() {
  disintegrate.init()
  document.getElementById('btnDesintegrate').addEventListener('click', () => {
    const disObj = disintegrate.getDisObj(document.querySelector('#desintegrate'))
    disintegrate.createSimultaneousParticles(disObj)
    document.querySelector('#desintegrate').remove()
  })

  const thanosSnap = function() {
    this.name = 'ThanosSnap'
    this.animationDuration = 1500
    this.size = 5
    this.speedX = Math.random()
    this.speedY = Math.random() * -1
    this.first = true
    this.draw = (ctx, percentComplete) => {
      if (this.first) {
        this.startX += (Math.random() - 0.5) * 10
        this.startY += (Math.random() - 0.5) * 10
        this.first = false
      }
      ctx.beginPath()
      ctx.fillRect(this.startX - this.size / 2, this.startY - this.size / 2, this.size, this.size)
      const r = this.rgbArray[0]
      const g = this.rgbArray[1]
      const b = this.rgbArray[2]
      const a = 1 - percentComplete
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${a})`
      ctx.fill()
      this.speedX *= 1.07
      this.speedY *= 1.07
      this.size *= 0.95
      this.startX += this.speedX
      this.startY += this.speedY
    }
  }

  disintegrate.addParticleType(thanosSnap)
}

var loadGitHubScript = url => fetch(url).
  then(res => res.blob()).
  then(body => loadScript(URL.createObjectURL(body)));

var loadScript = url => new Promise(function(resolve, reject) {
  var script = document.createElement('script');
  script.src = url;
  script.onload = resolve;
  script.onerror = reject;
  document.head.appendChild(script);
});
loadGitHubScript(url1).then(() => {
  loadGitHubScript(url2).then(() => {
    disintegrate.init()
    ready()
  })
})