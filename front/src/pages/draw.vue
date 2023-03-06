<template>

</template>

<script>
export default{
    data() {
        return {
            opTime: "",
            dTime: ""
        }
    },
    methods: {
        getTime() {
            this.opTime = new Date()
            console.log(this.opTime);
        }
    },
    beforeDestroy() {
        this.dTime = new Date()
        console.log(this.dTime - this.opTime);
    }
}
    
</script>