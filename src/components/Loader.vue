<template>
    <div class="loader-overlay">
      <div class="spinner"></div>
    </div>
  </template>
  
  <style scoped>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(26, 26, 29, 0.7); /* Fondo oscuro semi-transparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; /* Asegura que esté por encima de todo */
    backdrop-filter: blur(5px);
  }
  
  .spinner {
    width: 60px;
    height: 60px;
    border: 7px solid #fff;
    border-top-color: var(--primary-color); /* Usa el color primario de tu paleta */
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>