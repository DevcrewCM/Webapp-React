/**
 * Seed script usando Firebase Admin SDK (CommonJS).
 * Ejecutar con: node scripts/seed-admin.cjs
 */

const admin = require('firebase-admin')
const path = require('path')
const serviceAccount = require(path.resolve(__dirname, '../src/firebase/llavedb.json'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

const db = admin.firestore()

const peliculas = [
  {
    id: 'pelicula-1',
    titulo: 'Blade Runner 2049',
    descripcion: 'Un joven Blade Runner descubre un secreto que amenaza con sumir a la humanidad en el caos. Su descubrimiento lo lleva a buscar a Rick Deckard, un antiguo Blade Runner que lleva desaparecido 30 años.',
    año: 2017,
    duracion: '2h 44min',
    categorias: ['accion', 'ciencia ficcion'],
    poster: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
  {
    id: 'pelicula-2',
    titulo: 'Inception',
    descripcion: 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartición de sueños recibe la tarea inversa de plantar una idea en la mente de un director general.',
    año: 2010,
    duracion: '2h 28min',
    categorias: ['accion', 'ciencia ficcion', 'misterio'],
    poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
  {
    id: 'pelicula-3',
    titulo: 'El Padrino',
    descripcion: 'El envejecido patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su reluctante hijo.',
    año: 1972,
    duracion: '2h 55min',
    categorias: ['drama', 'crimen'],
    poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsLMdL73rsBya.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
  {
    id: 'pelicula-4',
    titulo: 'Interstellar',
    descripcion: 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de garantizar la supervivencia de la humanidad.',
    año: 2014,
    duracion: '2h 49min',
    categorias: ['ciencia ficcion', 'aventuras', 'drama'],
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lZi6n7ke6GsN.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
  {
    id: 'pelicula-5',
    titulo: 'Pulp Fiction',
    descripcion: 'Las vidas de dos sicarios de la mafia, un boxeador, la esposa de un gángster y dos bandidos se entrelazan en cuatro historias de violencia y redención.',
    año: 1994,
    duracion: '2h 34min',
    categorias: ['crimen', 'drama'],
    poster: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
  {
    id: 'pelicula-6',
    titulo: 'El Señor de los Anillos: La Comunidad del Anillo',
    descripcion: 'Un hobbit joven y tímido, Frodo Bolsón, se embarca en una épica aventura para destruir el poderoso Anillo Único y salvar la Tierra Media.',
    año: 2001,
    duracion: '3h 48min',
    categorias: ['aventuras', 'fantasia'],
    poster: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
  {
    id: 'pelicula-7',
    titulo: 'El Silencio de los Corderos',
    descripcion: 'Un joven estudiante del FBI debe obtener la ayuda de un psiquiatra caníbal encarcelado para atrapar a otro asesino en serie conocido como Buffalo Bill.',
    año: 1991,
    duracion: '1h 58min',
    categorias: ['terror', 'misterio', 'drama'],
    poster: 'https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXpqAq.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
  {
    id: 'pelicula-8',
    titulo: 'Titanic',
    descripcion: 'Un aristócrata de diecisiete años se enamora de un artista sin dinero a bordo del lujoso y fatídico R.M.S. Titanic.',
    año: 1997,
    duracion: '3h 14min',
    categorias: ['romance', 'drama'],
    poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
  {
    id: 'pelicula-9',
    titulo: 'Matrix',
    descripcion: 'Un hacker descubre que la realidad tal y como la conoce es una simulación creada por máquinas y se une a una rebelión.',
    año: 1999,
    duracion: '2h 16min',
    categorias: ['accion', 'ciencia ficcion'],
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
  {
    id: 'pelicula-10',
    titulo: 'Parásitos',
    descripcion: 'Toda la familia Ki-taek está en paro y se interesa vivamente por la opulenta familia Park. Comienza a introducirse en su vida, lo cual desencadenará una serie de eventos inesperados.',
    año: 2019,
    duracion: '2h 12min',
    categorias: ['drama', 'misterio'],
    poster: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
    puntuacionTotal: 0,
    numVotos: 0,
  },
]

async function seed() {
  console.log('Iniciando seed...')
  for (const pelicula of peliculas) {
    const { id, ...data } = pelicula
    await db.collection('peliculas').doc(id).set(data)
    console.log('Insertada: ' + pelicula.titulo)
  }
  console.log('\nSeed completado.')
  process.exit(0)
}

seed().catch(err => {
  console.error('Error en el seed:', err)
  process.exit(1)
})
