fetch(//"Unsplash Link") // Please Paste your Unsplash API Link here
  .then(res => res.json())
  .then(data => {
    document.body.style.backgroundImage = `url(${data.urls.full})`
    document.getElementById("author").innerHTML = `
    <h1> ${data.user.name} </h1>`
  })

fetch(//"Currency Link") // Please Paste your Currency API Link here, you can also change the currency type by copy pasteing from the API itself
  .then(res => res.json())
  .then(data => {
    const value = `${Math.round(data.data.IDR.value).toLocaleString("id")}`
    document.getElementById("coins").innerHTML += `
    <p>💰: ${value}</p>`
  })

fetch(//"Coin Gecko Link") // Please Paste your Coin Gecko API Link here
  .then(res => res.json())
  .then(data => {
    document.getElementById("coins-title").innerHTML = `
    <img src=${data.image.small} />
    <span> ${data.name.toUpperCase()} </span>`

    document.getElementById("coins").innerHTML += `
    <p>🎯: $${data.market_data.current_price.usd}</p>
    <p>👆: $${data.market_data.high_24h.usd}</p>
    <p>👇: $${data.market_data.low_24h.usd}</p>
    `
  })

function timeGet(){
  const date = new Date();
  document.getElementById("time").innerHTML = date.toLocaleTimeString("id", {timeStyle: "short"})
}
setInterval(timeGet, 1000);

navigator.geolocation.getCurrentPosition(position => {
  fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
    .then(res => {
      if(!res.ok){
        throw Error ("Error occurred")
      }
      return res.json()
    })
    .then(data => {
      const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      document.getElementById("weather").innerHTML = `
      <img src="${iconUrl}" />
      <h1 class="temp">${Math.round(data.main.temp)}º</h1>
      <h1 class="city">${data.name}</h1>`
    })
    .catch(err => console.error(err))
})