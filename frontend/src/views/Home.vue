<template>
    <main>
        <!-- loader -->
        <div v-if="loading" class="lds-dual-ring"></div>
    
       

        <div>
            <!-- TITRE -->
            <div class="boxTitre">
                <h1>PLANNING</h1>
                <span class="span">...DE MALADE... </span>
            </div>
            <!-- BASSE SAISON -->
            <div class="containerAffichage">
                <p @click="displayCreerDates" class="creerDate"  >CRÉER BASSE SAISON</p>
                <div class="boxBasseSaison" v-if="containerDates">
                    <label for="datedepart"> Date de départ : (2022/01/01)
                        <input id="datedepart" type="text">
                    </label>
                    <label for="dateFin"> Date de fin : (2022/01/01)
                        <input id="dateFin" type="text">
                    </label>
                    <button @click="injecteBasseSaison" class="button validButton buttonAjouterDates">AJOUTER BASSE SAISON</button>
                </div>
            </div>
            <!-- HAUTE SAISON -->
            <section class="containerSaison">
                <p @click="displayHauteSaison" class="titleSaison">CRÉER HAUTE SAISON</p>
                <div v-if="afficheHauteSaison" class="boxSaison">
                    <div class="hauteSaison">
                        <label for="debutHauteSaison">Début Haute saison ( 2022/01/01 ) </label>
                        <input id="debutHauteSaison" type="text">
                        <label for="finHauteSaison">Fin Haute saison ( 2022/04/15 ) </label>
                        <input id="finHauteSaison" type="text">
                    </div>
                    <button @click="injecteHauteSaison" class="button validButton">AJOUTER HAUTE SAISON</button>
                </div>
            </section>
            <!-- CHOICE DATES -->
            <h2>AFFICHAGE</h2>
            <div class="boxChoixDates">
                <div class="box">
                    <span>DU</span>
                    <input id="dateDebut" type="text" >
                </div>
                <div class="box">
                    <span>AU</span>
                    <input id="dateDeFin" type="text" >
                </div>
                <div class="boxButton">
                    <button @click="callDate()" class="button validButton">AFFICHER LE PLANNING</button>
                </div>
            </div>
            <!-- LEGENDE ET INFO -->
            <div class="containerLegende">
                <div class="boxLegendeCouleur">
                    <div class="couleurMiniature">
                        <label>Haute Saison : </label>
                        <div class="minHauteSaison"></div>
                    </div>
                    <div class="couleurMiniature">
                        <label class="labelBasseSaison">Basse saison : </label>
                        <div class="minBasseSaison"></div>
                    </div>
                </div>
            
                <div class="boxCollaborateur">
                    <div class="collaborateur">
                        <label class="etoile" for="all">Tout</label>
                        <input @change="callDate"   id="all" value="Tous" type="radio" v-model="collaborateur">
                    </div>
                    <div class="collaborateur">
                        <label for="ludo">Ludo</label>
                        <input @change="callDate"  id="ludo" value="Ludo" type="radio" v-model="collaborateur"   >
                    </div>
                    <div class="collaborateur">
                        <label for="yurj">Yurj</label>
                        <input @change="callDate"  id="yurj" value="Yurj" type="radio" v-model="collaborateur"   >
                    </div>
                    <div class="collaborateur">
                        <label for="cedric">Cédric</label>
                        <input @change="callDate"  id="cedric" value="Cédric" type="radio" v-model="collaborateur"   >
                    </div>
                    <div class="collaborateur">
                        <label for="cyp">Cyp</label>
                        <input @change="callDate"  id="cyp" value="Cyp" type="radio" v-model="collaborateur"   >
                    </div>
                </div>
                <p class="redInfo">Tout = Total heure d'ouverture de la salle (sans collab_2)</p>
                <div class="boxInfoHeure">
                    <p>TOTAL HEURES : <span class="total">{{ totalHeure}}</span></p>
                    <span @click="detail" class="detail">Détail</span>
                    <div v-if="displayDetail" class="containerDetail">
                        <div>
                            <p v-if="heureMois.janvier">Janvier : {{heureMois.janvier}} heures </p>
                            <p v-if="heureMois.fevrier">Février : {{heureMois.fevrier}} heures </p>
                            <p v-if="heureMois.mars">Mars : {{heureMois.mars}} heures</p>
                            <p v-if="heureMois.avril">Avril : {{heureMois.avril}} heures</p>
                            <p v-if="heureMois.mai">Mai : {{heureMois.mai}} heures </p>
                            <p v-if="heureMois.juin">Juin : {{heureMois.juin}} heures </p>
                        </div>
                        <div>
                            <p v-if="heureMois.juillet">Juillet : {{heureMois.juillet}} heures </p>
                            <p v-if="heureMois.aout">Aout : {{heureMois.aout}} heures </p>
                            <p v-if="heureMois.septembre">Septembre : {{heureMois.septembre}} heures </p>
                            <p v-if="heureMois.octobre">Octobre : {{heureMois.octobre}} heures </p>
                            <p v-if="heureMois.novembre">Novembre : {{heureMois.novembre}} heures </p>
                            <p v-if="heureMois.decembre">Décembre : {{heureMois.decembre}} heures </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- AFFICHAGE DATES -->
            <div class="containerDates">
                <div class="headerDates">
                    <div class=" col headerDate">DATE</div>
                    <div class=" col colHeure headerDate">HEURE</div>
                    <div class=" col headerDate">COLLAB. 1</div>
                    <div class=" col headerDate">COLLAB. 2</div>
                    <div class=" col headerDate">REMARQUE</div>
                </div>
                <div v-for="item in allDate" :key="item._id">
                    <div :id="item._id" class="ligneDate" >
                        <input class="col" type="text" disabled :value="new Date(item.date).toLocaleDateString('fr-FR',dateOption1)" :class="item.weekend === true ? 'weekend' : 'noWeekend' "  >
                        <input class="col colHeure" type="text" disabled :value="item.heureOuverture" :class="item.hauteSaison ? 'hauteSaison' : 'basseSaison'">
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
        </div>
    </main>
