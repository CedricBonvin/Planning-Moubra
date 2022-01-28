<template>
    <main>
        <div class="boxTitre">
            <h1>PLANNING</h1>
            <span class="span">...DE MALADE... </span>
        </div>

        


        <!-- AFFICHAGE -->
        <div class="containerAffichage">
            <p @click="displayCreerDates" class="creerDate"  >CRÉER DES NOUVELLES DATES DU PLANNING</p>
            <div v-if="containerDates">
                <label for="datedepart"> Date de départ : (2022/01/01)
                    <input id="datedepart" type="text">
                </label>
                <label for="dateFin"> Date de fin : (2022/01/01)
                    <input id="dateFin" type="text">
                </label>
                <button @click="injectDates" class="button validButton buttonAjouterDates">AJOUTER DATES</button>
            </div>
        </div>

        <!-- DATES -->
        <h2>AFFICHAGE</h2>
        <div class="boxChoixDates">
            <div class="box">
                <span>DE</span>
                <input id="dateDebut" type="text" >
            </div>
            <div class="box">
                <span>À</span>
                <input id="dateDeFin" type="text" >
            </div>
            <div class="boxButton">
                <button @click="choiceDate()" class="button validButton">AFFICHER LE PLANNING</button>
            </div>
        </div>
        <div class="containerDates">
            <div class="headerDates">
                <div class=" col headerDate">DATE</div>
                <div class=" col headerDate">INFO</div>
                <div class=" col headerDate">COLLAB. 1</div>
                <div class=" col headerDate">COLLAB. 2</div>
                <div class=" col headerDate">REMARQUE</div>
            </div>
            <div v-for="item in allDate" :key="item._id">
                <div :id="item._id" class="ligneDate" :class="item.weekend === true ? 'weekend' : 'noWeekend' " >
                    <input class="col" type="text" disabled :value="new Date(item.date).toLocaleDateString('fr-FR',dateOption1)" >
                    <input @change="dateAModifier(item)" data-valeur="info" class="col change" type="text" disabled :value="item.info">
                    <input @change="dateAModifier(item)" data-valeur="collab1" class="col change" type="text" disabled :value="item.collab1">
                    <input @change="dateAModifier(item)" data-valeur="collab2" class="col change" type="text" disabled :value="item.collab2">
                    <textarea @change="dateAModifier(item)" data-valeur="remarque" class="col change" type="text" disabled :value="item.remarque"></textarea>
                </div>
            </div>

            <div class="boxButtonUpdate">
                <button @click="clickModifier" v-if="!modifier" class=" button validButton">MODIFIER</button>
                <button @click="clickCancel" v-if="modifier" class=" button dangeButton">ANNULER</button>
                <button @click="updatePlanning" v-if="modifier" class=" button validButton">VALIDER PLANNING</button>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    name : "Home",
    data(){
        return{
            allDate : [],
            modifier : false,
            tabDatesChange : [],
            tabModifierDates : [],
            dateOption1 : {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
            containerDates : false
        }
    },
    methods : {
        callDate(){
            const dateNow = new Date(Date.now())
            const dateDebutString = dateNow.toLocaleDateString()
            const dateDebutDate = dateDebutString.split("/").reverse().join("/")

            const dateFin = new Date(Date.now())
            dateFin.setMonth(dateNow.getMonth() + 2) 
            const dateFinString = dateFin.toLocaleDateString()
            const dateFinalFin =  dateFinString.split("/").reverse().join("/")

            document.getElementById("dateDebut").value = dateDebutDate
            document.getElementById("dateDeFin").value = dateFinalFin

            const obj = {
                dateDebut : new Date(dateDebutDate) ,
                dateFin : new Date(dateFinalFin) 
            }
            
            fetch(`${this.$store.state.HOST}/api/allDates`,{
                method : "POST",
                body : JSON.stringify(obj),
                headers : {"content-type" : "application/json ; charset=UTF-8"}
            })
            .then(res => res.json())
            .then(response => {
                response.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                });
                this.allDate = response.reverse()
            })
            .catch(err => console.log(err))
        },
        choiceDate(){

            const dateDebutDate = document.getElementById("dateDebut").value
            const dateFinalFin = document.getElementById("dateDeFin").value

            const obj = {
                dateDebut : new Date(dateDebutDate) ,
                dateFin : new Date(dateFinalFin) 
            }
            
            fetch(`${this.$store.state.HOST}/api/allDates`,{
                method : "POST",
                body : JSON.stringify(obj),
                headers : {"content-type" : "application/json ; charset=UTF-8"}
            })
            .then(res => res.json())
            .then(response => {
                response.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                });
                this.allDate = response.reverse()
            })
            .catch(err => console.log(err))
        },
        injectDates(){
            const dateDebut = document.getElementById("datedepart").value
            const dateFin = document.getElementById("dateFin").value

            const obj = {
                debut : dateDebut,
                fin : dateFin
                }

            fetch(`${this.$store.state.HOST}/api/putNewDate`, {
                method : "POST",
                body: JSON.stringify(obj),
                headers : {"content-type" : "application/json; charset=UTF-8"}
            })
            .then(res => res.json())
            .then(response => this.allDate = response)
            .catch(err => console.log(err))
        },
        clickModifier(){
            this.tabDatesChange = document.querySelectorAll(".containerDates .ligneDate .change")
            for (let item of this.tabDatesChange){
                item.disabled = false
                item.classList.add("possibleChange")
            }
            this.modifier = true
        },
        clickCancel(){
            this.modifier = false
            for (let item of this.tabDatesChange){
                item.disabled = true
                item.classList.remove("possibleChange")
            }
            this.callDate()        
        },
        updatePlanning(){
            this.modifier = false
            for (let item of this.tabDatesChange){
                item.disabled = true
                item.classList.remove("possibleChange")
            }

            const obj = { tabNewUpdate : this.tabModifierDates }

            fetch(`${this.$store.state.HOST}/api/updateDates`,{
                method : "POST",
                body : JSON.stringify(obj),
                headers : {"content-type" : "application/json ; charset=UTF-8"}
            })
            .then(res => res.json())
            .then(() => this.choiceDate())
            .catch(err => console.log(err))
        },
        dateAModifier(item){
            let parent = document.getElementById(item._id)
            let obj = {
                idAModifier : item._id,
                collab1 : parent.querySelector("[ data-valeur='collab1'] ").value,
                collab2 : parent.querySelector("[ data-valeur='collab2'] ").value,
                info : parent.querySelector("[ data-valeur='info'] ").value,
                remarque : parent.querySelector("[ data-valeur='remarque'] ").value
            }
            // check si il existe déja dans le tableau
            if ( this.tabModifierDates.length > 0){
                let existe = false
                for (let [index , date] of this.tabModifierDates.entries()){
                   
                    // si il existe dans le tableau
                    if (date.idAModifier == item._id ){
                        // date = {...obj}
                        this.tabModifierDates.splice(index,1,obj)
                        // console.log(date)
                        existe = true
                    }
                }
                if (existe === false){
                    this.tabModifierDates.push(obj)
                }
            }else {this.tabModifierDates.push(obj)}
             console.log(this.tabModifierDates)
        },
        displayCreerDates(){
            this.containerDates ? this.containerDates = false : this.containerDates = true
        }
    },
    mounted(){
        this.callDate()
    }

}
</script>

