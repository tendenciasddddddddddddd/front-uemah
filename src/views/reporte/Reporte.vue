<template>
    <div >
         <section class="intro_cards mt-3">
          <div class="intro_cards_container">
            <div  v-for="(item, i) in arrays_of_options" :key="item.id" class="intro_card_container"  >
              <CardsOptions :index="i"  :img="item.img" :nombre="item.nombre" :description="item.description" @optionsFuntions="optionsView"></CardsOptions>
            </div>
            <div class="intro_card_container" >
               <div class="carmen align_center animate__animated animate__fadeInUp animations-5">
                  <svg class="mt-5" style="color:black;" data-testid="geist-icon" fill="none" height="40" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="40" ><path d="M2.707 7.454V5.62C2.707 4.725 3.469 4 4.409 4h4.843c.451 0 .884.17 1.204.474l.49.467c.126.12.296.186.473.186h8.399c.94 0 1.55.695 1.55 1.59v.737m-18.661 0h-.354a.344.344 0 00-.353.35l.508 11.587c.015.34.31.609.668.609h17.283c.358 0 .652-.269.667-.61L22 7.805a.344.344 0 00-.353-.35h-.278m-18.662 0h18.662"></path></svg>
              </div>
            </div><div class="intro_card_container" >
               <div class="carmen align_center animate__animated animate__fadeInUp animations-5">
                  <svg class="mt-5" style="color:black;" data-testid="geist-icon" fill="none" height="40" shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" width="40" ><path d="M2.707 7.454V5.62C2.707 4.725 3.469 4 4.409 4h4.843c.451 0 .884.17 1.204.474l.49.467c.126.12.296.186.473.186h8.399c.94 0 1.55.695 1.55 1.59v.737m-18.661 0h-.354a.344.344 0 00-.353.35l.508 11.587c.015.34.31.609.668.609h17.283c.358 0 .652-.269.667-.61L22 7.805a.344.344 0 00-.353-.35h-.278m-18.662 0h18.662"></path></svg>
              </div>
            </div>
          </div>
        </section>
       <div v-if="ifReportPdf">
             <ReportePdfAdmin  @myEventClosedModalReporte="closedChildReportPdf" ></ReportePdfAdmin>
         </div>
         <div v-if="ifConsolidado">
             <Consolidado  @myEventClosedModalConsolidado="closedChildConsolidado" ></Consolidado>
         </div>
         <div v-if="ifnotas">
             <ReporteNotas  @myEventClosedModalNotas="closedNotas" />
         </div>
         <div v-if="ifyoutuve">
          <VueYoutuve @ClosedYoutuve="ClosedYoutuve" :videoId="'sFC9qGRA_KM'"/>
        </div>
        <div class="fixed-plugin">
    <a @click="ifyoutuve=true" class="fuente text-sm fixed-plugin-button text-dark position-fixed px-3 py-2 text-white" style="background-color: #8b3dff;
    border-radius: 20px 20px 2px 20px;
    box-shadow: 0 5px 20px 0 rgb(12 73 84 / 20%);">
      Ver video explicativo
    </a>
  </div>
    </div>
</template>

<script>
import RestResource from "../../service/isAdmin";
const restResourceService = new RestResource();
const img1 = require("../../assets/img/shapes/90260b20-d6c6-418f-9961-9282c5d85d78.png")
const img2 = require("../../assets/img/icons/pdf.png")
const img3 = require("../../assets/img/logs/add-on-reporting.svg")
const img4 = require("../../assets/img/logs/documents.svg")
import CardsOptions from "../../shared/CardsClick.vue"
export default {
  name: "MenuZonas",
 
  data() {
    return {
      roles: this.$store.state.user.roles,
      ifReportPdf: false,
      ifConsolidado : false,
      ifyoutuve : false,
      ifnotas: false,
      arrays_of_options: [
        {
          id: "0",
          nombre: "Consolidado",
          img: img1,
          description: "Puedes generar un archivo del consolidado de las matriculas",
        },
        {
          id: "1",
          nombre: "Matriculas y Promociones",
          img: img2,
          description: "Generar reportes de matriculas, promociones, libretas y comportamiento",
        },
        {
          id: "2",
          nombre: "Notas",
          img: img3,
          description: "Generar reportes de calificaci??nes por curso o por materia",
        },
         {
          id: "3",
          nombre: "Permisos",
          img: img4,
          description: "Puedes generar reportes de permisos seg??n sea necesario",
        },
       
      ]
    };
  },
  components:{
     ReportePdfAdmin: () => import( /* webpackChunkName: "Report" */ "./pages/matricula/Reportes.vue"),
     Consolidado: () => import( /* webpackChunkName: "Consolidado" */ "./pages/consolidado/Consolidado.vue"),
     ReporteNotas: () => import( /* webpackChunkName: "ReporteNotas" */ "./pages/notas/ReporteNotas.vue"),
     VueYoutuve: () =>import( /* webpackChunkName: "VueYoutuve" */ "../../shared/VueYoutuve.vue"),
      CardsOptions
  },
  methods: {
    verificarUsuario() {
        let text_1 = 'Matriculas'
      let text_2 = 'Reportes'
      this.$store.commit('updateHeader',{text_1, text_2})
      if (!restResourceService.admin(this.roles)) {
        this.$router.push("/");
      }
    },
    optionsView: function(num){
      if (num===0) {
         this.ifConsolidado = true;
      }
      if (num===1) {
         this.ifReportPdf = true;
      }
      if (num===2) {
         this.ifnotas = true;
      }
    },
    closedChildReportPdf: function() {
      this.ifReportPdf = false;
    },
    closedChildConsolidado: function() {
      this.ifConsolidado = false;
    },
    closedNotas: function() {
      this.ifnotas = false;
    },
    ClosedYoutuve: function(){
      this.ifyoutuve = false;
    },
  },
  created() {
    this.verificarUsuario();
  },
};
</script>

