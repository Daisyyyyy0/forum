<script>
import { emptyImageFilter } from './../utils/mixins'
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";



export default {
    props:{
        initialRestaurant:{
            type: Object,
            required: true,
        }
    },
    data(){
        return{
            restaurant: this.initialRestaurant
        }
    },
    methods:{   
        // addFavorite(){
        //   console.log('isFavorited');
        //     this.restaurant = {
        //         ...this.restaurant,
        //         isFavorited: true
        //     }
        // },         
        async addFavorite( restaurantId ){
          console.log(restaurantId);
          try{
            console.log('Do u try??????');
            const response  = await usersAPI.addFavorite( restaurantId )
            console.log('response', response);   //到這裡，開始失敗
            
            if(response.data.status !== 'success'){
              console.log('not success');
              throw new Error(response.data.message)
            }
            console.log('加入最愛');
            this.restaurant = {
                ...this.restaurant,  // 保留餐廳內原有資料
                isFavorited: true
            }
          } catch (error) {
            console.log('error', error);
            Toast.fire({
              icon: 'error',
              title: '無法將餐廳加入最愛，請稍後再試'
            })            
          }
        },
        // deleteFavorite(){
        //     this.restaurant = {
        //         ...this.restaurant,
        //         isFavorited: false
        //     }
        // },
        async deleteFavorite( restaurantId ){
          try{
            const { data } = await usersAPI.deleteFavorite( restaurantId )
            if(data.status !== 'success'){
              throw new Error(data.message)
            }
            console.log('移除最愛');
            this.restaurant = {
                ...this.restaurant,  // 保留餐廳內原有資料
                isFavorited: false
            }
          } catch (error) {
            console.log('error', error);
            Toast.fire({
              icon: 'error',
              title: '無法將餐廳移除最愛，請稍後再試'
            })            
          }
        },        
        // addLike(){
        //     this.restaurant = {
        //         ...this.restaurant,  
        //         isLiked: true
        //     }
        // },
        async addLike( restaurantId ){
          try{
            const { data } = await usersAPI.addLike( restaurantId )
            if(data.status !== 'success'){
              throw new Error(data.message)
            }
            console.log('按讚');  
            this.restaurant = {
                ...this.restaurant,  
                isLiked: true
            }                       
          } catch (error) {
            console.log('error', error);
            Toast.fire({
              icon: 'error',
              title: '無法對餐廳按讚，請稍後再試'
            })   
          }
        },

        // deleteLike(){
        //     this.restaurant = {
        //         ...this.restaurant,  // 保留餐廳內原有資料
        //         isLiked: false
        //     }
        // },
        async deleteLike( restaurantId ){
          try{
            const { data } = await usersAPI.deleteLike( restaurantId )
            if(data.status !== 'success'){
              throw new Error(data.message)
            }
            console.log('取消讚');  
            this.restaurant = {
                ...this.restaurant,  
                isLiked: false
            } 
          } catch (error) {
            console.log('error', error);
            Toast.fire({
              icon: 'error',
              title: '無法對餐廳移除讚，請稍後再試'
            })   
          }
        },
    },
}
</script>

<template>
    <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        v-bind:src= "restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      >
      <div class="card-body">
        <p class="card-text title-wrap">
          <router-link :to="{ name: 'restaurant', params:{id: restaurant.id} }">
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{ restaurant.Category.name }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
          v-if="restaurant.isFavorited"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
        >
          移除最愛
        </button>
        <button
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          v-else
          @click.stop.prevent="addFavorite(restaurant.id)"
        >
          加到最愛
        </button>
        <button
          type="button"
          class="btn btn-danger like mr-2"
          v-if="restaurant.isLiked"
          @click.stop.prevent="deleteLike(restaurant.id)"
        >
          Unlike
        </button>
        <button
          type="button"
          class="btn btn-primary like mr-2"
          v-else
          @click.stop.prevent="addLike(restaurant.id)"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>


<style>

.card-footer{
    display: flex;
    justify-content: space-between;
}

/* button.favorite{
    margin-right: 1rem;
} */
</style>