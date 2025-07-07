<template>
    <div v-if="timeRemaining.total > 0" class="event-countdown">
        <div class="countdown-item">
            <span>{{ timeRemaining.days }}</span>
            <p>Días</p>
        </div>
        <div class="countdown-item">
            <span>{{ timeRemaining.hours }}</span>
            <p>Horas</p>
        </div>
        <div class="countdown-item">
            <span>{{ timeRemaining.minutes }}</span>
            <p>Minutos</p>
        </div>
        <div class="countdown-item">
            <span>{{ timeRemaining.seconds }}</span>
            <p>Segundos</p>
        </div>
    </div>
    <div v-else class="event-live">
        <p>¡El evento ya comenzó!</p>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';

const props = defineProps({
    targetDate: {
        type: String,
        required: true
    }
});

const timeRemaining = reactive({
    total: 0,
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
});

let intervalId = null;

const updateCountdown = () => {
    const eventTime = new Date(props.targetDate + 'T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = eventTime - now;

    timeRemaining.total = distance;

    if (distance < 0) {
        clearInterval(intervalId);
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    timeRemaining.days = days < 10 ? '0' + days : days.toString();
    timeRemaining.hours = hours < 10 ? '0' + hours : hours.toString();
    timeRemaining.minutes = minutes < 10 ? '0' + minutes : minutes.toString();
    timeRemaining.seconds = seconds < 10 ? '0' + seconds : seconds.toString();
};

onMounted(() => {
    updateCountdown();
    intervalId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<style scoped>
.event-countdown {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 4rem 0;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
}

.countdown-item {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    padding: 1rem;
    text-align: center;
    width: 120px;
    border: 1px solid var(--primary-color);
}

.countdown-item span {
    display: block;
    font-family: var(--font-display);
    font-size: 3rem;
    font-weight: bold;
    color: #fff;
}

.countdown-item p {
    font-size: 1rem;
    text-transform: uppercase;
    margin: 0;
}

.event-live {
    font-size: 1.5rem;
    font-weight: bold;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    margin-top: 2rem;
}

@media (max-width: 560px) {
    .event-countdown {
        flex-wrap: wrap;
        margin: 2rem 0;
    }

    .countdown-item span {
        font-size: 2rem;
    }

    .countdown-item p {
        font-size: 1rem;
    }
}

@media (max-width: 320px) {
    .event-countdown {
        flex-wrap: wrap;
        margin: 1rem 0;
    }
    .countdown-item {
        width: 100px;
        padding: .5rem;
    }
    .countdown-item span {
        font-size: 1.5rem;
    }

    .countdown-item p {
        font-size: .7rem;
    }
}
</style>