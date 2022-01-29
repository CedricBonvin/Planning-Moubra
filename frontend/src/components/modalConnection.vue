<template>
    <section class="shadow">
        <h2>CONNECTION</h2>
        <div class="boxInput">
            <label for="user">Utilisateur</label>
            <input id="user" type="text">
            <label for="password">Password</label>
            <input id="password" type="text">
        </div>
        <button class="buttonConnection">CONNECTION</button>
    </section>
</template>

<script>
export default {
    name : "modalConnection"
}
</script>

<style scoped>
    section{
        box-sizing: border-box !important;
    }
    h2{
        display: inline-block;
        position: relative;
        padding: 0;
        margin: 0;
        text-align: left;
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
</style>