<style lang="scss">

    main{
        margin: 0;
        padding: 0;
        position: relative;
        box-sizing: border-box;

        .boxTitre{
            display: flex;
            flex-flow: column;
            align-items: center;
            color: wheat;
            background: black;  
            padding: 20px 0;
        }
        .span{
            font-size: 16px;
        }
        .boxButtonUpdate{
            position: sticky;
            bottom: 20px;
            text-align: right;  
            padding-right: 20px; 
        }
        textarea{
            background: none;
            border: 1px solid lightgray;
        }    
        h1{
            text-align: center;
            font-size: 50px;
            letter-spacing: 5px;
        }
        h2{
            text-align: center;
            font-size: 30px;
        }
        input, textarea{
            padding: 10px 10px;
            display: block;
            border: solid 1px rgb(214, 212, 212);
            background: rgb(228, 228, 228);
        }

        .button{
            padding: 10px 20px;
            border: none;
            cursor: pointer;
        }
        .validButton{
            background: green;
            color: white;
        }
        .dangeButton{
            background: rgb(129, 23, 23);
            color: white;
            margin-right: 20px;
        }
        .creerDate{
            cursor: pointer;
            font-weight: bold;
            margin: 20px 0;
        }
        .creerDate:hover{
            color: gray;
        }
        h2{
            margin-top: 50px;
        }
        .containerAffichage{
            margin-left: 50px;
        }
        .buttonAjouterDates{
            margin-top: 20px;
        }

    }
    
    .boxChoixDates{
        display: flex;
        justify-content: space-evenly;
        flex-flow: wrap;
        margin: 20px auto;
        max-width: 500px;

        .box{
            display: flex;
            align-items: center;
        }

        span{
            margin-right: 10px;
            font-weight: bold;
        }
        .boxButton{
            display: flex;
            justify-content: center;
            width: 100%;
            margin: 30px auto;
        }
        input{
            width: 100px ;
        }
    }

    .containerDates{
        width: 90%;
        margin: auto;
        box-shadow: 0 0 15px 3px gray; 

        input, textarea{
            background: none;
        }
        input:hover{
            cursor: pointer;
        }
        .col{
            width: 20%;
        }
        .headerDates{
            display: flex;
            justify-content: space-between;
            background: teal;
            position: sticky;
            top: 0px;
        }
        .headerDate{
            padding : 10px 0;
            padding-left: 10px;
            color : white;
            
        }   
        .ligneDate{
            display: flex;
            justify-content: space-between;
        }
        .ligneDate:hover{
            background: lightgray;
        }
        .weekend{
            background: rgb(226, 195, 110);
        }
        .noWeekend{
            background: none;
        }
        .possibleChange{
            background: rgb(209, 162, 162);
        }
    }

   

    @media screen and (max-width : 500px){
        main{
            .containerAffichage{
                margin-left: 10px;
            }
        }
        .containerDates{
            width: 100%;
             .headerDate{
                font-size: 8px;
            }  
            input, textarea{
                font-size: 8px;
                padding: 5px
                
            }

         }
    }
</style>

