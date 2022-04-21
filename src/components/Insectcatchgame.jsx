import React, { useEffect } from 'react'
import './game.css'
function Insectcatchgame() {
    useEffect(()=>{
       startOut()
    })

    const startOut =() =>{
        const screens = document.querySelectorAll('.screen')
        const choose_insect_btns = document.querySelectorAll('.choose-insect-btn')
        const start_btn= document.getElementById('start-btn')
        const game_container = document.getElementById('game-container')
        const timeEl =document.getElementById('time')
        const scoreEl= document.getElementById('score')
        const message = document.getElementById('message')

        let second = 0;
        let score = 0;
        let selected_insect = {}


        start_btn.addEventListener('click', () => screens[0].classList.add('up'))

        choose_insect_btns.forEach(btn => {
            btn.addEventListener('click', ()=>{
                const img = btn.querySelector('img')
                const src = img.getAttribute('src')
                const alt = img.getAttribute('alt')
                selected_insect = {src , alt}
                screens[1].classList.add('up')
                setTimeout(createInsect , 1000)
                startGame()
            })
        })
        const startGame = () =>{
            setInterval(increaseTime , 1000)
        }

        const increaseTime =()=>{
            let m = Math.floor(second /60);
            let s = second % 60
            m = m < 10 ?   `0${m}`: m;
            s = s < 10 ? `0${s}` : s;
            timeEl.innerHTML = `Time: ${m}:${s}`
            second++
        }
        function createInsect (){
            const insect = document.createElement('div')
            insect.classList.add('insect')
            const {x , y} = getRandomLocation()
            insect.style.top = `${y}px`
            insect.style.left = `${x}px`
            insect.innerHTML = `<img src="${selected_insect.src}" alt="${selected_insect.alt}"
            style= "transform: rotate(${Math.random() * 360}deg)" />`

            insect.addEventListener('click', catchInsect)

            game_container.appendChild(insect)
        }

        const getRandomLocation = ()=>{
            const width = window.innerWidth
            const height = window.innerHeight
            const x = Math.random() * (width - 200) + 100
            const y = Math.random() * (height -200) + 100
            return { x, y}
        }
        const catchInsect=()=>{
            increaseScore()
            // this.classList.add('cought')
            // setTimeout(()=> this.remove(), 1000)
            addInsects()
        }

        const addInsects = () =>{
            setTimeout(createInsect, 1000)
            setTimeout(createInsect, 1500)
        }

        const increaseScore = () =>{
            score++
            if(score > 19){
                message.classList.add('visible')
            }
            scoreEl.innerHTML =`Score: ${score}`
        }
    }
  return (
    <>
        <div className="screen">
            <h1>Catch the insect</h1>
            <button className="btn" id="start-btn">Play Game</button>
        </div>

        <div className="screen">
            <h1>What is your "favorite" insect?</h1>
            <ul className="insects-list">
                <li>
                    <button className="choose-insect-btn">
                        <p>Fly</p>
                        <img src="http://pngimg.com/uploads/fly/fly_PNG3946.png" alt="flay" />
                    </button>
                </li>
                <li>
                    <button className="choose-insect-btn">
                        <p>Fly</p>
                        <img src="http://pngimg.com/uploads/roach/roach_PNG12163.png" alt="flay" />
                    </button>
                </li>
                <li>
                    <button className="choose-insect-btn">
                        <p>Fly</p>
                        <img src="http://pngimg.com/uploads/spider/spider_PNG12.png" alt="flay" />
                    </button>
                </li>
            </ul>
        </div>
        <div className="screen game-container" id='game-container'>
            <h3 id="time" className='time'>Time: 00:00</h3>
            <h3 id="score" className='score'>Score: 0</h3>
            <h5 id="message" className='message'>
                Are you annoyed yet? <br />
                You are playing an impossible game!!
            </h5>
        </div>
    </>
  )
}

export default Insectcatchgame