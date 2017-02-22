<template>
  <div>
   detail
  </div>
</template>

<i18n>
</i18n>

<script>

export default {
  components: {
  
  },
  data () {
    return {
      list:[]
    }
  },
   mounted (){
		let id = this.$route.query.id
		this.getInfo(id)
		console.log(this.list)
   },
  
  methods: {
     getInfo:function (id) {
         
          let that = this  
          this.$http.get('/api/topics/show.json?id='+id).then(function(res){
            console.log(res)
                    that.$data.list=res.data;
            })
      },
  }
}
function tick (i, cb) {
  setTimeout(function () {
    i++
    cb(i)
    if (i < 100) {
      tick(i, cb)
    }
  }, 50)
}
</script>