<template>
  <div>
    <ActionsRow :longitude="isSelecUsers.length" @openModal="openModal" @remove="remove" @gets="gets"
      @desactiveState="desactiveState" />
    <Spinner v-if="isLoading"></Spinner>
    <div v-else class="table-responsive mt-1">
      <table class="dataTable-table table s-table-flush">
        <thead class="thead-light">
          <tr class="cabeza">
            <th style="background-color: rgb(234, 240, 246); ">
              <div class="d-flex ms-3">
                <div v-if="!allSelected " class="form-check my-auto" style="min-height: 0rem;">
                  <input class="form-check-input cheka" type="checkbox" @click="selectAll" />
                </div>
                <i @click="deletedSelected" v-else class="fa fa-minus s-icon-all" aria-hidden="true"></i>
                <span class="ms-3 text-uppercase text-center text-xxs font-weight-bolder">
                  Num
                </span>
              </div>
            </th>
            <th class="text-uppercase text-center text-xxs font-weight-bolder">
              Curso
            </th>
            <th class="text-uppercase text-center text-xxs font-weight-bolder">
              Fecha M
            </th>
            <th class="text-uppercase text-center text-xxs font-weight-bolder">
              Estado
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in info" :key="item.id">
            <td>
              <div class="d-flex ms-3">
                <div class="form-check my-auto supcheka">
                  <input class="form-check-input cheka" type="checkbox" v-model="isSelecUsers" :value="item._id"
                    @click="selectUser(item._id)" />
                </div>
                <a class="mb-0 ms-3 text-sm negros fuente">
                  {{ item.num }}
                </a>
              </div>
            </td>
            <td class="text-xs text-center font-weight-normal fuente negros">
              {{ item.nombre}}
            </td>
            <td class="text-xs text-center font-weight-normal fuente">
              {{ item.updatedAt.substring(0, 10) }}
            </td>
            <td class="text-sm text-center font-weight-normal fuente">
              <span class="icon">
                <i v-if="item.estado.includes('1')" class="fa fa-check"></i>
                <i v-else class="fa fa-times"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <Paginate2 :numPages="paginas" :page="pagina" :total="totalNotas" :subtitulo="subtitulo"
        @pagechanged="onPageChange" @setChangedQuery="changedQuery"></Paginate2>
      <!-- Modal -->
      <Modal v-show="visible" @close="close">
        <template v-slot:header> {{model._id ? "Editar ente curso" : "A??adir nuevo curso"}}</template>
        <template v-slot:body>
          <Spinner v-if="isCarga"></Spinner>
          <form @submit.prevent="save" role="form" id="prov">
            <div v-if="MsmError!=''" class="is-error">
              <span class="text-sm negros gordo">{{ MsmError }}</span>
            </div>
            <span class="parrafo">N??mero</span>
            <CustomInput v-model="model.num" />
            <p class="mb-2 text-xs fuente text-danger">
              {{ validation.firstError("model.num") }}
            </p>
            <span class="parrafo">Nombre de Curso</span>
            <CustomInput v-model="model.nombre" />
            <p class="mb-0 text-xs fuente text-danger">
              {{ validation.firstError("model.nombre") }}
            </p>
          </form>
        </template>
        <template v-slot:acccion>
          <ButtonLoading v-if="ifLoad" />
          <button form="prov" v-else type="submit" class="btn btnNaranja mt-2">
            {{ model._id ? "Actualizar curso" : "Guardar curso" }}
          </button>
        </template>
      </Modal>
    </div>
  </div>
</template>
<script src="./Cursos.js"></script>
