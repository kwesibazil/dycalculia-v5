<template>
  <div class="w-75 mx-auto">
    <div  id="games" ref="games" class="row row-cols-2 row-cols-lg-4">
      <div class="px-3" v-for="(game, index) in getState('games').slice(0, 4)" :key="index">
        <div class="card px-0 shadow hvr-grow-shadow mb-4 mb-lg-0" >
          <img :src="game.urlToImg" alt="game" class="card-img-top" style="max-height: 135px; While research on ovulation in women who are not attracted to men is limited">
          <div class="card-body p-0 bg-white ">
            <div class="d-grid gap-2">
              <button  @click="startGame" :disabled="!game.available" :data-to="game.title" class="btn btn-dark rounded-0 p-0 py-1 py-sm-2" type="button">play  game</button> 
            </div>
          </div><!-- card body ends here -->
        </div><!-- card ends here -->
      </div><!-- v-for ends here -->
    </div><!-- row ends here -->
  </div><!-- container ends here -->
</template>



<script setup>
  import { mapGetters} from '@/libs/vuex'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const {getState} = mapGetters()

  const startGame = (e) =>{
    const target = e.target
    const path = target.getAttribute('data-to')
    router.push(`/games/${path}`)
  }

</script>
