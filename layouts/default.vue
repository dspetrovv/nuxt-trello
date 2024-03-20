<template>
  <LayoutHeader />
  <main class="main">
    <div class="toast-container" ref="toastContainer"></div>
    <slot></slot>
  </main>
</template>
<script setup>
import { ref, watch } from "vue";
import { useCommonStore } from "../stores/common";

const toastContainer = ref(null);

const commonStore = useCommonStore();

const { messageInfo, messages } = storeToRefs(commonStore);

const showToast = (message, type) => {
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  
  toastContainer.value.appendChild(toast);
  
  setTimeout(() => {
    toast.classList.add('toast_show');
    toast.classList.add(`toast_${type}`);
  }, 100);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

watch(messageInfo, () => {
  if (messageInfo.value.message) {
    showToast(messageInfo.value.message, messageInfo.value.type);
  }
});

watch(messages, () => {
  if (messages.value.length) {
    messages.value.forEach(message => {
      showToast(message.message, message.type);
    });
  }
});
</script>
<style lang="scss">
.main {
  margin: 0 15px;
}

.toast {
  background-color: #333;
  color: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
  &-container {
    position: fixed;
    top: 20px;
    right: 20px;
    max-width: 300px;
    z-index: 1000;
  }
  &_show {
    opacity: 1;
  }
  &_error {
    background-color: #ff3b3b;
  }
}

@media (max-width: 767px) {
  .main {
    display: flex;
    justify-content: center;
  }
}
</style>