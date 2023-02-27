const thumbnails = document.querySelectorAll('.thumbnail')
const lightboxThumbnails = document.querySelectorAll('.lightboxThumbnail')
const closeLightbox = document.getElementById('close')
const lightbox = document.getElementById('lightbox')

let cart = {}

closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden')
    lightbox.classList.remove('grid')
})

for (let i = 0; i < thumbnails.length; i++) {
    thumbnails[i].addEventListener('click', () => {
        switchImg('img', i, 'imgContainer')
    })
}

for (let i = 0; i < lightboxThumbnails.length; i++) {
    lightboxThumbnails[i].addEventListener('click', () => {
        switchImg('lightboxImg', i, 'lightboxImgContainer')
        page.curr = i + 1 === 5 ? 1 : i + 1
    })
}

imgContainer.addEventListener('click', () => {
    if (window.innerWidth < 768) return

    lightbox.classList.remove('hidden')
    lightbox.classList.add('grid')
})

function switchImg(imgId, i, imgContainerParam) {
    const imgContainer = document.getElementById(imgContainerParam)

    for (let j = 0; j < thumbnails.length; j++) {
        const imgBorder = document.getElementById(`${imgId}${j + 1}`)
        const img = document.querySelector(`#${imgId}${j + 1}>img`)
        imgBorder.classList.remove('border-2')
        img.classList.remove('opacity-40')
    }

    const imgBorder = document.getElementById(`${imgId}${i + 1}`)
    const img = document.querySelector(`#${imgId}${i + 1}>img`)

    imgBorder.classList.add('border-2')
    img.classList.add('opacity-40')

    imgContainer.src = `./images/image-product-${i + 1}.jpg`
}

const page = {
    curr: 1,
}

function navigateImg(way) {
    if (way === 'next') {
        page.curr = page.curr + 1 === 5 ? 1 : page.curr + 1
    } else {
        page.curr = page.curr - 1 === 0 ? 4 : page.curr - 1
    }

    for (let j = 0; j < 4; j++) {
        const imgBorder = document.getElementById(`lightboxImg${j + 1}`)
        const img = document.querySelector(`#lightboxImg${j + 1}>img`)
        imgBorder.classList.remove('border-2')
        img.classList.remove('opacity-40')
    }

    lightboxImgContainer.src = `./images/image-product-${page.curr}.jpg`

    const imgBorder = document.getElementById(`lightboxImg${page.curr}`)
    const img = document.querySelector(`#lightboxImg${page.curr}>img`)
    imgBorder.classList.add('border-2')
    img.classList.add('opacity-40')
}

function changeQuantity(increment) {
    const quantity = document.getElementById('quantity')
    if (quantity.innerText == 0 && increment === -1) return

    quantity.innerText = Number(quantity.innerText) + increment
}

function addToCart() {
    const quantity = document.getElementById('quantity').innerText
    const cartQuantity = document.getElementById('cartQuantity')
    if (quantity == 0) {
        deleteCart()
        return
    }

    cartQuantity.innerText = quantity
    cartQuantity.classList.remove('hidden')

    cart = {
        name: 'Fall Limited Edition Sneakers',
        price: 125.0,
        quantity: Number(quantity),
        total: Number(quantity) * 125.0,
    }
}

function showCart() {
    const quantity = document.getElementById('quantity').innerText
    const cartContainer = document.getElementById('cartContainer')
    const cartQuantity = document.getElementById('cartQuantity')
    cartContainer.classList.toggle('hidden')

    if (quantity == 0 || (quantity > 0 && cartQuantity.innerText == 0)) {
        removeItem()
        return
    }
    addItem()
}

function deleteCart() {
    const cartContainer = document.getElementById('cartContainer')
    const quantity = document.getElementById('quantity')
    cart = {}
    quantity.innerText = 0
    cartContainer.classList.add('hidden')

    const cartQuantity = document.getElementById('cartQuantity')
    cartQuantity.innerText = 0
    cartQuantity.classList.add('hidden')
}

function addItem() {
    document.getElementById('emptyCart').classList.add('hidden')
    document.getElementById('prodName').textContent = cart.name
    document.getElementById(
        'price'
    ).textContent = `$${cart.price}.00 x ${cart.quantity}`
    document.getElementById('total').textContent = `$${cart.total}.00`
    document.getElementById('prodImg').classList.remove('hidden')
    document.getElementById('delete').classList.remove('hidden')
    document.getElementById('checkOut').classList.remove('hidden')
}

function removeItem() {
    document.getElementById('emptyCart').classList.remove('hidden')
    document.getElementById('prodName').textContent = ''
    document.getElementById('price').textContent = ''
    document.getElementById('total').textContent = ``
    document.getElementById('prodImg').classList.add('hidden')
    document.getElementById('delete').classList.add('hidden')
    document.getElementById('checkOut').classList.add('hidden')
}

function openMenu() {
    document.getElementById('menu').classList.remove('hidden')
}

function closeMenu() {
    document.getElementById('menu').classList.add('hidden')
}
