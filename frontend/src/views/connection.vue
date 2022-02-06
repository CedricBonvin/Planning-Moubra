<template>
    <section class="shadow">
        <p v-if="this.$store.state.hack">test hack</p>
        <h2>CONNECTION</h2>
        <div class="boxInput">
            <label for="user">Utilisateur</label>
            <input id="user" type="text">
            <label for="password">Password</label>
            <input id="password" type="password">
        </div>
        <p v-if="this.$store.state.connection.error" class="error">{{this.$store.state.connection.error}}</p>
        <button @click="tryConnection" class="buttonConnection">
            <p v-if="!loading">CONNECTION</p>
            <div v-if="loading" class="lds-dual-ring"></div>
        </button>
    </section>
</template>

<script>
export default {
    name : "modalConnection",
    data(){
        return{
            loading : false
        }
    },
    
    methods : {
        tryConnection(){
            this.loading = true
            const obj = {
                user : document.getElementById("user").value,
                password :  document.getElementById("password").value,
            }

            fetch(`${this.$store.state.HOST}/user/connection`,{
                method : "POST",
                body :JSON.stringify(obj),
                headers : {"content-type" : "application/json ; charset=UTF-8"}
            })
            .then(res => res.json())
            .then(response => {
                this.loading = false
                if (response.token){
                    localStorage.setItem("token" , JSON.stringify(response.token))
                    this.$router.push({path : "/Home"})
                }else {
                    this.$store.state.connection.error = response.message
                }
            })
            .catch(err => console.log(err))
        }
    },
    mounted(){
        document.title = "connection"
    }
}
</script>

<style scoped>
    section{
        box-sizing: border-box !important;
    }
    .error {
        color: red;
    }
    h2{
        display: inline-block;
        position: relative;
        padding: 0;
        margin: 0;
        text-align: left;
        font-size: 25px;
    }
    h2:before{
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 30%;
        border: solid 2px teal;
    }
    section{
        position: fixed;
        top: 50%;
        left: 50%;
        z-index: 20;
        padding: 20px;
        transform: translate(-50%, -50%);
        width: 500px;
        background: white;
    }
    .shadow{
        box-shadow: 0 0 15px 5px lightgray;
    }
    label{
        display: block;
        margin-top: 15px;
    }
    input{
        padding: 5px;
        width: 100%;
    }
    .buttonConnection{
        display: block;
        padding:15px 20px;
        color: white;
        background: green;
        width: 100%;
        margin-top: 40px;
        border: none;
        cursor: pointer;
        font-weight: bold;
        font-size: 1.1rem;
    }
    .text{
        text-align: center;
    }
    .boxInput{
          width: 200px;
          margin: 20px auto;
    }

    @media screen and (max-width : 500px){
        section{
            width: 80%;
        }
    }
</style>