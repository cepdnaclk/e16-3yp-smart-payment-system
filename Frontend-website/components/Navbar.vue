<template>
  <!-- User isn't logged in -->
    <div v-if="$auth.loggedIn">
    <!-- Navbar for Admins -->
      <div v-if="$auth.user.role=='admin'">
        <b-navbar toggleable="sm" type="dark" variant="dark">

          <b-navbar-brand>
            <img src="../static/icon.png" height="60" width="230" alt="University of Peradeniya">
          </b-navbar-brand>

          <!-- <b-navbar-brand class="mb-0">
            <h2 class="brandName">Key Champ</h2>
          </b-navbar-brand> -->

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <h4>
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                  <template v-slot:button-content>
                    <strong><b-icon icon="people-fill" aria-hidden="true"></b-icon> Account</strong>
                  </template>

                <!-- link to the user home -->
                  <!-- <nuxt-link to="/user">
                    <b-dropdown-item-button variant="info">  
                      <b-icon icon="house" aria-hidden="true"></b-icon>
                        Home
                    </b-dropdown-item-button>
                  </nuxt-link> -->

                  <!-- link to the key management -->
                  <nuxt-link to="/admin/key">
                    <b-dropdown-item-button href="" variant="info">
                      <b-icon icon="tools" aria-hidden="true"></b-icon>
                        Card Management
                    </b-dropdown-item-button>
                  </nuxt-link>

                  <!-- link to the building management -->
                  <nuxt-link to="/admin/building">
                    <b-dropdown-item-button href="" variant="info">
                      <b-icon icon="gear-fill" aria-hidden="true"></b-icon>
                        Center Management
                    </b-dropdown-item-button>
                  </nuxt-link>

                  <!-- link to the borrower management -->
                  <nuxt-link to="/admin/borrower">
                    <b-dropdown-item-button href="" variant="info">
                      <b-icon icon="person-fill" aria-hidden="true"></b-icon>
                        Co-Worker Management
                    </b-dropdown-item-button>
                  </nuxt-link>

                <!-- dropdown divider -->
                  <b-dropdown-divider></b-dropdown-divider>

                  <!-- link to logout -->
                  <nuxt-link to="">
                    <b-dropdown-item-button href="" variant="info" @click="$auth.logout()">
                      <b-icon icon="power" aria-hidden="true"></b-icon>
                        Logout
                    </b-dropdown-item-button>
                  </nuxt-link>

                </b-nav-item-dropdown>
              </h4>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    <!-- For normal user -->
      <div v-else>
        <b-navbar toggleable="sm" type="dark" variant="dark">

          <b-navbar-brand>
            <img src="../static/icon.png" height="60" width="230" alt="University of Peradeniya">
          </b-navbar-brand>

          <!-- <b-navbar-brand class="mb-0">
            <h2 class="brandName">Key Champ</h2>
          </b-navbar-brand> -->

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <h4>
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                  <template v-slot:button-content>
                    <strong><b-icon icon="people-fill" aria-hidden="true"></b-icon> Account</strong>
                  </template>

                <!-- dropdown divider -->
                  <!-- <b-dropdown-divider></b-dropdown-divider> -->

                  <!-- link to logout -->
                  <nuxt-link to="">
                    <b-dropdown-item-button href="" variant="info" @click="$auth.logout()">
                      <b-icon icon="power" aria-hidden="true"></b-icon>
                        Logout
                    </b-dropdown-item-button>
                  </nuxt-link>

                </b-nav-item-dropdown>
              </h4>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      </div>
    </div>
<!-- User isn't logged in -->
  <div v-else>
    <b-navbar toggleable="sm" type="dark" variant="dark">

      <b-navbar-brand>
        <img src="../static/icon.png" height="60" width="230" alt="University of Peradeniya">
      </b-navbar-brand>

      <!-- <b-navbar-brand class="mb-0">
        <h2 class="brandName">Key Champ</h2>
      </b-navbar-brand> -->

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <h4>
            <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                  <strong><b-icon icon="people-fill" aria-hidden="true"></b-icon> Account</strong>
                </template>

            <!-- link to the login form  -->
                <nuxt-link to="/login">
                  <b-dropdown-item-button variant="info">  
                    <b-icon icon="house" aria-hidden="true"></b-icon>
                      Login
                  </b-dropdown-item-button>
                </nuxt-link>

                <!-- dropdown divider -->
                <b-dropdown-divider></b-dropdown-divider>

            <!-- link to the registration form -->
                <nuxt-link to="/register">
                  <b-dropdown-item-button href="" variant="info">
                    <b-icon icon="tools" aria-hidden="true"></b-icon>
                      Register
                  </b-dropdown-item-button>
              </nuxt-link>
            </b-nav-item-dropdown>
          </h4>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</div>
</template>