</template>

<script>
export default {
    name : "Home",
    data(){
        return{
            allDate : [],
            connection : {
                connect : false,
                error : false,
            },
            modifier : false,
            tabDatesChange : [],
            tabModifierDates : [],
            dateOption1 : {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
            containerDates : false,
            afficheHauteSaison : false,
            collaborateur : "Tous",
            displayDetail : false,
            heureMois : {
                janvier : null,
                fevrier : null,
                mars : null,
                avril : null,
                mai : null,
                juin : null,
                juillet : null,
                aout : null,
                septembre : null,
                octobre : null,
                novembre : null,
                decembre : null,
            },
            loading: false
        }
    },
    methods : {
        defaultDate(){
            const dateNow = new Date(Date.now())
            const dateFin = new Date( dateNow.setMonth(dateNow.getMonth() + 3)) 

            document.getElementById("dateDebut").value = new Date(Date.now()).toLocaleDateString()
            document.getElementById("dateDeFin").value = dateFin.toLocaleDateString()
        },
        callDate(){
           this.loading = true
            const debut = document.getElementById("dateDebut").value.split("/").reverse().join("/")
            const fin = document.getElementById("dateDeFin").value.split("/").reverse().join("/")

            const obj = {
                token : localStorage.getItem("token"),
                dateDebut : new Date(debut),
                dateFin : new Date(fin),
                collaborateur : this.collaborateur
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
                this.calculHeureMois()
                this.loading = false
            })
            .catch(err => console.log(err))
        },
        injecteBasseSaison(){
            this.loading = true
            const dateDebut = document.getElementById("datedepart").value
            const dateFin = document.getElementById("dateFin").value

            const obj = {
                token : localStorage.getItem("token"),
                debut : dateDebut,
                fin : dateFin
                }

            fetch(`${this.$store.state.HOST}/api/basse-saison`, {
                method : "POST",
                body: JSON.stringify(obj),
                headers : {"content-type" : "application/json; charset=UTF-8"}
            })
            .then(res => res.json())
            .then(response =>{
                    this.allDate = response
                    this.loading = false
            }) 
            .catch(err => console.log(err))
        },
        injecteHauteSaison(){
            this.loading = true
            const debut = document.getElementById("debutHauteSaison").value
            const fin = document.getElementById("finHauteSaison").value

            const obj = {
                token : localStorage.getItem("token"),
                debut : debut,
                fin : fin
            }

            fetch(`${this.$store.state.HOST}/api/haute-saison`,{
                method : "POST",
                body : JSON.stringify(obj),
                headers : {"content-type" : "application/json ; charset=UTF-8"}
            })
            .then(res => res.json())
            .then(() =>{
                this.loading = false
            })
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

            const obj = { 
                tabNewUpdate : this.tabModifierDates,
                token : localStorage.getItem("token")
            }

            fetch(`${this.$store.state.HOST}/api/updateDates`,{
                method : "POST",
                body : JSON.stringify(obj),
                headers : {"content-type" : "application/json ; charset=UTF-8"}
            })
            .then(res => res.json())
            .then(() => this.callDate())
            .catch(err => console.log(err))
        },
        dateAModifier(item){
            let parent = document.getElementById(item._id)
            let obj = {
                idAModifier : item._id,
                collab1 : parent.querySelector("[ data-valeur='collab1'] ").value,
                collab2 : parent.querySelector("[ data-valeur='collab2'] ").value,
                remarque : parent.querySelector("[ data-valeur='remarque'] ").value
            }
            // check si il existe déja dans le tableau
            if ( this.tabModifierDates.length > 0){
                let existe = false
                for (let [index , date] of this.tabModifierDates.entries()){
                   
                    // si il existe dans le tableau
                    if (date.idAModifier == item._id ){
                        this.tabModifierDates.splice(index,1,obj)
                        existe = true
                    }
                }
                if (existe === false){
                    this.tabModifierDates.push(obj)
                }
            }else {this.tabModifierDates.push(obj)}
        },
        displayCreerDates(){
            this.containerDates ? this.containerDates = false : this.containerDates = true
        },    
        displayHauteSaison(){
            this.afficheHauteSaison ? this.afficheHauteSaison = false : this.afficheHauteSaison = true
        },
        detail(){
            this.displayDetail ? this.displayDetail = false : this.displayDetail = true
        },
        calculHeureMois(){
            // réinitialisation 
            for (let item in this.heureMois){
                this.heureMois[item] = null
            }
            
                // si collab = Tous
            if(this.collaborateur === "Tous"){
                for (let item of this.allDate){
                    let mois = new Date(item.date).getMonth()
                    mois === 0 ? this.heureMois.janvier += item.heureOuverture : null
                    mois === 1 ? this.heureMois.fevrier += item.heureOuverture : null
                    mois === 2 ? this.heureMois.mars += item.heureOuverture : null
                    mois === 3 ? this.heureMois.avril += item.heureOuverture : null
                    mois === 4 ? this.heureMois.mai += item.heureOuverture : null
                    mois === 5 ? this.heureMois.juin += item.heureOuverture : null
                    mois === 6 ? this.heureMois.juillet += item.heureOuverture : null
                    mois === 7 ? this.heureMois.aout += item.heureOuverture : null
                    mois === 8 ? this.heureMois.septembre += item.heureOuverture : null
                    mois === 9 ? this.heureMois.octobre += item.heureOuverture : null
                    mois === 10 ? this.heureMois.novembre += item.heureOuverture : null
                    mois === 11? this.heureMois.decembre += item.heureOuverture : null
                }
            }
            // si collab != Tous
            
            if (this.collaborateur === "Cédric"){
                this.heureCollab(this.allDate, "Cédric")
            }
            if (this.collaborateur === "Yurj"){
                this.heureCollab(this.allDate, "Yurj")
            }
            if (this.collaborateur === "Ludo"){
                this.heureCollab(this.allDate, "Ludo")
            }
            if (this.collaborateur === "Cyp"){
                this.heureCollab(this.allDate, "Cyp")
            }                
           
        },
        heureCollab(tab,nom){
            for (let item of tab){
                let mois = new Date(item.date).getMonth()

                switch(mois){
                    // janvier
                    case 0 : 
                        if (item.collab1 === nom) {
                            this.heureMois.janvier += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.janvier += 5
                        }
                        break;
                    // février
                    case 1 : 
                        if (item.collab1 === nom) {
                            this.heureMois.fevrier += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.fevrier += 5
                        }
                        break;
                    // mars
                    case 2 : 
                        if (item.collab1 === nom) {
                            this.heureMois.mars += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.mars += 5
                        }
                        break;
                    // avril
                    case 3 : 
                        if (item.collab1 === nom) {
                            this.heureMois.avril += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.avril += 5
                        }
                        break;
                    // mai
                    case 4 : 
                        if (item.collab1 === nom) {
                            this.heureMois.mai += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.mai += 5
                        }
                        break;
                    // juin
                    case 5 : 
                        if (item.collab1 === nom) {
                            this.heureMois.juin += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.juin += 5
                        }
                        break;
                    // juillet
                    case 6 : 
                        if (item.collab1 === nom) {
                            this.heureMois.juillet += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.juillet += 5
                        }
                        break;
                    // aout
                    case 7 : 
                        if (item.collab1 === nom) {
                            this.heureMois.aout += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.aout += 5
                        }
                        break;
                    // septembre
                    case 8 : 
                        if (item.collab1 === nom) {
                            this.heureMois.septembre += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.septembre += 5
                        }
                        break;
                    // octobre
                    case 9 : 
                        if (item.collab1 === nom) {
                            this.heureMois.octobre += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.octobre += 5
                        }
                        break;
                    // Novembre
                    case 10 : 
                        if (item.collab1 === nom) {
                            this.heureMois.novembre += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.novembre += 5
                        }
                        break;
                    // Décembre
                    case 11 : 
                        if (item.collab1 === nom) {
                            this.heureMois.decembre += item.heureOuverture
                        }
                        if (item.collab2 === nom) {
                            this.heureMois.decembre += 5
                        }
                        break;
                }
            }
        },
        tryConnection(){
            const token = localStorage.getItem("token")
            if (token){
                const obj = {
                    token : token
                }
                fetch(`${this.$store.state.HOST}/try-connection`,{
                    method : "POST",
                    body : JSON.stringify(obj),
                    headers : {"content-type" : "application/json ; charset=UTF-8"}
                })
                .then(res => {
                    res.status != 200 ? this.$router.push({path : "/"}) : null
                   return res.json()
                })
                .then(response => console.log(response))
                .catch(err => console.log(err))

            } else {
                this.$router.push({path : "/"})
            }
        }
    },
    computed : {
        totalHeure (){
            let heure = 0
            const collab = this.collaborateur
            switch(collab){
                case "Tous" : 
                    
                    for (let item of this.allDate){
                        heure = heure + item.heureOuverture 
                    }
                    break;
                 case "Yurj" : 
                    for (let item of this.allDate){
                        item.collab1 === "Yurj" ? heure = heure + item.heureOuverture : null
                        item.collab2 === "Yurj" ? heure = heure + 5 : null
                    }
                    break;
                case "Ludo" : 
                    for (let item of this.allDate){
                        item.collab1 === "Ludo" ? heure = heure + item.heureOuverture : null
                        item.collab2 === "Ludo" ? heure = heure + 5 : null
                    }
                    break;
                case "Cédric" : 
                    for (let item of this.allDate){
                        item.collab1 === "Cédric" ? heure = heure + item.heureOuverture : null
                        item.collab2 === "Cédric" ? heure = heure + 5 : null
                    }
                    break;
                case "Cyp" : 
                    for (let item of this.allDate){
                        item.collab1 === "Cyp" ? heure = heure + item.heureOuverture : null
                        item.collab2 === "Cyp" ? heure = heure + 5 : null
                    }
                    break;
            }
            return heure
        }
    },
    mounted(){
        this.tryConnection()
        this.defaultDate()
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
            background: teal;  
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

    .containerAffichage{
        .boxBasseSaison{
            margin-left: 50px;margin-bottom: 50px;

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

    .containerLegende{
        width: 90%;
        margin: 20px auto;
        margin-bottom: 0;

        .redInfo:before, .etoile::before{
            content: "*";
            color: rgb(177, 34, 34);;
        }
        .redInfo{
            color: rgb(177, 34, 34);
            font-style: italic;
            font-size: 14px !important;
        }
        .detail{
            color: blue;
            text-decoration: underline;
            cursor: pointer;
        }

        .boxLegendeCouleur{
           display: flex;
           margin-bottom: 10px;

           .couleurMiniature{
               display: flex;
               align-items: center;
           }
           .labelBasseSaison{
               margin-left: 50px;
           } 
        }

        .minHauteSaison{
            width: 50px;
            height: 15px;
            background: rgb(173, 173, 211);
            margin-left: 10px;
        }
        .minBasseSaison{
            width: 50px;
            height: 15px;
            background: rgb(176, 206, 176);
            margin-left: 10px;
        }
        .boxInfoHeure{
            margin: 20px 0;

            .containerDetail{
                display: flex;
                justify-content: space-evenly;
                flex-flow: wrap;
            }
        }
        .total{
            font-weight: bold;
            font-size: 1.5rem;
        }
        .collaborateur{
            display: flex;
            align-items: center;
            margin: 0 10px;
        }
        input{
            margin-left: 10px;
        }
        .boxCollaborateur{
            display: flex;
            justify-content: space-evenly;
            flex-flow: wrap;
            margin-top: 0px;

            padding: 10px 0;
            background: lightgray;
            label{
                font-weight: bold;
            }
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
            width: 23%;
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
        .hauteSaison{
            background: rgb(173, 173, 211);
        }
        .basseSaison{
            background: rgb(176, 206, 176);
        }
        .colHeure{
            width: 8%;
            text-align: center;
            padding-left: 0;
        }
    }

    .containerSaison{
        margin-left: 50px;

        .titleSaison{
            font-weight: bold;
            cursor: pointer;
        }
        .titleSaison:hover{
            color: gray;
        }
        .boxSaison{
            margin-left: 50px;
        }
        .hauteSaison{
            margin-top: 20px;
        }
        button{
            margin: 20px 0;
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
         .containerSaison{
             margin-left: 10px;
         }
        
    

         @media  screen and (max-width : 410px) {
            .labelBasseSaison{
                 margin-left: 0 !important;
            }
            .couleurMiniature{
                display: flex;
                flex-flow: column;
        
            }
            .boxLegendeCouleur{
                display: flex;
                justify-content: space-evenly;
            }
            .minBasseSaison, .minHauteSaison{
                margin-left: 0 !important;
            }
         }
    }
</style>

