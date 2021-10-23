const buttons = document.querySelectorAll('[data-button]')

const cardContainer = document.querySelector('[data-cardContainer')

async function getData() {
    const response = await fetch("../js/data.json");
    const data = await response.json()
    updateUI(data)
}

function updateUI(data){
    createItem(data,"weekly")
    buttons.forEach(button => {
        button.addEventListener('click',e =>{
            const dataType = e.target.dataset.button
            while (cardContainer.firstChild){
                cardContainer.firstChild.remove()
            }
            createItem(data,dataType)
            buttons.forEach(btn =>{
                btn.classList.remove('active')
            })
            e.target.classList.add('active')
        })
    })
    
}

function createItem(data,type){

    data.forEach(obj => {
                
        const title = obj.title
        const current = obj.timeframes[type].current
        const previous = obj.timeframes[type].previous
        const cHr = current > 1 ? "hrs" : "hr"
        const pHr = previous > 1 ? "hrs" : "hr"
        const time = type == "daily" ? "Day" : type == "weekly"? "Week" : type == "monthly"? "Month" : ""
        console.log(time)
        
        const html =`<div class="${title} card">
        <div class="card__title">
          <p>${title}</p>
          <svg width="21" height="5" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2.5 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Zm8 0a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
              fill="#BBC0FF"
              fill-rule="evenodd"
            />
          </svg>
        </div>
        <div class="card__body">
          <h2>${current}${cHr}</h2>
          <p>Last ${time} - ${previous}${pHr}</p>
        </div>
      </div>`
      cardContainer.insertAdjacentHTML("beforeend", html)

    })

}


getData()









