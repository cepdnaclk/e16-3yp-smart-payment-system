<template>
<!-- If the user is logged in -->
<div>
    <base-nav
      v-model="showMenu"
      class="navbar-absolute top-navbar"
      type="white"
      :transparent="true"
    >
      <div slot="brand" class="navbar-wrapper">
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <button type="button" class="navbar-toggler" @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand ml-xl-3 ml-5" href="/">{{ routeName }}</a>
      </div>

      <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
        
        <base-dropdown
          tag="li"
          :menu-on-right="!$rtl.isRTL"
          title-tag="a"
          title-classes="nav-link"
          class="nav-item"
        >
          <template
            slot="title"
          >
            <div class="notification d-none d-lg-block d-xl-block"></div>
            <i class="tim-icons icon-sound-wave"></i>
            <p class="d-lg-none">New Notifications</p>
          </template>
          <li class="nav-link">
            <a href="/notifications" class="nav-item dropdown-item"
              >Sathira responded to your email</a
            >
          </li>
          <li class="nav-link">
            <a href="/notifications" class="nav-item dropdown-item">Your gaming center is verified</a>
          </li>
          <li class="nav-link">
            <a href="/notifications" class="nav-item dropdown-item"
              >The requested gaming center is added to the list</a
            >
          </li>
          <li class="nav-link">
            <a href="/notifications" class="nav-item dropdown-item">Your email successfully verified!</a>
          </li>
          <li class="nav-link">
            <a href="/notifications" class="nav-item dropdown-item">Verify your email!</a>
          </li>
        </base-dropdown>
        <base-dropdown
          tag="li"
          :menu-on-right="!$rtl.isRTL"
          title-tag="a"
          class="nav-item"
          title-classes="nav-link"
          menu-classes="dropdown-navbar"
        >
          <template
            slot="title"
          >
            <div class="photo"><img src="img/user.png" /></div>
            <!-- <div v-else><img src="img/default-avatar.png" /></div> -->
            <b class="caret d-none d-lg-block d-xl-block"></b>
            <p class="d-lg-none">User</p>
          </template>
          <li class="nav-link">
            <a href="/user" class="nav-item dropdown-item">Profile</a>
          </li>
          <li class="nav-link">
            <a href="/regular" class="nav-item dropdown-item">Machines</a>
          </li>
          <div class="dropdown-divider"></div>
          <li class="nav-link">
            <button type="button" class="nav-item dropdown-item" @click="logouttest()">Log out </button>
          </li>
        </base-dropdown>
      </ul>
    </base-nav>
</div>

<!-- User does not logged in -->
<!-- <div v-else>
  <base-nav
      v-model="showMenu"
      class="navbar-absolute top-navbar"
      type="white"
      :transparent="true"
    >
      <div slot="brand" class="navbar-wrapper">
        <div
          class="navbar-toggle d-inline"
          :class="{ toggled: $sidebar.showSidebar }"
        >
          <button type="button" class="navbar-toggler" @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
        <a class="navbar-brand ml-xl-3 ml-5" href="/">Smart Payment System</a>
      </div>

      <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
        
        <base-dropdown
          tag="li"
          :menu-on-right="!$rtl.isRTL"
          title-tag="a"
          class="nav-item"
          title-classes="nav-link"
          menu-classes="dropdown-navbar"
        >
          <template
            slot="title"
          >
            <div class="photo"><img src="img/default-avatar.png" /></div>
            <b class="caret d-none d-lg-block d-xl-block"></b>
            <p class="d-lg-none">Account</p>
          </template>
          <li class="nav-link">
            <a href="/login" class="nav-item dropdown-item">Login</a>
          </li>
          <div class="dropdown-divider"></div>
          <li class="nav-link">
            <a href="/register" class="nav-item dropdown-item">Register</a>
          </li>
        </base-dropdown>
      </ul>
    </base-nav>
</div> -->
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';

export default {
  components: {
    CollapseTransition,
    BaseNav,
    Modal
  },
  computed: {
    routeName() {
      const { path } = this.$route;
      let parts = path.split('/')
      if(parts == ','){
        return 'Dashboard';
      }
      return parts.map(p => this.capitalizeFirstLetter(p)).join(' ');
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    };
  },
  methods: {
    logouttest(){
      this.$auth.logout()
      this.$router.push('/login')
    },
    capitalizeFirstLetter(string) {
      if (!string || typeof string !== 'string') {
        return ''
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    }
  }
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
