import { reactive } from 'vue';

// Un objeto reactivo para el estado global del loader
export const loaderState = reactive({
  isLoading: false,
});

// Funciones para controlar el estado
export const showLoader = () => {
  loaderState.isLoading = true;
};

export const hideLoader = () => {
  loaderState.isLoading = false;
};