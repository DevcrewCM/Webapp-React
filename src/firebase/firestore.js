import { db } from './firebase'
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore'

// Obtener todas las películas
export async function getPeliculas() {
  const snapshot = await getDocs(collection(db, 'peliculas'))
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }))
}

// Obtener una película por ID
export async function getPelicula(id) {
  const ref = doc(db, 'peliculas', id)
  const snap = await getDoc(ref)
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() }
}

// Obtener favoritos de un usuario
export async function getFavoritos(userId) {
  const q = query(collection(db, 'favoritos'), where('userId', '==', userId))
  const snap = await getDocs(q)
  return snap.docs.map(d => d.data().peliculaId)
}

// Añadir a favoritos
export async function addFavorito(userId, peliculaId) {
  const id = `${userId}_${peliculaId}`
  await setDoc(doc(db, 'favoritos', id), { userId, peliculaId })
}

// Quitar de favoritos
export async function removeFavorito(userId, peliculaId) {
  const id = `${userId}_${peliculaId}`
  await deleteDoc(doc(db, 'favoritos', id))
}

// Obtener comentarios de una película
export async function getComentarios(peliculaId) {
  const q = query(
    collection(db, 'comentarios'),
    where('peliculaId', '==', peliculaId)
  )
  const snap = await getDocs(q)
  const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  // Ordenar por fecha desc
  docs.sort((a, b) => {
    const fa = a.fecha?.seconds || 0
    const fb = b.fecha?.seconds || 0
    return fb - fa
  })
  return docs
}

// Añadir comentario
export async function addComentario(peliculaId, userId, userEmail, texto) {
  const ref = doc(collection(db, 'comentarios'))
  await setDoc(ref, {
    peliculaId,
    userId,
    userEmail,
    texto,
    fecha: new Date(),
  })
}

// Obtener puntuación del usuario para una película
export async function getPuntuacionUsuario(userId, peliculaId) {
  const id = `${userId}_${peliculaId}`
  const snap = await getDoc(doc(db, 'puntuaciones', id))
  if (!snap.exists()) return null
  return snap.data().valor
}

// Guardar o actualizar puntuación
export async function setPuntuacion(userId, peliculaId, valor, pelicula) {
  const puntuacionId = `${userId}_${peliculaId}`
  const peliculaRef = doc(db, 'peliculas', peliculaId)

  // Obtener puntuación anterior del usuario
  const anteriorSnap = await getDoc(doc(db, 'puntuaciones', puntuacionId))
  const anterior = anteriorSnap.exists() ? anteriorSnap.data().valor : null

  // Recalcular total y numVotos
  let nuevoPuntuacionTotal = (pelicula.puntuacionTotal || 0)
  let nuevoNumVotos = pelicula.numVotos || 0

  if (anterior !== null) {
    // Actualizar voto existente
    nuevoPuntuacionTotal = nuevoPuntuacionTotal - anterior + valor
  } else {
    // Nuevo voto
    nuevoPuntuacionTotal += valor
    nuevoNumVotos += 1
  }

  await setDoc(doc(db, 'puntuaciones', puntuacionId), { userId, peliculaId, valor })
  await setDoc(
    peliculaRef,
    { puntuacionTotal: nuevoPuntuacionTotal, numVotos: nuevoNumVotos },
    { merge: true }
  )

  return {
    puntuacionTotal: nuevoPuntuacionTotal,
    numVotos: nuevoNumVotos,
  }
}
