const cards = document.getElementById('cards');
const items = document.getElementById('items');
const footer = document.getElementById('footer');
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment();
const thead = $('#thead');
const header = $('#header');
const ubicacion = $('#ubicacion');
const volver = $('#volver');
const formulario = $('#formulario');
const datos = $('#datos');
const comprar = $('#comprar');
const comentarios = $('#comentarios');
const titulo = $('#tituloFinalizar');
const titulo2 = $('#tituloFinalizar2');
let carro = {};
let misProductos = []