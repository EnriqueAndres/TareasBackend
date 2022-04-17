const arr = [
    {
      "title": "calculadora",
      "price": 232,
      "foto": "https://www.google.cl/",
      "id": 1
    },
    {
      "title": "cuaderno",
      "price": 123,
      "foto": "https://www.google.cl/",
      "id": 2
    },
    {
      "title": "lapiz",
      "price": 50,
      "foto": "https://www.google.cl/",
      "id": 3
    }
  ]



function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

random(1,3)

console.log(random(1,20))

let randomValue = arr[Math.floor(arr.length * Math.random())]

console.log(randomValue)



