<template>
  <header class="header">
    <div class="header-block">
      <div
        :class="{header__burger: true, header__burger_active: isMenuActive}"
        ref="burger"
        @click="toggleBurger"
      >
        <span></span>
      </div>
      <div :class="{'header-nav': true, 'header-nav_active': isMenuActive}">
        <ul>
          <li>
            <nuxt-link to="/">
              <img src="~/assets/image/logo.svg" alt="logo" @click="toggleBurger">
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" @click="toggleBurger">Главная</nuxt-link>
          </li>
          <template v-if="!isLoggedIn">
            <li>
              <nuxt-link to="/sign-in" @click="toggleBurger">Вход</nuxt-link>
            </li>
            <li>
              <nuxt-link to="/sign-up" @click="toggleBurger">Регистрация</nuxt-link>
            </li>
          </template>
          <li v-else @click="logout">
            <nuxt-link to="sign-in">Выход</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="header__title">
        <nuxt-link to="/">
          <img src="~/assets/image/logo.svg" alt="logo">
        </nuxt-link>
        <h2>Trello like</h2>
      </div>
      <div class="header-buttons">
        <template v-if="!isLoggedIn">
          <nuxt-link class="header__button" to="sign-in">
            Вход
          </nuxt-link>
          <nuxt-link class="header__button" to="sign-up">
            Регистрация
          </nuxt-link>
        </template>
        <nuxt-link v-else class="header__button" to="sign-in">
          Выход
        </nuxt-link>
      </div>
    </div>
  </header>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const burger = ref();
const isMenuActive = ref(false);

const userStore = useUserStore();

const { isLoggedIn } = storeToRefs(userStore)

const toggleBurger = () => {
  isMenuActive.value = !isMenuActive.value;
};

const logout = () => {
  userStore.logout();
  toggleBurger();
};
</script>
<style lang="scss" scoped>
.header {
  background-color: var(--dark-gray-color);
  margin-bottom: 20px;
  padding: 0 15px;
  &-block {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &-buttons {
    display: flex;
    align-items: center;
    gap: 15px;
    a {
      padding: 7px 12px;
      border-radius: 4px;
      text-transform: none;
      font-size: 16px;
      outline: none;
      background-color: var(--gray-color);
      color: var(--base-color);
      text-decoration: none;
      border: 0;
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
  &__burger {
    display: none;
    cursor: pointer;
  }
  &__title {
    display: flex;
    align-items: center;
    gap: 15px;
    img {
      width: 50px;
      height: auto;
    }
    h2 {
      margin: 0;
    }
  }
  &-nav {
    display: none;
  }
}

@media (max-width: 767px) {
  .header {
    &__burger {
      display: block;
      position: relative;
      width: 30px;
      height: 20px;
      z-index: 10;
      > span {
        position: absolute;
        background-color: #fff;
        width: 100%;
        height: 2px;
        top: 9px;
        left: 0;
        z-index: 5;
        transition: transform 0.3s;
      }
      &::before,
      &::after {
        position: absolute;
        width: 100%;
        height: 2px;
        content: '';
        background-color: white;
        left: 0;
        z-index: 3;
        transition: all 0.3s ease-in-out;
      }
      &::before {
        top: 0;
      }
      &::after {
        bottom: 0;
      }
      &_active {
        > span {
          transform: scale(0);
        }
        &::after {
          transform: rotate(-45deg);
          bottom: 9px;
        }
        &::before {
          transform: rotate(45deg);
          top: 9px;
        }
      }
    }
    &-buttons {
      visibility: hidden;
      width: 0;
      a {
        display: none;
      }
    }
    &-nav {
      display: block;
      position: fixed;
      top: -100%;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.3s ease-in-out;
      z-index: 9;
      background-color: var(--dark-gray-color);
      &_active {
        top: 0;
      }
      ul {
        text-align: center;
        > li {
          padding-top: 5vw;
          font-size: 34px;
          display: block;
          font-size: 7vw;
          a {
            color: var(--base-color);
            text-decoration: none;
          }
        }
      }
      img {
        width: 15vw;
        height: auto;
      }
    }
  }
}
</style>