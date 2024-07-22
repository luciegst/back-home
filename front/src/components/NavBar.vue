<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDeviceStore } from '@/stores/device'
import { computed, ref } from 'vue'
import MobileDropdownMenu from '../components/MobileDropdownMenu.vue'

const deviceStore = useDeviceStore()
const router = useRouter()
const isMenuOpen = ref<boolean>(false)
const openMobileMenuBtn = ref<HTMLInputElement | null>(null)

const isMobile = computed<boolean>(() => deviceStore.deviceType === 'mobile')

const goToAdPage = () => {
  router.push({ name: 'ad.page' })
}

const closeMenu = () => {
  isMenuOpen.value = false
  //A11y Upon closing, focus must return to the button that launched the dialog
  openMobileMenuBtn.value?.focus()
}
</script>

<template>
  <nav tabindex="-1" id="nav-example" class="h-full" data-cy="nav">
    <div class="flex justify-between bg-light-grey">
      <RouterLink class="flex items-center" to="/" data-unit-test="home_link" data-cy="home_link">
        <img
          v-if="isMobile"
          class="my-3 mx-3 px-1 py-1"
          src="@/assets/mobile_logo.svg"
          alt="logo site"
          width="58px"
          height="58px"
          data-unit-test="mobile_logo"
          data-cy="mobile_logo"
        />
        <img
          v-else
          class="my-3 mx-3 px-1 py-1"
          width="150px"
          height="45px"
          fetchpriority="high"
          src="@/assets/logo.svg"
          alt="logo site"
          data-unit-test="desktop_logo"
          data-cy="desktop_logo"
        />
      </RouterLink>
      <div class="flex items-center">
        <RouterLink to="/account">
          <img
            src="@/assets/icons/user-profile-circle.svg"
            alt="profil utilisateur"
            height="24px"
            width="32px"
          />
        </RouterLink>
        <button
          class="cursor-pointer flex gap-2 items-center my-3 mx-3 px-1 py-1 border-solid border-2 text-base font-semibold hover:bg-black hover:text-white"
          aria-haspopup="true"
          data-unit-test="go_ad_page_btn"
          data-cy="go_ad_page_btn"
          @click="goToAdPage()"
        >
          <img
            v-if="!isMobile"
            src="@/assets/icons/pencil-mark-plus.svg"
            alt="crayon"
            height="24px"
            width="24px"
            data-unit-test="desktop_pen_icon"
            data-cy="desktop_pen_icon"
          />
          Publier une annonce
        </button>
        <button
          ref="openMobileMenuBtn"
          v-if="isMobile"
          class="cursor-pointer px-1 py-1 mr-3"
          aria-controls="dropdown-menu-mobile"
          data-unit-test="mobile_menu_btn"
          data-cy="mobile_menu_btn"
          @click="isMenuOpen = true"
        >
          <img src="@/assets/icons/menu.svg" alt="menu" />
        </button>
        <MobileDropdownMenu
          v-if="isMenuOpen"
          :id="'dropdown-menu-mobile'"
          :visible="isMenuOpen"
          @close-modal="closeMenu"
        />
      </div>
    </div>
    <div
      v-if="!isMobile"
      class="py-3 px-3"
      data-unit-test="desktop_submenu"
      data-cy="desktop_submenu"
    >
      <ul class="flex gap-4 justify-center">
        <li>
          <RouterLink
            class="text-base font-semibold uppercase px-2 py-2 hover:border-b-4"
            to="/lost/cats"
            data-unit-test="lost_cats_link"
            >Chats perdus</RouterLink
          >
        </li>
        <li>
          <RouterLink
            class="text-base font-semibold uppercase px-2 py-2 hover:border-b-4"
            to="/lost/dogs"
            data-unit-test="lost_dogs_link"
            >Chiens perdus</RouterLink
          >
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
