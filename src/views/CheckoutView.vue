<template>
  <div class="container">
    <div v-if="loading" class="loading-message">Cargando formulario...</div>
    <div v-if="error" class="error-message">{{ error }}</div>

    <!-- Contador flotante -->
    <div v-if="!loading && !error && selectedEvent && !timeExpired" class="floating-timer">
      Tiempo restante: {{ minutes }}:{{ seconds < 10 ? '0' + seconds : seconds }} {{ minutes > 0 ? 'min' : 'seg' }}
    </div>

    <!-- Modal de tiempo agotado -->
    <div v-if="timeExpired" class="modal-overlay">
      <div class="modal-content">
        <h2>¡Tiempo agotado!</h2>
        <p>
          Se ha agotado el tiempo para completar la compra. Por favor, vuelve a iniciar el proceso.
        </p>
        <button @click="reloadPage">Volver a empezar</button>
      </div>
    </div>

    <div v-if="!loading && !error && selectedEvent">
      <h1 class="main-title">Formulario de Compra</h1>
      <p class="main-subtitle">
        Estás comprando para: <strong>{{ selectedEvent.evento }}</strong>
      </p>

      <CheckoutForm :evento="selectedEvent" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import CheckoutForm from '../components/CheckoutForm.vue'

const route = useRoute()
const selectedEvent = ref(null)
const loading = ref(true)
const error = ref(null)

// Timer
const totalSeconds = 5 * 60
const timeLeft = ref(totalSeconds)
const timeExpired = ref(false)
const minutes = computed(() => Math.floor(timeLeft.value / 60))
const seconds = computed(() => timeLeft.value % 60)
let timerInterval = null

function startTimer() {
  timerInterval = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      timeExpired.value = true
      clearInterval(timerInterval)
    }
  }, 1000)
}

function reloadPage() {
  window.location.reload()
}

onMounted(async () => {
  const eventId = parseInt(route.params.id)
  if (!eventId) {
    error.value = 'No se ha especificado un evento válido.'
    loading.value = false
    return
  }

  try {
    const response = await fetch('/data/eventos.json')
    if (!response.ok) throw new Error('Error al cargar datos del evento.')

    const todosLosEventos = await response.json()
    const eventoEncontrado = todosLosEventos.find((e) => e.id === eventId)

    if (eventoEncontrado) {
      selectedEvent.value = eventoEncontrado
      startTimer()
    } else {
      throw new Error('El evento solicitado no existe.')
    }
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>
<style scoped>
.main-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  text-align: center;
  margin-top: 2rem;
  color: var(--primary-color);
}
.main-subtitle {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #666;
}

.floating-timer {
  position: fixed;
  top: 100px;
  right: 20px;
  background: #fafafa;
  color: #d32f2f;
  border: 2px solid #d32f2f;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  z-index: 1000;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 2rem 3rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
.modal-content h2 {
  color: #d32f2f;
  margin-bottom: 1rem;
}
.modal-content button {
  margin-top: 3rem;
  padding: 0.7rem 2rem;
  background: transparent;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
