<template>
  <div>
    <div class="card-header pb-0 text-center">
      <h2 class=" fuente negros">
       Plataforma
       
      </h2>
      <p class="h5 fuente" style="font-weight: 400;">
        Es un placer conocerte.
      </p>
      <p class="parrafo">
        Antes de empezar, pongamos en orden todos los detalles de tu cuenta. {{email}}
      </p>
    </div>
    <div class="card-body">
      <form @submit.prevent="ResetCount" class="text-start">
        <p class="parrafo">Nueva contraseña
          <span style="font-size: 17px;cursor: pointer;" class="ms-2"><i @click="toggleShow" class="fas"
                              :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"></i></span>
        </p>
        <div class="mb-3">

          <input v-if="showPassword" type="text" class="form-control buscador fuente"
                   v-model="resetPasswords.password" />
            <input v-else v-model="resetPasswords.password"  type="password"
                   class="form-control buscador fuente" required />
        </div>

        <div class="text-center">
          <button
            v-if="isResert"
            class="btn btnNaranja w-100 mt-4 mb-0"
            type="button"
            disabled
          >
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Trabajando...
          </button>
          <button v-else class="btn btnNaranja w-100 mt-4 mb-0">
            Restablece tu contraseña
          </button>
        </div>
      </form>
    </div>
    <div class="mb-4">
      <a
        @click="activeGoBackLogin"
        href="javascript:;"
        class=" tamanio ms-4"
        >Volver a <b class="links2 ms-2 gordo">Inicio de sesión</b>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      resetPasswords: {
        email: this.email,
        password: null,
      },
      isResert: false,
      showPassword: false,
    };
  },
  computed: {
    buttonLabel() {
      return (this.showPassword) ? "Hide" : "Show";
    }
  },
  methods: {
    toggleShow() {
        this.showPassword = !this.showPassword;
     },
    activeGoBackLogin: function() {
      this.$emit("emitGoBackLogin3");
    },
    ResetCount() {
      if (this.email) {
        this.isResert = true;
        this.$proxies.identityProxy
          .forgotPassword(this.resetPasswords)
          .then(() => {
            this.$emit("emitGoBackLogin3");
            this.isResert = false;
            this.toast('Cambio de contraseña es exitosos');
          })
          .catch(() => {
            this.$dialog.alert('Error del servidor')
            this.isResert = false;
          });
      }
    },
    toast(message) {
        this.$toasted.info(message, {
          duration: 3000,
          position: "top-right",
          icon: "check-circle",
          theme: "toasted-primary",
          action: {
            text: "CERRAR",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      },
  },
};
</script>
